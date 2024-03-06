import { z } from "astro/zod";

const OnBoolean = z.preprocess((val) => {
  return val === "on";
}, z.boolean());

export const GenerateSchema = z.object({
  length: z.coerce.number(),
  "include-uppercase": OnBoolean,
  "include-lowercase": OnBoolean,
  "include-numbers": OnBoolean,
  "include-symbols": OnBoolean,
});
