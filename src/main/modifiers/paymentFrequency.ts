import { EnumConditions, paymentFrequencies, variable } from "../../constants";
import { Utils } from "../../helper/Utils";
import {
  InsurerInfo,
  Modifiers,
  Option,
  PlansInfo,
  RawBenefits,
  RawRates,
} from "../../helper/interfaces";

export const createPaymentFrequencyModifier = (
  InsurerInfo: InsurerInfo,
  premiums: RawRates[],
  benefits: RawBenefits[],
  data: PlansInfo,
  index: number
) => {
  let modifier: Modifiers = {
    _id: `-${InsurerInfo.provider}.modifiers${index}.paymentFrequency-`,
    plans: [],
    title: "Payment Frequency Modifier",
    label: "Additional Surcharges",
    type: `-core.modifierTypes.paymentFrequency-`,
    assignmentType: "PER_CUSTOMER",
    includedBenefits: [],
    isOptional: false,
    description: "",
    addonCost: {},
    premiumMod: "",
    conditions: [],
    hasOptions: true,
    options: [
      {
        id: "annual-payment-surcharge",
        label: "Annual",
        premiumMod: {
          type: "percentage",
          price: [
            {
              value: 0,
              currency: "USD",
            },
          ],
        },
      },
    ],
  };
  if (InsurerInfo.frequencyFrom == variable.frequencyFrom[0]) {
    InsurerInfo.frequencies?.forEach((frequency) => {
      if (!paymentFrequencies[frequency])
        throw new Error(
          `${frequency} did not matched, please use any of these: ${Object.keys(paymentFrequencies).join(", ")}`
        );
      let frequencyMod = { ...paymentFrequencies[frequency] };
      data.distinctInfo.forEach((info) => {
        info.network.forEach((network) => {
          info.coverage.forEach((coverage) => {
            info.copay.forEach((copay) => {
              let option: Option = {
                id: `${frequencyMod.modOption.id}-${modifier.options.length}`,
                label: frequencyMod.label,
                premiumMod: {
                  type: "conditional-override",
                  conditionalPrices: [],
                },
                conditions: [
                  {
                    type: EnumConditions.plan,
                    value: [
                      `-${Utils.remove(data.provider)}.plans.${Utils.remove(info.plan)}-`,
                    ],
                  },
                  {
                    type: EnumConditions.network,
                    value: [network],
                  },
                  {
                    type: EnumConditions.coverage,
                    value: [
                      `-${Utils.remove(data.provider)}.coverages.${Utils.remove(coverage)}-`,
                    ],
                  },
                  {
                    type: EnumConditions.deductible,
                    value: [copay],
                  },
                ],
              };

              // if is applied here because typescript was giving error
              if (option.premiumMod) {
                let rateBase = premiums
                  .filter(
                    (premium) =>
                      premium.planName == info.plan &&
                      premium.network == network &&
                      premium.coverage == coverage &&
                      premium.copay == copay
                  )
                  .map((premium) => {
                    let rate = {
                      price: [
                        {
                          currency: `-Enum.currency.${InsurerInfo.currency}-`,
                          value: premium.rates / InsurerInfo.conversion,
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
                        {
                          type: EnumConditions.gender,
                          value: `-Enum.gender.${premium.gender}-`,
                        },
                      ],
                    };

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
                    return rate;
                  });
                option.premiumMod.conditionalPrices = rateBase;
              }
              modifier.options.push(option);
            });
          });
        });
      });
    });
  } else {
    Object.values(paymentFrequencies).forEach((frequency) => {
      let mod = benefits.find((b) => b.Benefit == frequency.label);
      if (!mod || !mod[data.plans[0]] || mod[data.plans[0]] == "N/A") return;

      frequency.modOption.premiumMod.price = [
        {
          value: +parseInt(mod[data.plans[0]]),
          currency: InsurerInfo.currency,
        },
      ];
      modifier.options.push({ ...frequency.modOption });
    });
  }

  return [modifier];
};
