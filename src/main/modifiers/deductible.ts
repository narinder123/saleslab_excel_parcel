import { EnumConditions, customConditions } from "../../constants";
import { Utils } from "../../helper/Utils";
import {
  InsurerInfo,
  Modifiers,
  Option,
  PlansInfo,
  RawRates,
} from "../../helper/interfaces";
import { SplitFile } from "../../helper/splitFile";

export const createDeductibleModifiers = (
  data: PlansInfo,
  premiums: RawRates[],
  InsurerInfo: InsurerInfo,
  index: number | string
): { data: Modifiers[]; splitFile: string[] } => {
  const multiCurrency = InsurerInfo.multiCurrency?.includes("rates");
  let deductible: Modifiers = {
    _id: `-${Utils.remove(data.provider)}.modifiers${index}.deductible-`,
    plans: data.plans.map(
      (plan) =>
        `-${Utils.remove(data.provider)}.plans${index}.${Utils.remove(plan)}-`
    ),
    title: "Deductible modifier",
    label: "Deductibles",
    type: "-core.modifierTypes.deductible-",
    assignmentType: "PER_CUSTOMER",
    includedBenefits: [],
    isOptional: false,
    description: "",
    addonCost: {},
    premiumMod: "",
    conditions: [],
    hasOptions: true,
    options: [],
  };
  let splitArr: string[] = [];

  data.distinctInfo.map((info) => {
    info.network.map((network) => {
      info.coverage.map((coverage) => {
        info.copay.map((copay) => {
          let option: Option = {
            id: `option-${deductible.options.length + 1}`,
            label: copay,
            premiumMod: { type: "conditional-override", conditionalPrices: [] },
            conditions: [
              {
                type: EnumConditions.plan,
                value: [
                  `-${Utils.remove(data.provider)}.plans${index}.${Utils.remove(info.plan)}-`,
                ],
              },
              {
                type: EnumConditions.network,
                value: [network],
              },
              {
                type: EnumConditions.coverage,
                value: [
                  `-${Utils.remove(data.provider)}.coverages${index}.${Utils.remove(coverage)}-`,
                ],
              },
            ],
          };

          // if is applied here because typescript was giving error
          if (option.premiumMod) {
            let filteredRates = premiums.filter(
              (premium) =>
                premium.planName == info.plan &&
                premium.network == network &&
                premium.coverage == coverage &&
                premium.copay == copay
            );
            if (filteredRates.length == 0)
              throw new Error(
                `No deductible rates found for index:${index} "${info.plan}" | "${network}" | "${coverage}" | "${copay}" |`
              );
            console.log("filteredRates.length 1 >>", filteredRates.length);
            if (filteredRates.length > 500) {
              filteredRates = filteredRates.slice(0, 100);
            }
            console.log("filteredRates.length 2 >>", filteredRates.length);

            if (filteredRates[0].custom) {
              if (!customConditions[filteredRates[0].custom])
                throw new Error(
                  `${filteredRates[0].custom} condition doesn't exist in customConditions array`
                );
              option.conditions?.push(
                customConditions[filteredRates[0].custom]
              );
            }
            let rateBase = filteredRates.map((premium) => {
              let rate: {
                price: { currency: string; value: number }[];
                conditions: { type: string; value: string | number }[];
              } = {
                price: [
                  {
                    currency: `-Enum.currency.${multiCurrency ? premium.currency : InsurerInfo.currency}-`,
                    value: multiCurrency
                      ? premium.rates
                      : premium.rates / InsurerInfo.conversion,
                  },
                ],
                conditions: [
                  {
                    type: EnumConditions.minAge,
                    value: premium.ageStart,
                  },
                  {
                    type: EnumConditions.maxAge,
                    value: premium.ageEnd,
                  },
                ],
              };
              if (premium.gender) {
                rate.conditions.push({
                  type: EnumConditions.gender,
                  value: `-Enum.gender.${premium.gender}-`,
                });
              }

              if (premium.married === "true") {
                rate.conditions.push({
                  type: EnumConditions.maritalStatus,
                  value: "-Enum.maritalStatus.married-",
                });
              }
              if (premium.married === "false") {
                rate.conditions.push({
                  type: EnumConditions.maritalStatus,
                  value: "-Enum.maritalStatus.single-",
                });
              }
              if (premium.category)
                rate.conditions.push({
                  type: EnumConditions.category,
                  value: `-Enum.category.${premium.category}-`,
                });
              if (premium.relation)
                rate.conditions.push({
                  type: EnumConditions.relation,
                  value: `-Enum.relation.${premium.relation}-`,
                });
              if (premium.custom) {
                if (!customConditions[premium.custom])
                  throw new Error(
                    `${premium.custom} condition doesn't exist in customConditions array`
                  );
                rate.conditions.push(customConditions[premium.custom]);
              }
              return rate;
            });

            let baseAnnualPremium =
              InsurerInfo.splitFile == "true"
                ? SplitFile(
                    rateBase,
                    `Outputs/${Utils.remove(InsurerInfo.provider)}/PricingTable`,
                    Utils.remove(`${info.plan}_${coverage}_${network}_${copay}`)
                  )
                : rateBase;
            if (InsurerInfo.splitFile == "true")
              splitArr.push(
                Utils.remove(`${info.plan}_${coverage}_${network}_${copay}`)
              );

            option.premiumMod.conditionalPrices = baseAnnualPremium;
          }
          deductible.options.push(option);
        });
      });
    });
  });

  return { data: [deductible], splitFile: splitArr };
};
