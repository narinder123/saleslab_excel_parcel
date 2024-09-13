import { InsurerInfo } from "../helper/interfaces";

export const createProvider = (insurer: InsurerInfo) => {
  return [
    {
      _id: `-${insurer.provider}.provider-`,
      title: insurer.insurerName,
      logo: "",
      colors: {},
      ageCalculationMethod: `-Enum.ageCalculationMethod.${insurer.ageCalculationMethod ? insurer.ageCalculationMethod : "standard"}-`,
      exchangeRates: [],
      hasRateTable: insurer.rateTable && insurer.rateTable?.length > 0,
      currentRates: {
        startDate: new Date(insurer.startDate), // Start date of the current rates
        endDate: insurer.endDate ? new Date(insurer.endDate) : "", // End date of the current rates
      },
    },
  ];
};
