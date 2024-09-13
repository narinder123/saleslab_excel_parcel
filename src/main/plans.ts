import { benefitCategories } from "../constants";
import { Utils } from "../helper/Utils";
import { InsurerInfo, Plans, PlansInfo } from "../helper/interfaces";

export const createPlansData = (
  data: PlansInfo,
  index: number | string,
  insurer: InsurerInfo
): Plans[] => {
  let arr: Plans[] = [];
  data.distinctInfo.map((planData) => {
    const networks = [
      `-${Utils.remove(data.provider)}.modifiers${index}.networks${
        data.info.planNetworksAreSame ? "" : `.${Utils.remove(planData.plan)}`
      }-`,
    ];
    arr.push({
      _id: `-${Utils.remove(data.provider)}.plans${index}.${Utils.remove(planData.plan)}-`,
      provider: `-${Utils.remove(data.provider)}.provider-`,
      title: planData.plan,
      notes: "",
      benefitCategories,
      hasRateTable: !!(insurer.rateTable && insurer.rateTable?.length > 0),
      pricingTables: planData.coverage.map(
        (v) =>
          `-${Utils.remove(data.provider)}.pricingTables${index}.${Utils.remove(planData.plan)}.${Utils.remove(v)}-`
      ),
      modifiers: [
        ...planData.benefit.map(
          (b) =>
            `-${Utils.remove(data.provider)}.modifiers${index}.benefits.${Utils.remove(b)}-`
        ),
        ...networks,
        `-${Utils.remove(data.provider)}.modifiers${index}.deductible-`,
        `-${Utils.remove(data.provider)}.modifiers${index}.paymentFrequency-`,
      ],
    });
  });
  return arr;
};
