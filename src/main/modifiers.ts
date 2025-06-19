import {
  InsurerInfo,
  Modifiers,
  PlansInfo,
  rateTable,
  RawBenefits,
  RawRates,
} from "../helper/interfaces";
import { Utils } from "../helper/Utils";
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
  index: number | string
): { data: Modifiers[]; rateTableData: rateTable[] } => {
  const rateTableData: rateTable[] = [];
  const deductibles = createDeductibleModifiers(
    PlanData,
    Premiums,
    Info,
    index
  );

  let benefits = createBenefitModifiers(Benefits, PlanData, index, Info);

  if (Info.addons) {
    let addons = createAddons(benefits, Info.addons, Info, index);
    if (addons.rateTableData.length > 0)
      rateTableData.push(...addons.rateTableData);
    benefits = addons.modifiers;
  }
  const paymentFrequency = createPaymentFrequencyModifier(
    Info,
    Premiums,
    Benefits,
    PlanData,
    index
  );

  if (paymentFrequency.rateTableData.length > 0)
    rateTableData.push(...paymentFrequency.rateTableData);
  if (deductibles.rateTableData.length > 0)
    rateTableData.push(...deductibles.rateTableData);

  return {
    data: [
      ...benefits,
      ...createNetworkModifiers(PlanData, index),
      ...deductibles.data,
      paymentFrequency.modifier,
    ],
    rateTableData,
  };
};
