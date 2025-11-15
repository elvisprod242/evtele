'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, (newValue: T | ((prevState: T) => T)) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    // This effect runs on the client after hydration.
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
    }
  }, [key]);

  const setLocalStorageValue = useCallback(
    (newValue: T | ((prevState: T) => T)) => {
      // We update the state first for immediate UI feedback.
      setValue(prevValue => {
        const valueToStore = newValue instanceof Function ? newValue(prevValue) : newValue;
        try {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
        } catch (error) {
          console.warn(`Error setting localStorage key “${key}”:`, error);
        }
        return valueToStore;
      });
    },
    [key]
  );

  return [value, setLocalStorageValue];
}
