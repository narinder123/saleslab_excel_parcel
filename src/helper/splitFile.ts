import fs from "fs";

export const SplitFile = (
  data: any,
  outputDir: string,
  fileName: string
): string => {
  if (!fs.existsSync(`${outputDir}`)) fs.mkdirSync(`${outputDir}`);
  if (!fs.existsSync(`${outputDir}/${fileName.split("_")[0]}`))
    fs.mkdirSync(`${outputDir}/${fileName.split("_")[0]}`);
  data = JSON.stringify(data)
    data = data.replace(/"-/g, "");
    data = data.replace(/-"/g, "");
    data = data.replace(/\n/g, "");
  let output = `
    const Enum = require("../../../enum.js");
    let table = ${data};
    module.exports = table;
    `;


  fs.appendFileSync(`${outputDir}/${fileName.split("_")[0]}/${fileName}.js`, output);
  return `-[...${fileName}]-`;
};
