import { z } from "zod";

const flashKey = "flash";

const FlashSchema = z.object({
  type: z.string(),
  message: z.string(),
});

export type Flash = z.infer<typeof FlashSchema>;

export function getFlash() {
  const item = localStorage.getItem(flashKey);
  localStorage.removeItem(flashKey);
  if (!item) {
    return null;
  }
  const result = FlashSchema.safeParse(JSON.parse(item));
  if (!result.success) {
    return null;
  }
  return result.data;
}

export function setFlash(flash: Flash) {
  localStorage.setItem(flashKey, JSON.stringify(flash));
}
