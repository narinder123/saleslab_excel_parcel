import {
  InsurerInfo,
  Modifiers,
  PlansInfo,
  RawBenefits,
  RawRates,
} from "../helper/interfaces";
import { createBenefitModifiers } from "./modifiers/benefits";
import { createDeductibleModifiers } from "./modifiers/deductible";
import { createNetworkModifiers } from "./modifiers/networks";
import { createPaymentFrequencyModifier } from "./modifiers/paymentFrequency";

export const createModifiersData = (
  PlanData: PlansInfo,
  Premiums: RawRates[],
  Benefits: RawBenefits[],
  Info: InsurerInfo,
  index: number
): { data: Modifiers[]; splitFile: string[] } => {
  const deductibles = createDeductibleModifiers(PlanData, Premiums, Info);
  return {
    data: [
      ...createBenefitModifiers(Benefits, PlanData),
      ...createNetworkModifiers(PlanData),
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
