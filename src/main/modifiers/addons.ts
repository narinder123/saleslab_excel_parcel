import { EnumConditions, fileTypes, variable } from "../../constants";
import { DataConverters } from "../../helper/DataConverters";
import { Utils } from "../../helper/Utils";
import {
  Addons,
  InsurerInfo,
  Modifiers,
  Option,
  premiumCondition,
} from "../../helper/interfaces";

export const createAddons = (
  data: Modifiers[],
  addons: string[],
  InsurerInfo: InsurerInfo,
  index: number
) => {
  return data.map((mod) => {
    if (!addons.includes(mod.label)) return data;
    let addonInfo: Addons[] = DataConverters.fetchSheet(
      fileTypes.addons,
      `${mod.label.split(" ")[0]}-info`
    );

    if (addonInfo[0].placeAt == variable.addonsPlaceAt.outside) {
      if (addonInfo[0].type == "fixed")
        mod.addonCost = {
          type: addonInfo[0].type,
          price: [
            {
              value: +parseInt(`${addonInfo[0].value}`),
              currency: InsurerInfo.currency,
            },
          ],
        };
    } else {
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
                  value: +parseInt(`${addon.value}`),
                  currency: InsurerInfo.currency,
                },
              ],
            },
            conditions: [],
          };

          Object.keys(EnumConditions).forEach((condition) => {
            if (!addon[condition]) return;

            opt.conditions?.push({
              type: EnumConditions[condition],
              value: getConditionValue(condition, addon, InsurerInfo),
            });
          });

          return opt;
        });
      } else {
        let addonRates = DataConverters.fetchSheet(
          fileTypes.addons,
          addonInfo[0].sheetName
        );

        mod.options = addonInfo.map((addon, i) => {
          let opt: Option = {
            id: `option-${i + 1}`,
            label: addon.label,
            description: addon.description,
            addonCost: {
              type: addon.type,
              conditionalPrices: addonRates
                .filter((v) => v.flag == addon.flag)
                .map((rate) => {
                  let obj: premiumCondition = {
                    conditions: [],
                    price: [
                      {
                        value: parseInt(rate.value) / InsurerInfo.conversion,
                        currency: InsurerInfo.currency,
                      },
                    ],
                  };
                  Object.keys(EnumConditions).forEach((condition) => {
                    if (!addon[condition]) return;

                    obj.conditions?.push({
                      type: EnumConditions[condition],
                      value: getConditionValue(condition, addon, InsurerInfo),
                    });
                  });

                  return obj;
                }),
            },
            conditions: [],
          };

          Object.keys(EnumConditions).forEach((condition) => {
            if (!addon[condition]) return;

            opt.conditions?.push({
              type: EnumConditions[condition],
              value: getConditionValue(condition, addon, InsurerInfo),
            });
          });

          return opt;
        });
      }
    }
  });
};

const getConditionValue = (
  type: string,
  data: any,
  InsurerInfo: InsurerInfo
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
  };
  switch (type) {
    case checks.plan:
      return [
        `-${Utils.remove(InsurerInfo.provider)}.plans.${Utils.remove(data[type])}-`,
      ];
    case checks.minAge:
      return data[type];
    case checks.maxAge:
      return data[type];
    case checks.gender:
      return `-Enum.gender.${data[type].toLowerCase()}-`;
    case checks.network:
      return [data[type]];
    case checks.coverage:
      return [
        `-${Utils.remove(InsurerInfo.provider)}.coverages.${Utils.remove(data[type])}-`,
      ];
    case checks.deductible:
      return [data[type]];
    case checks.maritalStatus:
      return `-Enum.maritalStatus.${data[type].toLowerCase()}-`;
  }
};
