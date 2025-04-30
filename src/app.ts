import fs from "fs";
import { fileTypes } from "./constants";
import { Helpers } from "./helper/helpers";
import { DataConverters } from "./helper/DataConverters";
import { createCoreIndexData } from "./main/core";
import { createPlansData } from "./main/plans";
import { createCoverageData } from "./main/coverages";
import { createPricingTableData } from "./main/pricingTable";
import { createModifiersData } from "./main/modifiers";
import { Utils } from "./helper/Utils";
import { Import_V1_Data, create_V1_Data } from "./main/generateV1";
import {
  BenefitSheet,
  KeyStringType,
  rateTable,
  V1DBMode,
} from "./helper/interfaces";
import { createProvider } from "./main/provider";
import { createRateTableData } from "./main/modifiers/rateTable";
import { SplitFile } from "./helper/splitFile";
import { extractMultiCurrency } from "./helper/extractMultiCurrency";

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
} else if (InputArguments.create == "conversion") {
  const sheets: BenefitSheet[] = Helpers.getSheetNames(
    fileTypes.multiCurrencyBenefits
  ).map((sheetName) => ({
    name: sheetName,
    benefits: DataConverters.fetchSheet(
      fileTypes.multiCurrencyBenefits,
      sheetName
    ),
  }));
  const conversionData = extractMultiCurrency(sheets,InfoData);
  Helpers.createXlsx(
    conversionData,
    `Inputs/${InputArguments.name}/${fileTypes.conversion}.xlsx`
  );
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

  const conversionData: KeyStringType[] = [];

  if (fs.existsSync(`./Inputs/${InputArguments.name}/${fileTypes.conversion}.xlsx`))
    conversionData.push(...DataConverters.fetchSheet(fileTypes.conversion));

  Utils.log(`Input Sheets are converted! \n`);

  // Deleting the Provider's folder if exists for new data
  Helpers.createNewProviderFolder(InfoData.provider, InputArguments);

  if (InputArguments.log) {
    fs.mkdirSync(`Outputs/${InfoData.provider}/log`);
    const LogFilesName = ["planDatas", "rates", "datas", "InsurerInfo"];
    [planDatas, rates, datas, [InfoData]].map((data: any[], i: number) => {
      fs.writeFileSync(
        `Outputs/${InfoData.provider}/log/${LogFilesName[i]}.json`,
        JSON.stringify(data)
      );
    });
    Utils.log("Log files are created");
  }

  // Generating V1 Data with json files
  if (InputArguments.V1) create_V1_Data(InfoData, rates, planDatas);

  // Generating V2 output with json files
  if (InputArguments.V2) {
    Utils.log("Generating V2 Data");

    const getIndex = (i: number): number | string =>
      InfoData.residencies.length > 1 ? i + 1 : "";

    const core = createCoreIndexData(datas, InfoData);

    const coverages = datas.flatMap((data, i) =>
      createCoverageData(data, InfoData.residencies[i], getIndex(i))
    );

    const V2Rates = (i: number) => {
      let filteredRates = rates[i].filter(
        (rate) => rate.platform == "both" || rate.platform == "V2"
      );

      if (filteredRates.length == 0) throw new Error("No rates found for V2");
      return filteredRates;
    };

    const plans = datas.flatMap((data, i) =>
      createPlansData(data, getIndex(i), InfoData)
    );

    const pricingTables = datas.flatMap(
      (data, i) =>
        createPricingTableData(
          data,
          planDatas[i],
          InfoData,
          V2Rates(i),
          getIndex(i),
          i
        ).data
    );

    const rateTableData: rateTable[] = [];
    let splitFilePath: string = ``;
    let splitFilePremiums: any = [];
    let splitFileArr: string[] = [];

    let modifiers = datas.flatMap((data, i) => {
      let mods = createModifiersData(
        data,
        V2Rates(i),
        planDatas[i],
        InfoData,
        getIndex(i)
      );
      if (mods.rateTableData.length > 0)
        rateTableData.push(...mods.rateTableData);

      if (mods.splitFilePremiums.length > 0) {
        splitFilePremiums.push(mods.splitFilePremiums);
        splitFileArr.push(...mods.splitFile);
      }

      if (InfoData.splitFile)
        mods.splitFile?.length > 0 &&
          mods.splitFile.map((split: string) => {
            splitFilePath += `
          const ${split} = require("./${split.split("_")[0]}/${split}.js")`;
          });

      return mods.data;
    });

    const provider = createProvider(InfoData);

    let Output: any = {
      provider: { data: provider, Enum: true, core: false },
      coverage: { data: coverages, Enum: true, core: true },
      plans: { data: plans, Enum: true, core: true },
      PricingTable: { data: pricingTables, Enum: true, core: true },
      modifiers: {
        data: modifiers,
        Enum: true,
        core: true,
        addUp: splitFilePath,
      },
    };

    if (rateTableData.length > 0) {
      let tempData = createRateTableData(rateTableData, InfoData);
      Output.RateTable = {
        data: tempData,
        Enum: true,
        core: true,
        addUp: `const Utils = require("../../../services/utils/utils");
                const utils = new Utils({ config: { logging: false } });
                const { generateMongoIdFromString } = utils;`,
      };
    }

    if (InfoData.multiCurrency && InfoData.multiCurrency?.length > 1) {

      console.log('Found coversion sheet, implying multicurrency');      
      modifiers=DataConverters.multiCurrencyConverter({
        modifiers,
        InfoData,
        conversionData,
      });
      console.log("MultiCurrency done!");
    }

    Utils.log("Generating V2 Output folders/files");

    // Generating V2 output files
    for (let folder in Output) {
      let { data, Enum, core, addUp } = Output[folder];
      Helpers.convertArrToOutputSheet({
        folder,
        fileName: "index",
        data: JSON.stringify(data),
        provider: InfoData.provider,
        core,
        Enum,
        addUp,
      });

      if (folder == "modifiers") {
        if (InfoData.splitFile) {
          splitFilePremiums?.length > 0 &&
            splitFilePremiums?.map((planData: any) => {
              planData.map((rate: any) => {
                SplitFile(
                  rate.rates?.data,
                  `Outputs/${InfoData.provider}/V2/modifiers`,
                  `${rate?.rates?.key}`
                );
              });
            });
        }
      }
    }

    Helpers.createV2IndexJS(InfoData.provider, rateTableData.length > 0);
    Helpers.createV2CoreIndexJS(InfoData.provider, core);
    Utils.log("V2 Data are generated");
  }
}
