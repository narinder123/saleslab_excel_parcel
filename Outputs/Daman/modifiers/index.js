const Daman = require("../core-index.js");
const Enum = require("../../enum.js");
const core = require("../../core");

let modifiers = [
  {
    data: [
      {
        _id: "Daman.modifiers.benefits.ClaimsHandling",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Claims Handling",
        label: "Claims Handling",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.claimHandling],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Claims Handling",
            description: "Claims Handling",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "100% Reimbursement",
            description: "100% Reimbursement",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label:
              "80% reimbursement based on reasonable & customary charges or actual cost, whichever is less",
            description:
              "80% reimbursement based on reasonable & customary charges or actual cost, whichever is less",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                ],
              },
            ],
          },
          {
            id: "option-5",
            label:
              "50% reimbursement based on reasonable & customary charges or actual cost, whichever is less",
            description:
              "50% reimbursement based on reasonable & customary charges or actual cost, whichever is less",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.ChronicConditionCover",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Chronic Condition Cover",
        label: "Chronic Condition Cover",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.chronicConditions],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "All",
            description: "All",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Chronic Condition Cover",
            description: "Chronic Condition Cover",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered in full",
            description: "Covered in full",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.PreExistingConditionCover",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Pre-existing Condition Cover",
        label: "Pre-existing Condition Cover",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.preExistingCoverCondition],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "All",
            description: "All",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Pre-existing Condition Cover",
            description: "Pre-existing Condition Cover",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label:
              "Covered up to AED 150,000 subject to declaration *Waiting period of 6 months applicable if evidence of COC is not provided",
            description:
              "Covered up to AED 150,000 subject to declaration *Waiting period of 6 months applicable if evidence of COC is not provided",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.AccommodationType",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Accommodation Type",
        label: "Accommodation Type",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.accomodation],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "All",
            description: "All",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Accommodation Type",
            description: "Accommodation Type",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Private Room (Standard Suite)",
            description: "Private Room (Standard Suite)",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [Daman.plans.Premier, Daman.plans.Platinum],
              },
            ],
          },
          {
            id: "option-4",
            label: "Private Room (Deluxe)",
            description: "Private Room (Deluxe)",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Gold] },
            ],
          },
          {
            id: "option-5",
            label: "Private Room ",
            description: "Private Room ",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Silver] },
            ],
          },
          {
            id: "option-6",
            label: "Private Room",
            description: "Private Room",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Bronze] },
            ],
          },
          {
            id: "option-7",
            label: "Semi-private Room (Shared)",
            description: "Semi-private Room (Shared)",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.InPatientHospitalizationAndSurgery",
        plans: [Daman.plans.UserType, Daman.plans.Benefit],
        title: "In-patient (Hospitalization & Surgery)",
        label: "In-patient (Hospitalization & Surgery)",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [
          core.benefitTypes.inPatientHospitializationandsurgery,
        ],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "type",
            description: "type",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "In-patient (Hospitalization & Surgery)",
            description: "In-patient (Hospitalization & Surgery)",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.DiagnosticsAndTest",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Diagnostics & Test",
        label: "Diagnostics & Test",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.diagnosticsAndTest],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Diagnostics & Test",
            description: "Diagnostics & Test",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered in full",
            description: "Covered in full",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.SurgeriesAndAnesthesia",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Surgeries & Anesthesia",
        label: "Surgeries & Anesthesia",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.surgeriesAndAnthesia],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Surgeries & Anesthesia",
            description: "Surgeries & Anesthesia",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered in full",
            description: "Covered in full",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.Oncology",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Oncology",
        label: "Oncology",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.oncology],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Oncology",
            description: "Oncology",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered in full",
            description: "Covered in full",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.OutPatientBenefits",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Out-patient benefits ",
        label: "Out-patient benefits ",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [null],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Starter",
            description: "Starter",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Out-patient benefits ",
            description: "Out-patient benefits ",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label:
              "Medicines and diagnostics & lab tests covered in full  Consultationss covered with NIL co-pay",
            description:
              "Medicines and diagnostics & lab tests covered in full  Consultationss covered with NIL co-pay",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label:
              "Medicines and diagnostics & lab tests covered in full  Consultationss covered with 20% co-pay with AED 50  max",
            description:
              "Medicines and diagnostics & lab tests covered in full  Consultationss covered with 20% co-pay with AED 50  max",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Platinum] },
            ],
          },
          {
            id: "option-5",
            label:
              "Covered with limits (Medicines covered up to AED 10,000 with 10% co-pay), Diagnostics & lab tests covered in full Consultationss covered with 20% co-pay with AED 50  max",
            description:
              "Covered with limits (Medicines covered up to AED 10,000 with 10% co-pay), Diagnostics & lab tests covered in full Consultationss covered with 20% co-pay with AED 50  max",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                ],
              },
            ],
          },
          {
            id: "option-6",
            label:
              "Covered with limits (Medicines covered up to AED 1,500 with 20% co-pay), Diagnostics & lab tests covered in full with 10% co-pay Consultationss covered with 20% co-pay with AED 50  max",
            description:
              "Covered with limits (Medicines covered up to AED 1,500 with 20% co-pay), Diagnostics & lab tests covered in full with 10% co-pay Consultationss covered with 20% co-pay with AED 50  max",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.OutPatientConsultations",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Out-patient Consultations",
        label: "Out-patient Consultations",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.outPatientConsultation],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Out-patient Consultations",
            description: "Out-patient Consultations",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "0% co-pay",
            description: "0% co-pay",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label:
              "Consultation within Abu Dhabi - A deductible of AED 50 applicable; Consultation outside Abu Dhabi– 20% max. AED 50",
            description:
              "Consultation within Abu Dhabi - A deductible of AED 50 applicable; Consultation outside Abu Dhabi– 20% max. AED 50",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Platinum] },
            ],
          },
          {
            id: "option-5",
            label:
              "Consultation within Abu Dhabi - A deductible of AED 50 applicable; Consultation outside Abu Dhabi– 20% max. AED 50 *10% co-pay applicable in Cleveland Clinic Abu Dhabi",
            description:
              "Consultation within Abu Dhabi - A deductible of AED 50 applicable; Consultation outside Abu Dhabi– 20% max. AED 50 *10% co-pay applicable in Cleveland Clinic Abu Dhabi",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                ],
              },
            ],
          },
          {
            id: "option-6",
            label: "20% co-pay",
            description: "20% co-pay",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.OutPatientSpecialists",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Out-patient Specialists",
        label: "Out-patient Specialists",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.specialist],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Out-patient Specialists",
            description: "Out-patient Specialists",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "0% co-pay",
            description: "0% co-pay",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label:
              "Consultation within Abu Dhabi - A deductible of AED 50 applicable; Consultation outside Abu Dhabi– 20% max. AED 50",
            description:
              "Consultation within Abu Dhabi - A deductible of AED 50 applicable; Consultation outside Abu Dhabi– 20% max. AED 50",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [Daman.plans.Platinum, Daman.plans.Gold],
              },
            ],
          },
          {
            id: "option-5",
            label:
              "Consultation within Abu Dhabi - A deductible of AED 50 applicable; Consultation outside Abu Dhabi– 20% max. AED 50 *10% co-pay applicable in Cleveland Clinic Abu Dhabi",
            description:
              "Consultation within Abu Dhabi - A deductible of AED 50 applicable; Consultation outside Abu Dhabi– 20% max. AED 50 *10% co-pay applicable in Cleveland Clinic Abu Dhabi",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [Daman.plans.Silver, Daman.plans.Bronze],
              },
            ],
          },
          {
            id: "option-6",
            label: "Covered upon GP referral with 20% co-pay",
            description: "Covered upon GP referral with 20% co-pay",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.OutPatientMedicines",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Out-patient Medicines",
        label: "Out-patient Medicines",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.medicine],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Out-patient Medicines",
            description: "Out-patient Medicines",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered in full with 0% co-pay",
            description: "Covered in full with 0% co-pay",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [Daman.plans.Premier, Daman.plans.Platinum],
              },
            ],
          },
          {
            id: "option-4",
            label: "Covered up to AED 10,000 with 10% co-pay ",
            description: "Covered up to AED 10,000 with 10% co-pay ",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                ],
              },
            ],
          },
          {
            id: "option-5",
            label: "Covered up to AED 1,500 with 30%  co-pay ",
            description: "Covered up to AED 1,500 with 30%  co-pay ",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.Vaccination",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Vaccination",
        label: "Vaccination",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.vaccination],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Vaccination",
            description: "Vaccination",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered in full on reimbursement basis",
            description: "Covered in full on reimbursement basis",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label:
              "Covered in full as per DHA guildelines on reimbursement basis",
            description:
              "Covered in full as per DHA guildelines on reimbursement basis",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                ],
              },
            ],
          },
          {
            id: "option-5",
            label:
              "Covered for children up to 6 years as per MOH schedule  * Subject to pre-approval",
            description:
              "Covered for children up to 6 years as per MOH schedule  * Subject to pre-approval",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.ScansAndDiagnosticTests",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Scans & Diagnostic Tests",
        label: "Scans & Diagnostic Tests",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.tests],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Scans & Diagnostic Tests",
            description: "Scans & Diagnostic Tests",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered in full with 0% co-pay ",
            description: "Covered in full with 0% co-pay ",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [Daman.plans.Premier, Daman.plans.Platinum],
              },
            ],
          },
          {
            id: "option-4",
            label:
              "Covered in full with 0% co-pay *10% co-pay applicable in Cleveland Clinic Abu Dhabi",
            description:
              "Covered in full with 0% co-pay *10% co-pay applicable in Cleveland Clinic Abu Dhabi",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Gold] },
            ],
          },
          {
            id: "option-5",
            label: "Covered in full with 10% co-pay ",
            description: "Covered in full with 10% co-pay ",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [Daman.plans.Silver, Daman.plans.Bronze],
              },
            ],
          },
          {
            id: "option-6",
            label: "Covered in full with 20% co-pay ",
            description: "Covered in full with 20% co-pay ",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.Physiotherapy",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Physiotherapy",
        label: "Physiotherapy",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.physiotherapy],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "All",
            description: "All",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Physiotherapy",
            description: "Physiotherapy",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered in full with 0% co-pay ",
            description: "Covered in full with 0% co-pay ",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                ],
              },
            ],
          },
          {
            id: "option-4",
            label:
              "Covered in full up to 15 sessions per year with 10% co-pay ",
            description:
              "Covered in full up to 15 sessions per year with 10% co-pay ",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [Daman.plans.Silver, Daman.plans.Bronze],
              },
            ],
          },
          {
            id: "option-5",
            label: "Covered in full up to 6 sessions per year with 20% co-pay ",
            description:
              "Covered in full up to 6 sessions per year with 20% co-pay ",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.MaternityConsultationsScansAndDelivery",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Maternity (Consultations, Scans and Delivery)",
        label: "Maternity (Consultations, Scans and Delivery)",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.maternity],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "All",
            description: "All",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Maternity (Consultations, Scans and Delivery)",
            description: "Maternity (Consultations, Scans and Delivery)",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label:
              "OP- Covered in full up to AED 150,000  IP within UAE- Covered up to AED 150,000 IP outside UAE- Covered up to AED 75,000",
            description:
              "OP- Covered in full up to AED 150,000  IP within UAE- Covered up to AED 150,000 IP outside UAE- Covered up to AED 75,000",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label:
              "OP- Covered in full up to AED 150,000  IP within UAE- Covered up to AED 50,000 IP outside UAE- Covered up to AED 15,000",
            description:
              "OP- Covered in full up to AED 150,000  IP within UAE- Covered up to AED 50,000 IP outside UAE- Covered up to AED 15,000",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Platinum] },
            ],
          },
          {
            id: "option-5",
            label:
              "OP- Covered in full up to AED 150,000 IP within UAE- Covered up to AED 50,000 IP outside UAE- Covered up to AED 10,000",
            description:
              "OP- Covered in full up to AED 150,000 IP within UAE- Covered up to AED 50,000 IP outside UAE- Covered up to AED 10,000",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Gold] },
            ],
          },
          {
            id: "option-6",
            label:
              "OP- Covered in full up to AED 150,000 IP within UAE- Covered up to AED 30,000 IP outside UAE- Covered up to AED 10,000",
            description:
              "OP- Covered in full up to AED 150,000 IP within UAE- Covered up to AED 30,000 IP outside UAE- Covered up to AED 10,000",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Silver] },
            ],
          },
          {
            id: "option-7",
            label:
              "OP- Covered in full up to AED 150,000 IP within UAE- Covered up to AED 25,000 IP outside UAE- Covered up to AED 10,000",
            description:
              "OP- Covered in full up to AED 150,000 IP within UAE- Covered up to AED 25,000 IP outside UAE- Covered up to AED 10,000",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Bronze] },
            ],
          },
          {
            id: "option-8",
            label:
              "OP- Covered in full up to AED 150,000 Within UAE Normal Delivery- Covered up to AED 7,000 with 10% co-pay Within UAE C-section- Covered up to AED 10,000 with 10% co-pay Outside UAE Normal Delivery, C-section and complications covered up to AED 7,000 with 10% co-pay",
            description:
              "OP- Covered in full up to AED 150,000 Within UAE Normal Delivery- Covered up to AED 7,000 with 10% co-pay Within UAE C-section- Covered up to AED 10,000 with 10% co-pay Outside UAE Normal Delivery, C-section and complications covered up to AED 7,000 with 10% co-pay",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.MaternityWaitingPeriod",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Maternity Waiting Period",
        label: "Maternity Waiting Period",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.maternityWaitingPeriod],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "All",
            description: "All",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Maternity Waiting Period",
            description: "Maternity Waiting Period",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "No Wait",
            description: "No Wait",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.ComplicationsOfPregnancy",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Complications of Pregnancy",
        label: "Complications of Pregnancy",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.complicationOfPregnancy],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Complications of Pregnancy",
            description: "Complications of Pregnancy",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Medical Emergencies covered in full",
            description: "Medical Emergencies covered in full",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label: "Covered up to AED 150,000",
            description: "Covered up to AED 150,000",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.NewBornCover",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "New Born Cover",
        label: "New Born Cover",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.newBornCoverage],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "New Born Cover",
            description: "New Born Cover",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered up to AED 150,000 for first 30 days",
            description: "Covered up to AED 150,000 for first 30 days",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.Dental ",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Dental ",
        label: "Dental ",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [null],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "All",
            description: "All",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Dental ",
            description: "Dental ",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered up to AED 15,000 with 20% co-pay",
            description: "Covered up to AED 15,000 with 20% co-pay",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label: 'Dental is "Optional" this can be added on',
            description: 'Dental is "Optional" this can be added on',
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                ],
              },
            ],
          },
          {
            id: "option-5",
            label: "Not Available",
            description: "Not Available",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.DentalWaitingPeriod ",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Essential,
        ],
        title: "Dental Waiting Period ",
        label: "Dental Waiting Period ",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [null],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "All",
            description: "All",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Dental Waiting Period ",
            description: "Dental Waiting Period ",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "No wait",
            description: "No wait",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label: "N/A",
            description: "N/A",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.OpticalBenefits",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Optical Benefits",
        label: "Optical Benefits",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.optical],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "All",
            description: "All",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Optical Benefits",
            description: "Optical Benefits",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered in full with limits and restrictions",
            description: "Covered in full with limits and restrictions",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label: "Not Available",
            description: "Not Available",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.WellnessAndHealthScreening",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Wellness & Health Screening",
        label: "Wellness & Health Screening",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.wellness],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "All",
            description: "All",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Wellness & Health Screening",
            description: "Wellness & Health Screening",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label:
              "One annual check up covered up to AED 2,000 Cancer Screening  Available with limits and restrictions Preventive Services for diabetes available with limits and restrictions",
            description:
              "One annual check up covered up to AED 2,000 Cancer Screening  Available with limits and restrictions Preventive Services for diabetes available with limits and restrictions",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label:
              "Cancer Screening Available with limits and restrictions Preventive Services for diabetes available with limits and restrictions",
            description:
              "Cancer Screening Available with limits and restrictions Preventive Services for diabetes available with limits and restrictions",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.AlternativeMedicines",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Alternative Medicines",
        label: "Alternative Medicines",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.alternativeMedicine],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Alternative Medicines",
            description: "Alternative Medicines",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered up to AED 5,000 on reimbursement basis",
            description: "Covered up to AED 5,000 on reimbursement basis",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
            ],
          },
          {
            id: "option-4",
            label: "Covered up to AED 2,500 on reimbursement basis",
            description: "Covered up to AED 2,500 on reimbursement basis",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.MentalHealthBenefit",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Mental Health Benefit",
        label: "Mental Health Benefit",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.mentalHealth],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Mental Health Benefit",
            description: "Mental Health Benefit",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Covered up to AED 10,000",
            description: "Covered up to AED 10,000",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.VirtualOrTeleDoctor",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Virtual / Tele Doctor",
        label: "Virtual / Tele Doctor",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.virtualTele],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Virtual / Tele Doctor",
            description: "Virtual / Tele Doctor",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Available",
            description: "Available",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.MemberWebPortal",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Member Web Portal",
        label: "Member Web Portal",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.memberWebPortal],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Member Web Portal",
            description: "Member Web Portal",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Available",
            description: "Available",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "Daman.modifiers.benefits.MobileApplication",
        plans: [
          Daman.plans.UserType,
          Daman.plans.Benefit,
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Mobile Application",
        label: "Mobile Application",
        type: core.modifierTypes.benefit,
        assignmentType: "PER_PLAN",
        includedBenefits: [core.benefitTypes.mobileApplication],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: [],
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Pro",
            description: "Pro",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.UserType] },
            ],
          },
          {
            id: "option-2",
            label: "Mobile Application",
            description: "Mobile Application",
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Benefit] },
            ],
          },
          {
            id: "option-3",
            label: "Available",
            description: "Available",
            conditions: [
              {
                type: Enum.conditions.plans,
                value: [
                  Daman.plans.Premier,
                  Daman.plans.Platinum,
                  Daman.plans.Gold,
                  Daman.plans.Silver,
                  Daman.plans.Bronze,
                  Daman.plans.Essential,
                ],
              },
            ],
          },
        ],
      },
      {
        _id: Daman.modifiers.network.Premier,
        plans: [Daman.plans.Premier],
        title: "Network modifier",
        label: "Network",
        type: core.modifierTypes.network,
        assignmentType: "PER_PLAN",
        includedBenefits: [],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: "",
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Within UAE: Exclusive 1 Outside UAE: WW",
            description: "Within UAE: Exclusive 1 Outside UAE: WW",
          },
        ],
      },
      {
        _id: Daman.modifiers.network.Platinum,
        plans: [Daman.plans.Platinum],
        title: "Network modifier",
        label: "Network",
        type: core.modifierTypes.network,
        assignmentType: "PER_PLAN",
        includedBenefits: [],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: "",
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Within UAE: Exclusive 1  Outside UAE: WW",
            description: "Within UAE: Exclusive 1  Outside UAE: WW",
          },
        ],
      },
      {
        _id: Daman.modifiers.network.Gold,
        plans: [Daman.plans.Gold],
        title: "Network modifier",
        label: "Network",
        type: core.modifierTypes.network,
        assignmentType: "PER_PLAN",
        includedBenefits: [],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: "",
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Within UAE: Exclusive 1  Outside UAE: WW excl. US & Canada",
            description:
              "Within UAE: Exclusive 1  Outside UAE: WW excl. US & Canada",
          },
        ],
      },
      {
        _id: Daman.modifiers.network.Silver,
        plans: [Daman.plans.Silver],
        title: "Network modifier",
        label: "Network",
        type: core.modifierTypes.network,
        assignmentType: "PER_PLAN",
        includedBenefits: [],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: "",
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Within UAE: Standard 2 Outside UAE: AW Asia 2",
            description: "Within UAE: Standard 2 Outside UAE: AW Asia 2",
          },
        ],
      },
      {
        _id: Daman.modifiers.network.Bronze,
        plans: [Daman.plans.Bronze],
        title: "Network modifier",
        label: "Network",
        type: core.modifierTypes.network,
        assignmentType: "PER_PLAN",
        includedBenefits: [],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: "",
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Within UAE: Standard 3 Outside UAE: AW Asia 2",
            description: "Within UAE: Standard 3 Outside UAE: AW Asia 2",
          },
        ],
      },
      {
        _id: Daman.modifiers.network.Essential,
        plans: [Daman.plans.Essential],
        title: "Network modifier",
        label: "Network",
        type: core.modifierTypes.network,
        assignmentType: "PER_PLAN",
        includedBenefits: [],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: "",
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Within UAE: 08 Outside UAE: Not Available",
            description: "Within UAE: 08 Outside UAE: Not Available",
          },
        ],
      },
      {
        _id: Daman.modifiers.deductible,
        plans: [
          Daman.plans.Premier,
          Daman.plans.Platinum,
          Daman.plans.Gold,
          Daman.plans.Silver,
          Daman.plans.Bronze,
          Daman.plans.Essential,
        ],
        title: "Deductible modifier",
        label: "Deductibles",
        type: core.modifierTypes.deductible,
        assignmentType: "PER_CUSTOMER",
        includedBenefits: [],
        isOptional: false,
        description: "",
        addonCost: {},
        premiumMod: "",
        conditions: [],
        hasOptions: true,
        options: [
          {
            id: "option-1",
            label: "Nil",
            premiumMod: { type: "conditional-override", conditionalPrices: [] },
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
              {
                type: Enum.conditions.modifier,
                value: ["Within UAE: Exclusive 1 Outside UAE: WW"],
              },
              {
                type: Enum.conditions.coverage,
                value: [Daman.coverages.Worldwide],
              },
            ],
          },
          {
            id: "option-2",
            label: "10%",
            premiumMod: { type: "conditional-override", conditionalPrices: [] },
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Premier] },
              {
                type: Enum.conditions.modifier,
                value: ["Within UAE: Exclusive 1 Outside UAE: WW"],
              },
              {
                type: Enum.conditions.coverage,
                value: [Daman.coverages.Worldwide],
              },
            ],
          },
          {
            id: "option-3",
            label: "Nil",
            premiumMod: { type: "conditional-override", conditionalPrices: [] },
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Platinum] },
              {
                type: Enum.conditions.modifier,
                value: ["Within UAE: Exclusive 1  Outside UAE: WW"],
              },
              {
                type: Enum.conditions.coverage,
                value: [Daman.coverages.Worldwide],
              },
            ],
          },
          {
            id: "option-4",
            label: "20%",
            premiumMod: { type: "conditional-override", conditionalPrices: [] },
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Platinum] },
              {
                type: Enum.conditions.modifier,
                value: ["Within UAE: Exclusive 1  Outside UAE: WW"],
              },
              {
                type: Enum.conditions.coverage,
                value: [Daman.coverages.Worldwide],
              },
            ],
          },
          {
            id: "option-5",
            label: "Nil",
            premiumMod: { type: "conditional-override", conditionalPrices: [] },
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Gold] },
              {
                type: Enum.conditions.modifier,
                value: [
                  "Within UAE: Exclusive 1  Outside UAE: WW excl. US & Canada",
                ],
              },
              {
                type: Enum.conditions.coverage,
                value: [Daman.coverages.WorldwideExcludingUSAAndCanada],
              },
            ],
          },
          {
            id: "option-6",
            label: "Nil",
            premiumMod: { type: "conditional-override", conditionalPrices: [] },
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Silver] },
              {
                type: Enum.conditions.modifier,
                value: ["Within UAE: Standard 2 Outside UAE: AW Asia 2"],
              },
              {
                type: Enum.conditions.coverage,
                value: [
                  Daman.coverages
                    .ArabWorldAsia2EmergencyCoverWorldwideExcludingUSAAndCanada,
                ],
              },
            ],
          },
          {
            id: "option-7",
            label: "Nil",
            premiumMod: { type: "conditional-override", conditionalPrices: [] },
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Bronze] },
              {
                type: Enum.conditions.modifier,
                value: ["Within UAE: Standard 3 Outside UAE: AW Asia 2"],
              },
              {
                type: Enum.conditions.coverage,
                value: [
                  Daman.coverages
                    .ArabWorldAsia2EmergencyCoverWorldwideExcludingUSAAndCanada,
                ],
              },
            ],
          },
          {
            id: "option-8",
            label: "Nil",
            premiumMod: { type: "conditional-override", conditionalPrices: [] },
            conditions: [
              { type: Enum.conditions.plans, value: [Daman.plans.Essential] },
              {
                type: Enum.conditions.modifier,
                value: ["Within UAE: 08 Outside UAE: Not Available"],
              },
              {
                type: Enum.conditions.coverage,
                value: [
                  Daman.coverages
                    .UAEExtendedToSoutheastAsiaIndiaSubcontinentAndArabCountryForInpatientTreatmentOnlyOnReimbursementBasisForElectiveAndEmergencyTreatment,
                ],
              },
            ],
          },
        ],
      },
    ],
    splitFile: [],
  },
];
module.exports = modifiers;
