const Cigna = require("../core-index.js");

const core = require("../../core");

let plans = [
  {
    _id: Cigna.plans.InternationalPlus,
    provider: Cigna.providers,
    title: "International Plus",
    notes: "",
    benefitCategories: [
      {
        categoryTitle: "General Benefits",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.chronicConditions,
              core.benefitTypes.preExistingCoverCondition,
            ],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [core.benefitTypes.claimHandling],
          },
        ],
      },
      {
        categoryTitle: "In-patient (Hospitalization & Surgery)",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [core.benefitTypes.accomodation],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.diagnosticsAndTest,
              core.benefitTypes.organTransplant,
              core.benefitTypes.surgeriesAndAnthesia,
              core.benefitTypes.oncology,
            ],
          },
          {
            userType: Enum.userType.Starter,
            benefitTypes: [
              core.benefitTypes.inPatientHospitializationandsurgery,
            ],
          },
        ],
      },
      {
        categoryTitle:
          "Out-patient (Consultations, Lab & Diagnostics, Pharmacy, Physiotherapy)",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [core.benefitTypes.physiotherapy],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.outPatientConsultation,
              core.benefitTypes.specialist,
              core.benefitTypes.medicine,
              core.benefitTypes.vaccination,
              core.benefitTypes.tests,
            ],
          },
          {
            userType: Enum.userType.Starter,
            benefitTypes: [core.benefitTypes.outPatientBenefit],
          },
        ],
      },
      {
        categoryTitle: "Maternity",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.maternity,
              core.benefitTypes.maternityWaitingPeriod,
            ],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.complicationOfPregnancy,
              core.benefitTypes.newBornCoverage,
            ],
          },
        ],
      },
      {
        categoryTitle: "Dental Benefit",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.dental,
              core.benefitTypes.dentalWaitingPeriod,
            ],
          },
        ],
      },
      {
        categoryTitle: "Additional Benefits",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.optical,
              core.benefitTypes.wellness,
              core.benefitTypes.emergencyEvacution,
            ],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.alternativeMedicine,
              core.benefitTypes.mentalHealth,
              core.benefitTypes.memberWebPortal,
              core.benefitTypes.mobileApplication,
              core.benefitTypes.virtualTele,
              core.benefitTypes.otherServices,
            ],
          },
        ],
      },
      {
        categoryTitle: "Added (Optional) Benefits",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.extendedEvacuation,
              core.benefitTypes.nonEmergency,
            ],
          },
        ],
      },
    ],
    pricingTables: [
      Cigna.pricingTables.InternationalPlus.WorldwideIncludingUSA,
      Cigna.pricingTables.InternationalPlus.WorldwideExcludingUSA,
    ],
    modifiers: [
      Cigna.modifiers.benefits.GeneralBenefits,
      Cigna.modifiers.benefits.ClaimsHandling,
      Cigna.modifiers.benefits.ChronicConditionCover,
      Cigna.modifiers.benefits.PreExistingConditionCover,
      Cigna.modifiers.benefits.InPatientHospitalizationAndSurgeryTYPE,
      Cigna.modifiers.benefits.AccommodationType,
      Cigna.modifiers.benefits.InPatientHospitalizationAndSurgery,
      Cigna.modifiers.benefits.DiagnosticsAndTest,
      Cigna.modifiers.benefits.SurgeriesAndAnesthesia,
      Cigna.modifiers.benefits.Oncology,
      Cigna.modifiers.benefits.OrganTransplant,
      Cigna.modifiers.benefits
        .OutPatientConsultationsLabAndDiagnosticsPharmacyPhysiotherapy,
      Cigna.modifiers.benefits.OutPatientBenefits,
      Cigna.modifiers.benefits.OutPatientConsultations,
      Cigna.modifiers.benefits.OutPatientSpecialists,
      Cigna.modifiers.benefits.OutPatientMedicines,
      Cigna.modifiers.benefits.Vaccination,
      Cigna.modifiers.benefits.ScansAndDiagnosticTests,
      Cigna.modifiers.benefits.Physiotherapy,
      Cigna.modifiers.benefits.Maternity,
      Cigna.modifiers.benefits.MaternityConsultationsScansAndDelivery,
      Cigna.modifiers.benefits.MaternityWaitingPeriod,
      Cigna.modifiers.benefits.ComplicationsOfPregnancy,
      Cigna.modifiers.benefits.NewBornCover,
      Cigna.modifiers.benefits.DentalBenefit,
      Cigna.modifiers.benefits.Dental,
      Cigna.modifiers.benefits.DentalWaitingPeriod,
      Cigna.modifiers.benefits.AdditionalBenefits,
      Cigna.modifiers.benefits.OpticalBenefits,
      Cigna.modifiers.benefits.WellnessAndHealthScreening,
      Cigna.modifiers.benefits.AlternativeMedicines,
      Cigna.modifiers.benefits.MentalHealthBenefit,
      Cigna.modifiers.benefits.EmergencyEvacuation,
      Cigna.modifiers.benefits.VirtualOrTeleDoctor,
      Cigna.modifiers.benefits.MemberWebPortal,
      Cigna.modifiers.benefits.MobileApplication,
      Cigna.modifiers.benefits.SemiAnnualSurcharge,
      Cigna.modifiers.benefits.MonthlySurcharge,
    ],
  },
  {
    _id: Cigna.plans.International,
    provider: Cigna.providers,
    title: "International",
    notes: "",
    benefitCategories: [
      {
        categoryTitle: "General Benefits",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.chronicConditions,
              core.benefitTypes.preExistingCoverCondition,
            ],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [core.benefitTypes.claimHandling],
          },
        ],
      },
      {
        categoryTitle: "In-patient (Hospitalization & Surgery)",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [core.benefitTypes.accomodation],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.diagnosticsAndTest,
              core.benefitTypes.organTransplant,
              core.benefitTypes.surgeriesAndAnthesia,
              core.benefitTypes.oncology,
            ],
          },
          {
            userType: Enum.userType.Starter,
            benefitTypes: [
              core.benefitTypes.inPatientHospitializationandsurgery,
            ],
          },
        ],
      },
      {
        categoryTitle:
          "Out-patient (Consultations, Lab & Diagnostics, Pharmacy, Physiotherapy)",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [core.benefitTypes.physiotherapy],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.outPatientConsultation,
              core.benefitTypes.specialist,
              core.benefitTypes.medicine,
              core.benefitTypes.vaccination,
              core.benefitTypes.tests,
            ],
          },
          {
            userType: Enum.userType.Starter,
            benefitTypes: [core.benefitTypes.outPatientBenefit],
          },
        ],
      },
      {
        categoryTitle: "Maternity",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.maternity,
              core.benefitTypes.maternityWaitingPeriod,
            ],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.complicationOfPregnancy,
              core.benefitTypes.newBornCoverage,
            ],
          },
        ],
      },
      {
        categoryTitle: "Dental Benefit",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.dental,
              core.benefitTypes.dentalWaitingPeriod,
            ],
          },
        ],
      },
      {
        categoryTitle: "Additional Benefits",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.optical,
              core.benefitTypes.wellness,
              core.benefitTypes.emergencyEvacution,
            ],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.alternativeMedicine,
              core.benefitTypes.mentalHealth,
              core.benefitTypes.memberWebPortal,
              core.benefitTypes.mobileApplication,
              core.benefitTypes.virtualTele,
              core.benefitTypes.otherServices,
            ],
          },
        ],
      },
      {
        categoryTitle: "Added (Optional) Benefits",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.extendedEvacuation,
              core.benefitTypes.nonEmergency,
            ],
          },
        ],
      },
    ],
    pricingTables: [
      Cigna.pricingTables.International.WorldwideIncludingUSA,
      Cigna.pricingTables.International.WorldwideExcludingUSA,
    ],
    modifiers: [
      Cigna.modifiers.benefits.GeneralBenefits,
      Cigna.modifiers.benefits.ClaimsHandling,
      Cigna.modifiers.benefits.ChronicConditionCover,
      Cigna.modifiers.benefits.PreExistingConditionCover,
      Cigna.modifiers.benefits.InPatientHospitalizationAndSurgeryTYPE,
      Cigna.modifiers.benefits.AccommodationType,
      Cigna.modifiers.benefits.InPatientHospitalizationAndSurgery,
      Cigna.modifiers.benefits.DiagnosticsAndTest,
      Cigna.modifiers.benefits.SurgeriesAndAnesthesia,
      Cigna.modifiers.benefits.Oncology,
      Cigna.modifiers.benefits.OrganTransplant,
      Cigna.modifiers.benefits
        .OutPatientConsultationsLabAndDiagnosticsPharmacyPhysiotherapy,
      Cigna.modifiers.benefits.OutPatientBenefits,
      Cigna.modifiers.benefits.OutPatientConsultations,
      Cigna.modifiers.benefits.OutPatientSpecialists,
      Cigna.modifiers.benefits.OutPatientMedicines,
      Cigna.modifiers.benefits.Vaccination,
      Cigna.modifiers.benefits.ScansAndDiagnosticTests,
      Cigna.modifiers.benefits.Physiotherapy,
      Cigna.modifiers.benefits.Maternity,
      Cigna.modifiers.benefits.MaternityConsultationsScansAndDelivery,
      Cigna.modifiers.benefits.MaternityWaitingPeriod,
      Cigna.modifiers.benefits.ComplicationsOfPregnancy,
      Cigna.modifiers.benefits.NewBornCover,
      Cigna.modifiers.benefits.DentalBenefit,
      Cigna.modifiers.benefits.Dental,
      Cigna.modifiers.benefits.DentalWaitingPeriod,
      Cigna.modifiers.benefits.AdditionalBenefits,
      Cigna.modifiers.benefits.OpticalBenefits,
      Cigna.modifiers.benefits.WellnessAndHealthScreening,
      Cigna.modifiers.benefits.AlternativeMedicines,
      Cigna.modifiers.benefits.MentalHealthBenefit,
      Cigna.modifiers.benefits.EmergencyEvacuation,
      Cigna.modifiers.benefits.VirtualOrTeleDoctor,
      Cigna.modifiers.benefits.MemberWebPortal,
      Cigna.modifiers.benefits.MobileApplication,
      Cigna.modifiers.benefits.SemiAnnualSurcharge,
      Cigna.modifiers.benefits.MonthlySurcharge,
    ],
  },
  {
    _id: Cigna.plans.Regional,
    provider: Cigna.providers,
    title: "Regional",
    notes: "",
    benefitCategories: [
      {
        categoryTitle: "General Benefits",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.chronicConditions,
              core.benefitTypes.preExistingCoverCondition,
            ],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [core.benefitTypes.claimHandling],
          },
        ],
      },
      {
        categoryTitle: "In-patient (Hospitalization & Surgery)",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [core.benefitTypes.accomodation],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.diagnosticsAndTest,
              core.benefitTypes.organTransplant,
              core.benefitTypes.surgeriesAndAnthesia,
              core.benefitTypes.oncology,
            ],
          },
          {
            userType: Enum.userType.Starter,
            benefitTypes: [
              core.benefitTypes.inPatientHospitializationandsurgery,
            ],
          },
        ],
      },
      {
        categoryTitle:
          "Out-patient (Consultations, Lab & Diagnostics, Pharmacy, Physiotherapy)",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [core.benefitTypes.physiotherapy],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.outPatientConsultation,
              core.benefitTypes.specialist,
              core.benefitTypes.medicine,
              core.benefitTypes.vaccination,
              core.benefitTypes.tests,
            ],
          },
          {
            userType: Enum.userType.Starter,
            benefitTypes: [core.benefitTypes.outPatientBenefit],
          },
        ],
      },
      {
        categoryTitle: "Maternity",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.maternity,
              core.benefitTypes.maternityWaitingPeriod,
            ],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.complicationOfPregnancy,
              core.benefitTypes.newBornCoverage,
            ],
          },
        ],
      },
      {
        categoryTitle: "Dental Benefit",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.dental,
              core.benefitTypes.dentalWaitingPeriod,
            ],
          },
        ],
      },
      {
        categoryTitle: "Additional Benefits",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.optical,
              core.benefitTypes.wellness,
              core.benefitTypes.emergencyEvacution,
            ],
          },
          {
            userType: Enum.userType.Pro,
            benefitTypes: [
              core.benefitTypes.alternativeMedicine,
              core.benefitTypes.mentalHealth,
              core.benefitTypes.memberWebPortal,
              core.benefitTypes.mobileApplication,
              core.benefitTypes.virtualTele,
              core.benefitTypes.otherServices,
            ],
          },
        ],
      },
      {
        categoryTitle: "Added (Optional) Benefits",
        includedBenefits: [
          {
            userType: Enum.userType.All,
            benefitTypes: [
              core.benefitTypes.extendedEvacuation,
              core.benefitTypes.nonEmergency,
            ],
          },
        ],
      },
    ],
    pricingTables: [Cigna.pricingTables.Regional.Regional],
    modifiers: [
      Cigna.modifiers.benefits.GeneralBenefits,
      Cigna.modifiers.benefits.ClaimsHandling,
      Cigna.modifiers.benefits.ChronicConditionCover,
      Cigna.modifiers.benefits.PreExistingConditionCover,
      Cigna.modifiers.benefits.InPatientHospitalizationAndSurgeryTYPE,
      Cigna.modifiers.benefits.AccommodationType,
      Cigna.modifiers.benefits.InPatientHospitalizationAndSurgery,
      Cigna.modifiers.benefits.DiagnosticsAndTest,
      Cigna.modifiers.benefits.SurgeriesAndAnesthesia,
      Cigna.modifiers.benefits.Oncology,
      Cigna.modifiers.benefits.OrganTransplant,
      Cigna.modifiers.benefits
        .OutPatientConsultationsLabAndDiagnosticsPharmacyPhysiotherapy,
      Cigna.modifiers.benefits.OutPatientBenefits,
      Cigna.modifiers.benefits.OutPatientConsultations,
      Cigna.modifiers.benefits.OutPatientSpecialists,
      Cigna.modifiers.benefits.OutPatientMedicines,
      Cigna.modifiers.benefits.Vaccination,
      Cigna.modifiers.benefits.ScansAndDiagnosticTests,
      Cigna.modifiers.benefits.Physiotherapy,
      Cigna.modifiers.benefits.Maternity,
      Cigna.modifiers.benefits.MaternityConsultationsScansAndDelivery,
      Cigna.modifiers.benefits.MaternityWaitingPeriod,
      Cigna.modifiers.benefits.ComplicationsOfPregnancy,
      Cigna.modifiers.benefits.NewBornCover,
      Cigna.modifiers.benefits.DentalBenefit,
      Cigna.modifiers.benefits.Dental,
      Cigna.modifiers.benefits.DentalWaitingPeriod,
      Cigna.modifiers.benefits.AdditionalBenefits,
      Cigna.modifiers.benefits.OpticalBenefits,
      Cigna.modifiers.benefits.WellnessAndHealthScreening,
      Cigna.modifiers.benefits.AlternativeMedicines,
      Cigna.modifiers.benefits.MentalHealthBenefit,
      Cigna.modifiers.benefits.EmergencyEvacuation,
      Cigna.modifiers.benefits.VirtualOrTeleDoctor,
      Cigna.modifiers.benefits.MemberWebPortal,
      Cigna.modifiers.benefits.MobileApplication,
      Cigna.modifiers.benefits.SemiAnnualSurcharge,
      Cigna.modifiers.benefits.MonthlySurcharge,
    ],
  },
];
module.exports = plans;
