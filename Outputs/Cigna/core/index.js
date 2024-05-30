const Cigna = require("../core-index.js");

let core = {
  provider: generateMongoIdFromString("Cigna"),
  plans: {
    InternationalPlus: generateMongoIdFromString("Cigna InternationalPlus "),
    International: generateMongoIdFromString("Cigna International "),
    Regional: generateMongoIdFromString("Cigna Regional "),
  },
  coverages: {
    WorldwideIncludingUSA: generateMongoIdFromString(
      "Cigna WorldwideIncludingUSA "
    ),
    WorldwideExcludingUSA: generateMongoIdFromString(
      "Cigna WorldwideExcludingUSA "
    ),
    Regional: generateMongoIdFromString("Cigna Regional "),
  },
  pricingTables: {
    InternationalPlus: {
      WorldwideIncludingUSA: generateMongoIdFromString(
        "Cigna International Plus Worldwide including USA "
      ),
      WorldwideExcludingUSA: generateMongoIdFromString(
        "Cigna International Plus Worldwide excluding USA "
      ),
    },
    International: {
      WorldwideIncludingUSA: generateMongoIdFromString(
        "Cigna International Worldwide including USA "
      ),
      WorldwideExcludingUSA: generateMongoIdFromString(
        "Cigna International Worldwide excluding USA "
      ),
    },
    Regional: {
      Regional: generateMongoIdFromString("Cigna Regional Regional "),
    },
  },
  modifiers: {
    benefits: {
      ClaimsHandling: generateMongoIdFromString("Cigna ClaimsHandling "),
      ChronicConditionCover: generateMongoIdFromString(
        "Cigna ChronicConditionCover "
      ),
      PreExistingConditionCover: generateMongoIdFromString(
        "Cigna PreExistingConditionCover "
      ),
      AccommodationType: generateMongoIdFromString("Cigna AccommodationType "),
      InPatientHospitalizationAndSurgery: generateMongoIdFromString(
        "Cigna InPatientHospitalizationAndSurgery "
      ),
      DiagnosticsAndTest: generateMongoIdFromString(
        "Cigna DiagnosticsAndTest "
      ),
      SurgeriesAndAnesthesia: generateMongoIdFromString(
        "Cigna SurgeriesAndAnesthesia "
      ),
      Oncology: generateMongoIdFromString("Cigna Oncology "),
      OrganTransplant: generateMongoIdFromString("Cigna OrganTransplant "),
      OutPatientBenefits: generateMongoIdFromString(
        "Cigna OutPatientBenefits "
      ),
      OutPatientConsultations: generateMongoIdFromString(
        "Cigna OutPatientConsultations "
      ),
      OutPatientSpecialists: generateMongoIdFromString(
        "Cigna OutPatientSpecialists "
      ),
      OutPatientMedicines: generateMongoIdFromString(
        "Cigna OutPatientMedicines "
      ),
      Vaccination: generateMongoIdFromString("Cigna Vaccination "),
      ScansAndDiagnosticTests: generateMongoIdFromString(
        "Cigna ScansAndDiagnosticTests "
      ),
      Physiotherapy: generateMongoIdFromString("Cigna Physiotherapy "),
      MaternityConsultationsScansAndDelivery: generateMongoIdFromString(
        "Cigna MaternityConsultationsScansAndDelivery "
      ),
      MaternityWaitingPeriod: generateMongoIdFromString(
        "Cigna MaternityWaitingPeriod "
      ),
      ComplicationsOfPregnancy: generateMongoIdFromString(
        "Cigna ComplicationsOfPregnancy "
      ),
      NewBornCover: generateMongoIdFromString("Cigna NewBornCover "),
      "Dental ": generateMongoIdFromString("Cigna Dental  "),
      "DentalWaitingPeriod ": generateMongoIdFromString(
        "Cigna DentalWaitingPeriod  "
      ),
      OpticalBenefits: generateMongoIdFromString("Cigna OpticalBenefits "),
      WellnessAndHealthScreening: generateMongoIdFromString(
        "Cigna WellnessAndHealthScreening "
      ),
      AlternativeMedicines: generateMongoIdFromString(
        "Cigna AlternativeMedicines "
      ),
      MentalHealthBenefit: generateMongoIdFromString(
        "Cigna MentalHealthBenefit "
      ),
      EmergencyEvacuation: generateMongoIdFromString(
        "Cigna EmergencyEvacuation "
      ),
      VirtualOrTeleDoctor: generateMongoIdFromString(
        "Cigna VirtualOrTeleDoctor "
      ),
      MemberWebPortal: generateMongoIdFromString("Cigna MemberWebPortal "),
      MobileApplication: generateMongoIdFromString("Cigna MobileApplication "),
      SemiAnnualSurcharge: generateMongoIdFromString(
        "Cigna SemiAnnualSurcharge "
      ),
    },
    networks: {
      InternationalPlus: generateMongoIdFromString("Cigna InternationalPlus "),
      International: generateMongoIdFromString("Cigna International "),
      Regional: generateMongoIdFromString("Cigna Regional "),
    },
    paymentFrequency: generateMongoIdFromString("Cigna paymentFrequency "),
    deductible: generateMongoIdFromString("Cigna deductible "),
    discount: generateMongoIdFromString("Cigna discount "),
  },
};
module.exports = core;
