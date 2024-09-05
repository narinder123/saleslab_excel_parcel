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
  Info: InsurerInfo,
  MultiCurrenyBenefits: any[]
): Modifiers[] => {
  let benefits: Modifiers[] = [];

  // console.log("data ", data.length);
  
  // console.log("MultiCurrenyBenefits ", MultiCurrenyBenefits[0].length);

  planData.benefits.map((benefit: string, i) => {
    // console.log("benefit", benefit);
    if (!coreBenefitsTypes[benefit.trim()])
      throw new Error(
        `${benefit} - coreBenefitsTypes not found index:${index}`
      );
    let obj: Modifiers = {
      _id: `-${Utils.remove(planData.provider)}.modifiers${index}.benefits.${Utils.remove(benefit)}-`,
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

    let multiCurrencyBenefitObj: any = []
    MultiCurrenyBenefits.map((benefits, i) => {
      // console.log("MultiCurrenyBenefits[i] ", MultiCurrenyBenefits[i]);
      // console.log("benefit -- ", benefits);
      
      
      let multiCurrencyBenefitMod = MultiCurrenyBenefits[i].find((v) => v.Benefit == benefit);
      
    multiCurrencyBenefitObj.push(buildBenefitOptions(
      multiCurrencyBenefitMod,
      MultiCurrenyBenefits[i]
    ))
    })

    // console.log("multiCurrencyBenefitObj >> ", multiCurrencyBenefitObj[0]);
    // console.log("benefitObj ",benefitObj);
    
    
    
    benefitObj.plans.map((plan) =>
      obj.plans.push(
        `-${Utils.remove(planData.provider)}.plans${index}.${Utils.remove(plan)}-`
      )
    );
    // console.log("benefitObj.options ", benefitObj.options);

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
      if (
        Info.multiCurrency?.some((element) =>
          benefitObj.options[0].value.includes(element)
        ) &&
        Info?.multiCurrency?.length
      ) {
        const currencies = Info?.multiCurrency;
        const multiCurrencyBenefitObjData = multiCurrencyBenefitObj
        new Array(currencies.length).fill(0).map((v, i) => {
          let t = multiCurrencyBenefitObjData[i-1];          
          let opt: Option = {
            id: `option-${i + 1}`,
            label:
              i == 0
                ? benefitObj.options[0].value
                : t?.options[0].value,
            description:
              i == 0
                ? benefitObj.options[0].value
                : t?.options[0].value,
            conditions: [
              { type: EnumConditions.currency, value: currencies[i] },
            ],
          };
          obj.options.push(opt);
        });
      } else {
        obj.description = benefitObj.options[0].value;
      }
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
  // console.log("benefits ", benefits[0]);
  
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
