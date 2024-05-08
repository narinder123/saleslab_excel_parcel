import { Utils } from "../helper/Utils";
import { PlansInfo } from "../helper/interfaces";

export const createCoreIndexData = (data: PlansInfo[]) => {
  const mongoId = (str: string) => `-generateMongoIdFromString(${str})-`;
  const provider = data[0].provider;
  let Ids: any = {
    provider: mongoId(provider),
  };

  data.map((infoData, i) => {
    let n = data.length > 1 ? i + 1 : "";

    Ids.plans = {};
    infoData.plans.map((plan) => {
      plan = Utils.remove(plan);
      Ids.plans[plan] = mongoId(`${provider} ${plan} ${n}`);
    });

    Ids.coverages = {};
    infoData.coverages.map((cov) => {
      cov = Utils.remove(cov);
      Ids.coverages[cov] = mongoId(`${provider} ${cov} ${n}`);
    });

    Ids.pricingTables = {};
    infoData.distinctInfo.map((p) => {
      Ids.pricingTables[Utils.remove(p.plan)] = {};
      p.coverage.map(
        (c) =>
          (Ids.pricingTables[Utils.remove(p.plan)][Utils.remove(c)] = mongoId(
            `${provider} ${p.plan} ${c} ${n}`
          ))
      );
    });

    Ids.modifiers = {};

    Ids.modifiers.benefits = {};

    infoData.benefits.map((benefit) => {
      benefit = Utils.remove(benefit);
      Ids.modifiers.benefits[benefit] = mongoId(`${provider} ${benefit} ${n}`);
    });

    Ids.modifiers.networks = {};

    if (!infoData.info.planNetworksAreSame) {
      infoData.plans.map((network) => {
        network = Utils.remove(network);
        Ids.modifiers.networks[network] = mongoId(
          `${provider} ${network} ${n}`
        );
      });
    } else Ids.modifiers.networks = mongoId(`${provider} netowrk ${n}`);

    Ids.modifiers.paymentFrequency = mongoId(
      `${provider} paymentFrequency ${n}`
    );

    Ids.modifiers.deductible = mongoId(`${provider} deductible ${n}`);

    Ids.modifiers.discount = mongoId(`${provider} discount ${n}`);
  });

  return Ids;
};
