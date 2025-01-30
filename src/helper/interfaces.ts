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
  currency?: string;
  custom?: string;
  copayType?: string;
  [key: string]: any;
}

export type Residencies = "UAE" | "NE" | "Dubai" | "AbuDhabi" | "NE_Dubai";

export type V1DBMode = "dev" | "prod";
export interface InsurerInfo {
  provider: string;
  startDate: Date;
  endDate?: Date;
  residencies: string[];
  conversion: number;
  currency: string;
  insurerName: string;
  splitResidencies?: boolean;
  splitFile?: string;
  frequencies?: string[];
  frequencyFrom?: "benefit" | "rates";
  addons?: string[];
  compantId?: string;
  ageCalculationMethod?: string;
  multiCurrency?: ("rates" | "benefits")[];
  rateTable?: string[];
  copayTypes?: string[];
  showAddons?: string[];
  futureRates?: boolean;
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

export enum CustomerMaritalStatus {
  Single = "single",
  Married = "married",
  Widow = "widow",
}

// Plan Interfaces ----------------------------

export interface Plans {
  _id: string;
  provider: string;
  title: string;
  notes: string;
  hasRateTable: boolean;
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
  gender?: string;
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

export enum PremiumModType {
  Percentage = "percentage",
  Fixed = "fixed",
  ConditionalFixed = "conditional-fixed",
  Override = "override",
  ConditionalOverride = "conditional-override",
}

export enum CustomerCategory {
  PRIMARY = "Primary",
  PRIMARY_DEPENDENT = "Primary - Dependent",
  DEPENDENT = "Dependent",
  DEPENDENT_DEPENDENT = "Dependent - Dependent",
  PRIMARY_INVESTOR = "Primary - Investor",
  PRIMARY_INVESTOR_DEPENDENT = "Primary - Investor - Dependent",
  DEPENDENT_PARENT = "Dependent - Parent",
  DEPENDENT_PARENT_DEPENDENT = "Dependent - Parent - Dependent",
  PRIMARY_LOW_SALARY_BAND = "Primary (Low Salary Band)",
  PRIMARY_LOW_SALARY_BAND_DEPENDENT = "Primary (Low Salary Band) - Dependent",
  DEPENDENT_LOW_SALARY_BAND = "Dependent (Low Salary Band)",
  DEPENDENT_LOW_SALARY_BAND_DEPENDENT = "Dependent (Low Salary Band) - Dependent",
}

//  Modifiers Interfaces ----------------------------

export enum ModifiersType {
  PROVIDER = "PROVIDER",
  PLAN = "PLAN",
  NETWORK = "NETWORK",
  COVERAGE = "COVERAGE",
  PAYMENT_FREQ = "PAYMENT_FREQ",
  DEDUCTIBLE = "DEDUCTIBLE",
  DISCOUNT = "DISCOUNT",
  BENEFIT = "BENEFIT",
  PRICING_TABLE = "PRICING_TABLE",
  ANNUAL_LIMIT = "ANNUAL_LIMIT",
}

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
  inputLabel?: string;
  addonCost: premiumMod | {};
  premiumMod: any;
  conditions: any[];
  hasOptions: boolean;
  options: Option[];
  defaultOption?: any[];
  dependentModifiers?: string[];
  dependsOn?: string;
  hasRateTable?: boolean;
  showAddon?: boolean;
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
  type: PremiumModType;
  conditionalPrices?: premiumCondition[] | any;
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
  type: PremiumModType;
  description?: string;
  placeAt: "inside options arr" | "outside options arr";
  flag?: string;
  plan?: string;
  value?: string | number;
  currency?: string;
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
  frequency: string;
  [key: string]: string;
}

export interface RateTableCustomerPrice {
  type: PremiumModType;
  customer: {
    from: number; // from Age
    to: number; // to Age
    gender?: "male" | "female" | "";
    category?: CustomerCategory;
    maritalStatus?: CustomerMaritalStatus;
  };
  price: {
    currency: string;
    price: number;
  };
}

export interface rateTable {
  plans: string[];
  type: ModifiersType;
  modType: PremiumModType;
  value: string;
  rates: RateTableCustomerPrice[];
  values?: string[];
  multiplier?: number;
}
