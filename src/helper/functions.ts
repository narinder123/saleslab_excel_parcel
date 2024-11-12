import {
  BenefitTypes,
  InfoResidencies,
  V2Residencies,
  variable,
} from "../constants";
import { Utils } from "./Utils";
import {
  InputArgumentType,
  OutputSheetFnArguments,
  RawBenefits,
  Residencies,
} from "./interfaces";
import fs from "fs";
import xlsx from "xlsx";

export const Helpers = new (class helperFunction {
  getInputArguments(): InputArgumentType {
    let args: any = {};
    process.argv
      .filter((v) => v.includes(":"))
      .map((v) => {
        let [label, value] = v.split(":");
        args[label] = value;
      });
    if (!args?.name) throw "Please provide a folder name!";
    return args;
  }

  checkInputFolderExists(): boolean {
    const enteredFolderName = this.getInputArguments().name;
    if (!enteredFolderName) {
      Utils.log("No folder name provided!", "err");
      Utils.endProcess();
      return false;
    }
    let AllFolders = fs.readdirSync("./Inputs");
    if (!AllFolders.includes(enteredFolderName)) {
      Utils.log("Provided folder name not found!", "err");
      Utils.endProcess();
      return false;
    }
    return true;
  }

  checkFileExists(path: string, fileName: string): boolean {
    let AllFolders = fs.readdirSync(path);
    if (!AllFolders.includes(fileName)) {
      Utils.log(`${fileName} doesn't exists`, "err");
      Utils.endProcess();
      return false;
    }
    return true;
  }

  convertXlsxToArr(path: string, innerFileName: number | string): any[] {
    const Sheet = xlsx.readFile(path);

    let sheetName = innerFileName;
    if (
      typeof innerFileName == "string" &&
      !Sheet.SheetNames.includes(innerFileName)
    ) {
      let value;
      if (typeof innerFileName == "string")
        value = Sheet.SheetNames.find((name) => innerFileName.includes(name));
      if (value) sheetName = value;
    }

    let data = xlsx.utils.sheet_to_json(
      Sheet.Sheets[
        typeof innerFileName == "string"
          ? sheetName
          : Sheet.SheetNames[innerFileName]
      ]
    );
    return data;
  }

  convertArrToOutputSheet({
    folder,
    fileName,
    data,
    provider,
    core,
    Enum,
    comment,
    addUp,
  }: OutputSheetFnArguments) {
    data = data.replace(/"-/g, "");
    data = data.replace(/-"/g, "");
    data = data.replace(/\n/g, "");

    let str = `${addUp ? addUp : ""}
      const ${provider} = require("../core-index.js")
      ${Enum ? "const Enum = require('../../enum.js')" : ""}
    ${core ? 'const core = require("../../core");' : ""}
    ${comment ? `// ${comment}` : ""}
    let ${folder} = ${data} ;
    module.exports = ${folder} ;`;
    if (!fs.existsSync(`Outputs/${provider}`))
      fs.mkdirSync(`Outputs/${provider}`);
    if (!fs.existsSync(`Outputs/${provider}/V2`))
      fs.mkdirSync(`Outputs/${provider}/V2`);

    if (!fs.existsSync(`Outputs/${provider}/V2/${folder}`))
      fs.mkdirSync(`Outputs/${provider}/V2/${folder}`);

    fs.appendFileSync(`Outputs/${provider}/V2/${folder}/${fileName}.js`, str);
    console.log(`|- ${provider}/${folder}/${fileName} Created!`);
  }

  getResidencyArr(residency: string): string[][] {
    if (InfoResidencies.includes(residency)) return V2Residencies[residency];
    else
      throw `${residency} residency doesn't exist! please use these defined residencies: ${InfoResidencies.join(",")}`;
  }

  NotIncludedBenefit(data: RawBenefits): boolean {
    let bool = true;

    for (let key in data) {
      if (!Utils.ShouldNotInclude(key, variable.UserType, variable.Benefit))
        continue;
      if (
        typeof data[key] == "string" &&
        Utils.ShouldNotInclude(
          data[key].toLowerCase(),
          "n/a",
          "not available",
          ""
        )
      )
        bool = false;
    }
    return !bool;
  }

  createNewProviderFolder(provider: string, inputArgv: InputArgumentType) {
    if (!fs.existsSync(`Outputs/${provider}`))
      fs.mkdirSync(`Outputs/${provider}`);

    if (fs.existsSync(`Outputs/${provider}/V1`) && inputArgv.V1)
      fs.rmSync(`./Outputs/${provider}/V1`, { recursive: true, force: true });

    if (fs.existsSync(`Outputs/${provider}/V2`) && inputArgv.V2)
      fs.rmSync(`./Outputs/${provider}/V2`, { recursive: true, force: true });

    if (fs.existsSync(`Outputs/${provider}/log`) && inputArgv.log)
      fs.rmSync(`./Outputs/${provider}/log`, { recursive: true, force: true });
  }

  getBenefitsForV1(benefits: RawBenefits[]) {
    let benefitsForV1: any[] = [];
    let plans: string[] = [];
    benefits.map((benefit, index) => {
      if (benefit.Benefit == BenefitTypes.type) return;
      if (index == 0) {
        for (let key in benefit) {
          if (key == "Benefit" || key == "User Type") continue;
          benefitsForV1.push({ plan: key, benefits: {} });
          plans.push(key);
        }
      }

      if (!benefit.Benefit) console.log(benefit);
      for (let key in benefit) {
        if (key == "Benefit" || key == "User Type" || key == "dependsOn")
          continue;
        benefitsForV1[plans.indexOf(key)].benefits[benefit.Benefit.trim()] =
          benefit[key];
      }
    });

    return benefitsForV1;
  }

  createV2IndexJS(provider: string, rateTable: boolean) {
    let str = `const Provider = require('./provider/index');
        const Plans = require('./plans/index');
        const PricingTables = require('./PricingTable/index');
        const Coverages = require('./coverage/index');
        const Modifiers = require('./modifiers/index');
        ${rateTable ? `const RateTable = require("./RateTable");` : ""}
        let data = [
          // Provider data
          {
            model: "Provider",
            modelPath: "models/provider-model.js",
            documents: Provider,
          },

          // Plans
          {
            model: "Plan",
            modelPath: "models/plan-model.js",
            documents: Plans,
          },

          // Pricing Tables
          {
            model: "PricingTable",
            modelPath: "models/pricing-table-model.js",
            documents: PricingTables,
          },

          // Coverage information
          {
            model: "Coverage",
            modelPath: "models/coverage-model.js",
            documents: Coverages,
          },

          {
            // Plan modifiers
            model: "Modifier",
            modelPath: "models/modifier-model.js",
            documents: Modifiers,
          },
          ${
            rateTable
              ? ` {
            // Plan modifiers
            model: "RateTable",
            modelPath: "models/rate-table-model.js",
            documents: RateTable,
          },`
              : ""
          }
        ];

        module.exports = data`;
    fs.appendFileSync(`Outputs/${provider}/V2/index.js`, str);
  }
  createV2CoreIndexJS(provider: string, data: any) {
    data = JSON.stringify(data);
    data = data.replace(/"-/g, "");
    data = data.replace(/-"/g, "");
    let str = `
    const Utils = require("../../services/utils/utils");
    const utils = new Utils({ config: { logging: false } });
    const { generateMongoIdFromString } = utils;
    module.exports = ${data};`;
    fs.appendFileSync(`Outputs/${provider}/V2/core-index.js`, str);
  }
})();
