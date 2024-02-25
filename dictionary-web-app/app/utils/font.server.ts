import { createCookie } from "@remix-run/node";
import { z } from "zod";

const FontSchema = z.enum(["sans", "serif", "mono"]);

const fontCookie = createCookie("dwa_font", { path: "/" });

export async function getFont(request: Request) {
  const font = await fontCookie.parse(request.headers.get("cookie"));
  const result = FontSchema.safeParse(font);
  return result.success ? result.data : null;
}

export function setFont(font: z.infer<typeof FontSchema>) {
  return fontCookie.serialize(font);
}
