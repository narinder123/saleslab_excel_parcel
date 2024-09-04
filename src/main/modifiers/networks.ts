import { Utils } from "../../helper/Utils";
import { Modifiers, PlansInfo } from "../../helper/interfaces";

export const createNetworkModifiers = (
  data: PlansInfo,
  index: string | number
): Modifiers[] => {
  let networkModifiers: Modifiers[] = [];

  if (data.info.planNetworksAreSame) {
    let network: Modifiers = {
      _id: `-${Utils.remove(data.provider)}.modifiers${index}.networks-`,
      plans: data.plans.map(
        (plan) => `-${Utils.remove(data.provider)}.plans.${Utils.remove(plan)}-`
      ),
      title: "Network modifier",
      label: "Network",
      type: "-core.modifierTypes.network-",
      assignmentType: "PER_PLAN",
      includedBenefits: [],
      isOptional: false,
      description: "",
      addonCost: {},
      premiumMod: "",
      conditions: [],
      hasOptions: true,
      options: data.networks.map((net, i) => {
        return {
          id: net,
          label: net,
          description: net,
        };
      }),
    };
    networkModifiers.push(network);
  } else {
    data.distinctInfo.forEach((info) => {
      let network: Modifiers = {
        _id: `-${Utils.remove(data.provider)}.modifiers${index}.networks.${Utils.remove(info.plan)}-`,
        plans: [
          `-${Utils.remove(data.provider)}.plans${index}.${Utils.remove(info.plan)}-`,
        ],
        title: "Network modifier",
        label: "Network",
        type: "-core.modifierTypes.network-",
        assignmentType: "PER_PLAN",
        includedBenefits: [],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: "",
        conditions: [],
        hasOptions: true,
        options: info.network.map((net, i) => {
          return {
            id: net,
            label: net,
            description: net,
          };
        }),
      };
      networkModifiers.push(network);
    });
  }
  return networkModifiers;
};
