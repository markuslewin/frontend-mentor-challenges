import { useEffect, useRef, useState } from "react";

export function useMode() {
  const [selectedMode, setSelectedMode] = useState<"light" | "dark" | null>(
    null
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
    },
  };
}
