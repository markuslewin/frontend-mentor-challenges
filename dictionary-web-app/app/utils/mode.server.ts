import { createCookie } from "@remix-run/node";
import { z } from "zod";

const modeCookie = createCookie("dwa_mode", { path: "/" });

const ModeSchema = z.enum(["light", "dark"]);

export async function getMode(request: Request) {
  const mode = await modeCookie.parse(request.headers.get("cookie"));
  const result = ModeSchema.safeParse(mode);
  return result.success ? result.data : null;
}

export function setMode(mode: "light" | "dark") {
  return modeCookie.serialize(mode);
}
