import { coveredCountries } from "../constants";
import { Utils } from "../helper/Utils";
import { Helpers } from "../helper/functions";
import { Coverages, PlansInfo } from "../helper/interfaces";

export const createCoverageData = (
  data: PlansInfo,
  residency: string
): Coverages[] => {
  return data.coverages.map((cov) => {
    return {
      _id: `-${Utils.remove(data.provider)}.coverages.${Utils.remove(cov)}-`,
      title: cov,
      internalTitle: cov,
      includedResidence: Helpers.getResidencyArr(residency)[0],
      excludedResidence: Helpers.getResidencyArr(residency)[1],
      coveredCountries,
      notes: "",
    };
  });
};
