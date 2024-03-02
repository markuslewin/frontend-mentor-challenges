import { useRouteLoaderData, useFetcher } from "@remix-run/react";
import { z } from "zod";
import { loader as rootLoader } from "../root";
import { useHints } from "./client-hints";

export const ModeFormSchema = z.object({
  intent: z.literal("change-mode"),
  mode: z.enum(["light", "dark"]),
});

export function useMode() {
  const data = useRouteLoaderData<typeof rootLoader>("root");
  const hints = useHints();
  const modeFetcher = useFetcher({ key: "mode" });

  let optimisticMode: z.infer<typeof ModeFormSchema>["mode"] | undefined;
  if (modeFetcher.formData) {
    const result = ModeFormSchema.safeParse(
      Object.fromEntries(modeFetcher.formData),
    );
    if (result.success) {
      optimisticMode = result.data.mode;
    }
  }

  return {
    mode: optimisticMode ?? data?.mode ?? hints.theme,
  };
}
