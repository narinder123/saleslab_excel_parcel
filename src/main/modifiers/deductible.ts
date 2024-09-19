import { EnumConditions, customConditions, variable } from "../../constants";
import { Utils } from "../../helper/Utils";
import {
  InsurerInfo,
  Modifiers,
  ModifiersType,
  Option,
  PlansInfo,
  PremiumModType,
  RateTableCustomerPrice,
  RawRates,
} from "../../helper/interfaces";
import { SplitFile } from "../../helper/splitFile";

export const createDeductibleModifiers = (
  data: PlansInfo,
  premiums: RawRates[],
  InsurerInfo: InsurerInfo,
  index: number | string
): { data: Modifiers[]; splitFile: string[]; rateTableData: any[] } => {
  let deductibleArr: Modifiers[] = [];
  let splitArr: string[] = [];
  const rateTableData: any[] = [];
  const rateTableStatus =
    InsurerInfo.rateTable &&
    InsurerInfo.rateTable?.length > 0 &&
    InsurerInfo.rateTable.includes("deductible");
  const multiCurrency = InsurerInfo.multiCurrency?.includes("rates");
  InsurerInfo.copayTypes.map((type) => {
    let count = 1;
    let typeNone = type == variable.none;
    let deductible: Modifiers = {
      _id: `-${Utils.remove(data.provider)}.modifiers${index}.deductible${type == variable.none ? "" : `.${type}`}-`,
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
    if (!typeNone) deductible.inputLabel = `${type} Co/Pay`;
    data.distinctInfo.map((info) => {
      info.network.map((network) => {
        info.coverage.map((coverage) => {
          let copayList = info.copay;
          if (!typeNone)
            copayList = copayList.filter((copay) => copay.includes(`${type}-`));
          copayList.map((copay) => {
            if (!typeNone) copay = copay.replace(`${type}-`, "");
            let option: Option = {
              id: `${!typeNone ? `${type.toLowerCase()}-` : ""}option${rateTableStatus && index ? `-${index}` : ""}-${count}`,
              label: copay,
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
              ],
            };
            const tempOptions: any[] = [];
            // "if" is applied here because typescript was giving error
            if (option.premiumMod) {
              let customCheck = !!premiums[0].custom;
              let customConditionsArr: string[] = premiums.reduce(
                (acc: string[], v) => {
                  let custom = v.custom ? v.custom : "";
                  return acc.includes(custom) ? acc : [...acc, custom];
                },
                []
              );
              let filteredRates = premiums.filter(
                (premium) =>
                  premium.planName == info.plan &&
                  premium.network == network &&
                  premium.coverage == coverage &&
                  premium.copay == copay &&
                  premium.frequency == variable.Annually &&
                  (typeNone || premium.copayType == type) &&
                  (!customCheck || premium.custom == customConditionsArr[0])
              );
              if (filteredRates.length == 0 && !customCheck)
                throw new Error(
                  `No deductible rates found for index:${index} "${info.plan}" | "${network}" | "${coverage}" | "${copay}" |`
                );
              if (filteredRates.length !== 0 && customCheck) {
                if (customCheck) {
                  if (!customConditions[customConditionsArr[0]])
                    throw new Error(
                      `${customConditionsArr[0]} condition doesn't exist in customConditions array`
                    );
                  option.conditions?.push(
                    customConditions[customConditionsArr[0]]
                  );
                }
                if (!rateTableStatus) {
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

                    if (premium.married == "true") {
                      rate.conditions.push({
                        type: EnumConditions.maritalStatus,
                        value: "-Enum.maritalStatus.married-",
                      });
                    }
                    if (premium.married == "false") {
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
                          Utils.remove(
                            `${info.plan}_${coverage}_${network}_${copay}`
                          )
                        )
                      : rateBase;
                  if (InsurerInfo.splitFile == "true")
                    splitArr.push(
                      Utils.remove(
                        `${info.plan}_${coverage}_${network}_${copay}`
                      )
                    );
                  option.premiumMod.conditionalPrices = baseAnnualPremium;
                } else {
                  delete option.premiumMod;
                  rateTableData.push({
                    plans: [
                      `-${Utils.remove(data.provider)}.plans${index}.${Utils.remove(info.plan)}-`,
                    ],
                    modType: PremiumModType.ConditionalOverride,
                    type: ModifiersType.DEDUCTIBLE,
                    value: option.id,
                    rates: filteredRates.map(
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
                              Number(premium.rates) / InsurerInfo.conversion,
                          },
                        };
                        if (premium.gender)
                          value.customer.gender = premium.gender;
                        return value;
                      }
                    ),
                  });
                }
                deductible.options.push(option);
                count++;
              }

              if (customConditionsArr.length > 1) {
                customConditionsArr.map((condition: string, i: number) => {
                  if (i == 0) return;
                  let tempOption: Option = {
                    id: `${!typeNone ? `${type.toLowerCase()}-` : ""}option${rateTableStatus && index ? `-${index}` : ""}-${count}`,
                    label: copay,
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
                    ],
                  };
                  let filteredRates = premiums.filter(
                    (premium) =>
                      premium.planName == info.plan &&
                      premium.network == network &&
                      premium.coverage == coverage &&
                      premium.copay == copay &&
                      premium.frequency == variable.Annually &&
                      premium.custom == condition &&
                      (typeNone || premium.copayType == type)
                  );
                  if (filteredRates.length == 0) return;
                  if (customCheck) {
                    if (!customConditions[condition])
                      throw new Error(
                        `${condition} condition doesn't exist in customConditions array`
                      );
                    tempOption.conditions?.push(customConditions[condition]);
                  }
                  if (tempOption.premiumMod) {
                    if (!rateTableStatus) {
                      let rateBase = filteredRates.map((premium) => {
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
                          rate.conditions.push(
                            customConditions[premium.custom]
                          );
                        }
                        return rate;
                      });

                      let baseAnnualPremium =
                        InsurerInfo.splitFile == "true"
                          ? SplitFile(
                              rateBase,
                              `Outputs/${Utils.remove(InsurerInfo.provider)}/PricingTable`,
                              Utils.remove(
                                `${info.plan}_${coverage}_${network}_${copay}`
                              )
                            )
                          : rateBase;
                      if (InsurerInfo.splitFile == "true")
                        splitArr.push(
                          Utils.remove(
                            `${info.plan}_${coverage}_${network}_${copay}`
                          )
                        );
                      tempOption.premiumMod.conditionalPrices =
                        baseAnnualPremium;
                    } else {
                      delete tempOption.premiumMod;
                      rateTableData.push({
                        plans: [
                          `-${Utils.remove(data.provider)}.plans${index}.${Utils.remove(info.plan)}-`,
                        ],
                        modType: PremiumModType.ConditionalOverride,
                        type: ModifiersType.DEDUCTIBLE,
                        value: tempOption.id,
                        rates: filteredRates.map(
                          (premium): RateTableCustomerPrice => {
                            let value: RateTableCustomerPrice = {
                              type: PremiumModType.ConditionalOverride,
                              customer: {
                                from: premium.ageStart,
                                to: premium.ageEnd,
                              },
                              price: {
                                currency: `-Enum.currency.${multiCurrency ? premium.currency : InsurerInfo.currency}-`,
                                price:
                                  Number(premium.rates) /
                                  InsurerInfo.conversion,
                              },
                            };
                            if (premium.gender)
                              value.customer.gender = premium.gender;
                            return { ...value };
                          }
                        ),
                      });
                    }
                  }
                  tempOptions.push(tempOption);
                  count++;
                });
                if (tempOptions.length > 0)
                  deductible.options.push(...tempOptions);
              }
            }
          });
        });
      });
    });
    deductibleArr.push({ ...deductible });
  });

  return { data: deductibleArr, splitFile: splitArr, rateTableData };
};
