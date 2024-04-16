import { useRef } from "react";

export function useMapRef<K, V>() {
  const mapRef = useRef<Map<K, V> | null>(null);

  function getMap() {
    if (!mapRef.current) {
      mapRef.current = new Map();
    }
    return mapRef.current;
  }

  return {
    get(key: K) {
      const map = getMap();
      return map.get(key);
    },
    setOrDelete(key: K, value: V | null) {
      const map = getMap();
      if (value === null) {
        return map.delete(key);
      } else {
        return map.set(key, value);
      }
    },
  };
}
