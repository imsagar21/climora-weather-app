import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, InitialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : InitialValue;
    } catch (error) {
      console.error(error);
      return InitialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);
  return [storedValue, setStoredValue] as const;
}
