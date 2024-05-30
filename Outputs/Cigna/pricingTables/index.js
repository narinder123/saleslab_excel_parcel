const Cigna = require("../core-index.js");

const core = require("../../core");

let pricingTables = [
  {
    _id: Cigna.pricingTables.InternationalPlus.WorldwideIncludingUSA,
    plan: Cigna.plans.InternationalPlus,
    annualLimit: [],
    startDate: "1970-01-01T00:00:45.292Z",
    endDate: "1970-01-01T00:00:45.657Z",
    includedResidence: ["AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ", "AE-DU"],
    excludedResidence: ["AE-AZ"],
    coverage: [Cigna.coverages.WorldwideIncludingUSA],
    baseAnnualPremium: [
      {
        fromAge: 0,
        toAge: 83,
        gender: Enum.gender.male,
        price: [{ value: 0, currency: Enum.currency.USD }],
      },
      {
        fromAge: 0,
        toAge: 83,
        gender: Enum.gender.female,
        price: [{ value: 0, currency: Enum.currency.USD }],
      },
    ],
  },
  {
    _id: Cigna.pricingTables.InternationalPlus.WorldwideExcludingUSA,
    plan: Cigna.plans.InternationalPlus,
    annualLimit: [],
    startDate: "1970-01-01T00:00:45.292Z",
    endDate: "1970-01-01T00:00:45.657Z",
    includedResidence: ["AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ", "AE-DU"],
    excludedResidence: ["AE-AZ"],
    coverage: [Cigna.coverages.WorldwideExcludingUSA],
    baseAnnualPremium: [
      {
        fromAge: 0,
        toAge: 83,
        gender: Enum.gender.male,
        price: [{ value: 0, currency: Enum.currency.USD }],
      },
      {
        fromAge: 0,
        toAge: 83,
        gender: Enum.gender.female,
        price: [{ value: 0, currency: Enum.currency.USD }],
      },
    ],
  },
  {
    _id: Cigna.pricingTables.International.WorldwideIncludingUSA,
    plan: Cigna.plans.International,
    annualLimit: [{ currency: "USD", value: 2000000 }],
    startDate: "1970-01-01T00:00:45.292Z",
    endDate: "1970-01-01T00:00:45.657Z",
    includedResidence: ["AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ", "AE-DU"],
    excludedResidence: ["AE-AZ"],
    coverage: [Cigna.coverages.WorldwideIncludingUSA],
    baseAnnualPremium: [
      {
        fromAge: 0,
        toAge: 83,
        gender: Enum.gender.male,
        price: [{ value: 0, currency: Enum.currency.USD }],
      },
      {
        fromAge: 0,
        toAge: 83,
        gender: Enum.gender.female,
        price: [{ value: 0, currency: Enum.currency.USD }],
      },
    ],
  },
  {
    _id: Cigna.pricingTables.International.WorldwideExcludingUSA,
    plan: Cigna.plans.International,
    annualLimit: [{ currency: "USD", value: 2000000 }],
    startDate: "1970-01-01T00:00:45.292Z",
    endDate: "1970-01-01T00:00:45.657Z",
    includedResidence: ["AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ", "AE-DU"],
    excludedResidence: ["AE-AZ"],
    coverage: [Cigna.coverages.WorldwideExcludingUSA],
    baseAnnualPremium: [
      {
        fromAge: 0,
        toAge: 83,
        gender: Enum.gender.male,
        price: [{ value: 0, currency: Enum.currency.USD }],
      },
      {
        fromAge: 0,
        toAge: 83,
        gender: Enum.gender.female,
        price: [{ value: 0, currency: Enum.currency.USD }],
      },
    ],
  },
  {
    _id: Cigna.pricingTables.Regional.Regional,
    plan: Cigna.plans.Regional,
    annualLimit: [{ currency: "USD", value: 750000 }],
    startDate: "1970-01-01T00:00:45.292Z",
    endDate: "1970-01-01T00:00:45.657Z",
    includedResidence: ["AE-AJ", "AE-FU", "AE-SH", "AE-RK", "AE-UQ", "AE-DU"],
    excludedResidence: ["AE-AZ"],
    coverage: [Cigna.coverages.Regional],
    baseAnnualPremium: [
      {
        fromAge: 0,
        toAge: 83,
        gender: Enum.gender.male,
        price: [{ value: 0, currency: Enum.currency.USD }],
      },
      {
        fromAge: 0,
        toAge: 83,
        gender: Enum.gender.female,
        price: [{ value: 0, currency: Enum.currency.USD }],
      },
    ],
  },
];
module.exports = pricingTables;
