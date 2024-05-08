import { coreBenefitsTypes, variable } from "../../constants";
import { Utils } from "../../helper/Utils";
import { Modifiers, PlansInfo, RawBenefits } from "../../helper/interfaces";

export const createBenefitModifiers = (
  data: RawBenefits[],
  planData: PlansInfo
): Modifiers[] => {
  let benefits: Modifiers[] = [];
  planData.benefits.map((benefit) => {
    let obj: Modifiers = {
      _id: `${Utils.remove(planData.provider)}.modifiers.benefits.${Utils.remove(benefit)}`,
      plans: [],
      title: benefit,
      label: benefit,
      type: "-core.modifierTypes.benefit-",
      assignmentType: "PER_PLAN",
      includedBenefits: [coreBenefitsTypes[benefit]],
      isOptional: false,
      description: "",
      addonCost: {},
      premiumMod: [],
      conditions: [],
      hasOptions: false,
      options: [],
    };

    let benefitObj = buildBenefitOptions(
      data.find((v) => v.Benefit == benefit),
      data
    );
    benefitObj.plans.map((plan) =>
      obj.plans.push(
        `-${Utils.remove(planData.provider)}.plans.${Utils.remove(plan)}-`
      )
    );
    if (benefitObj.options.length > 1) {
      obj.hasOptions = true;
      obj.options = benefitObj.options.map((option, i) => {
        return {
          id: `option-${i + 1}`,
          label: option.value,
          description: option.value,
          conditions: [
            {
              type: "-Enum.conditions.plans-",
              value: option.plans.map(
                (v) =>
                  `-${Utils.remove(planData.provider)}.plans.${Utils.remove(v)}-`
              ),
            },
          ],
        };
      });
    } else obj.description = benefitObj.options[0].value;

    benefits.push(obj);
  });
  return benefits;
};

const buildBenefitOptions = (
  data: RawBenefits | undefined,
  benefits: RawBenefits[]
) => {
  let res: {
    options: { value: string; plans: string[] }[];
    plans: string[];
  } = { options: [], plans: [] };

  for (let key in data) {
    if (
      !Utils.ShouldNotInclude(key, variable.UserType, variable.Benefit) &&
      !Utils.ShouldNotInclude(
        data[key].toLowerCase(),
        "n/a",
        "not available",
        ""
      )
    )
      continue;
    let index = res.options.findIndex((v) => v.value == data[key]);
    res.plans.push(key);
    if (index != -1) {
      res.options[index].plans.push(key);
    } else {
      if (data[key].includes("$")) {
        let str = data[key];
        let Copays = benefits.find((b) => b.Benefit == variable.Copays);
        Copays &&
          Copays[key]
            .toString()
            .split("/")
            .map((copay, i) => {
              let $ = benefits
                .find((b) => b.Benefit == "$")
                ?.Benefit.split("-")
                [i].split("/");

              $?.forEach((v) => {
                str = str.replace("$", v);
              });
              res.options.push({ value: str, plans: [key] });
            });
      } else if (data[key].includes("$")) {
        let str = data[key];
        let $copay = benefits.find((b) => b.Benefit == variable.$_Copay);
        let Copays = benefits.find((b) => b.Benefit == variable.Copays);
        Copays &&
          Copays[key]
            .toString()
            .split("/")
            .map((copay, i) => {
              if ($copay) {
              }
            });
      } else res.options.push({ value: data[key], plans: [key] });
    }
  }
  return res;
};
