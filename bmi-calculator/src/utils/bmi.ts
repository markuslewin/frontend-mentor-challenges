export const getBmiMetric = (m: number, kg: number) => {
  return kg / m ** 2;
};

export const getBmiImperial = (_in: number, lbs: number) => {
  return (703 * lbs) / _in ** 2;
};

export const getClassification = (bmi: number) => {
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "a healthy weight";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
};

export const getIdealWeightMetric = (m: number) => {
  const lowest = 18.5 * m ** 2;
  const highest = 25 * m ** 2;

  return {
    lowest,
    highest,
  };
};

export const getIdealWeightImperial = (_in: number) => {
  const lowest = (18.5 / 703) * _in ** 2;
  const highest = (25 / 703) * _in ** 2;

  return {
    lowest,
    highest,
  };
};
