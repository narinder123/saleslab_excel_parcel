import {
  BenefitNamesV1,
  DBpath,
  InfoResidencies,
  variable,
} from "../constants";
import { Helpers } from "../helper/functions";
import {
  InsurerInfo,
  RawBenefits,
  RawRates,
  V1DBMode,
} from "../helper/interfaces";
import fs from "fs";
import xlsx from "xlsx";
import { exec } from "child_process";
import { Utils } from "../helper/Utils";

export const create_V1_Data = (
  info: InsurerInfo,
  rateSheets: RawRates[][],
  benefits: RawBenefits[][]
) => {
  console.log("> Generating V1 data ", info);
  let jsonData = info.residencies.map((residency, res_index) => {
    if (!InfoResidencies.includes(residency))
      throw `${residency} residency doesn't exist! please use these defined residencies: ${InfoResidencies.join(",")}`;
    else {
      if (residency == "Dubai") residency = "UAE - Dubai";
      else if (residency == "NE") residency = "Northern Emirates";
      else if (residency == "AbuDhabi") residency = "UAE - Abu Dhabi";
      else if (residency == "NE_Dubai") residency = "UAE";
    }
    const rateSheet = rateSheets[res_index];
    let result = rateSheet
      .filter(
        (rate) =>
          (rate.platform == "V1" || rate.platform == "both") &&
          rate.frequency == "Annually"
      )
      .map((rate) => {
        let benefit = Helpers.getBenefitsForV1(benefits[res_index]).find(
          (b) => b.plan == rate.planName
        );
        if (!benefit)
          throw new Error(`${rate.planName} not found on benefitSheet`);
        else benefit = benefit.benefits;
        if (info.frequencyFrom == "rates") {
          if (info.frequencies?.includes("semiAnnual")) {
            let rateSemiAnnual = rateSheet.find(
              (v) =>
                v.frequency == "semiAnnual" &&
                rate.ageStart == v.ageStart &&
                rate.gender == v.gender &&
                rate.copay == v.copay &&
                rate.planName == v.planName &&
                rate.network == v.network &&
                rate.coverage == v.coverage
            );
            if (!rateSemiAnnual)
              throw `V1- SemiAnnual not found for ${rate.planName} ${rate.network} ${rate.coverage} ${rate.copay} ${rate.ageStart}`;
            rate.rateSemiAnnual = rateSemiAnnual.rates;
          }
          if (info.frequencies?.includes("quarter")) {
            let rateQuarter = rateSheet.find(
              (v) =>
                v.frequency == "quarter" &&
                rate.ageStart == v.ageStart &&
                rate.gender == v.gender &&
                rate.copay == v.copay &&
                rate.planName == v.planName &&
                rate.network == v.network &&
                rate.coverage == v.coverage
            );
            if (!rateQuarter)
              throw `V1- Quater not found for ${rate.planName} ${rate.network} ${rate.coverage} ${rate.copay} ${rate.ageStart}`;
            rate.rateQuarter = rateQuarter.rates;
          }
          if (info.frequencies?.includes("month")) {
            let rateMonth = rateSheet.find(
              (v) =>
                v.frequency == "month" &&
                rate.ageStart == v.ageStart &&
                rate.gender == v.gender &&
                rate.copay == v.copay &&
                rate.planName == v.planName &&
                rate.network == v.network &&
                rate.coverage == v.coverage
            );
            if (!rateMonth)
              throw `V1- Month not found for ${rate.planName} ${rate.network} ${rate.coverage} ${rate.copay} ${rate.ageStart}`;
            rate.rateMonth = rateMonth.rates;
          }
        }
        const Copays = benefits[res_index].find(
          (b) => b.Benefit == variable.Copays
        );

        let benefitKeys = Object.keys(benefit);
        for (let key in rate) {
          let benefitIncluded = benefitKeys.includes(key);
          if (!benefitIncluded) continue;
          benefit[key] = rate[key];
        }

        let struc: any = {};
        struc.planName1 = rate.planName ? rate.planName : "";
        struc.planName2 = rate.network ? rate.network : "";
        struc.rateMonth = rate.rateMonth
          ? Number(rate.rateMonth) / Number(info.conversion)
          : "";
        struc.rateQuarter = rate.rateQuarter
          ? Number(rate.rateQuarter) / Number(info.conversion)
          : "";
        struc.rateSemiAnnual = rate.rateSemiAnnual
          ? Number(rate.rateSemiAnnual) / Number(info.conversion)
          : "";
        struc.rateAnnual = rate.rates
          ? Number(rate.rates) / Number(info.conversion)
          : "";
        struc.rateBiannual = rate.rateBiannual ? rate.rateBiannual : "";
        struc.ageRangeStart =
          rate.ageStart || rate.ageStart == 0 ? rate.ageStart : "";
        struc.ageRangeEnd = rate.ageEnd || rate.ageEnd == 0 ? rate.ageEnd : "";
        struc.gender = rate.gender ? rate.gender : "";
        struc.currency = "USD";
        struc.insuranceCoverAmount = "";
        struc.insurerArea = rate.coverage ? rate.coverage : "";
        struc.insurerAreaExcluding = "";
        struc.insuranceArea = "";
        struc.insuranceAreaExcluding = "";
        struc.tripDuration = "";
        struc.child = "";
        struc.physicianDeductible = "";
        struc.physicianDeductibleMax = "";
        struc.coPay = rate.copay;
        struc.coPayOn = "";
        struc.deductible = "";
        struc.terms1 = rate.terms1
          ? Number(rate.terms1) / Number(info.conversion)
          : "";
        struc.terms2 = rate.terms2
          ? Number(rate.terms2) / Number(info.conversion)
          : "";
        struc.terms3 = rate.terms3
          ? Number(rate.terms3) / Number(info.conversion)
          : "";
        struc.terms4 = rate.terms4
          ? Number(rate.terms4) / Number(info.conversion)
          : "";
        struc.terms5 = rate.terms5
          ? Number(rate.terms5) / Number(info.conversion)
          : "";
        struc.terms6 = rate.terms6
          ? Number(rate.terms6) / Number(info.conversion)
          : "";
        struc.terms7 = rate.terms7
          ? Number(rate.terms7) / Number(info.conversion)
          : "";
        struc.annualDentalPrimary = rate.annualDentalPrimary
          ? rate.annualDentalPrimary
          : "";
        struc.semiAnnualDentalPrimary = rate.semiAnnualDentalPrimary
          ? rate.semiAnnualDentalPrimary
          : "";
        struc.quarterlyDentalPrimary = rate.quarterlyDentalPrimary
          ? rate.quarterlyDentalPrimary
          : "";
        struc.annualDentalPrimarySpouse = rate.annualDentalPrimarySpouse
          ? rate.annualDentalPrimarySpouse
          : "";
        struc.semiAnnualDentalPrimarySpouse = rate.semiAnnualDentalPrimarySpouse
          ? rate.semiAnnualDentalPrimarySpouse
          : "";
        struc.quarterlyDentalPrimarySpouse = rate.quarterlyDentalPrimarySpouse
          ? rate.quarterlyDentalPrimarySpouse
          : "";
        struc.annualDentalPrimaryChildren = rate.annualDentalPrimaryChildren
          ? rate.annualDentalPrimaryChildren
          : "";
        struc.semiAnnualDentalPrimaryChildren =
          rate.semiAnnualDentalPrimaryChildren
            ? rate.semiAnnualDentalPrimaryChildren
            : "";
        struc.quarterlyDentalPrimaryChildren =
          rate.quarterlyDentalPrimaryChildren
            ? rate.quarterlyDentalPrimaryChildren
            : "";
        struc.annualDentalPrimarySpouseChildren =
          rate.annualDentalPrimarySpouseChildren
            ? rate.annualDentalPrimarySpouseChildren
            : "";
        struc.semiAnnualDentalPrimarySpouseChildren =
          rate.semiAnnualDentalPrimarySpouseChildren
            ? rate.semiAnnualDentalPrimarySpouseChildren
            : "";
        struc.quarterlyDentalPrimarySpouseChildren =
          rate.quarterlyDentalPrimarySpouseChildren
            ? rate.quarterlyDentalPrimarySpouseChildren
            : "";
        struc.Addon1 = rate.Addon1 ? rate.Addon1 : "";
        struc.Addon2 = rate.Addon2 ? rate.Addon2 : "";
        struc.Addon3 = rate.Addon3 ? rate.Addon3 : "";
        struc.Addon4 = rate.Addon4 ? rate.Addon4 : "";
        struc.Addon5 = rate.Addon5 ? rate.Addon5 : "";
        struc.Addon6 = rate.Addon6 ? rate.Addon6 : "";
        struc.Addon7 = rate.Addon7 ? rate.Addon7 : "";
        struc.Addon8 = rate.Addon8 ? rate.Addon8 : "";
        struc.Addon9 = rate.Addon9 ? rate.Addon9 : "";
        struc.Addon10 = rate.Addon10 ? rate.Addon10 : "";
        struc.Addon11 = rate.Addon11 ? rate.Addon11 : "";
        struc.Addon12 = rate.Addon12 ? rate.Addon12 : "";
        struc.Addon13 = rate.Addon13 ? rate.Addon13 : "";
        struc.Addon14 = rate.Addon14 ? rate.Addon14 : "";
        struc.Addon15 = rate.Addon15 ? rate.Addon15 : "";
        struc.Addon16 = rate.Addon16 ? rate.Addon16 : "";
        struc.Addon17 = rate.Addon17 ? rate.Addon17 : "";
        struc.Addon18 = rate.Addon18 ? rate.Addon18 : "";
        struc.annualLimit = benefit[BenefitNamesV1.annualLimit];
        struc.inPatientDB = "";
        struc.outPatientDB = "";
        struc.OONClaimsHandling = "";
        struc.inPatientHospitalisation =
          benefit[BenefitNamesV1.inPatientHospitalisation];
        struc.outPatient = benefit[BenefitNamesV1.outPatient];
        struc.physiotherapy = benefit[BenefitNamesV1.physiotherapy];
        struc.emergencyEvacuation = benefit[BenefitNamesV1.emergencyEvacuation];
        struc.chronicConditions = benefit[BenefitNamesV1.chronicConditions];
        struc.preExistingCover = benefit[BenefitNamesV1.preExistingCover];
        struc.routineMaternity = benefit[BenefitNamesV1.routineMaternity];
        struc.maternityWaitingPeriod =
          benefit[BenefitNamesV1.maternityWaitingPeriod];
        struc.complicationsPregnancy =
          benefit[BenefitNamesV1.complicationsPregnancy];
        struc.newBornCoverage = benefit[BenefitNamesV1.newBornCoverage];
        struc.dental = rate.dental ? rate.dental : benefit[BenefitNamesV1.dental];
        struc.dentalWaitingPeriod = rate.dentalWaitingPeriod ? rate.dentalWaitingPeriod : benefit[BenefitNamesV1.dentalWaitingPeriod];
        struc.opticalBenefits = rate.opticalBenefits ? rate.opticalBenefits : benefit[BenefitNamesV1.opticalBenefits];
        struc.wellness = benefit[BenefitNamesV1.wellness];
        struc.semiAnnualSurcharge = benefit[BenefitNamesV1.semiAnnualSurcharge];
        struc.quarterlySurcharge = benefit[BenefitNamesV1.quarterlySurcharge];
        struc.monthlySurcharge = benefit[BenefitNamesV1.monthlySurcharge];
        struc.routineMaternityFilter =
          benefit[BenefitNamesV1.routineMaternityFilter].toLowerCase();
        struc.wellnessFilter =
          benefit[BenefitNamesV1.wellnessFilter].toLowerCase();
        struc.opticalFilter =
          benefit[BenefitNamesV1.opticalFilter].toLowerCase();
        struc.companyName = info.provider;
        struc.startDate = info.startDate;
        struc.repat = rate.repat ? rate.repat : "";
        struc.geoCoverage = "";
        struc.dentalPremiumType =
          rate.dentalPremiumType !== undefined ? rate.dentalPremiumType : "";
        struc.dentalFilter = rate.dentalFilter
          ? rate.dentalFilter
          : benefit[BenefitNamesV1.dentalFilter]?.toLowerCase() == "yes"
            ? "0"
            : "";
        struc.addon19 = rate.addon19 ? rate.addon19 : "";
        struc.addon20 = rate.addon20 ? rate.addon20 : "";
        struc.addon21 = rate.addon21 ? rate.addon21 : "";
        struc.jointRateMonth = "";
        struc.jointRateQuarter = "";
        struc.jointRateAnnual = "";
        struc.jointDentalMonth = "";
        struc.jointDentalQuarter = "";
        struc.jointDentalAnnual = "";
        struc.accommodationType = benefit[BenefitNamesV1.accommodationType];
        struc.expiryDate = info.endDate;
        struc.residency = residency;
        struc.relation = rate.relation ? rate.relation : "primary";
        struc.singleFemale = rate.married == "true" ? "0" : "1";
        struc.singleChild = rate.singleChild !== undefined ? rate.singleChild : "";
        struc.dentalAddon = rate.dentalAddon ? rate.dentalAddon : "";
        struc.status = "true";
        struc.company = info.companyId ? { $oid: info.companyId } : "";
        if (struc.outPatient?.includes("$")) {
          let $: any = benefits[res_index].find((b) => b.Benefit == "$");
          if (!$)
            throw new Error(
              "$ column not found, please fill it in the benefit sheet"
            );
          $ = $[rate.planName];
          Copays &&
            Copays[rate.planName]
              .toString()
              .split("/")
              .map((copay, i) => {
                if (copay !== rate.copay) return;
                let str = struc.outPatient.trim();
                $.split("-")
                  [i].split("/")
                  .forEach((v: string) => {
                    str = str.replace("$", v);
                  });
                struc.outPatient = str;
              });

          if (struc.outPatient.includes("$")){
            console.log("out >> ", struc.outPatient)
            throw new Error(
              `copay not found for $ - ${rate.copay}, copays: ${
                Copays && Copays[rate.planName].toString()
              }`
            );}
        }
        if (struc.physiotherapy.includes("$")) {
          let $: any = benefits[res_index].find((b) => b.Benefit == "$");
          if (!$)
            throw new Error(
              "$ column not found, please fill it in the benefit sheet"
            );
          $ = $[rate.planName];
          Copays &&
            Copays[rate.planName]
              .toString()
              .split("/")
              .map((copay, i) => {
                if (copay !== rate.copay) return;
                let str = struc.physiotherapy.trim();
                $.split("-")
                  [i].split("/")
                  .forEach((v: string) => {
                    str = str.replace("$", v);
                  });
                struc.physiotherapy = str;
              });
        }

        return struc;
      });
    return result;
  });

  if (!fs.existsSync(`Outputs/${info.provider}/V1`))
    fs.mkdirSync(`Outputs/${info.provider}/V1`);

  jsonData.map((data, res_index) => {
    let arr = [];
    if (data.length > 40000) {
      let divide = Math.ceil(data.length / 40000);
      for (let i = 0; i < divide; i++) {
        let start = i * 40000;
        let end = (i + 1) * 40000;
        if (i === divide - 1) end = data.length;
        arr.push(data.slice(start, end));
      }
    } else {
      arr.push(data);
    }
    arr.map((value, index) => {
      let jsonData = JSON.stringify(value);
      fs.writeFileSync(
        `Outputs/${info.provider}/V1/${info.provider}-${info.residencies[res_index]}-${index + 1}.json`,
        jsonData
      );
      const Workbook = xlsx.utils.book_new();
      const Worksheet = xlsx.utils.json_to_sheet(value);
      xlsx.utils.book_append_sheet(Workbook, Worksheet, "sheet1");
      xlsx.writeFileXLSX(
        Workbook,
        `Outputs/${info.provider}/V1/${info.provider}-${info.residencies[res_index]}-${index + 1}.xlsx`
      );
      console.log(
        `> file ${info.provider}-${info.residencies[res_index]}-${index + 1}.json has been created!`
      );
    });
  });
  console.log(`> V1 data are generated! \n`);
};

export const Import_V1_Data = (provider: string, mode: V1DBMode) => {
  let DirPath = `Outputs/${provider}/V1`;
  const paths = fs.readdirSync(DirPath).filter((v) => v.includes(".json"));
  if (paths.length == 0)
    throw `No json file found to import! folder:${provider}`;
  insertDoc(0);
  function insertDoc(count: number) {
    if (count == paths.length) {
      Utils.log(`All ${provider} JSON files are import in mode:${mode}`);
      return;
    }
    const path = paths[count];
    Utils.log(`Inserting ${path} in DB`);
    exec(
      `mongoimport --uri='mongodb+srv://vitavirutesuser:567gytfAFSCMQbmKKA@cluster0.jbdno.mongodb.net/${DBpath[mode]}?retryWrites=true&w=majority' -d=${DBpath[mode]} -c=plans --file=${DirPath}/${path} --jsonArray`,
      (err, stdOut, stderr) => {
        if (err) Utils.log(`err -> ${err}`);
        else if (stdOut) Utils.log("stdOut ->", stdOut);
        else if (stderr) Utils.log("stderr ->", stderr);
        else Utils.log(`${path} file inserted in DB!`);
        insertDoc(count + 1);
      }
    );
  }
};
