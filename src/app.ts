import { fileTypes } from "./constants";
import { Helpers } from "./helper/functions";
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
  createModifiersData(data, rates[i], planDatas[i], InfoData, i)
);

let Output: any = {
  core: { data: core, Enum: false, core: false },
  coverages: { data: coverages, Enum: false, core: true },
  plans: { data: plans, Enum: false, core: true },
  pricingTables: { data: pricingTables, Enum: false, core: true },
  modifiers: { data: modifiers, Enum: false, core: true },
};

// Deleting the Provider's folder if exists for new data
Helpers.createNewProviderFolder(InfoData.provider);

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
