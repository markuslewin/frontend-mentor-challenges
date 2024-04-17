import { useEffect, useState } from "react";

export function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => localStorage.getItem(key));

  useEffect(() => {
    if (typeof value === "string") {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }, [key, value]);

  useEffect(() => {
    function handleStorageEvent(event: StorageEvent) {
      // Key is null when storage gets cleared
      if (event.key === key || event.key === null) {
        setValue(event.newValue);
      }
    }

    addEventListener("storage", handleStorageEvent);
    return () => {
      removeEventListener("storage", handleStorageEvent);
    };
  }, [key]);

  return [value, setValue] as const;
}
