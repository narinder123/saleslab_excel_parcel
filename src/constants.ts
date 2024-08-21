import {
  EnumConditionsTypes,
  Residencies,
  dependentType,
  premiumMod,
} from "./helper/interfaces";

export const fileTypes = {
  rateSheet: "rateSheet",
  benefits: "benefits",
  info: "info",
  addons: "addons",
};

export const InfoTypes = ["plan", "network", "copay", "benefit"];

export const OutputDir = "./Outputs";

export const variable = {
  UserType: "User Type",
  Benefit: "Benefit",
  NetworkDetails: "Network Details",
  Copays: "Copays",
  GeographicalCoverage: "Geographical Coverage",
  AnnualLimit: "Annual Limit",
  $_Copay: "$copay",
  frequencyFrom: { rates: "rates", benefit: "benefit" },
  addonsPlaceAt: {
    inside: "inside options arr",
    outside: "outside options arr",
  },
};

export const InfoResidencies = ["UAE", "NE", "Dubai", "AbuDhabi", "NE_Dubai"];

export const V2Residencies: { [key: string]: string[][] } = {
  UAE: [["AE-DU", "AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"], []],
  NE: [
    ["AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
    ["AE-DU", "AE-AZ"],
  ],
  Dubai: [["AE-DU"], ["AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"]],
  AbuDhabi: [["AE-AZ"], ["AE-DU", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"]],
  NE_Dubai: [["AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ", "AE-DU"], ["AE-AZ"]],
};

export const EnumConditions: EnumConditionsTypes = {
  plan: "-Enum.conditions.plans-",
  coverage: "-Enum.conditions.coverage-",
  network: "-Enum.conditions.modifier-",
  minAge: "-Enum.customer.min_age-",
  maxAge: "-Enum.customer.max_age-",
  gender: "-Enum.customer.gender-",
  category: "-Enum.customer.category-",
  relation: "-Enum.customer.relation-",
  maritalStatus: "-Enum.customer.maritalStatus-",
  deductible: "-Enum.conditions.deductible-",
};

export const BenefitTypes = {
  type: "type",
  none: "none",
  Pro: "Pro",
  All: "All",
  Starter: "Starter",
};

export const coveredCountries = [
  "US",
  "AU",
  "DK",
  "IT",
  "MX",
  "RU",
  "AT",
  "FI",
  "JP",
  "MC",
  "SG",
  "BE",
  "FR",
  "SA",
  "NL",
  "CH",
  "BR",
  "DE",
  "LU",
  "NZ",
  "AE",
  "CN",
  "HK",
  "MO",
  "NO",
  "GB",
  "AD",
  "CC",
  "GL",
  "JM",
  "ES",
  "AI",
  "CO",
  "GD",
  "JE",
  "KN",
  "AG",
  "CK",
  "GP",
  "KW",
  "LC",
  "AR",
  "CR",
  "GT",
  "LB",
  "SX",
  "AW",
  "CY",
  "GG",
  "MT",
  "VC",
  "BS",
  "DM",
  "GY",
  "MQ",
  "SR",
  "BB",
  "DO",
  "HT",
  "AN",
  "SE",
  "BZ",
  "HN",
  "NI",
  "TT",
  "BM",
  "SV",
  "HU",
  "PA",
  "TR",
  "BO",
  "FO",
  "IS",
  "PY",
  "TC",
  "VG",
  "FJ",
  "IQ",
  "PE",
  "TV",
  "KY",
  "PF",
  "IE",
  "PT",
  "UY",
  "CL",
  "GI",
  "IM",
  "QA",
  "VE",
  "CX",
  "GR",
  "SM",
  "EC",
  "IL",
  "AF",
  "HR",
  "KG",
  "OM",
  "TJ",
  "AL",
  "CZ",
  "LV",
  "PS",
  "TM",
  "AM",
  "EE",
  "LI",
  "PL",
  "UA",
  "AZ",
  "GE",
  "LT",
  "RO",
  "UZ",
  "BH",
  "IN",
  "MK",
  "RS",
  "YE",
  "BA",
  "JO",
  "MD",
  "SK",
  "BG",
  "KZ",
  "ME",
  "SI",
  "BD",
  "KI",
  "MM",
  "PW",
  "TW",
  "BT",
  "LA",
  "NR",
  "TH",
  "BN",
  "MY",
  "NP",
  "PH",
  "TO",
  "KH",
  "MV",
  "NC",
  "SB",
  "VU",
  "TL",
  "MH",
  "KR",
  "VN",
  "ID",
  "MN",
  "PK",
  "LK",
  "DZ",
  "PG",
  "GW",
  "MZ",
  "ZA",
  "AO",
  "CD",
  "KE",
  "NA",
  "SS",
  "BJ",
  "DJ",
  "LS",
  "NE",
  "SD",
  "BW",
  "EG",
  "LR",
  "NG",
  "SZ",
  "BF",
  "GQ",
  "LY",
  "CG",
  "TZ",
  "BI",
  "ER",
  "MG",
  "RW",
  "TG",
  "CM",
  "ET",
  "MW",
  "ST",
  "TN",
  "CV",
  "GA",
  "ML",
  "SN",
  "UG",
  "CF",
  "GM",
  "MR",
  "SC",
  "ZM",
  "TD",
  "GH",
  "MU",
  "SL",
  "ZW",
  "KM",
  "GN",
  "MA",
  "SO",
];

export const benefitCategories: any[] = [
  {
    categoryTitle: "General Benefits",
    includedBenefits: [
      {
        userType: "-Enum.userType.All-",
        benefitTypes: [
          "-core.benefitTypes.chronicConditions-",
          "-core.benefitTypes.preExistingCoverCondition-",
        ],
      },
      {
        userType: "-Enum.userType.Pro-",
        benefitTypes: ["-core.benefitTypes.claimHandling-"],
      },
    ],
  },
  {
    categoryTitle: "In-patient (Hospitalization & Surgery)",
    includedBenefits: [
      {
        userType: "-Enum.userType.All-",
        benefitTypes: ["-core.benefitTypes.accomodation-"],
      },
      {
        userType: "-Enum.userType.Pro-",
        benefitTypes: [
          "-core.benefitTypes.diagnosticsAndTest-",
          "-core.benefitTypes.organTransplant-",
          "-core.benefitTypes.surgeriesAndAnthesia-",
          "-core.benefitTypes.oncology-",
        ],
      },
      {
        userType: "-Enum.userType.Starter-",
        benefitTypes: [
          "-core.benefitTypes.inPatientHospitializationandsurgery-",
        ],
      },
    ],
  },
  {
    categoryTitle:
      "Out-patient (Consultations, Lab & Diagnostics, Pharmacy, Physiotherapy)",
    includedBenefits: [
      {
        userType: "-Enum.userType.All-",
        benefitTypes: ["-core.benefitTypes.physiotherapy-"],
      },
      {
        userType: "-Enum.userType.Pro-",
        benefitTypes: [
          "-core.benefitTypes.outPatientConsultation-",
          "-core.benefitTypes.specialist-",
          "-core.benefitTypes.medicine-",
          "-core.benefitTypes.vaccination-",
          "-core.benefitTypes.tests-",
        ],
      },
      {
        userType: "-Enum.userType.Starter-",
        benefitTypes: ["-core.benefitTypes.outPatientBenefit-"],
      },
    ],
  },
  {
    categoryTitle: "Maternity",
    includedBenefits: [
      {
        userType: "-Enum.userType.All-",
        benefitTypes: [
          "-core.benefitTypes.maternity-",
          "-core.benefitTypes.maternityWaitingPeriod-",
        ],
      },
      {
        userType: "-Enum.userType.Pro-",
        benefitTypes: [
          "-core.benefitTypes.complicationOfPregnancy-",
          "-core.benefitTypes.newBornCoverage-",
        ],
      },
    ],
  },
  {
    categoryTitle: "Dental Benefit",
    includedBenefits: [
      {
        userType: "-Enum.userType.All-",
        benefitTypes: [
          "-core.benefitTypes.dental-",
          "-core.benefitTypes.dentalWaitingPeriod-",
        ],
      },
    ],
  },
  {
    categoryTitle: "Additional Benefits",
    includedBenefits: [
      {
        userType: "-Enum.userType.All-",
        benefitTypes: [
          "-core.benefitTypes.optical-",
          "-core.benefitTypes.wellness-",
          "-core.benefitTypes.emergencyEvacution-",
        ],
      },
      {
        userType: "-Enum.userType.Pro-",
        benefitTypes: [
          "-core.benefitTypes.alternativeMedicine-",
          "-core.benefitTypes.mentalHealth-",
          "-core.benefitTypes.memberWebPortal-",
          "-core.benefitTypes.mobileApplication-",
          "-core.benefitTypes.virtualTele-",
          "-core.benefitTypes.otherServices-",
        ],
      },
    ],
  },
  {
    categoryTitle: "Added (Optional) Benefits",
    includedBenefits: [
      {
        userType: "-Enum.userType.All-",
        benefitTypes: [
          "-core.benefitTypes.extendedEvacuation-",
          "-core.benefitTypes.nonEmergency-",
        ],
      },
    ],
  },
];

export const coreBenefitsTypes: { [key: string]: string } = {
  "Claims Handling": "-core.benefitTypes.claimHandling-",
  "Chronic Condition Cover": "-core.benefitTypes.chronicConditions-",
  "Pre-existing Condition Cover":
    "-core.benefitTypes.preExistingCoverCondition-",
  "Accommodation Type": "-core.benefitTypes.accomodation-",
  "Diagnostics & Test": "-core.benefitTypes.diagnosticsAndTest-",
  "Organ Transplant": "-core.benefitTypes.organTransplant-",
  "Surgeries & Anesthesia": "-core.benefitTypes.surgeriesAndAnthesia-",
  Oncology: "-core.benefitTypes.oncology-",
  "In-patient (Hospitalization & Surgery)":
    "-core.benefitTypes.inPatientHospitializationandsurgery-",
  Physiotherapy: "-core.benefitTypes.physiotherapy-",
  "Out-patient Consultations": "-core.benefitTypes.outPatientConsultation-",
  "Out-patient Specialists": "-core.benefitTypes.specialist-",
  "Out-patient Medicines": "-core.benefitTypes.medicine-",
  Vaccination: "-core.benefitTypes.vaccination-",
  "Scans & Diagnostic Tests": "-core.benefitTypes.tests-",
  "Out-patient benefits": "-core.benefitTypes.outPatientBenefit-",
  "Maternity (Consultations, Scans and Delivery)":
    "-core.benefitTypes.maternity-",
  "Maternity Waiting Period": "-core.benefitTypes.maternityWaitingPeriod-",
  "Complications of Pregnancy": "-core.benefitTypes.complicationOfPregnancy-",
  "New Born Cover": "-core.benefitTypes.newBornCoverage-",
  Dental: "-core.benefitTypes.dental-",
  "Dental Waiting Period": "-core.benefitTypes.dentalWaitingPeriod-",
  "Optical Benefits": "-core.benefitTypes.optical-",
  "Wellness & Health Screening": "-core.benefitTypes.wellness-",
  "Emergency Evacuation": "-core.benefitTypes.emergencyEvacution-",
  "Alternative Medicines": "-core.benefitTypes.alternativeMedicine-",
  "Mental Health Benefit": "-core.benefitTypes.mentalHealth-",
  "Member Web Portal": "-core.benefitTypes.memberWebPortal-",
  "Mobile Application": "-core.benefitTypes.mobileApplication-",
  "Virtual / Tele Doctor": "-core.benefitTypes.virtualTele-",
  "Other Services": "-core.benefitTypes.otherServices-",
  "Extended Evacuation": "-core.benefitTypes.extendedEvacuation-",
  "Non Emergency Evacuation": "-core.benefitTypes.nonEmergency-",
  "Dental 1": "-core.benefitTypes.dental-",
  "Dental Waiting Period 1": "-core.benefitTypes.dentalWaitingPeriod-",
  "Medical Evacuation": "-core.benefitTypes.medicalEvacution-",
};

export const paymentFrequencies: {
  [key: string]: {
    label: string;
    modOption: {
      id: string;
      description: string;
      title: string;
      label: string;
      premiumMod: premiumMod;
    };
  };
} = {
  semiAnnual: {
    label: "Semi Annual Surcharge",
    modOption: {
      id: "semi-annual-payment-surcharge",
      description: "Semmi-annual payment",
      title: "Semi-annual payment",
      label: "Semi-annual",
      premiumMod: {
        type: "percentage",
        price: [],
      },
    },
  },
  quarter: {
    label: "Quarterly Surcharge",
    modOption: {
      id: "quarterly-payment-surcharge",
      title: "Quarterly Surcharge payment",
      label: "Quarterly Surcharge",
      description: "Quarterly Surcharge payment frequency",
      premiumMod: {
        type: "percentage",
        price: [],
      },
    },
  },
  month: {
    label: "Monthly Surcharge",
    modOption: {
      id: "monthly-payment-surcharge",
      title: "Monthly Surcharge payment",
      label: "Monthly Surcharge",
      description: "Monthly Surcharge payment frequency",
      premiumMod: {
        type: "percentage",
        price: [],
      },
    },
  },
};

export const dependentTypeArr: dependentType[] = [
  "dependsOn",
  "dependentModifiers",
];

export const BenefitNamesV1 = {
  annualLimit: "Annual Limit",
  accommodationType: "Accommodation Type",
  inPatientHospitalisation: "In-patient (Hospitalization & Surgery)",
  outPatient: "Out-patient benefits",
  physiotherapy: "Physiotherapy",
  emergencyEvacuation: "Emergency Evacuation",
  chronicConditions: "Chronic Condition Cover",
  preExistingCover: "Pre-existing Condition Cover",
  routineMaternity: "Maternity (Consultations, Scans and Delivery)",
  maternityWaitingPeriod: "Maternity Waiting Period",
  complicationsPregnancy: "Complications of Pregnancy",
  newBornCoverage: "New Born Cover",
  dental: "Dental",
  dentalWaitingPeriod: "Dental Waiting Period",
  opticalBenefits: "Optical Benefits",
  wellness: "Wellness & Health Screening",
  semiAnnualSurcharge: "Semi Annual Surcharge",
  quarterlySurcharge: "Quarterly Surcharge",
  monthlySurcharge: "Monthly Surcharge",
  routineMaternityFilter: "Routine Maternity",
  wellnessFilter: "Wellness",
  opticalFilter: "Optical",
  dentalFilter: "Dental",
};

export const DBpath = {
  dev: "saleslabdev",
  prod: "saleslabprod",
};
