import { coveredCountries } from "../constants";
import { Utils } from "../helper/Utils";
import { Helpers } from "../helper/helpers";
import { Coverages, PlansInfo } from "../helper/interfaces";

export const createCoverageData = (
  data: PlansInfo,
  residency: string,
  index: number | string
): Coverages[] => {
  return data.coverages.map((cov) => {
    return {
      _id: `-${Utils.remove(data.provider)}.coverages${index}.${Utils.remove(cov)}-`,
      title: cov,
      internalTitle: cov,
      includedResidence: Helpers.getResidencyArr(residency)[0],
      excludedResidence: Helpers.getResidencyArr(residency)[1],
      coveredCountries,
      notes: "",
    };
  });
};
