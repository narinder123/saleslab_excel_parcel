import {
  EnumConditions,
  coreBenefitsTypes,
  dependentTypeArr,
  variable,
} from "../../constants";
import { Utils } from "../../helper/Utils";
import { Modifiers, PlansInfo, RawBenefits } from "../../helper/interfaces";

export const createBenefitModifiers = (
  data: RawBenefits[],
  planData: PlansInfo
): Modifiers[] => {
  let benefits: Modifiers[] = [];
  planData.benefits.map((benefit: string) => {
    let obj: Modifiers = {
      _id: `-${Utils.remove(planData.provider)}.modifiers.benefits.${Utils.remove(benefit)}-`,
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

    let benefitMod = data.find((v) => v.Benefit == benefit);
    let benefitObj = buildBenefitOptions(benefitMod, data);
    benefitObj.plans.map((plan) =>
      obj.plans.push(
        `-${Utils.remove(planData.provider)}.plans.${Utils.remove(plan)}-`
      )
    );
    if (benefitObj.options.length > 1) {
      obj.hasOptions = true;
      obj.options = benefitObj.options.map((option, i) => {
        let opt = {
          id: `option-${i + 1}`,
          label: option.value,
          description: option.value,
          conditions: [
            {
              type: EnumConditions.plan,
              value: option.plans.map(
                (v) =>
                  `-${Utils.remove(planData.provider)}.plans.${Utils.remove(v)}-`
              ),
            },
          ],
        };
        if (option.copay) {
          opt.conditions.push({
            type: EnumConditions.deductible,
            value: [option.copay],
          });
        }
        return opt;
      });
    } else {
      !benefitObj.options[0] && console.log("obj", benefitObj.options, benefit);
      obj.description = benefitObj.options[0].value;
    }

    //  Adding dependsOn or dependentModifiers is exists
    const dependentType = benefitMod
      ? Object.keys(benefitMod).find(
          (b: string) => !Utils.ShouldNotInclude(b, ...dependentTypeArr)
        )
      : false;
    if (benefitMod && dependentType) {
      obj[dependentType] = benefitMod[dependentType].includes("/")
        ? benefitMod[dependentType]
            .split("/")
            .map(
              (b) =>
                `-${Utils.remove(planData.provider)}.modifiers.benefits.${Utils.remove(b)}-`
            )
        : `-${Utils.remove(planData.provider)}.modifiers.benefits.${Utils.remove(benefitMod[dependentType])}-`;
    }

    benefits.push(obj);
  });
  return benefits;
};

const buildBenefitOptions = (
  data: RawBenefits | undefined,
  benefits: RawBenefits[]
) => {
  let res: {
    options: { value: string; plans: string[]; copay?: string }[];
    plans: string[];
  } = { options: [], plans: [] };

  for (let plan in data) {
    if (
      !Utils.ShouldNotInclude(plan, variable.UserType, variable.Benefit) ||
      !Utils.ShouldNotInclude(
        data[plan].toLowerCase(),
        "n/a",
        "not available",
        ""
      )
    )
      continue;
    let index = res.options.findIndex((v) => v.value == data[plan]);
    res.plans.push(plan);
    if (index != -1) {
      res.options[index].plans.push(plan);
    } else {
      if (data[plan].includes("$")) {
        let Copays = benefits.find((b) => b.Benefit == variable.Copays);
        let $: any = benefits.find((b) => b.Benefit == "$");
        if (!$)
          throw new Error(
            "$ values not found, please fill it in the benefit sheet"
          );
        $ = $[plan];
        Copays &&
          Copays[plan]
            .toString()
            .split("/")
            .map((copay, i) => {
              let str = data[plan].trim();
              $.split("-")
                [i].split("/")
                .forEach((v: string) => {
                  str = str.replace("$", v);
                });
              res.options.push({ value: str, plans: [plan], copay });
            });
      } else if (data[plan].includes("$copay")) {
        let $copay = benefits.find((b) => b.Benefit == variable.$_Copay);
        if (!$copay)
          throw new Error(
            "$copay values not found, please fill it in the benefit sheet"
          );
        let Copays = benefits.find((b) => b.Benefit == variable.Copays);
        Copays &&
          Copays[plan]
            .toString()
            .split("/")
            .map((copay, i) => {
              if (!$copay) return;

              // this conditions means that we will be using copays as values
              if ($copay[plan] == "-Copays-")
                res.options.push({ value: copay, plans: [plan] });
              else {
                let value = $copay[plan].split("-")[i];
                res.options.push({
                  value: value,
                  plans: [plan],
                  copay,
                });
              }
            });
      } else res.options.push({ value: data[plan], plans: [plan] });
    }
  }
  return res;
};
