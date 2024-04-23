import { invariant, invariantResponse } from "@epic-web/invariant";
import { redirect } from "react-router-dom";

export function assertValidSlug<T extends string[]>(
  slugs: T,
  slug?: string
): asserts slug is T[number] {
  invariant(slugs.length, "Slugs empty");

  if (slug === undefined) throw redirect(slugs[0]);

  invariantResponse(slugs.includes(slug), "Not found", { status: 404 });
}
