import {
  customConditions,
  EnumConditions,
  fileTypes,
  paymentFrequencies,
  variable,
} from "../../constants";
import { DataConverters } from "../../helper/DataConverters";
import { Utils } from "../../helper/Utils";
import {
  Addons,
  InsurerInfo,
  Modifiers,
  ModifiersType,
  Option,
  premiumCondition,
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
  let mods = data.map((mod: Modifiers) => {
    const multiCurrency = InsurerInfo.multiCurrency?.includes("rates");
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

    if (addonInfo[0].placeAt == variable.addonsPlaceAt.outside) {
      if (addonInfo[0].type == "fixed")
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
      mod.description = "";
      if (addonInfo[0].type == "fixed" && !addonInfo[0].sheetName) {
        mod.options = addonInfo.map((addon, i) => {
          let opt: Option = {
            id: `option-${i + 1}`,
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
                  currency: multiCurrency
                    ? addon.currency
                    : InsurerInfo.currency,
                },
              ],
            },
            conditions: [],
          };

          Object.keys(EnumConditions).forEach((condition) => {
            if (!addon[condition]) return;

            opt.conditions?.push({
              type: EnumConditions[condition],
              value: getConditionValue(condition, addon, InsurerInfo, index),
            });
          });

          return opt;
        });
        mod.isOptional =
          addonInfo[0].isOptional?.toString().toLowerCase() == "true"
            ? true
            : false;
        mod.hasOptions = true;
      } else if (addonInfo[0].type == "percentage") {
        mod.options = addonInfo.map((addon, i) => {
          let opt: Option = {
            id: `option-${i + 1}`,
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

          Object.keys(EnumConditions).forEach((condition) => {
            if (!addon[condition]) return;

            opt.conditions?.push(
              condition == "custom"
                ? customConditions[condition]
                : {
                    type: EnumConditions[condition],
                    value: getConditionValue(
                      condition,
                      addon,
                      InsurerInfo,
                      index
                    ),
                  }
            );
          });

          return opt;
        });
        mod.isOptional =
          addonInfo[0].isOptional?.toString().toLowerCase() == "true"
            ? true
            : false;
        mod.hasOptions = true;
      } else {
        let addonRates = [];
        if (addonInfo[0].sheetName) {
          addonRates = DataConverters.fetchSheet(
            fileTypes.addons,
            addonInfo[0].sheetName
          );
          mod.isOptional = true;
          mod.assignmentType = "PER_CUSTOMER";
        }
        mod.hasOptions = true;
        mod.options = addonInfo.map((addon, i) => {
          let opt: Option = {
            id: `option-${i + 1}`,
            label: addon.label,
            description: addon.description,
            conditions: [],
          };
          if (addonInfo[0].sheetName) {
            let filteredRates = addonRates.filter((v) => v.flag == addon.flag);
            if (filteredRates.length == 0)
              throw `No record found for ${mod.label} index:${i} flag:${addon.flag}`;
            if (!rateTableStatus) {
              opt.addonCost = {
                type: addon.type,
                conditionalPrices: filteredRates.map((rate) => {
                  let obj: premiumCondition = {
                    conditions: [],
                    price: [
                      {
                        value: multiCurrency
                          ? rate.value
                          : parseFloat(rate.value) / InsurerInfo.conversion,
                        currency: multiCurrency
                          ? rate.currency
                          : InsurerInfo.currency,
                      },
                    ],
                  };
                  Object.keys(EnumConditions).forEach((condition) => {
                    if (!rate[condition]) return;

                    obj.conditions?.push(
                      condition == "custom"
                        ? customConditions[condition]
                        : {
                            type: EnumConditions[condition],
                            value: getConditionValue(
                              condition,
                              rate,
                              InsurerInfo,
                              index
                            ),
                          }
                    );
                  });

                  return obj;
                }),
              };
            } else {
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
                rates: filteredRates.map((premium): RateTableCustomerPrice => {
                  let multiplier =
                    premium.frequency == "semiAnnual"
                      ? 2
                      : premium.frequency == "quarter"
                        ? 4
                        : premium.frequency == "month"
                          ? 12
                          : 1;
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
                  if (premium.gender) value.customer.gender = premium.gender;
                  return value;
                }),
              });
            }
          }

          Object.keys(EnumConditions).forEach((condition) => {
            if (!addon[condition]) return;

            opt.conditions?.push({
              type: EnumConditions[condition],
              value: getConditionValue(condition, addon, InsurerInfo, index),
            });
          });

          if (addon.custom) {
            if (!customConditions[addon.custom])
              throw new Error(
                `${addon.custom} condition doesn't exist in customConditions array`
              );

            opt.conditions?.push(customConditions[addon.custom]);
          }

          return opt;
        });
      }
    }
    if (rateTableStatus && rateTableData.length > 0) mod.hasRateTable = true;

    return { ...mod };
  });
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
  };

  switch (type) {
    case checks.plan:
      return [
        `-${Utils.remove(InsurerInfo.provider)}.plans${index}.${Utils.remove(data[type])}-`,
      ];
    case checks.minAge:
      return data[type];
    case checks.maxAge:
      return data[type];
    case checks.gender:
      return `-Enum.gender.${data[type].toLowerCase()}-`;
    case checks.network:
      return [data[type]];
    case checks.deductible:
      return [data[type]];
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
