import { coveredCountries } from "../constants";
import { Utils } from "../helper/Utils";
import { Helpers } from "../helper/functions";
import { Coverages, PlansInfo } from "../helper/interfaces";

export const createCoverageData = (data: PlansInfo): Coverages[] => {
  return data.coverages.map((cov) => {
    return {
      _id: `-${Utils.remove(data.provider)}.coverages.${Utils.remove(cov)}-`,
      title: cov,
      internalTitle: cov,
      includedResidence: Helpers.getResidencyArr(cov)[0],
      excludedResidence: Helpers.getResidencyArr(cov)[1],
      coveredCountries,
      notes: "",
    };
  });
};
