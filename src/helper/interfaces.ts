// Utils Interfaces -------------------------------

export interface InputArgumentType {
  name: string;
  V1?: string;
  V2?: string;
  log?: string;
  import?: string;
  [key: string]: string | undefined;
}

export interface OutputSheetFnArguments {
  folder: string;
  fileName: string;
  data: string;
  provider: string;
  core?: boolean;
  Enum?: boolean;
  comment?: string;
  addUp?: string;
}

export interface RawBenefits {
  UserType: string;
  Benefit: string;
  [key: string]: string;
}

export interface RawRates {
  planName: string;
  network: string;
  gender: "male" | "female" | "";
  ageStart: number;
  ageEnd: number;
  rates: number;
  copay: string;
  coverage: string;
  relation?: string;
  category?: string;
  singleChild?: string;
  frequency?: string;
  married?: "true" | "false";
  platform: "V1" | "V2" | "both";
  [key: string]: any;
}

export type Residencies = "UAE" | "NE" | "Dubai" | "AbuDhabi" | "NE_Dubai";

export type V1DBMode = "dev" | "prod";
export interface InsurerInfo {
  provider: string;
  startDate: Date;
  endDate: Date;
  residencies: string[];
  conversion: number;
  currency: string;
  splitFile?: string;
  frequencies?: string[];
  frequencyFrom?: "benefit" | "rates";
  addons?: string[];
  compantId?: string;
  ageCalculationMethod?: string;
  insurerName: string;
  [key: string]: any;
}

export interface PlansInfo {
  provider: string;
  plans: string[];
  networks: string[];
  coverages: string[];
  copays: string[];
  benefits: string[];
  distinctInfo: DistinctPlanInfo[];
  info: {
    planNetworksAreSame: boolean;
  };
}

export interface DistinctPlanInfo {
  plan: string;
  network: string[];
  coverage: string[];
  copay: string[];
  benefit: string[];
}

// Plan Interfaces ----------------------------

export interface Plans {
  _id: string;
  provider: string;
  title: string;
  notes: string;
  benefitCategories: string[];
  pricingTables: string[];
  modifiers: string[];
}

export interface Coverages {
  _id: string;
  title: string;
  internalTitle: string;
  includedResidence: string[];
  excludedResidence: string[];
  coveredCountries: string[];
  notes: string;
}

// PricingTable Interfaces ----------------------------

export interface PriceObj {
  currency?: string;
  value: number;
}

export interface BasePremium {
  fromAge: number;
  toAge: number;
  gender: string;
  price: PriceObj[];
  maritalStatus?: string;
  category?: string;
  relation?: string;
}

export interface PricingTable {
  _id: string;
  plan: string;
  annualLimit: PriceObj[];
  startDate: Date;
  endDate: Date | string;
  includedResidence: string[];
  excludedResidence: string[];
  coverage: string[];
  baseAnnualPremium: BasePremium[] | string;
}

//  Modifiers Interfaces ----------------------------

export interface Modifiers {
  _id: string;
  plans: string[];
  title: string;
  label: string;
  type: string;
  assignmentType: "PER_PLAN" | "PER_CUSTOMER";
  includedBenefits: string[];
  isOptional: boolean;
  description: string;
  addonCost: premiumMod | {};
  premiumMod: any;
  conditions: any[];
  hasOptions: boolean;
  options: Option[];
  defaultOption?: any[];
  dependentModifiers?: string[];
  dependsOn?: string;
  [key: string]: any;
}

export interface Option {
  id: string;
  label: string;
  description?: string;
  premiumMod?: premiumMod;
  addonCost?: premiumMod;
  conditions?: { type: string; value: string[] | string | number }[];
}

export interface premiumMod {
  type: "conditional-override" | "conditional-fixed" | "fixed" | "percentage";
  conditionalPrices?: premiumCondition[] | string;
  price?: PriceObj[];
}

export interface premiumCondition {
  conditions: { type: string; value: number | string }[];
  price: PriceObj[];
}

export type dependentType = "dependsOn" | "dependentModifiers";

export interface Addons {
  sheetName: string;
  isOptional: "true" | "false";
  label: string;
  type: "conditional-fixed" | "fixed" | "conditional-override" | "percentage";
  description?: string;
  placeAt: "inside options arr" | "outside options arr";
  flag?: string;
  plan?: string;
  value?: string | number;
  [key: string]: any;
}

export interface EnumConditionsTypes {
  plan: string;
  coverage: string;
  network: string;
  minAge: string;
  maxAge: string;
  gender: string;
  category: string;
  relation: string;
  maritalStatus: string;
  deductible: string;
  [key: string]: string;
}
