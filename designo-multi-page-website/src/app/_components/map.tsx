"use client";

import dynamic from "next/dynamic";

export const Map = dynamic(
  () => import("~/app/_components/map-client").then((mod) => mod.Map),
  {
    ssr: false,
  },
);
