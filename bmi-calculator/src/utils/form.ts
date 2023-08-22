import {
  getBmiImperial,
  getBmiMetric,
  getClassification,
  getIdealWeightImperial,
  getIdealWeightMetric,
} from "./bmi";

export const parseFormData = (formData: FormData) => {
  const units = formData.get("units");
  if (units !== "metric" && units !== "imperial") {
    return { error: "Invalid unit" };
  }

  if (units === "metric") {
    const rawHeight = formData.get("height-cm");
    if (typeof rawHeight !== "string") {
      return { error: "Invalid height" };
    }
    const height = parseInt(rawHeight, 10);
    if (isNaN(height)) {
      return { error: "Invalid height" };
    }

    const rawWeight = formData.get("weight-kg");
    if (typeof rawWeight !== "string") {
      return { error: "Invalid weight" };
    }
    const weight = parseInt(rawWeight, 10);
    if (isNaN(weight)) {
      return { error: "Invalid weight" };
    }

    return { data: { units, cm: height, kg: weight } } as const;
  } else {
    const rawFt = formData.get("height-ft");
    if (typeof rawFt !== "string") {
      return { error: "Invalid height" };
    }
    const ft = parseInt(rawFt, 10);
    if (isNaN(ft)) {
      return { error: "Invalid height" };
    }

    const rawIn = formData.get("height-in");
    if (typeof rawIn !== "string") {
      return { error: "Invalid height" };
    }
    const _in = parseInt(rawIn, 10);
    if (isNaN(_in)) {
      return { error: "Invalid height" };
    }

    const rawSt = formData.get("weight-st");
    if (typeof rawSt !== "string") {
      return { error: "Invalid weight" };
    }
    const st = parseInt(rawSt, 10);
    if (isNaN(st)) {
      return { error: "Invalid weight" };
    }

    const rawLbs = formData.get("weight-lbs");
    if (typeof rawLbs !== "string") {
      return { error: "Invalid weight" };
    }
    const lbs = parseInt(rawLbs, 10);
    if (isNaN(lbs)) {
      return { error: "Invalid weight" };
    }

    return { data: { units, ft, in: _in, st, lbs } } as const;
  }
};

export const getResult = (data: ParseData) => {
  const units = data.units;

  let bmi, idealWeight;
  if (units === "metric") {
    const m = data.cm / 100;
    const kg = data.kg;
    bmi = getBmiMetric(m, kg);
    idealWeight = getIdealWeightMetric(m);
  } else {
    const _in = data.ft * 12 + data.in;
    const lbs = data.st * 14 + data.lbs;
    bmi = getBmiImperial(_in, lbs);
    idealWeight = getIdealWeightImperial(_in);
  }

  const classification = getClassification(bmi);

  return { units, bmi, classification, idealWeight };
};

type ParseData<T = ReturnType<typeof parseFormData>["data"]> =
  T extends undefined ? never : T;
