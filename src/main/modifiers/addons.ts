import {
  customConditions,
  customResidencies,
  EnumConditions,
  fileTypes,
  paymentFrequencies,
  variable,
} from "../../constants";
import { DataConverters } from "../../helper/DataConverters";
import { Utils } from "../../helper/Utils";
import {
  Addons,
  feeType,
  InsurerInfo,
  Modifiers,
  ModifiersType,
  Option,
  premiumCondition,
  PremiumFrequencies,
  PremiumModType,
  rateTable,
  RateTableCustomerPrice,
} from "../../helper/interfaces";

export const createAddons = (
  data: Modifiers[],
  addons: string[],
  InsurerInfo: InsurerInfo,
  index: number | string
): { modifiers: Modifiers[]; rateTableData: rateTable[] } => {
  const rateTableData: rateTable[] = [];
  const multiCurrency = InsurerInfo.multiCurrency?.includes("rates");

  const conditionsArr = Object.keys(EnumConditions);
  const premiumFrequencies: PremiumFrequencies = {
    Annually: 1,
    semiAnnual: 2,
    quarter: 4,
    month: 12,
  };
  let mods = data.map((mod: Modifiers) => {
    if (!addons.includes(mod.label)) return mod;
    let addonInfo: Addons[] = DataConverters.fetchSheet(
      `${fileTypes.addons}${index == "" || index == 1 ? "" : Number(index) - 1}`,
      `${mod.label}`
    );

    addonInfo.length == 0 &&
      console.log(
        "addonInfo >>",
        addonInfo,
        `${fileTypes.addons}${index}`,
        `${mod.label}`
      );
    const rateTableStatus =
      InsurerInfo.rateTable &&
      InsurerInfo.rateTable?.length > 0 &&
      InsurerInfo.rateTable.includes(mod.title);
    if (addonInfo[0]?.placeAt == variable.addonsPlaceAt.outside) {
      if (addonInfo[0].type == PremiumModType.Fixed)
        mod.addonCost = {
          type: addonInfo[0].type,
          price: [
            {
              value: multiCurrency
                ? Number(addonInfo[0].value)
                : parseFloat(
                    `${Number(addonInfo[0].value) / InsurerInfo.conversion}`
                  ),
              currency: multiCurrency
                ? addonInfo[0].currency
                : InsurerInfo.currency,
            },
          ],
        };
    } else {
      let addonRates = [];

      if (addonInfo[0].sheetName) {
        addonRates = DataConverters.fetchSheet(
          `${fileTypes.addons}${index == "" || index == 1 ? "" : Number(index) - 1}`,
          addonInfo[0].sheetName
        );
        mod.isOptional = true;
        mod.assignmentType = feeType.PER_CUSTOMER;
      }

      mod.description = "";
      mod.options = addonInfo.map((addon, i) => {
        // console.log("addon.value ", addon)
        let opt: Option = {
          id: `option${rateTableStatus && index ? `-${index}` : ""}-${i + 1}`,
          label: addon.label,
          description: addon.description,
          addonCost: {
            type: addon.type,
            price: [
              {
                value: multiCurrency
                  ? Number(addon.value)
                  : +parseFloat(
                      `${Number(addon.value) / InsurerInfo.conversion}`
                    ),
                currency: multiCurrency ? addon.currency : InsurerInfo.currency,
              },
            ],
          },
          conditions: [],
        };
        if (addonInfo[i].type == PremiumModType.Fixed) {
          for (
            let conditionIdx = 0;
            conditionIdx < conditionsArr.length;
            conditionIdx++
          ) {
            const condition = conditionsArr[conditionIdx];
            if (!addon[condition]) continue;

            opt.conditions?.push({
              type: EnumConditions[condition],
              value: getConditionValue(condition, addon, InsurerInfo, index),
            });
          }
        } else if (addonInfo[i].type == PremiumModType.Percentage) {
          opt = {
            id: `option${rateTableStatus && index ? `-${index}` : ""}-${i + 1}`,
            label: addon.label,
            description: addon.description,
            premiumMod: {
              type: addon.type,
              price: [
                {
                  value: parseFloat(`${Number(addon.value)}`),
                },
              ],
            },
            conditions: [],
          };
          // Object.keys(EnumConditions).forEach((condition) => {
          //   if (!addon[condition]) return;
          //   let conditions =
          //     condition == "custom"
          //       ? customConditions[condition]
          //       : [
          //           {
          //             type: EnumConditions[condition],
          //             value: getConditionValue(
          //               condition,
          //               addon,
          //               InsurerInfo,
          //               index
          //             ),
          //           },
          //         ];
          //   opt.conditions?.push(...conditions);
          // });
          for (
            let conditionIdx = 0;
            conditionIdx < conditionsArr.length;
            conditionIdx++
          ) {
            const condition = conditionsArr[conditionIdx];
            if (!addon[condition]) continue;
            let conditions =
              condition == "custom"
                ? customConditions[condition]
                : [
                    {
                      type: EnumConditions[condition],
                      value: getConditionValue(
                        condition,
                        addon,
                        InsurerInfo,
                        index
                      ),
                    },
                  ];
            opt.conditions?.push(...conditions);
          }
        } else {
          opt = {
            id: `option-${i + 1}`,
            label: addon.label,
            description: addon.description,
            conditions: [],
          };
          if (addonInfo[0].sheetName && addon.flag !== variable.none) {
            let filteredRates = addonRates.filter(
              (v) =>
                v.flag == addon.flag &&
                (!v.residency ||
                  (v.residency &&
                    (v.residency.length == 2 ||
                      customResidencies[v.residency])))
            );
            if (filteredRates.length == 0)
              throw `No record found for ${mod.label} index:${index} flag:${addon.flag} length:${addonRates.length}`;
            if (!rateTableStatus) {
              opt.addonCost = {
                type: addon.type,
                conditionalPrices: filteredRates.map((rate) => {
                  let multiplier = 1;
                  if (rate.frequency)
                    multiplier = premiumFrequencies[rate.frequency];
                  let obj: premiumCondition = {
                    conditions: [],
                    price: [
                      {
                        value:
                          (multiCurrency
                            ? rate.value
                            : parseFloat(rate.value) / InsurerInfo.conversion) *
                          multiplier,
                        currency: multiCurrency
                          ? rate.currency
                          : InsurerInfo.currency,
                      },
                    ],
                  };

                  // Object.keys(EnumConditions).forEach((condition) => {
                  //   if (!rate[condition]) return;
                  //   if (
                  //     condition == "custom" &&
                  //     !customConditions[rate[condition]]
                  //   )
                  //     throw new Error(
                  //       `${rate[condition]} not included in customCondition array`
                  //     );
                  //   const conditions =
                  //     condition == "custom"
                  //       ? customConditions[rate[condition]]
                  //       : [
                  //           {
                  //             type: EnumConditions[condition],
                  //             value: getConditionValue(
                  //               condition,
                  //               rate,
                  //               InsurerInfo,
                  //               index
                  //             ),
                  //           },
                  //         ];
                  //   obj.conditions?.push(...conditions);
                  // });
                  for (
                    let conditionIdx = 0;
                    conditionIdx < conditionsArr.length;
                    conditionIdx++
                  ) {
                    const condition = conditionsArr[conditionIdx];
                    if (!rate[condition]) continue;
                    if (
                      condition == "custom" &&
                      !customConditions[rate[condition]]
                    )
                      throw new Error(
                        `${rate[condition]} not included in customCondition array`
                      );
                    const conditions =
                      condition == "custom"
                        ? customConditions[rate[condition]]
                        : [
                            {
                              type: EnumConditions[condition],
                              value: getConditionValue(
                                condition,
                                rate,
                                InsurerInfo,
                                index
                              ),
                            },
                          ];
                    obj.conditions?.push(...conditions);
                  }

                  return obj;
                }),
              };
            } else {
              if (addon.frequency)
                rateTableData.push({
                  plans: addon.plan
                    ? [
                        `-${Utils.remove(InsurerInfo.provider)}.plans${index}.${Utils.remove(addon.plan)}-`,
                      ]
                    : filteredRates[0].plan
                      ? [
                          `-${Utils.remove(InsurerInfo.provider)}.plans${index}.${Utils.remove(filteredRates[0].plan)}-`,
                        ]
                      : mod.plans,
                  type: ModifiersType.BENEFIT,
                  modType: addon.type,
                  value: mod._id,
                  values: [opt.id],
                  rates: filteredRates.map(
                    (premium): RateTableCustomerPrice => {
                      // if (!premium.frequency) throw `frequency not found`;
                      let frequency = premium.frequency || addon.frequency;
                      let multiplier = premiumFrequencies[frequency];
                      let value: RateTableCustomerPrice = {
                        type: PremiumModType.ConditionalOverride,
                        customer: {
                          from: premium.minAge,
                          to: premium.maxAge,
                        },
                        price: {
                          currency: `-Enum.currency.${multiCurrency ? premium.currency : InsurerInfo.currency}-`,
                          price:
                            (Number(premium.value) / InsurerInfo.conversion) *
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
          }

          // Object.keys(EnumConditions).forEach((condition) => {
          //   if (!addon[condition]) return;
          //   if (condition == "benefitId") {
          //     opt.conditions?.push({
          //       type: "-Enum.conditions.modifier-",
          //       benefitId: `-core.benefitTypes.${addon[condition].split("/")[0]}-`,
          //       value: [addon[condition].split("/")[1]],
          //     });
          //   } else
          //     opt.conditions?.push({
          //       type: EnumConditions[condition],
          //       value: getConditionValue(condition, addon, InsurerInfo, index),
          //     });
          // });

          for (
            let conditionIdx = 0;
            conditionIdx < conditionsArr.length;
            conditionIdx++
          ) {
            const condition = conditionsArr[conditionIdx];
            if (!addon[condition]) continue;
            if (condition == "benefitId") {
              opt.conditions?.push({
                type: "-Enum.conditions.modifier-",
                benefitId: `-core.benefitTypes.${addon[condition].split("/")[0]}-`,
                value: [addon[condition].split("/")[1]],
              });
            } else
              opt.conditions?.push({
                type: EnumConditions[condition],
                value: getConditionValue(condition, addon, InsurerInfo, index),
              });
          }

          if (addon.custom) {
            if (!customConditions[addon.custom])
              throw new Error(
                `${addon.custom} condition doesn't exist in customConditions array`
              );

            opt.conditions?.push(...customConditions[addon.custom]);
          }
          if (opt.conditions?.length == 0) delete opt.conditions;
        }
        return opt;
      });
      mod.isOptional =
        addonInfo[0].isOptional?.toString().toLowerCase() == "true"
          ? true
          : false;
      mod.hasOptions = true;
      mod.assignmentType = feeType.PER_CUSTOMER;
    }
    if (rateTableStatus && rateTableData.length > 0) {
      mod.hasRateTable = true;
      mod.assignmentType = feeType.PER_CUSTOMER;
    }
    return { ...mod };
  });
  if (addons.includes("Repat")) {
    let addonInfo: Addons[] = DataConverters.fetchSheet(
      `${fileTypes.addons}${index == "" || index == 1 ? "" : Number(index) - 1}`,
      `Repat`
    );
    let addonRates = [];
    if (addonInfo[0].sheetName) {
      addonRates = DataConverters.fetchSheet(
        `${fileTypes.addons}${index == "" || index == 1 ? "" : Number(index) - 1}`,
        addonInfo[0].sheetName
      );
    }
    let repat = { ...mods[0] };
    repat._id = `-${InsurerInfo.provider}.modifiers${index}.benefits.repatriationBenefits-`;
    repat.title = "Repatriation Optional benefit";
    repat.label = "Repatriation Added";
    repat.includedBenefits = ["-core.benefitTypes.repatriation-"];
    repat.assignmentType = "PER_CUSTOMER";
    repat.isOptional = true;
    repat.description = "";
    repat.hasOptions = true;
    repat.options = addonInfo.map((addon, i) => {
      let filteredRates = addonRates.filter((v) => v.flag == addon.flag);
      return {
        id: `option-${i + 1}`,
        label: "Repatriation Optional benefit",
        addonCost: {
          type: PremiumModType.ConditionalFixed,
          conditionalPrices: filteredRates.map((rate) => {
            let multiplier = 1;
            if (rate.frequency) multiplier = premiumFrequencies[rate.frequency];
            let obj: premiumCondition = {
              conditions: [],
              price: [
                {
                  value:
                    (multiCurrency
                      ? rate.value
                      : parseFloat(rate.value) / InsurerInfo.conversion) *
                    multiplier,
                  currency: multiCurrency
                    ? rate.currency
                    : InsurerInfo.currency,
                },
              ],
            };
            // Object.keys(EnumConditions).forEach((condition) => {
            //   if (!rate[condition]) return;
            //   const conditions =
            //     condition == "custom"
            //       ? customConditions[rate[condition]]
            //       : [
            //           {
            //             type: EnumConditions[condition],
            //             value: getConditionValue(
            //               condition,
            //               rate,
            //               InsurerInfo,
            //               index
            //             ),
            //           },
            //         ];
            //   if (condition == "custom" && conditions.length == 0)
            //     throw new Error(
            //       `${rate[condition]} - custom condition not found`
            //     );
            //   obj.conditions?.push(...conditions);
            // });

            for (
              let conditionIdx = 0;
              conditionIdx < conditionsArr.length;
              conditionIdx++
            ) {
              const condition = conditionsArr[conditionIdx];
              if (!rate[condition]) continue;
              const conditions =
                condition == "custom"
                  ? customConditions[rate[condition]]
                  : [
                      {
                        type: EnumConditions[condition],
                        value: getConditionValue(
                          condition,
                          rate,
                          InsurerInfo,
                          index
                        ),
                      },
                    ];
              if (condition == "custom" && conditions.length == 0)
                throw new Error(
                  `${rate[condition]} - custom condition not found`
                );
              obj.conditions?.push(...conditions);
            }
            return obj;
          }),
        },
      };
    });
    mods.push({ ...repat });
  }
  return { modifiers: mods, rateTableData };
};

const getConditionValue = (
  type: string,
  data: any,
  InsurerInfo: InsurerInfo,
  index: number | string
) => {
  const checks = {
    plan: "plan",
    coverage: "coverage",
    network: "network",
    minAge: "minAge",
    maxAge: "maxAge",
    gender: "gender",
    category: "category",
    relation: "relation",
    maritalStatus: "maritalStatus",
    deductible: "deductible",
    frequency: "frequency",
    residency: "residency",
  };

  switch (type) {
    case checks.plan:
      return data[type].includes("/")
        ? data[type]
            .split("/")
            .map(
              (v: string) =>
                `-${Utils.remove(InsurerInfo.provider)}.plans${index}.${Utils.remove(v)}-`
            )
        : [
            `-${Utils.remove(InsurerInfo.provider)}.plans${index}.${Utils.remove(data[type])}-`,
          ];
    case checks.minAge:
      return data[type];
    case checks.maxAge:
      return data[type];
    case checks.gender:
      return `-Enum.gender.${data[type].toLowerCase()}-`;
    case checks.category:
      return `-Enum.category.${data[type]}-`;
    case checks.relation:
      return `-Enum.relation.${data[type]}-`;
    case checks.network:
      return [data[type]];
    case checks.deductible:
      return [data[type]];
    case checks.residency:
      return data[type].length > 2
        ? customResidencies[data[type]]
        : [data[type]];
    case checks.frequency:
      return [
        paymentFrequencies[data[type]]
          ? paymentFrequencies[data[type]].modOption.id
          : "annual-payment-surcharge",
      ];
    case checks.coverage:
      return [
        `-${Utils.remove(InsurerInfo.provider)}.coverages${index}.${Utils.remove(data[type])}-`,
      ];
    case checks.maritalStatus:
      return `-Enum.maritalStatus.${data[type].toLowerCase()}-`;
  }
};
