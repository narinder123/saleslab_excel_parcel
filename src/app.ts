import { writeFileSync } from "fs";
import { OutputDir, fileTypes } from "./constants";
import { Helpers } from "./helper/functions";
import { Utils } from "./helper/Utils";
import { DataConverters } from "./helper/DataConverters";
import { createCoreIndexData } from "./main/core";
import { createPlansData } from "./main/plans";

Helpers.checkInputFolderExists();

const planData = DataConverters.fetchSheet(fileTypes.benefits);
const rates = DataConverters.fetchSheet(fileTypes.rateSheet);
const InfoData = DataConverters.fetchSheet(fileTypes.info);
const data = DataConverters.fetchPlansInfo(planData, InfoData[0].provider);
const Ids = createCoreIndexData([data]);
const plans = createPlansData(data);

writeFileSync(`${OutputDir}/planData.json`, JSON.stringify(planData));
writeFileSync(`${OutputDir}/data.json`, JSON.stringify(data));
writeFileSync(`${OutputDir}/Ids.json`, JSON.stringify(Ids));
writeFileSync(`${OutputDir}/plans.json`, JSON.stringify(plans));
