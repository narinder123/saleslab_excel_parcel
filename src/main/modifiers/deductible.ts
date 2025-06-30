import {
  EnumConditions,
  customConditions,
  customNationalities,
  customResidencies,
  variable,
} from "../../constants";
import { Utils } from "../../helper/Utils";
import {
  InsurerInfo,
  Modifiers,
  ModifiersType,
  Option,
  PlansInfo,
  premiumCondition,
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
): {
  data: Modifiers[];
  splitFile: string[];
  rateTableData: any[];
  splitFilePremiums: any;
} => {
  let deductibleArr: Modifiers[] = [];
  let splitArr: string[] = [];
  const rateTableData: any[] = [];
  let splitFilePremiums: any = [];

  const countriesByArea = [
  [ "9-A", [ "BF","BI","CF","CD","GQ","GA","LS","LY","NA","NE","CG","RW","ST","SN","SZ" ] ],
  [ "11-A", [ "BJ","BW","CM","CV","TD","DJ","GM","GN","GW","MG","MR","TG" ] ],
  [ "15-A", [ "DZ","AO","ET","ML" ] ],
  [ "16-A", [ "KM","CI","EG","ER","GH","KE","LR","MW","MU","MA","MZ","NG","SC","SL","ZA","TZ","TN","UG","ZM","ZW" ] ],
  [ "3-A", [ "AD" ] ],
  [ "5-A", [ "MC","ES","GB" ] ],
  [ "7-A", [ "CY","JE","GR","LI","GG","RU","IM","CH","TR" ] ],
  [ "9-B", [ "AM","EE","GI","RS","FI","HU","XK","MD","AT","ME","SE","BY","GE","IT","LV","PT","UA","BG","DE","LT","SM" ] ],
  [ "11-B", [ "AL","HR","IS","RO","AZ","CZ","KZ","SK","BE","DK","LU","SI","BA","FR","MK" ] ],
  [ "13-A", [ "MT","NL","NO" ] ],
  [ "15-B", [ "PL" ] ],
  [ "8-A", [ "VN" ] ],
  [ "9-C", [ "MM","CX","CC","TL","LA" ] ],
  [ "10-A", [ "KH","MY","TH" ] ],
  [ "11-C", [ "BN" ] ],
  [ "15-C", [ "PH" ] ],
  [ "2-A", [ "HK" ] ],
  [ "3-B", [ "GT","HN","MX" ] ],
  [ "5-B", [ "BR" ] ],
  [ "7-B", [ "AI","AG","AR","AW","BS","BD","BB","BZ","BM","BO","VG","KY","CL","CO","CR","DM","DO","EC","SV","GD","GP","GY","HT","JM","MQ","MN","MS","AN","NI","PA","PY","PE","SH","KN","LC","MF","VC","SR" ] ],
  [ "8-B", [ "MO","KR" ] ],
  [ "9-D", [ "AU","MV","MH","PS","TV","BT","CK","NR","WS","VU","FJ","NP","SB","PF","NC","TJ","KI","NZ","TO","KG","PW","TM","UZ" ] ],
  [ "10-B", [ "JP" ] ],
  [ "11-D", [ "AF","FO","FM","GL","IN","PG" ] ],
  [ "12-A", [ "BH","OM","QA" ] ],
  [ "14-A", [ "TW" ] ],
  [ "16-B", [ "IQ","JO","KW","LB","PK","LK" ] ]
];

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

    if (!typeNone) deductible.inputLabel = `${type} Co/pay`;

    console.log("rateTableStatus ", rateTableStatus);
    
    data.distinctInfo.map((info) => {
      let splitPlanData: any = {
        planName: info.plan,
        rates: {
          key: "",
          data: [],
        },
      };

      info.network.map((network) => {
        // info.coverage.map((coverage) => {
          let copayList = info.copay;
          // console.log("info ", info)
          if (!typeNone)
            copayList = copayList.filter((copay) => copay.includes(`${type}-`));

          copayList.map((copay) => {
            countriesByArea.forEach((country, ind) => {
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
                  // {
                  //   type: EnumConditions.coverage,
                  //   value: [
                  //     `-${Utils.remove(data.provider)}.coverages${index}.${Utils.remove(coverage)}-`,
                  //   ],
                  // },
                  {
                    type: "RESIDENCY_EQUALS_TO",
                    value: [...country[1]],
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
                    // premium.coverage == coverage &&
                    premium.copay == copay &&
                    premium.frequency == variable.Annually &&
                    (typeNone || premium.copayType == type) &&
                    // (premium.type == "OP" ? true : premium.area == country[0]) &&
                    (!customCheck ||
                      premium.custom == customConditionsArr[0]) &&
                    (!premium.residency ||
                      (premium.residency &&
                        (premium.residency.length == 2 ||
                          customResidencies[premium.residency]))) &&
                    (!premium.nationality ||
                      (premium.nationality &&
                        (premium.nationality.length == 2 ||
                          customNationalities[premium.nationality])))
                );

                filteredRates.length == 0 && console.log("filteredRates.length ", info.plan, network, copay, variable.Annually);
                
                if (filteredRates.length == 0 && !customCheck)
                  throw new Error(
                    `No deductible rates found for index:${index} "${info.plan}" | "${network}" | "${copay}" |`
                  );

                if (filteredRates.length !== 0) {
                  if (customCheck) {
                    if (!customConditions[customConditionsArr[0]])
                      throw new Error(
                        `${customConditionsArr[0]} condition doesn't exist in customConditions array`
                      );
                    option.conditions?.push(
                      ...customConditions[customConditionsArr[0]]
                    );
                  }
                  if (!rateTableStatus) {
                    splitPlanData.rates.key = Utils.remove(
                      `${info.plan}_${network}_${copay}`
                    );

                    let rateBase = filteredRates.map((premium) => {
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
                      if (premium.residency)
                        rate.conditions.push({
                          type: EnumConditions.residency,
                          value:
                            premium.residency.length > 2
                              ? customResidencies[premium.residency]
                              : [premium.residency],
                        });
                      if (premium.nationality)
                        rate.conditions.push({
                          type: EnumConditions.nationality,
                          value:
                            premium.nationality.length > 2
                              ? customNationalities[premium.nationality]
                              : [premium.nationality],
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

                    // let baseAnnualPremium =
                    //   InsurerInfo.splitFile == "true"
                    //     ? SplitFile(
                    //         rateBase,
                    //         `Outputs/${Utils.remove(InsurerInfo.provider)}/PricingTable`,
                    //         Utils.remove(
                    //           `${info.plan}_${coverage}_${network}_${copay}`
                    //         )
                    //       )
                    //     : rateBase;

                    let baseAnnualPremium =
                      InsurerInfo.splitFile == "true"
                        ? `-[...${Utils.remove(
                            `${info.plan}_${network}_${copay}`
                          )}]-`
                        : rateBase;

                    if (InsurerInfo.splitFile == "true") {
                      splitArr.push(
                        Utils.remove(
                          `${info.plan}_${network}_${copay}`
                        )
                      );

                      splitPlanData.rates.data.push(rateBase);
                    }

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
                            },
                            price: {
                              currency: `-Enum.currency.${multiCurrency ? premium.currency : InsurerInfo.currency}-`,
                              price:
                                Number(premium.rates) / InsurerInfo.conversion,
                            },
                          };
                          if (premium.gender)
                            value.customer.gender = premium.gender;
                          if (premium.residency)
                            value.customer.residency =
                              premium.residency.length > 2
                                ? customResidencies[premium.residency]
                                : [premium.residency];
                          if (premium.nationality)
                            value.customer.nationality =
                              premium.nationality.length > 2
                                ? customNationalities[premium.nationality]
                                : [premium.nationality];
                          return value;
                        }
                      ),
                    });
                  }
                  deductible.options.push(option);
                  count++;
                }

                console.log("customConditionsArr.length ",customConditionsArr.length);
                

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
                        // {
                        //   type: EnumConditions.coverage,
                        //   value: [
                        //     `-${Utils.remove(data.provider)}.coverages${index}.${Utils.remove(coverage)}-`,
                        //   ],
                        // },
                      ],
                    };
                    let filteredRates = premiums.filter(
                      (premium) =>
                        premium.planName == info.plan &&
                        premium.network == network &&
                        // premium.coverage == coverage &&
                        premium.copay == copay &&
                        premium.area == country[0] &&
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
                      tempOption.conditions?.push(
                        ...customConditions[condition]
                      );
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
                              ...customConditions[premium.custom]
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
                                  `${info.plan}_${network}_${copay}`
                                )
                              )
                            : rateBase;
                        if (InsurerInfo.splitFile == "true")
                          splitArr.push(
                            Utils.remove(
                              `${info.plan}_${network}_${copay}`
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
        // });
      });

      splitFilePremiums.push(splitPlanData);
    });

    deductibleArr.push({ ...deductible });
  });

  return {
    data: deductibleArr,
    splitFile: splitArr,
    rateTableData,
    splitFilePremiums: splitFilePremiums,
  };
};
