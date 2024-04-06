import { z } from "astro/zod";

const OnBoolean = z.preprocess((val) => {
  return val === "on";
}, z.boolean());

export const GenerateSchema = z
  .object({
    length: z.coerce.number(),
    "include-uppercase": OnBoolean,
    "include-lowercase": OnBoolean,
    "include-numbers": OnBoolean,
    "include-symbols": OnBoolean,
  })
  .refine((val) => val.length > 0, {
    message: "Length must be a positive number",
  })
  .refine(validateCategories, { message: "No character categories selected" });

export function validateCategories(val: {
  "include-uppercase": boolean;
  "include-lowercase": boolean;
  "include-numbers": boolean;
  "include-symbols": boolean;
}) {
  return (
    val["include-uppercase"] ||
    val["include-lowercase"] ||
    val["include-numbers"] ||
    val["include-symbols"]
  );
}

export const GenerateSchemaValues = z.preprocess(
  (val) => (typeof val === "object" ? val : {}),
  z.object({
    length: z.coerce.number().default(0),
    "include-uppercase": z.coerce.boolean(),
    "include-lowercase": z.coerce.boolean(),
    "include-numbers": z.coerce.boolean(),
    "include-symbols": z.coerce.boolean(),
  })
);
