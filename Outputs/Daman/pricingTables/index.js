const Daman = require("../core-index.js");
const Enum = require("../../enum.js");
const core = require("../../core");

let pricingTables = [
  {
    _id: Daman.pricingTables.Premier.Worldwide,
    plan: Daman.plans.Premier,
    annualLimit: [{ currency: "AED", value: 20000000 }],
    startDate: "1970-01-01T00:00:45.292Z",
    endDate: "1970-01-01T00:00:45.657Z",
    includedResidence: ["AE-DU"],
    excludedResidence: ["AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
    coverage: [Daman.coverages.Worldwide],
    baseAnnualPremium: [],
  },
  {
    _id: Daman.pricingTables.Platinum.Worldwide,
    plan: Daman.plans.Platinum,
    annualLimit: [{ currency: "AED", value: 5000000 }],
    startDate: "1970-01-01T00:00:45.292Z",
    endDate: "1970-01-01T00:00:45.657Z",
    includedResidence: ["AE-DU"],
    excludedResidence: ["AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
    coverage: [Daman.coverages.Worldwide],
    baseAnnualPremium: [],
  },
  {
    _id: Daman.pricingTables.Gold.WorldwideExcludingUSAAndCanada,
    plan: Daman.plans.Gold,
    annualLimit: [{ currency: "AED", value: 2500000 }],
    startDate: "1970-01-01T00:00:45.292Z",
    endDate: "1970-01-01T00:00:45.657Z",
    includedResidence: ["AE-DU"],
    excludedResidence: ["AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
    coverage: [Daman.coverages.WorldwideExcludingUSAAndCanada],
    baseAnnualPremium: [],
  },
  {
    _id: Daman.pricingTables.Silver
      .ArabWorldAsia2EmergencyCoverWorldwideExcludingUSAAndCanada,
    plan: Daman.plans.Silver,
    annualLimit: [{ currency: "AED", value: 300000 }],
    startDate: "1970-01-01T00:00:45.292Z",
    endDate: "1970-01-01T00:00:45.657Z",
    includedResidence: ["AE-DU"],
    excludedResidence: ["AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
    coverage: [
      Daman.coverages
        .ArabWorldAsia2EmergencyCoverWorldwideExcludingUSAAndCanada,
    ],
    baseAnnualPremium: [],
  },
  {
    _id: Daman.pricingTables.Bronze
      .ArabWorldAsia2EmergencyCoverWorldwideExcludingUSAAndCanada,
    plan: Daman.plans.Bronze,
    annualLimit: [{ currency: "AED", value: 250000 }],
    startDate: "1970-01-01T00:00:45.292Z",
    endDate: "1970-01-01T00:00:45.657Z",
    includedResidence: ["AE-DU"],
    excludedResidence: ["AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
    coverage: [
      Daman.coverages
        .ArabWorldAsia2EmergencyCoverWorldwideExcludingUSAAndCanada,
    ],
    baseAnnualPremium: [],
  },
  {
    _id: Daman.pricingTables.Essential
      .UAEExtendedToSoutheastAsiaIndiaSubcontinentAndArabCountryForInpatientTreatmentOnlyOnReimbursementBasisForElectiveAndEmergencyTreatment,
    plan: Daman.plans.Essential,
    annualLimit: [{ currency: "AED", value: 160000 }],
    startDate: "1970-01-01T00:00:45.292Z",
    endDate: "1970-01-01T00:00:45.657Z",
    includedResidence: ["AE-DU"],
    excludedResidence: ["AE-AZ", "AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ"],
    coverage: [
      Daman.coverages
        .UAEExtendedToSoutheastAsiaIndiaSubcontinentAndArabCountryForInpatientTreatmentOnlyOnReimbursementBasisForElectiveAndEmergencyTreatment,
    ],
    baseAnnualPremium: [],
  },
];
module.exports = pricingTables;