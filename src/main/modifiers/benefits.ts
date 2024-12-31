import {
  EnumConditions,
  coreBenefitsTypes,
  dependentTypeArr,
  variable,
} from "../../constants";
import { Utils } from "../../helper/Utils";
import {
  InsurerInfo,
  Modifiers,
  Option,
  PlansInfo,
  RawBenefits,
} from "../../helper/interfaces";

export const createBenefitModifiers = (
  data: RawBenefits[],
  planData: PlansInfo,
  index: number | string,
  InsurerInfo: InsurerInfo
): Modifiers[] => {
  let benefits: Modifiers[] = [];

  planData.benefits.map((benefit: string) => {
    if (!coreBenefitsTypes[benefit])
      throw new Error(
        `${benefit} - coreBenefitsTypes not found index:${index}`
      );
    let obj: Modifiers = {
      _id: `-${Utils.remove(planData.provider)}.modifiers${index}.benefits.${Utils.remove(benefit)}-`,
      plans: [],
      title: benefit,
      label: benefit,
      type: `-core.modifierTypes.${benefit == "Annual Limit" ? "annualLimit" : "benefit"}-`,
      assignmentType: "PER_PLAN",
      includedBenefits:
        benefit == "Annual Limit" ? [] : [coreBenefitsTypes[benefit]],
      isOptional: false,
      description: "",
      addonCost: {},
      premiumMod: [],
      conditions: [],
      hasOptions: false,
      options: [],
    };
    if (InsurerInfo.showAddons?.includes(benefit)) obj.showAddon = false;

    let benefitMod = data.find((v) => v.Benefit == benefit);
    let benefitObj = buildBenefitOptions(benefitMod, data);
    benefitObj.plans.map(
      (plan) =>
        planData.plans.includes(plan) &&
        obj.plans.push(
          `-${Utils.remove(planData.provider)}.plans${index}.${Utils.remove(plan)}-`
        )
    );
    if (benefitObj.options.length > 1) {
      obj.hasOptions = true;
      obj.options = benefitObj.options.map((option, i) => {
        let opt: Option = {
          id: `option-${i + 1}`,
          label: option.value,
          description: option.value,
          conditions: [],
        };
        if (option.plans.length > 0) {
          opt.conditions?.push({
            type: EnumConditions.plan,
            value: option.plans.map(
              (v) =>
                `-${Utils.remove(planData.provider)}.plans${index}.${Utils.remove(v)}-`
            ),
          });
        }
        if (option.copay) {
          opt.conditions?.push({
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

    //  Adding dependsOn or dependentModifiers if exists
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
                `-${Utils.remove(planData.provider)}.modifiers${index}.benefits.${Utils.remove(b)}-`
            )
        : `-${Utils.remove(planData.provider)}.modifiers${index}.benefits.${Utils.remove(benefitMod[dependentType])}-`;
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
      continue;
    }
    if (data[plan].includes(" $ ")) {
      let Copays = benefits.find((b) => b.Benefit == variable.Copays);
      let $: any = benefits.find((b) => b.Benefit == "$");
      if (!$)
        throw new Error(
          "$ column not found, please fill it in the benefit sheet"
        );
      $ = $[plan];
      Copays &&
        Copays[plan]
          .toString()
          .split("/")
          .map((copay, i) => {
            console.log("$ ", $)
            let str = data[plan].trim();
            let $_copay = $.split("-")[i];
            $_copay = $_copay.includes("/") ? $_copay.split("/") : [$_copay];
            $_copay.forEach((v: string) => {
              str = str.replace("$", v);
            });
            if (str.includes(" $ "))
              throw `$ found in ${str} | copay:${copay} | $:${$}`;
            res.options.push({ value: str, plans: [plan], copay });
          });
    } else if (data[plan].includes("$-")) {
      const type = data[plan]
        .split(" ")
        .find((str) => str.includes("$-"))
        ?.replace("$-", "");
      let Copays = benefits.find((b) => b.Benefit == variable.Copays);
      let $: any = benefits.find((b) => b.Benefit == `$-${type}`);
      if (!$)
        throw new Error(
          "$ column not found, please fill it in the benefit sheet"
        );
      $ = $[plan];
      Copays &&
        Copays[plan]
          .toString()
          .split("/")
          .map((copay, i) => {
            if (!copay.includes(`${type}-`)) return;
            copay = copay.replace(`${type}-`, "");
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
            if ($copay[plan] == "-Copays-") {
              res.options.push({ value: copay, plans: [], copay });
            } else {
              let value = $copay[plan].split("-")[i];
              res.options.push({
                value: value,
                plans: [],
                copay,
              });
            }
          });
      break;
    } else res.options.push({ value: data[plan], plans: [plan] });
  }
  if (res.options.length == 0) console.log(`benefit options empty`, data);
  return res;
};
