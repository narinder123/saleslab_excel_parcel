import { BenefitTypes, variable } from "../constants";
import { Utils } from "./Utils";
import { Helpers } from "./functions";
import { InsurerInfo, PlansInfo } from "./interfaces";

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
      endDate: new Date(),
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
    };

    for (let key in info) {
      if (data[0][key])
        info[key] = data[0][key].toString().includes("/")
          ? data[0][key].split("/").filter((v: string) => v)
          : data[0][key];
    }
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
        console.log("v ", v)
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
})();
