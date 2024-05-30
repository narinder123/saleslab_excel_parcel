import { benefitCategories } from "../constants";
import { Utils } from "../helper/Utils";
import { Plans, PlansInfo } from "../helper/interfaces";

export const createPlansData = (data: PlansInfo): Plans[] => {
  let arr: Plans[] = [];
  data.distinctInfo.map((planData) => {
    arr.push({
      _id: `-${Utils.remove(data.provider)}.plans.${Utils.remove(planData.plan)}-`,
      provider: `-${Utils.remove(data.provider)}.providers-`,
      title: planData.plan,
      notes: "",
      benefitCategories,
      pricingTables: planData.coverage.map(
        (v) =>
          `-${Utils.remove(data.provider)}.pricingTables.${Utils.remove(planData.plan)}.${Utils.remove(v)}-`
      ),
      modifiers: planData.benefit.map(
        (b) =>
          `-${Utils.remove(data.provider)}.modifiers.benefits.${Utils.remove(b)}-`
      ),
    });
  });
  return arr;
};
