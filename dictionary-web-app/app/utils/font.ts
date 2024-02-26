import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import { z } from "zod";
import { loader as rootLoader } from "~/root";

export const FontFormSchema = z.object({
  intent: z.literal("change-font"),
  font: z.enum(["sans", "serif", "mono"]),
});

export function useFont() {
  const data = useRouteLoaderData<typeof rootLoader>("root");
  const fontFetcher = useFetcher({ key: "font" });

  let optimisticFont: z.infer<typeof FontFormSchema>["font"] | null = null;
  if (fontFetcher.formData) {
    const result = FontFormSchema.safeParse(
      Object.fromEntries(fontFetcher.formData),
    );
    if (result.success) {
      optimisticFont = result.data.font;
    }
  }

  return { font: optimisticFont ?? data?.font ?? "sans" };
}
