import { z } from "astro/zod";

const OnBoolean = z.preprocess((val) => {
  return val === "on";
}, z.boolean());

export const GenerateStrengthSchema = z
  .object({
    length: z.coerce.number(),
    "include-uppercase": OnBoolean,
    "include-lowercase": OnBoolean,
    "include-numbers": OnBoolean,
    "include-symbols": OnBoolean,
  })
  .refine((val) => val.length > 0, {
    message: "Length must be a positive number",
  });

export const GenerateSchema = GenerateStrengthSchema.refine(
  (val) =>
    val["include-uppercase"] ||
    val["include-lowercase"] ||
    val["include-numbers"] ||
    val["include-symbols"],
  { message: "No character categories selected" }
);
