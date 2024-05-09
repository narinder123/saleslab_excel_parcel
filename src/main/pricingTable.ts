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
  rates: RawRates[]
): { data: PricingTable[]; splitFile: string[] } => {
  let res: PricingTable[] = [];
  let splitArr: string[] = [];
  PlansInfo.distinctInfo.map((planData) => {
    planData.coverage.map((coverage) => {
      let rateBase = buildBasePremium(
        rates,
        planData.plan,
        coverage,
        planData.network.length,
        planData.copay[0],
        info
      );
      let baseAnnualPremium =
        info.splitFile == "true"
          ? SplitFile(
              rateBase,
              `Outputs/${Utils.remove(info.provider)}/PricingTable`,
              Utils.remove(`${planData.plan}_${coverage}`)
            )
          : rateBase;
      if (info.splitFile == "true")
        splitArr.push(Utils.remove(`${planData.plan}_${coverage}`));
      let table: PricingTable = {
        _id: `-${Utils.remove(PlansInfo.provider)}.pricingTables.${Utils.remove(planData.plan)}.${Utils.remove(coverage)}-`,
        plan: `-${Utils.remove(PlansInfo.provider)}.plans.${Utils.remove(planData.plan)}-`,
        annualLimit: getAnnualLimit(
          data.find((v) => v.Benefit == variable.AnnualLimit)[planData.plan]
        ),
        startDate: new Date(info.startDate),
        endDate: info.endDate ? new Date(info.endDate) : "",
        includedResidence: Helpers.getResidencyArr(info.residencies[0])[0],
        excludedResidence: Helpers.getResidencyArr(info.residencies[0])[1],
        coverage: [
          `-${Utils.remove(PlansInfo.provider)}.coverages.${Utils.remove(coverage)}-`,
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
  info: InsurerInfo
): BasePremium[] => {
  let rates = data.filter(
    (rate) =>
      rate.planName == plan && rate.copay == copay && rate.coverage == coverage
  );
  // if (rates.length == 0) {
  //   throw Error(`No premium found for ${plan} - ${coverage} - ${copay}`);
  // }
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
      gender: `-Enum.gender.${rate.gender}-`,
      price: [
        {
          value: rate.rates / info.conversion,
          currency: `-Enum.currency.${info.currency}-`,
        },
      ],
    };
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
