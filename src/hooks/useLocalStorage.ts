/**
 * useLocalStorage Hook
 * 
 * Custom hook for persisting data to localStorage.
 * Provides functions for reading, writing, and removing localStorage data.
 * 
 * @module hooks/useLocalStorage
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Storage options interface
 */
interface StorageOptions {
  /** Whether to hydrate from localStorage on mount */
  hydrate?: boolean;
  /** Storage type ('localStorage' or 'sessionStorage') */
  storage?: 'localStorage' | 'sessionStorage';
}

/**
 * useLocalStorage Hook
 * 
 * Provides persistent state management using localStorage:
 * - Initialize state from localStorage
 * - Update state and persist to localStorage
 * - Remove data from localStorage
 * - Clear all localStorage data
 * - Get all keys in localStorage
 * - Check if key exists
 * 
 * @param key - Storage key
 * @param initialValue - Initial value if no data in storage
 * @param options - Optional storage options
 * @returns Tuple of [value, setValue, removeValue, clearAll]
 * 
 * @example
 * const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
 * 
 * return (
 *   <div className={theme}>
 *     <button onClick={() => setTheme('dark')}>Dark Mode</button>
 *     <button onClick={() => removeTheme()}>Reset Theme</button>
 *   </div>
 * );
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions = {}
): [T, (value: T | ((prev: T) => T)) => void, () => void, () => void] {
  const {
    hydrate = true,
    storage = 'localStorage',
  } = options;

  // Get storage object
  const storageObject = storage === 'sessionStorage' 
    ? window.sessionStorage 
    : window.localStorage;

  // Initialize state
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!hydrate) {
      return initialValue;
    }

    try {
      const item = storageObject.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }

    return initialValue;
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      storageObject.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, storageObject]);

  /**
   * Set value and persist to localStorage
   */
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function 
          ? value(prev) 
          : value;
        
        storageObject.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storageObject]);

  /**
   * Remove value from localStorage
   */
  const removeValue = useCallback(() => {
    try {
      storageObject.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, storageObject, initialValue]);

  /**
   * Clear all localStorage data
   */
  const clearAll = useCallback(() => {
    try {
      storageObject.clear();
      setStoredValue(initialValue);
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
    }
  }, [storageObject, initialValue]);

  return [storedValue, setValue, removeValue, clearAll];
}

/**
 * useSessionStorage Hook
 * 
 * Similar to useLocalStorage but uses sessionStorage instead.
 * Session storage is cleared when the browser tab is closed.
 * 
 * @param key - Storage key
 * @param initialValue - Initial value if no data in storage
 * @returns Tuple of [value, setValue, removeValue, clearAll]
 * 
 * @example
 * const [cart, setCart] = useSessionStorage('cart', []);
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void, () => void] {
  return useLocalStorage<T>(key, initialValue, {
    hydrate: true,
    storage: 'sessionStorage',
  });
}

/**
 * useLocalStorageArray Hook
 * 
 * Specialized hook for managing arrays in localStorage.
 * Provides array-specific operations like push, pop, splice, etc.
 * 
 * @param key - Storage key
 * @param initialValue - Initial array value
 * @returns Object containing array and array operations
 * 
 * @example
 * const { array, push, pop, clear } = useLocalStorageArray('todos', []);
 * 
 * return (
 *   <div>
 *     {array.map(item => <TodoItem key={item.id} {...item} />)}
 *     <button onClick={() => push(newTodo)}>Add Todo</button>
 *     <button onClick={() => pop()}>Remove Last</button>
 *   </div>
 * );
 */
export function useLocalStorageArray<T>(
  key: string,
  initialValue: T[] = []
): {
  array: T[];
  push: (item: T) => void;
  pop: () => T | undefined;
  shift: () => T | undefined;
  unshift: (item: T) => void;
  splice: (start: number, deleteCount?: number, ...items: T[]) => T[];
  set: (items: T[]) => void;
  clear: () => void;
  remove: (item: T) => void;
} {
  const [array, setArray] = useLocalStorage<T[]>(key, initialValue);

  return {
    array,
    push: (item: T) => {
      setArray(prev => [...prev, item]);
    },
    pop: (): T | undefined => {
      let poppedItem: T | undefined;
      setArray(prev => {
        poppedItem = prev[prev.length - 1];
        return prev.slice(0, -1);
      });
      return poppedItem;
    },
    shift: (): T | undefined => {
      let shiftedItem: T | undefined;
      setArray(prev => {
        shiftedItem = prev[0];
        return prev.slice(1);
      });
      return shiftedItem;
    },
    unshift: (item: T) => {
      setArray(prev => [item, ...prev]);
    },
    splice: (start: number, deleteCount?: number, ...items: T[]): T[] => {
      let result: T[] = [];
      setArray(prev => {
        const copy = [...prev];
        result = copy.splice(start, deleteCount ?? 0, ...items);
        return copy;
      });
      return result;
    },
    set: (items: T[]) => {
      setArray(items);
    },
    clear: () => {
      setArray([]);
    },
    remove: (item: T) => {
      setArray(prev => prev.filter(i => i !== item));
    },
  };
}

/**
 * useLocalStorageObject Hook
 * 
 * Specialized hook for managing objects in localStorage.
 * Provides object-specific operations like set, get, remove, etc.
 * 
 * @param key - Storage key
 * @param initialValue - Initial object value
 * @returns Object containing object and object operations
 * 
 * @example
 * const { object, set, get, remove, clear } = useLocalStorageObject('settings', {});
 * 
 * return (
 *   <div>
 *     <button onClick={() => set({ ...object, theme: 'dark' })}>Set Theme</button>
 *     <button onClick={() => remove('theme')}>Remove Theme</button>
 *   </div>
 * );
 */
export function useLocalStorageObject<T extends Record<string, unknown>>(
  key: string,
  initialValue: T = {} as T
): {
  object: T;
  set: (updates: Partial<T>) => void;
  get: <K extends keyof T>(property: K) => T[K];
  remove: <K extends keyof T>(property: K) => void;
  clear: () => void;
  update: (updater: (prev: T) => T) => void;
} {
  const [object, setObject] = useLocalStorage<T>(key, initialValue);

  return {
    object,
    set: (updates: Partial<T>) => {
      setObject(prev => ({ ...prev, ...updates }));
    },
    get: <K extends keyof T>(property: K): T[K] => {
      return object[property];
    },
    remove: <K extends keyof T>(property: K) => {
      const { [property]: _, ...rest } = object;
      setObject(rest as T);
    },
    clear: () => {
      setObject({} as T);
    },
    update: (updater: (prev: T) => T) => {
      setObject(updater);
    },
  };
}

export default useLocalStorage;