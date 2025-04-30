import { BenefitSheet, InsurerInfo, KeyStringType } from "./interfaces";
export const extractMultiCurrency = (
  sheets: BenefitSheet[],
  InfoData: InsurerInfo
) => {
  const conversions: KeyStringType[] = [];
  const converted: string[] = [];

  const PrimaryCurrencyIndex = sheets.findIndex(
    (sheet) => sheet.name === InfoData.currency
  );
  if (PrimaryCurrencyIndex === -1)
    throw `Primary currency sheet ${InfoData.currency} not found`;
  sheets[PrimaryCurrencyIndex]?.benefits.map((benefit, benefitIndex) => {
    const fromCurrency = `${InfoData.currency} `;
    for (let key in benefit) {
      if (!benefit[key].toString().includes(fromCurrency)) continue;
      const values = sheets
        .map((sheet) => sheet.benefits.find((_, j) => j == benefitIndex)?.[key])
        .filter(Boolean)
        .map((value, i) =>
          collectCurrencyValues(
            value?.replace(/\n/g, " ") || "",
            sheets[i].name
          )
        );

      if (values.length !== sheets.length)
        throw `incorrect ${key} length not matchings`;

      let obj: KeyStringType = {};
      values[0].map((v, index) => {
        if (converted.includes(v)) return;
        converted.push(v);
        sheets.map(({ name }, sheet_index) => {
          obj[name] = values[sheet_index][index];
        });
      });
      if (obj[InfoData.currency]) conversions.push(obj);
    }
  });
  if (conversions.length == 0)
    throw `No multi currency data found in ${InfoData.currency} sheet`;

  return conversions.sort((a, b) => {
    const aValue = Object.values(a)[0].toString().replace(/,/g, "");
    const bValue = Object.values(b)[0].toString().replace(/,/g, "");
    return Number(bValue) - Number(aValue);
  });
};

const collectCurrencyValues = (value: string, currency: string): string[] => {
  let arr = value.split(" ");
  return arr.filter((str, index) => arr[index - 1] === currency);
};
