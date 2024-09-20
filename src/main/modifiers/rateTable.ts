import { InsurerInfo, rateTable } from "../../helper/interfaces";

export const createRateTableData = (
  data: rateTable[],
  InsurerInfo: InsurerInfo
): { _id: string; filters: any[]; rates: any[] }[] => {
  return data.map((v, index) => {
    let temp: { _id: string; plans: string[]; filters: any[]; rates: any[] } = {
      _id: `-generateMongoIdFromString('${InsurerInfo.provider} rateTable ${index}')-`,
      plans: v.plans,
      filters: [],
      rates: v.rates,
    };
    let item: any = { type: v.type, value: v.value };
    if (v.values) item.values = v.values;
    temp.filters = [item];
    return temp;
  });
};
