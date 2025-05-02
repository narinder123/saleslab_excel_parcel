import { BenefitTypes, EnumConditions, variable } from "../constants";
import { Utils } from "./Utils";
import { Helpers } from "./helpers";
import {
  InsurerInfo,
  KeyStringType,
  Modifiers,
  Option,
  PlansInfo,
} from "./interfaces";

export const DataConverters = new (class {
  fetchSheet(filename: string, index: number | string = 0) {
    let folderName = Helpers.getInputArguments().name;

    return Helpers.convertXlsxToArr(
      `./Inputs/${folderName}/${filename}.xlsx`,
      index
    );
  }

  fetchInsurerInfo(data: any[]): InsurerInfo {
    let info: InsurerInfo = {
      provider: "",
      startDate: new Date(),
      endDate: undefined,
      residencies: [""],
      conversion: 1,
      currency: "",
      splitFile: "",
      frequencies: [],
      frequencyFrom: "benefit",
      addons: [],
      insurerName: "",
      ageCalculationMethod: "",
      multiCurrency: [],
      rateTable: [],
      copayTypes: [],
      showAddons: [],
      futureRates: false,
    };

    for (let key in info) {
      if (data[0][key]) {
        let value = data[0][key].toString().includes("/")
          ? data[0][key].split("/").filter((v: string) => v)
          : data[0][key];
        info[key] = !Array.isArray(info[key])
          ? value
          : Array.isArray(value)
            ? [...value]
            : value;
      }
    }

    if (info.copayTypes?.length == 0) info.copayTypes.push(variable.none);
    return info;
  }

  fetchPlansInfo(data: any[], provider: string) {
    // fetching all plans....
    const plans = Object.keys(data[0]).filter((v) =>
      Utils.ShouldNotInclude(v, variable.UserType, variable.Benefit)
    );

    // fetching all networks
    const networks = Object.values(
      data.find((v) => v.Benefit == variable.NetworkDetails)
    )
      .map((v) => v + "")
      .reduce((acc: string[], v: string) => {
        if (v.includes("/")) return [...acc, ...v.split("/")];
        return [...acc, v];
      }, [])
      .filter((v) =>
        Utils.ShouldNotInclude(
          v,
          variable.NetworkDetails,
          ...Object.values(BenefitTypes)
        )
      );

    // fetch all benefits....
    const benefits = data
      .filter(
        (v) =>
          Utils.ShouldNotInclude(
            v[variable.UserType],
            BenefitTypes.none,
            BenefitTypes.type
          ) && Helpers.NotIncludedBenefit(v)
      )
      .map((v) => v[variable.Benefit]);

    // fetching copays.....
    const copays = Object.values(data.find((v) => v.Benefit == variable.Copays))
      .map((v) => v + "")
      .reduce((acc: string[], v: string) => {
        if (v.includes("/")) return [...acc, ...v.split("/")];
        return [...acc, v];
      }, [])
      .filter((v) =>
        Utils.ShouldNotInclude(
          v,
          variable.Copays,
          ...Object.values(BenefitTypes)
        )
      );

    // fetching coverages.....
    const coverages = Object.values(
      data.find((v) => v.Benefit == variable.GeographicalCoverage)
    )
      .map((v) => v + "")
      .reduce((acc: string[], v: string) => {
        if (v.includes("/")) return [...acc, ...v.split("/")];
        return [...acc, v];
      }, [])
      .filter((v) =>
        Utils.ShouldNotInclude(
          v,
          variable.GeographicalCoverage,
          ...Object.values(BenefitTypes)
        )
      );

    let InsurerInfo: PlansInfo = {
      provider,
      plans,
      networks: Utils.distinct(networks),
      coverages: Utils.distinct(coverages),
      copays: Utils.distinct(copays),
      benefits,
      distinctInfo: plans.map((plan) => {
        return {
          plan: plan,
          network: [
            data.find((v) => v.Benefit == variable.NetworkDetails)[plan],
          ].reduce((acc: string[], v: string) => {
            if (v.includes("/")) return [...acc, ...v.split("/")];
            return [...acc, v];
          }, []),
          copay: [data.find((v) => v.Benefit == variable.Copays)[plan]].reduce(
            (acc: string[], v: string) => {
              if (v.includes("/")) return [...acc, ...v.split("/")];
              return [...acc, v];
            },
            []
          ),
          coverage: [
            data.find((v) => v.Benefit == variable.GeographicalCoverage)[plan],
          ].reduce((acc: string[], v: string) => {
            if (v.includes("/")) return [...acc, ...v.split("/")];
            return [...acc, v];
          }, []),
          benefit: data.reduce((acc, b) => {
            if (
              typeof b[plan] == "string" &&
              Utils.ShouldNotInclude(
                b[variable.UserType],
                BenefitTypes.type,
                BenefitTypes.none
              ) &&
              b[plan] !== "" &&
              b[plan]?.toLowerCase() !== "not available" &&
              b[plan] !== "N/A"
            )
              return [...acc, b[variable.Benefit]];
            return acc;
          }, []),
        };
      }),
      info: {
        planNetworksAreSame: Object.values(
          data.find((v) => v.Benefit == variable.NetworkDetails)
        )
          .map((v) => v + "")
          .reduce(
            (acc, net) => {
              if (acc.network == "") return { network: net, same: true };
              return { ...acc, same: acc.network == net && acc.same };
            },
            { same: true, network: "" }
          ).same,
      },
    };

    return InsurerInfo;
  }

  multiCurrencyConverter({
    modifiers,
    InfoData,
    conversionData,
  }: {
    modifiers: Modifiers[];
    InfoData: InsurerInfo;
    conversionData: KeyStringType[];
  }): Modifiers[] {
    const fromCurrency = InfoData.currency;
    modifiers.map((mod, i) => {
      if (
        !(
          (InfoData.multiCurrency?.includes("deductible") &&
            mod.label.includes("Deductibles")) ||
          (InfoData.multiCurrency?.includes("benefits") &&
            !mod.label.includes("Deductibles"))
        )
      )
        return;

      if (
        mod.options.length == 0 &&
        mod.description.includes(`${fromCurrency}`)
      ) {
        let options = [
          {
            id: "option-0",
            label: mod.description,
            description: mod.description,
            conditions: [
              {
                type: EnumConditions.currency,
                value: [fromCurrency],
              },
            ],
          },
        ];
        for (let currency in conversionData[0]) {
          if (currency == fromCurrency) continue;
          let str = Utils.currencyConverter({
            value: mod.description,
            fromCurrency: InfoData.currency,
            toCurrency: currency,
            conversionData,
          });
          options.push({
            id: `option-${options.length}`,
            label: str,
            description: str,
            conditions: [
              {
                type: EnumConditions.currency,
                value: [currency],
              },
            ],
          });
        }
        mod.hasOptions = true;
        mod.options = [...options];
      } else if (
        mod.options.length > 0 &&
        mod.options.find(
          (opt) =>
            (opt.label && opt.label.includes(fromCurrency)) ||
            (opt.description && opt.description.includes(fromCurrency))
        )
      ) {
        let options: Option[] = [];
        mod.options.map((opt, j) => {
          if (
            !opt.label?.includes(fromCurrency) &&
            !opt.description?.includes(fromCurrency)
          ) {
            options.push(opt);
            return;
          }
          let newOpt: Option = {
            ...opt,
            id: `option-${j + 1}`,
            label: opt.label,
            description: opt.description,
            conditions: [
              ...(opt.conditions ? opt.conditions : []),
              {
                type: EnumConditions.currency,
                value: [fromCurrency],
              },
            ],
          };
          newOpt.altCurrencyOptions = Object.keys(conversionData[0]).map(
            (currency) => ({ id: `option-${j + 1}`, currency })
          );
          options.push(newOpt);
          for (let currency in conversionData[0]) {
            if (currency === fromCurrency) continue;
            let label = opt.label;
            let description = opt.description;
            label = Utils.currencyConverter({
              value: label,
              fromCurrency: fromCurrency,
              toCurrency: currency,
              conversionData,
            });
            description = Utils.currencyConverter({
              value: description || "",
              fromCurrency: fromCurrency,
              toCurrency: currency,
              conversionData,
            });
            let temp = {
              ...opt,
              id: `option-${j + 1}`,
              label,
              description,
              conditions: [
                ...(opt.conditions ? opt.conditions : []),
                {
                  type: EnumConditions.currency,
                  value: [currency],
                },
              ],
            };
            temp.altCurrencyOptions = Object.keys(conversionData[0]).map(
              (currency) => ({ id: `option-${j + 1}`, currency })
            );
            options.push(temp);
          }
        });
        mod.options = options;
      }
    });

    return modifiers;
  }
})();
