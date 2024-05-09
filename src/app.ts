import { writeFileSync } from "fs";
import { OutputDir, fileTypes } from "./constants";
import { Helpers } from "./helper/functions";
import { Utils } from "./helper/Utils";
import { DataConverters } from "./helper/DataConverters";
import { createCoreIndexData } from "./main/core";
import { createPlansData } from "./main/plans";
import { createCoverageData } from "./main/coverages";
import { createPricingTableData } from "./main/pricingTable";
import { createModifiersData } from "./main/modifiers";

Helpers.checkInputFolderExists();

const InfoData = DataConverters.fetchInsurerInfo(
  DataConverters.fetchSheet(fileTypes.info)
);
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

const core = createCoreIndexData(datas);
const coverages = datas.flatMap((data) => createCoverageData(data));
const plans = datas.flatMap((data) => createPlansData(data));
const pricingTables = datas.flatMap(
  (data, i) =>
    createPricingTableData(data, planDatas[i], InfoData, rates[i]).data
);
const modifiers = datas.flatMap((data, i) =>
  createModifiersData(data, rates[i], planDatas[i], InfoData)
);

let Output: any = {
  core,
  coverages,
  plans,
  pricingTables,
  modifiers,
};

// Deleting the Provider's folder if exists for new data
Helpers.createNewProviderFolder(InfoData.provider);

for (let folder in Output) {
  Helpers.convertArrToOutputSheet({
    folder,
    fileName: "index",
    data: JSON.stringify(Output[folder]),
    provider: InfoData.provider,
    core: true,
    Enum: true,
  });
}
// writeFileSync(`${OutputDir}/planData.json`, JSON.stringify(planData));
// writeFileSync(`${OutputDir}/data.json`, JSON.stringify(data));
// writeFileSync(`${OutputDir}/Ids.json`, JSON.stringify(Ids));
// writeFileSync(`${OutputDir}/plans.json`, JSON.stringify(plans));
