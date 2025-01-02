import { variable } from "../constants";
import { Utils } from "../helper/Utils";
import { Helpers } from "../helper/functions";
import {
  BasePremium,
  InsurerInfo,
  PlansInfo,
  PriceObj,
  PricingTable,
  RawRates,
} from "../helper/interfaces";
import { SplitFile } from "../helper/splitFile";

export const createPricingTableData = (
  PlansInfo: PlansInfo,
  data: any[],
  info: InsurerInfo,
  rates: RawRates[],
  index: number | string,
  res_index: number
): { data: PricingTable[]; splitFile: string[] } => {
  if (rates.length == 0)
    throw new Error(`rates not found for V2 index:${index}`);
  let res: PricingTable[] = [];
  let splitArr: string[] = [];
  PlansInfo.distinctInfo.map((planData) => {
    planData.coverage.map((coverage) => {
      const planCopay = info.copayTypes?.length
        ? info.copayTypes.map((type) =>
            planData.copay[0].replace(`${type}-`, "")
          )[0]
        : planData.copay[0];
      let rateBase = buildBasePremium(
        rates,
        planData.plan,
        coverage,
        planData.network.length,
        planCopay,
        info,
        index
      );

      let baseAnnualPremium = /* 
        info.splitFile == "true"
          ? SplitFile(
              rateBase,
              `Outputs/${Utils.remove(info.provider)}/PricingTable`,
              Utils.remove(`${planData.plan}_${coverage}`)
            )
          :  */ rateBase;
      if (info.splitFile == "true")
        splitArr.push(Utils.remove(`${planData.plan}_${coverage}`));
      let table: PricingTable = {
        _id: `-${Utils.remove(PlansInfo.provider)}.pricingTables${index}.${Utils.remove(planData.plan)}.${Utils.remove(coverage)}-`,
        plan: `-${Utils.remove(PlansInfo.provider)}.plans${index}.${Utils.remove(planData.plan)}-`,
        annualLimit: getAnnualLimit(
          data.find((v) => v.Benefit == variable.AnnualLimit)[planData.plan]
        ),
        startDate: new Date(info.startDate),
        endDate: info.endDate ? new Date(info.endDate) : "",
        includedResidence: Helpers.getResidencyArr(
          info.residencies[res_index]
        )[0],
        excludedResidence: Helpers.getResidencyArr(
          info.residencies[res_index]
        )[1],
        coverage: [
          `-${Utils.remove(PlansInfo.provider)}.coverages${index}.${Utils.remove(coverage)}-`,
        ],
        baseAnnualPremium,
      };
      res.push(table);
    });
  });

  return { data: res, splitFile: splitArr };
};

const getAnnualLimit = (limit: string): PriceObj[] => {
  if (limit.toLowerCase() == "unlimited") return [];
  let value = Number(limit.split(" ")[1].split(",").join(""));
  let currency = limit.split(" ")[0];
  return [{ currency, value }];
};

const buildBasePremium = (
  data: RawRates[],
  plan: string,
  coverage: string,
  networks: number,
  copay: string,
  info: InsurerInfo,
  index: number | string
): BasePremium[] => {
  const multiCurrency = info.multiCurrency?.includes("rates");
  let rates = data.filter((rate) => {
    return (
      rate.planName == plan &&
      rate.copay == copay &&
      rate.coverage == coverage &&
      rate.frequency == "Annually"
    );
  });
  if (rates.length == 0) {
    // console.log(
    //   `${
    //     data.filter((rate) => {
    //       return rate.planName == plan;
    //     }).length
    //   } - ${
    //     data.filter((rate) => {
    //       return rate.copay == copay;
    //     }).length
    //   } - ${
    //     data.filter((rate) => {
    //       return rate.coverage == coverage;
    //     }).length
    //   }`
    // );
    let copays = data.reduce((acc: any[], rate: RawRates) => {
      if (!acc.includes(rate.copay)) return [...acc, rate.copay];
      return acc;
    }, []);
    console.log(
      copay.split("").map((v) => v.charCodeAt(0)),
      copays[0].split("").map((v:string) => v.charCodeAt(0))
    );
    throw Error(
      `No premium found for "${plan}" - "${coverage}" - "${copay}" - index:${index} , data.length:${data.length}`
    );
  }
  if (networks > 1) {
    let { min, max } = rates.reduce(
      (acc, v) => {
        if (acc.min > v.ageStart) acc.min = v.ageStart;
        if (acc.max < v.ageEnd) acc.max = v.ageEnd;
        return acc;
      },
      { min: 0, max: 0 }
    );
    return [
      {
        fromAge: min,
        toAge: max,
        gender: `-Enum.gender.male-`,
        price: [{ value: 0, currency: `-Enum.currency.USD-` }],
      },
      {
        fromAge: min,
        toAge: max,
        gender: `-Enum.gender.female-`,
        price: [{ value: 0, currency: `-Enum.currency.USD-` }],
      },
    ];
  }

  return rates.map((rate) => {
    let res: BasePremium = {
      fromAge: rate.ageStart,
      toAge: rate.ageEnd,
      price: [
        {
          value: multiCurrency ? rate.rates / info.conversion : rate.rates,
          currency: `-Enum.currency.${multiCurrency ? rate.currency : info.currency}-`,
        },
      ],
    };
    if (rate.gender) {
      res.gender = `-Enum.gender.${rate.gender}-`;
    }
    if (rate.married === "true") {
      res.maritalStatus = "-Enum.maritalStatus.married-";
    }
    if (rate.married === "false") {
      res.maritalStatus = "-Enum.maritalStatus.single-";
    }
    if (rate.category) res.category = `-Enum.category.${rate.category}-`;
    if (rate.relation) res.relation = `-Enum.relation.${rate.relation}-`;
    return res;
  });
};
