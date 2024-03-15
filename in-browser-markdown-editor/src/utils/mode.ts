import { useEffect, useRef, useState } from "react";
import { z } from "zod";

const modeKey = "mode";

const ModeSchema = z.union([z.literal("light"), z.literal("dark")]);

function getStoredMode() {
  const rawMode = localStorage.getItem(modeKey);
  const result = ModeSchema.safeParse(rawMode);
  return result.success ? result.data : null;
}

function setStoredMode(mode: z.infer<typeof ModeSchema>) {
  localStorage.setItem(modeKey, mode);
}

export function useMode() {
  const [selectedMode, setSelectedMode] = useState<"light" | "dark" | null>(
    getStoredMode()
  );
  const darkSchemeMqlRef = useRef(matchMedia("(prefers-color-scheme: dark)"));
  const [prefersDarkScheme, setPrefersDarkScheme] = useState(
    darkSchemeMqlRef.current.matches
  );

  useEffect(() => {
    const darkSchemeMql = darkSchemeMqlRef.current;

    function handleChange(ev: MediaQueryListEvent) {
      setPrefersDarkScheme(ev.matches);
    }

    darkSchemeMql.addEventListener("change", handleChange);
    return () => {
      darkSchemeMql.removeEventListener("change", handleChange);
    };
  }, []);

  return {
    mode: selectedMode ?? (prefersDarkScheme ? "dark" : "light"),
    selectMode(mode: "light" | "dark") {
      setSelectedMode(mode);
      setStoredMode(mode);
    },
  };
}
