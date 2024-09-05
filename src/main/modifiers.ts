import {
  InsurerInfo,
  Modifiers,
  PlansInfo,
  RawBenefits,
  RawRates,
} from "../helper/interfaces";
import { createAddons } from "./modifiers/addons";
import { createBenefitModifiers } from "./modifiers/benefits";
import { createDeductibleModifiers } from "./modifiers/deductible";
import { createNetworkModifiers } from "./modifiers/networks";
import { createPaymentFrequencyModifier } from "./modifiers/paymentFrequency";

export const createModifiersData = (
  PlanData: PlansInfo,
  Premiums: RawRates[],
  Benefits: RawBenefits[],
  Info: InsurerInfo,
  index: number | string,
  MultiCurrenyBenefits: any[]
): { data: Modifiers[]; splitFile: string[] } => {
  const deductibles = createDeductibleModifiers(
    PlanData,
    Premiums,
    Info,
    index
  );
  let benefits = createBenefitModifiers(
    Benefits,
    PlanData,
    index,
    Info,
    MultiCurrenyBenefits
  );
  if (Info.addons) benefits = createAddons(benefits, Info.addons, Info, index);

  return {
    data: [
      ...benefits,
      ...createNetworkModifiers(PlanData, index),
      ...deductibles.data,
      ...createPaymentFrequencyModifier(
        Info,
        Premiums,
        Benefits,
        PlanData,
        index
      ),
    ],
    splitFile: deductibles.splitFile,
  };
};
