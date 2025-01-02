import { BenefitSheet, InsurerInfo, KeyStringType } from "./interfaces";
import fs from "fs";
export const extractMultiCurrency = (
  sheets: BenefitSheet[],
  InfoData: InsurerInfo
) => {
  const conversions: KeyStringType[] = [];
  const converted: string[] = [];

  const PrimaryCurrencyIndex = sheets.findIndex(
    (sheet) => sheet.name === InfoData.currency
  );

  sheets[PrimaryCurrencyIndex]?.benefits.map((benefit, benefitIndex) => {
    const fromCurrency = `${InfoData.currency} `;
    for (let key in benefit) {
      if (!benefit[key].includes(fromCurrency)) {
        continue;
      }
      const values = sheets
        .map(
          (sheet) => sheet.benefits.find((_, j) => j == benefitIndex)?.[key]
        )
        .filter(Boolean)
        .map((value, i) => collectCurrencyValues(value?.replace(/\n/g,' ') || "", sheets[i].name));

      if (values.length !== sheets.length)
        throw `incorrect ${key} length not matchings`;

      console.log("values ", values)

      let obj: KeyStringType = {};
      values[0].map((v, index) => {
        if(converted.includes(v)) return;
        converted.push(v);
        sheets.map(({ name }, sheet_index) => {
          obj[name] = values[sheet_index][index];
        });
      });
      if(obj[InfoData.currency])conversions.push(obj);
    }
  });

  return conversions;
};

const collectCurrencyValues = (value: string, currency: string): string[] =>{
    let arr = value.split(" ")
    return arr.filter((str, index) => arr[index - 1] === currency);
}
