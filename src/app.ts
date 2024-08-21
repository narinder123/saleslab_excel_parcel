import { fileTypes } from "./constants";
import { Helpers } from "./helper/functions";
import { DataConverters } from "./helper/DataConverters";
import { createCoreIndexData } from "./main/core";
import { createPlansData } from "./main/plans";
import { createCoverageData } from "./main/coverages";
import { createPricingTableData } from "./main/pricingTable";
import { createModifiersData } from "./main/modifiers";
import { Utils } from "./helper/Utils";
import fs from "fs";
import { Import_V1_Data, create_V1_Data } from "./main/generateV1";
import { V1DBMode } from "./helper/interfaces";
import { createProvider } from "./main/provider";

const InputArguments = Helpers.getInputArguments();
Helpers.checkInputFolderExists();

Utils.log(`Converting Input Sheets...`);
const InfoData = DataConverters.fetchInsurerInfo(
  DataConverters.fetchSheet(fileTypes.info)
);

if (InputArguments.import && !InputArguments.V1) {
  let mode: V1DBMode = "dev";
  if (InputArguments.import == "dev") mode = "dev";
  else if (InputArguments.import == "prod") mode = "prod";
  else throw `Invalid import mode entered, modes: dev | prod`;
  Import_V1_Data(InfoData.provider, mode);
} else {
  const planDatas = new Array(InfoData.residencies.length)
    .fill(0)
    .map((v, i) =>
      DataConverters.fetchSheet(`${fileTypes.benefits}${i ? i : ""}`)
    );

  const rates = new Array(InfoData.residencies.length)
    .fill(0)
    .map((v, i) =>
      DataConverters.fetchSheet(`${fileTypes.rateSheet}${i ? i : ""}`)
    );

  const datas = planDatas.map((planData) =>
    DataConverters.fetchPlansInfo(planData, InfoData.provider)
  );

  Utils.log(`Input Sheets are converted! \n`);

  // Deleting the Provider's folder if exists for new data
  Helpers.createNewProviderFolder(InfoData.provider, InputArguments);

  if (InputArguments.log) {
    fs.mkdirSync(`Outputs/${InfoData.provider}/log`);
    [planDatas, rates, datas].map((data, i) => {
      fs.writeFileSync(
        `Outputs/${InfoData.provider}/log/${i == 0 ? "planDatas" : i == 1 ? "rates" : "datas"}.json`,
        JSON.stringify(data)
      );
    });
    Utils.log("Log files are created");
  }

  // Generating V1 Data with json files
  if (InputArguments.V1) create_V1_Data(InfoData, rates, planDatas);

  // Generating V2 output files with json files
  if (InputArguments.V2) {
    Utils.log("Generating V2 Data");
    const getIndex = (i: number): number | string =>
      InfoData.residencies.length > 1 ? i + 1 : "";
    const core = createCoreIndexData(datas);
    const coverages = datas.flatMap((data, i) =>
      createCoverageData(data, InfoData.residencies[i], getIndex(i))
    );
    const plans = datas.flatMap((data, i) =>
      createPlansData(data, getIndex(i))
    );
    const pricingTables = datas.flatMap(
      (data, i) =>
        createPricingTableData(
          data,
          planDatas[i],
          InfoData,
          rates[i].filter(
            (rate) => rate.platform == "both" || rate.platform == "V2"
          ),
          getIndex(i)
        ).data
    );
    const modifiers = datas.flatMap(
      (data, i) =>
        createModifiersData(
          data,
          rates[i].filter(
            (rate) => rate.platform == "both" || rate.platform == "V2"
          ),
          planDatas[i],
          InfoData,
          getIndex(i)
        ).data
    );
    const provider = createProvider(InfoData);

    let Output: any = {
      provider: { data: provider, Enum: true, core: false },
      coverage: { data: coverages, Enum: true, core: true },
      plans: { data: plans, Enum: true, core: true },
      PricingTable: { data: pricingTables, Enum: true, core: true },
      modifiers: { data: modifiers, Enum: true, core: true },
    };

    // Generating V2 output files
    for (let folder in Output) {
      let { data, Enum, core } = Output[folder];
      Helpers.convertArrToOutputSheet({
        folder,
        fileName: "index",
        data: JSON.stringify(data),
        provider: InfoData.provider,
        core,
        Enum,
      });
    }
    Helpers.createV2IndexJS(InfoData.provider);
    Helpers.createV2CoreIndexJS(InfoData.provider, core);
    Utils.log("V2 Data are generated");
  }
}
