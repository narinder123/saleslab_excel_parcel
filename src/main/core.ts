import { variable } from "../constants";
import { Utils } from "../helper/Utils";
import { InsurerInfo, PlansInfo } from "../helper/interfaces";

export const createCoreIndexData = (
  data: PlansInfo[],
  InsurerInfo: InsurerInfo
) => {
  const mongoId = (str: string) => `-generateMongoIdFromString('${str}')-`;
  const provider = data[0].provider;
  let Ids: any = {
    provider: mongoId(provider),
  };
  const multiResidence = data.length > 1;
  data.map((infoData, i) => {
    let n = data.length > 1 ? i + 1 : "";

    Ids[`plans${multiResidence ? n : ""}`] = {};
    infoData.plans.map((plan) => {
      plan = Utils.remove(plan);
      Ids[`plans${multiResidence ? n : ""}`][plan] = mongoId(
        `${provider} ${plan} ${n}`
      );
    });

    Ids[`coverages${multiResidence ? n : ""}`] = {};
    infoData.coverages.map((cov) => {
      cov = Utils.remove(cov);
      Ids[`coverages${multiResidence ? n : ""}`][cov] = mongoId(
        `${provider} ${cov} ${n}`
      );
    });

    Ids[`pricingTables${multiResidence ? n : ""}`] = {};
    infoData.distinctInfo.map((p) => {
      Ids[`pricingTables${multiResidence ? n : ""}`][Utils.remove(p.plan)] = {};
      p.coverage.map(
        (c) =>
          (Ids[`pricingTables${multiResidence ? n : ""}`][Utils.remove(p.plan)][
            Utils.remove(c)
          ] = mongoId(`${provider} ${p.plan} ${c} ${n}`))
      );
    });

    Ids[`modifiers${multiResidence ? n : ""}`] = {};

    Ids[`modifiers${multiResidence ? n : ""}`].benefits = {};

    infoData.benefits.map((benefit) => {
      benefit = Utils.remove(benefit);
      Ids[`modifiers${multiResidence ? n : ""}`].benefits[benefit] = mongoId(
        `${provider} ${benefit} ${n}`
      );
    });

    Ids[`modifiers${multiResidence ? n : ""}`].networks = {};

    if (!infoData.info.planNetworksAreSame) {
      infoData.plans.map((network) => {
        network = Utils.remove(network);
        Ids[`modifiers${multiResidence ? n : ""}`].networks[network] = mongoId(
          `${provider} ${network} ${n}`
        );
      });
    } else
      Ids[`modifiers${multiResidence ? n : ""}`].networks = mongoId(
        `${provider} netowrk ${n}`
      );

    Ids[`modifiers${multiResidence ? n : ""}`].paymentFrequency = mongoId(
      `${provider} paymentFrequency ${n}`
    );

    InsurerInfo.copayTypes.map((type) => {
      if (type == variable.none)
        Ids[`modifiers${multiResidence ? n : ""}`].deductible = mongoId(
          `${provider} deductible ${n}`
        );
      else {
        if (!Ids[`modifiers${multiResidence ? n : ""}`].deductible)
          Ids[`modifiers${multiResidence ? n : ""}`].deductible = {};
        Ids[`modifiers${multiResidence ? n : ""}`].deductible[type] = mongoId(
          `${provider} deductible ${type} ${n}`
        );
      }
    });

    Ids[`modifiers${multiResidence ? n : ""}`].discount = mongoId(
      `${provider} discount ${n}`
    );
  });

  return Ids;
};
