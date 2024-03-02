import { useRouteLoaderData } from "@remix-run/react";
import { loader as rootLoader } from "../root";
import { invariant } from "@epic-web/invariant";

export function useRequestInfo() {
  const data = useRouteLoaderData<typeof rootLoader>("root");
  invariant(data?.requestInfo, "No requestInfo found in root loader");

  return data?.requestInfo;
}
