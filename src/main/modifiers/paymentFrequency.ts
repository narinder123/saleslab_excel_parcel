import {
  customConditions,
  customResidencies,
  EnumConditions,
  paymentFrequencies,
  variable,
} from "../../constants";
import { Utils } from "../../helper/Utils";
import {
  InsurerInfo,
  Modifiers,
  ModifiersType,
  Option,
  PlansInfo,
  PremiumModType,
  rateTable,
  RateTableCustomerPrice,
  RawBenefits,
  RawRates,
} from "../../helper/interfaces";

export const createPaymentFrequencyModifier = (
  InsurerInfo: InsurerInfo,
  premiums: RawRates[],
  benefits: RawBenefits[],
  data: PlansInfo,
  index: number | string
) => {
  const multiCurrency = InsurerInfo.multiCurrency?.includes("rates");
  const rateTableData: rateTable[] = [];
  const rateTableStatus =
    InsurerInfo.rateTable &&
    InsurerInfo.rateTable?.length > 0 &&
    InsurerInfo.rateTable.includes("paymentFrequency");
  let modifier: Modifiers = {
    _id: `-${InsurerInfo.provider}.modifiers${index}.paymentFrequency-`,
    plans: data.plans.map(
      (plan) =>
        `-${Utils.remove(data.provider)}.plans${index}.${Utils.remove(plan)}-`
    ),
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
          type: PremiumModType.Percentage,
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
  if (InsurerInfo.frequencyFrom == variable.frequencyFrom.rates) {
    InsurerInfo.frequencies?.forEach((frequency) => {
      if (frequency == "Annually") return;
      if (!paymentFrequencies[frequency])
        throw new Error(
          `${frequency} did not matched, please use any of these: ${Object.keys(paymentFrequencies).join(", ")}`
        );
      let count = 1;
      let frequencyMod = { ...paymentFrequencies[frequency] };
      let multiplier =
        frequency == "semiAnnual" ? 2 : frequency == "quarter" ? 4 : 12;
      InsurerInfo.copayTypes.map((type) => {
        let typeNone = type == variable.none;
        data.distinctInfo.forEach((info) => {
          info.network.forEach((network) => {
            info.coverage.forEach((coverage) => {
              let copayList = info.copay;
              if (!typeNone)
                copayList = copayList.filter((copay) =>
                  copay.includes(`${type}-`)
                );
              copayList.forEach((copay) => {
                if (!typeNone) copay = copay.replace(`${type}-`, "");
                let customCheck = !!premiums[0].custom;
                let customConditionsArr: string[] = premiums.reduce(
                  (acc: string[], v) => {
                    let custom = v.custom ? v.custom : "";
                    return acc.includes(custom) ? acc : [...acc, custom];
                  },
                  []
                );
                let option: Option = {
                  id: `${frequencyMod.modOption.id}-${count}`,
                  label: frequencyMod.label,
                  premiumMod: {
                    type: PremiumModType.ConditionalOverride,
                    conditionalPrices: [],
                  },
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
                    {
                      type: EnumConditions.deductible,
                      value: [copay],
                    },
                  ],
                };
                const tempOptions: any[] = [];
                let filteredPremiums = premiums.filter(
                  (premium) =>
                    premium.planName == info.plan &&
                    premium.network == network &&
                    premium.coverage == coverage &&
                    premium.copay == copay &&
                    premium.frequency == frequency &&
                    (typeNone || premium.copayType == type) &&
                    (!customCheck ||
                      premium.custom == customConditionsArr[0]) &&
                    (!premium.residency ||
                      (premium.residency &&
                        (premium.residency.length == 2 ||
                          customResidencies[premium.residency])))
                );
                if (filteredPremiums.length == 0)
                  throw `no record found for - {planName: "${info.plan}", network: "${network}" , coverage: "${coverage}" , copay: "${copay}", frequency: "${frequency}"}`;
                else {
                  if (customCheck) {
                    if (!customConditions[customConditionsArr[0]])
                      throw new Error(
                        `${customConditionsArr[0]} condition doesn't exist in customConditions array`
                      );
                    option.conditions?.push(
                      ...customConditions[customConditionsArr[0]]
                    );
                  }
                  // "if" is applied here because typescript was giving error
                  if (option.premiumMod && !rateTableStatus) {
                    let rateBase = filteredPremiums.map((premium) => {
                      let rate: {
                        price: { currency: string; value: number }[];
                        conditions: {
                          type: string;
                          value: string | number | string[];
                        }[];
                      } = {
                        price: [
                          {
                            currency: `-Enum.currency.${multiCurrency ? premium.currency : InsurerInfo.currency}-`,
                            value:
                              (multiCurrency
                                ? premium.rates
                                : premium.rates / InsurerInfo.conversion) *
                              multiplier,
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
                      if (premium.residency)
                        rate.conditions.push({
                          type: EnumConditions.residency,
                          value:
                            premium.residency.length > 2
                              ? customResidencies[premium.residency]
                              : [premium.residency],
                        });
                      if (premium.custom) {
                        if (!customConditions[premium.custom])
                          throw new Error(
                            `${premium.custom} condition doesn't exist in customConditions array`
                          );
                        rate.conditions.push(
                          ...customConditions[premium.custom]
                        );
                      }
                      return rate;
                    });
                    option.premiumMod.conditionalPrices = rateBase;
                  } else {
                    delete option.premiumMod;
                    rateTableData.push({
                      plans: [
                        `-${Utils.remove(data.provider)}.plans${index}.${Utils.remove(info.plan)}-`,
                      ],
                      modType: PremiumModType.ConditionalOverride,
                      type: ModifiersType.PAYMENT_FREQ,
                      value: modifier._id,
                      values: [option.id],
                      rates: filteredPremiums.map(
                        (premium): RateTableCustomerPrice => {
                          let value: RateTableCustomerPrice = {
                            type: PremiumModType.ConditionalOverride,
                            customer: {
                              from: premium.ageStart,
                              to: premium.ageEnd,
                              gender: premium.gender,
                            },
                            price: {
                              currency: `-Enum.currency.${multiCurrency ? premium.currency : InsurerInfo.currency}-`,
                              price:
                                (Number(premium.rates) /
                                  InsurerInfo.conversion) *
                                multiplier,
                            },
                          };
                          if (premium.gender)
                            value.customer.gender = premium.gender;
                          if (premium.residency)
                            value.customer.residency =
                              premium.residency.length > 2
                                ? customResidencies[premium.residency]
                                : [premium.residency];
                          return value;
                        }
                      ),
                    });
                  }
                  modifier.options.push(option);
                  count++;
                }

                if (customConditionsArr.length > 0) {
                  customConditionsArr.map((condition, i) => {
                    if (i == 0) return;
                    let tempOption: Option = {
                      id: `${frequencyMod.modOption.id}-${count}`,
                      label: frequencyMod.label,
                      premiumMod: {
                        type: PremiumModType.ConditionalOverride,
                        conditionalPrices: [],
                      },
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
                        {
                          type: EnumConditions.deductible,
                          value: [copay],
                        },
                      ],
                    };
                    let filteredPremiums = premiums.filter(
                      (premium) =>
                        premium.planName == info.plan &&
                        premium.network == network &&
                        premium.coverage == coverage &&
                        premium.copay == copay &&
                        premium.frequency == frequency &&
                        premium.custom == condition
                    );
                    if (filteredPremiums.length == 0 && !customCheck)
                      throw `no record found for - {planName: "${info.plan}", network: "${network}" , coverage: "${coverage}" , copay: "${copay}", frequency: "${frequency}"}`;
                    if (customCheck) {
                      if (!customConditions[condition])
                        throw new Error(
                          `${condition} condition doesn't exist in customConditions array`
                        );
                      tempOption.conditions?.push(
                        ...customConditions[condition]
                      );
                    }
                    // "if" is applied here because typescript was giving error
                    if (tempOption.premiumMod && !rateTableStatus) {
                      let rateBase = filteredPremiums.map((premium) => {
                        let rate: {
                          price: { currency: string; value: number }[];
                          conditions: {
                            type: string;
                            value: string | number;
                          }[];
                        } = {
                          price: [
                            {
                              currency: `-Enum.currency.${multiCurrency ? premium.currency : InsurerInfo.currency}-`,
                              value:
                                (multiCurrency
                                  ? premium.rates
                                  : premium.rates / InsurerInfo.conversion) *
                                multiplier,
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
                          rate.conditions.push(
                            ...customConditions[premium.custom]
                          );
                        }
                        return rate;
                      });
                      tempOption.premiumMod.conditionalPrices = rateBase;
                    } else {
                      delete tempOption.premiumMod;
                      rateTableData.push({
                        plans: [
                          `-${Utils.remove(data.provider)}.plans${index}.${Utils.remove(info.plan)}-`,
                        ],
                        modType: PremiumModType.ConditionalOverride,
                        type: ModifiersType.PAYMENT_FREQ,
                        value: modifier._id,
                        values: [tempOption.id],
                        rates: filteredPremiums.map(
                          (premium): RateTableCustomerPrice => {
                            let value: RateTableCustomerPrice = {
                              type: PremiumModType.ConditionalOverride,
                              customer: {
                                from: premium.ageStart,
                                to: premium.ageEnd,
                                gender: premium.gender,
                              },
                              price: {
                                currency: `-Enum.currency.${multiCurrency ? premium.currency : InsurerInfo.currency}-`,
                                price:
                                  (Number(premium.rates) /
                                    InsurerInfo.conversion) *
                                  multiplier,
                              },
                            };
                            if (premium.gender)
                              value.customer.gender = premium.gender;
                            return value;
                          }
                        ),
                      });
                    }
                    count++;

                    tempOptions.push(tempOption);
                  });
                  if (tempOptions.length > 0)
                    modifier.options.push(...tempOptions);
                }
              });
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
  if (rateTableData.length > 0) modifier.hasRateTable = true;

  return { modifier, rateTableData };
};
