import { useEffect, useLayoutEffect, useState } from "react";
import { z } from "zod";

const ThemeSchema = z.enum(["1", "2", "3"]);

type Theme = z.infer<typeof ThemeSchema>;

const themeKey = "theme";

export function useTheme() {
  const [storedTheme, setStoredTheme] = useState(() => {
    try {
      const rawTheme = localStorage.getItem(themeKey);
      return ThemeSchema.parse(rawTheme);
    } catch {
      return null;
    }
  });

  const theme = storedTheme ?? "1";

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [theme]);

  useEffect(() => {
    function handleStorageEvent(e: StorageEvent) {
      if (e.key === null) {
        setStoredTheme(null);
        return;
      }
      if (e.key === themeKey) {
        const result = ThemeSchema.safeParse(e.newValue);
        setStoredTheme(result.success ? result.data : null);
        return;
      }
    }
    addEventListener("storage", handleStorageEvent);
    return () => {
      removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  return {
    theme,
    setTheme(theme: Theme) {
      localStorage.setItem(themeKey, theme);
      setStoredTheme(theme);
    },
  };
}
