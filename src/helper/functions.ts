import { variable } from "../constants";
import { Utils } from "./Utils";
import {
  InputArgumentType,
  OutputSheetFnArguments,
  RawBenefits,
} from "./interfaces";
import fs from "fs";
import xlsx from "xlsx";

export const Helpers = new (class helperFunction {
  getInputArguments(): InputArgumentType[] {
    return process.argv
      .filter((v) => v.includes(":"))
      .map((v) => {
        let [label, value] = v.split(":");
        return { label, value };
      });
  }

  checkInputFolderExists(): boolean {
    const enteredFolderName = this.getInputArguments().find(
      (arg) => arg.label == "name"
    )?.value;
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

  convertXlsxToArr(path: string, innerFileName: any): any[] {
    const Sheet = xlsx.readFile(path);

    let data = xlsx.utils.sheet_to_json(
      Sheet.Sheets[Sheet.SheetNames[innerFileName]]
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

    if (!fs.existsSync(`Outputs/${provider}/${folder}`))
      fs.mkdirSync(`Outputs/${provider}/${folder}`);

    fs.appendFileSync(`Outputs/${provider}/${folder}/${fileName}.js`, str);
    Utils.log(`/${provider}${folder}/${fileName} Created!`);
  }

  getResidencyArr(residency: string): string[][] {
    const UAE = [
      ["AE-DU", "AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
      [],
    ];
    const NE = [
      ["AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
      ["AE-DU", "AE-AZ"],
    ];
    const Dubai = [
      ["AE-DU"],
      ["AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
    ];
    const AbuDhabi = [
      ["AE-AZ"],
      ["AE-DU", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
    ];
    const NE_Dubai = [
      ["AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ", "AE-DU"],
      ["AE-AZ"],
    ];
    if (residency == "UAE") return UAE;
    else if (residency == "NE") return NE;
    else if (residency == "NE/Dubai") return NE_Dubai;
    else if (residency == "Dubai") return Dubai;
    else return AbuDhabi;
  }

  BenefitNotIncluded(data: RawBenefits): boolean {
    let bool = true;

    for (let key in data) {
      if (!Utils.ShouldNotInclude(key, variable.UserType, variable.Benefit))
        continue;
      if (
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

  createNewProviderFolder(provider: string) {
    // Deletes Output folder for every new sheet generated
    fs.rmSync(`./Outputs/${provider}`, { recursive: true, force: true });
    fs.mkdirSync(`Outputs/${provider}`);
  }
})();
