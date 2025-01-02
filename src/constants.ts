import {
  EnumConditionsTypes,
  PremiumModType,
  Residencies,
  dependentType,
  premiumMod,
} from "./helper/interfaces";

export const fileTypes = {
  rateSheet: "rateSheet",
  benefits: "benefits",
  info: "info",
  addons: "addons",
  conversion: "conversion",
  multiCurrencyBenefits: "multiCurrencyBenefits",
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
  none: "none",
  Annually: "Annually",
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

export const InfoResidencies = [
  "UAE",
  "NE",
  "Dubai",
  "AbuDhabi",
  "NE_Dubai",
  "Latin",
  "Argentina",
  "Bolivia",
  "Guatemala & Martinique",
  "Honduras",
  "Belize, Nicaragua & El Salvador",
  "Panama & Puerto Rico",
  "Costa Rica",
  "Mexico",
  "ROW",
];

export const V2Residencies: { [key: string]: string[][] } = {
  UAE: [["AE-DU", "AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"], []],
  NE: [
    ["AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
    ["AE-DU", "AE-AZ"],
  ],
  Dubai: [["AE-DU"], ["AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"]],
  AbuDhabi: [["AE-AZ"], ["AE-DU", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"]],
  NE_Dubai: [["AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ", "AE-DU"], ["AE-AZ"]],
  Latin: [
    [
      "CO", // Colombia
      "PE", // Peru
      "VE", // Venezuela
      "UY", // Uruguay
      "GF", // French Guiana (Note: GF is for French Guiana, which is an overseas department of France)
      "EC", // Ecuador
      "PY", // Paraguay
      "DO", // Dominican Republic
      "CU", // Cuba
      "BZ", // Belize
      "SR", // Suriname
      "CL", // Chile
      "NI", // Nicaragua
      "HT", // Haiti
      "GY", // Guyana
    ],
    [],
  ],
  Argentina: [["AR"], []],
  Bolivia: [["BO"], []],
  "Guatemala & Martinique": [["GT", "MQ"], []],
  Honduras: [["HN"], []],
  "Belize, Nicaragua & El Salvador": [["BZ", "NI", "SV"], []],
  "Panama & Puerto Rico": [["PA", "PR"], []],
  "Costa Rica": [["CR"], []],
  Mexico: [["MX"], []],
  ROW: [[...coveredCountries], []],
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
  frequency: "-Enum.conditions.modifier-",
  currency: "-Enum.conditions.currency-",
  residency: "-Enum.conditions.residency-",
  custom: "custom",
  benefitId:"benefitId"
};

export const BenefitTypes = {
  type: "type",
  none: "none",
  Pro: "Pro",
  All: "All",
  Starter: "Starter",
};

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
      {
        userType: "-Enum.userType.All-",
        benefitTypes: ["-core.benefitTypes.physiotherapy-"],
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
          "-core.benefitTypes.virtualTeleDoctor-",
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
  "Annual Limit": "-core.benefitTypes.annualLimit-",
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
  "Virtual / Tele Doctor": "-core.benefitTypes.virtualTeleDoctor-",
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
    label: "Semi Annual",
    modOption: {
      id: "semi-annual-payment-surcharge",
      description: "Semmi-annual payment",
      title: "Semi-annual payment",
      label: "Semi-annual",
      premiumMod: {
        type: PremiumModType.Percentage,
        price: [],
      },
    },
  },
  quarter: {
    label: "Quarterly",
    modOption: {
      id: "quarterly-payment-surcharge",
      title: "Quarterly payment",
      label: "Quarterly",
      description: "Quarterly payment frequency",
      premiumMod: {
        type: PremiumModType.Percentage,
        price: [],
      },
    },
  },
  month: {
    label: "Monthly",
    modOption: {
      id: "monthly-payment-surcharge",
      title: "Monthly payment",
      label: "Monthly",
      description: "Monthly payment frequency",
      premiumMod: {
        type: PremiumModType.Percentage,
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
  dentalFilter: "Dental Filter",
};

export const DBpath = {
  dev: "saleslabdev",
  prod: "saleslabprod",
};

export const customConditions: any = {
  single: [
    {
      type: "-Enum.customer.config-",
      value: [
        {
          type: "-Enum.customer.category-",
          value: "-Enum.category.primary-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Spouse-",
          count: "==0",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Child-",
          count: "<=1",
        },
      ],
    },
  ],
  single2: [
    {
      type: "-Enum.customer.config-",
      value: [
        {
          type: "-Enum.customer.category-",
          value: "-Enum.category.primary-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Spouse-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Child-",
          count: "==0",
        },
      ],
    },
  ],
  family: [
    {
      type: "-Enum.customer.config-",
      value: [
        {
          type: "-Enum.customer.category-",
          value: "-Enum.category.primary-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Spouse-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Child-",
          count: ">=1",
        },
      ],
    },
  ],
  family2: [
    {
      type: "-Enum.customer.config-",
      value: [
        {
          type: "-Enum.customer.category-",
          value: "-Enum.category.primary-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Spouse-",
          count: "==0",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Child-",
          count: ">=2",
        },
      ],
    },
  ],
  oneAdult: [
    {
      type: "-Enum.customer.config-",
      value: [
        {
          type: "-Enum.customer.category-",
          value: "-Enum.category.primary-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Spouse-",
          count: "==0",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Child-",
          count: "==0",
        },
      ],
    },
    {
      type: "-Enum.customer.gender-",
      value: "-Enum.gender.female-",
    },
  ],
  twoAdult: [
    {
      type: "-Enum.customer.config-",
      value: [
        {
          type: "-Enum.customer.category-",
          value: "-Enum.category.primary-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Spouse-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Child-",
          count: ">=0",
        },
      ],
    },
    {
      type: "-Enum.customer.maritalStatus-",
      value: "-Enum.maritalStatus.married-",
    },
    {
      type: "-Enum.customer.gender-",
      value: "-Enum.gender.female-",
    },
  ],
  SingleChild_0: [
    {
      type: "-Enum.customer.config-",
      value: [
        {
          type: "-Enum.customer.category-",
          value: "-Enum.category.primary-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Spouse-",
          count: "==0",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Child-",
          count: ">=0",
        },
      ],
    },
  ],
  SingleChild_1a: [
    {
      type: "-Enum.customer.config-",
      value: [
        {
          type: "-Enum.customer.category-",
          value: "-Enum.category.primary-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Spouse-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Child-",
          count: "==1",
        },
      ],
    },
  ],
  SingleChild_1b: [
    {
      type: "-Enum.customer.config-",
      value: [
        {
          type: "-Enum.customer.category-",
          value: "-Enum.category.primary-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Spouse-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Child-",
          count: "==0",
        },
      ],
    },
  ],
  SingleChild_2: [
    {
      type: "-Enum.customer.config-",
      value: [
        {
          type: "-Enum.customer.category-",
          value: "-Enum.category.primary-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Spouse-",
          count: "==1",
        },
        {
          type: "-Enum.customer.relation-",
          value: "-Enum.relation.Child-",
          count: ">=2",
        },
      ],
    },
  ],
};

export const customResidencies: { [key: string]: string[] } = {
  Range1: ["KM", "ER", "MZ", "PK", "PH", "LK"],
  Range2: ["DZ", "AO", "ET", "ML", "TW"],
  Range3: [
    "AF",
    "AL",
    "AZ",
    "BJ",
    "BA",
    "BW",
    "KH",
    "CM",
    "CA",
    "TD",
    "DJ",
    "FO",
    "GH",
    "GL",
    "GN",
    "GW",
    "IN",
    "JP",
    "KZ",
    "MG",
    "MR",
    "MA",
    "NG",
    "OM",
    "PG",
    "QA",
    "SA",
    "TG",
  ],
  Range4: [
    "AM",
    "BY",
    "BF",
    "BI",
    "CF",
    "CK",
    "GQ",
    "FJ",
    "GA",
    "GE",
    "GU",
    "JO",
    "KG",
    "KS",
    "LB",
    "LS",
    "LR",
    "LY",
    "MW",
    "MV",
    "MU",
    "MD",
    "ME",
    "NA",
    "NP",
    "NC",
    "NZ",
    "NE",
    "NU",
    "MP",
    "RW",
    "WS",
    "SN",
    "RS",
    "SC",
    "SL",
    "SB",
    "SO",
    "TL",
    "TO",
    "TN",
    "TM",
    "UG",
    "UA",
    "UZ",
    "VU",
    "VN",
    "ZM",
    "ZW",
  ],
  Range5: [
    "BT",
    "CX",
    "CC",
    "GF",
    "PF",
    "KI",
    "MH",
    "YT",
    "FM",
    "NR",
    "NF",
    "PW",
    "SM",
    "ST",
    "TJ",
    "TK",
    "TV",
    "WF",
    "EH",
  ],
  Range6: [
    "AS",
    "AI",
    "AG",
    "AR",
    "AW",
    "BH",
    "BD",
    "BB",
    "BZ",
    "BM",
    "BO",
    "VG",
    "KY",
    "CL",
    "CO",
    "CR",
    "CU",
    "DM",
    "DO",
    "EC",
    "SV",
    "GD",
    "GP",
    "GG",
    "GY",
    "HT",
    "IQ",
    "IM",
    "JM",
    "JE",
    "KW",
    "MQ",
    "MN",
    "MS",
    "NI",
    "PA",
    "PY",
    "PE",
    "PR",
    "KN",
    "LC",
    "PM",
    "VC",
    "GS",
    "SS",
    "SD",
    "SR",
    "TT",
    "TC",
    "UY",
    "VE",
    "YE",
  ],
  Range7: ["IL"],
  Range8: ["AD", "GT", "HN", "MX"],
};
