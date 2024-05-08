import { useEffect, useRef, useState } from "react";
import { useLocation, useMatches } from "react-router-dom";
import { z } from "zod";

const AnnouncementHandleSchema = z.object({
  announcement: z.function().args(z.unknown()).returns(z.string()),
});

export type AnnouncementHandle<T = unknown> = { announcement(data: T): string };

// https://github.com/vercel/next.js/blob/canary/packages/next/src/client/route-announcer.tsx
export function RouteAnnouncer() {
  const matches = useMatches();
  const { pathname } = useLocation();
  const [announcement, setAnnouncement] = useState("");
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    const nextAnnouncement = matches
      .map((match) => {
        const result = AnnouncementHandleSchema.safeParse(match.handle);
        if (!result.success) return null;

        return result.data.announcement(match.data);
      })
      .reverse()
      .find((match) => match !== null);

    setAnnouncement(nextAnnouncement ?? "");
  }, [matches, pathname]);

  return (
    <p className="sr-only" aria-live="assertive" role="alert">
      {announcement}
    </p>
  );
}
