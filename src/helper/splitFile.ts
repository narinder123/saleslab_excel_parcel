import fs from "fs";

export const SplitFile = (
  data: any[],
  outputDir: string,
  fileName: string
): string => {
  let output = `
    const Enum = require("../../../enum.js");
    let table = ${JSON.stringify(data)};
    module.exports = table;
    `;
  fs.appendFileSync(`${outputDir}/${fileName}.js`, output);
  return `-[...${fileName}]-`;
};
