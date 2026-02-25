/**
 * useLocalStorage Hook Tests
 * 
 * Comprehensive unit tests for useLocalStorage hooks including:
 * - useLocalStorage basic operations
 * - useSessionStorage operations
 * - useLocalStorageArray operations
 * - useLocalStorageObject operations
 * 
 * @module tests/hooks/useLocalStorage
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage, useSessionStorage, useLocalStorageArray, useLocalStorageObject } from '../../src/hooks/useLocalStorage';

// Mock localStorage and sessionStorage
interface MockStorage {
  data: Record<string, string>;
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  length: number;
  key: (index: number) => string | null;
}

const mockLocalStorage: MockStorage = {
  data: {},
  getItem: (key: string) => mockLocalStorage.data[key] || null,
  setItem: (key: string, value: string) => {
    mockLocalStorage.data[key] = value;
  },
  removeItem: (key: string) => {
    delete mockLocalStorage.data[key];
  },
  clear: () => {
    mockLocalStorage.data = {};
  },
  get length() {
    return Object.keys(mockLocalStorage.data).length;
  },
  key: (index: number) => {
    return Object.keys(mockLocalStorage.data)[index] || null;
  },
};

const mockSessionStorage: MockStorage = {
  data: {},
  getItem: (key: string) => mockSessionStorage.data[key] || null,
  setItem: (key: string, value: string) => {
    mockSessionStorage.data[key] = value;
  },
  removeItem: (key: string) => {
    delete mockSessionStorage.data[key];
  },
  clear: () => {
    mockSessionStorage.data = {};
  },
  get length() {
    return Object.keys(mockSessionStorage.data).length;
  },
  key: (index: number) => {
    return Object.keys(mockSessionStorage.data)[index] || null;
  },
};

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.data = {};
    mockSessionStorage.data = {};
    
    // Mock window objects
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    
    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
    });
  });

  describe('useLocalStorage', () => {
    it('should initialize with initial value when no localStorage data exists', () => {
      const { result } = renderHook(() => useLocalStorage<string>('test-key', 'initial'));
      
      expect(result.current[0]).toBe('initial');
    });

    it('should initialize with localStorage data when it exists', () => {
      mockLocalStorage.data['test-key'] = JSON.stringify('stored-value');
      
      const { result } = renderHook(() => useLocalStorage<string>('test-key', 'initial'));
      
      expect(result.current[0]).toBe('stored-value');
    });

    it('should update value when setValue is called', () => {
      const { result } = renderHook(() => useLocalStorage<string>('test-key', 'initial'));
      
      expect(result.current[0]).toBe('initial');
      
      act(() => {
        result.current[1]('updated-value');
      });
      
      expect(result.current[0]).toBe('updated-value');
    });

    it('should persist value to localStorage when setValue is called', () => {
      const { result } = renderHook(() => useLocalStorage<string>('test-key', 'initial'));
      
      act(() => {
        result.current[1]('new-value');
      });
      
      expect(mockLocalStorage.data['test-key']).toBe(JSON.stringify('new-value'));
    });

    it('should support functional updates', () => {
      const { result } = renderHook(() => useLocalStorage<number>('counter', 0));
      
      act(() => {
        result.current[1](prev => prev + 1);
      });
      
      expect(result.current[0]).toBe(1);
      
      act(() => {
        result.current[1](prev => prev + 1);
      });
      
      expect(result.current[0]).toBe(2);
    });

    it('should remove value when removeValue is called', () => {
      mockLocalStorage.data['test-key'] = JSON.stringify('test-value');
      
      const { result } = renderHook(() => useLocalStorage<string>('test-key', 'initial'));
      
      expect(result.current[0]).toBe('test-value');
      
      act(() => {
        result.current[2]();
      });
      
      expect(result.current[0]).toBe('initial');
      expect(mockLocalStorage.data['test-key']).toBeUndefined();
    });

    it('should clear all storage when clearAll is called', () => {
      mockLocalStorage.data['key1'] = JSON.stringify('value1');
      mockLocalStorage.data['key2'] = JSON.stringify('value2');
      
      const { result } = renderHook(() => useLocalStorage<string>('test-key', 'initial'));
      
      act(() => {
        result.current[3]();
      });
      
      expect(Object.keys(mockLocalStorage.data).length).toBe(0);
      expect(result.current[0]).toBe('initial');
    });

    it('should not hydrate when hydrate option is false', () => {
      mockLocalStorage.data['test-key'] = JSON.stringify('stored-value');
      
      const { result } = renderHook(() => 
        useLocalStorage<string>('test-key', 'initial', { hydrate: false })
      );
      
      expect(result.current[0]).toBe('initial');
    });

    it('should use sessionStorage when storage option is sessionStorage', () => {
      const { result } = renderHook(() => 
        useLocalStorage<string>('test-key', 'initial', { storage: 'sessionStorage' })
      );
      
      act(() => {
        result.current[1]('new-value');
      });
      
      expect(mockSessionStorage.data['test-key']).toBe(JSON.stringify('new-value'));
    });

    it('should handle JSON parse errors gracefully', () => {
      mockLocalStorage.data['test-key'] = 'invalid-json';
      
      const { result } = renderHook(() => useLocalStorage<string>('test-key', 'initial'));
      
      expect(result.current[0]).toBe('initial');
    });
  });

  describe('useSessionStorage', () => {
    it('should initialize with initial value when no sessionStorage data exists', () => {
      const { result } = renderHook(() => useSessionStorage<string>('test-key', 'initial'));
      
      expect(result.current[0]).toBe('initial');
    });

    it('should initialize with sessionStorage data when it exists', () => {
      mockSessionStorage.data['test-key'] = JSON.stringify('stored-value');
      
      const { result } = renderHook(() => useSessionStorage<string>('test-key', 'initial'));
      
      expect(result.current[0]).toBe('stored-value');
    });

    it('should update value when setValue is called', () => {
      const { result } = renderHook(() => useSessionStorage<string>('test-key', 'initial'));
      
      act(() => {
        result.current[1]('updated-value');
      });
      
      expect(result.current[0]).toBe('updated-value');
    });

    it('should persist value to sessionStorage when setValue is called', () => {
      const { result } = renderHook(() => useSessionStorage<string>('test-key', 'initial'));
      
      act(() => {
        result.current[1]('new-value');
      });
      
      expect(mockSessionStorage.data['test-key']).toBe(JSON.stringify('new-value'));
    });

    it('should remove value when removeValue is called', () => {
      mockSessionStorage.data['test-key'] = JSON.stringify('test-value');
      
      const { result } = renderHook(() => useSessionStorage<string>('test-key', 'initial'));
      
      act(() => {
        result.current[2]();
      });
      
      expect(result.current[0]).toBe('initial');
      expect(mockSessionStorage.data['test-key']).toBeUndefined();
    });

    it('should clear all storage when clearAll is called', () => {
      mockSessionStorage.data['key1'] = JSON.stringify('value1');
      mockSessionStorage.data['key2'] = JSON.stringify('value2');
      
      const { result } = renderHook(() => useSessionStorage<string>('test-key', 'initial'));
      
      act(() => {
        result.current[3]();
      });
      
      expect(Object.keys(mockSessionStorage.data).length).toBe(0);
      expect(result.current[0]).toBe('initial');
    });
  });

  describe('useLocalStorageArray', () => {
    it('should initialize with empty array when no localStorage data exists', () => {
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key'));
      
      expect(result.current.array).toEqual([]);
    });

    it('should initialize with localStorage array data when it exists', () => {
      mockLocalStorage.data['test-key'] = JSON.stringify(['item1', 'item2', 'item3']);
      
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key'));
      
      expect(result.current.array).toEqual(['item1', 'item2', 'item3']);
    });

    it('should push items to array', () => {
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key', ['item1']));
      
      expect(result.current.array).toEqual(['item1']);
      
      act(() => {
        result.current.push('item2');
      });
      
      expect(result.current.array).toEqual(['item1', 'item2']);
    });

    it('should pop items from array', () => {
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key', ['item1', 'item2']));
      
      expect(result.current.array).toEqual(['item1', 'item2']);
      
      const popped = act(() => {
        return result.current.pop();
      });
      
      expect(popped).toBe('item2');
      expect(result.current.array).toEqual(['item1']);
    });

    it('should shift items from array', () => {
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key', ['item1', 'item2']));
      
      expect(result.current.array).toEqual(['item1', 'item2']);
      
      const shifted = act(() => {
        return result.current.shift();
      });
      
      expect(shifted).toBe('item1');
      expect(result.current.array).toEqual(['item2']);
    });

    it('should unshift items to array', () => {
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key', ['item2']));
      
      expect(result.current.array).toEqual(['item2']);
      
      act(() => {
        result.current.unshift('item1');
      });
      
      expect(result.current.array).toEqual(['item1', 'item2']);
    });

    it('should splice array', () => {
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key', ['item1', 'item2', 'item3', 'item4']));
      
      expect(result.current.array).toEqual(['item1', 'item2', 'item3', 'item4']);
      
      const spliced = act(() => {
        return result.current.splice(1, 2, 'new1', 'new2');
      });
      
      expect(spliced).toEqual(['item2', 'item3']);
      expect(result.current.array).toEqual(['item1', 'new1', 'new2', 'item4']);
    });

    it('should set array to new value', () => {
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key', ['item1']));
      
      act(() => {
        result.current.set(['item2', 'item3']);
      });
      
      expect(result.current.array).toEqual(['item2', 'item3']);
    });

    it('should clear array', () => {
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key', ['item1', 'item2']));
      
      act(() => {
        result.current.clear();
      });
      
      expect(result.current.array).toEqual([]);
    });

    it('should remove item from array', () => {
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key', ['item1', 'item2', 'item3']));
      
      act(() => {
        result.current.remove('item2');
      });
      
      expect(result.current.array).toEqual(['item1', 'item3']);
    });

    it('should handle non-existent items when removing', () => {
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key', ['item1', 'item2']));
      
      act(() => {
        result.current.remove('non-existent');
      });
      
      expect(result.current.array).toEqual(['item1', 'item2']);
    });
  });

  describe('useLocalStorageObject', () => {
    it('should initialize with empty object when no localStorage data exists', () => {
      const { result } = renderHook(() => useLocalStorageObject<{ theme: string }>('test-key'));
      
      expect(result.current.object).toEqual({});
    });

    it('should initialize with localStorage object data when it exists', () => {
      mockLocalStorage.data['test-key'] = JSON.stringify({ theme: 'dark', lang: 'en' });
      
      const { result } = renderHook(() => useLocalStorageObject<{ theme: string; lang: string }>('test-key'));
      
      expect(result.current.object).toEqual({ theme: 'dark', lang: 'en' });
    });

    it('should set object properties', () => {
      const { result } = renderHook(() => useLocalStorageObject<{ theme: string }>('test-key', { theme: 'light' }));
      
      expect(result.current.object).toEqual({ theme: 'light' });
      
      act(() => {
        result.current.set({ theme: 'dark' });
      });
      
      expect(result.current.object).toEqual({ theme: 'dark' });
    });

    it('should get object properties', () => {
      const { result } = renderHook(() => useLocalStorageObject<{ theme: string; lang: string }>('test-key', { theme: 'dark', lang: 'en' }));
      
      expect(result.current.get('theme')).toBe('dark');
      expect(result.current.get('lang')).toBe('en');
    });

    it('should remove object properties', () => {
      const { result } = renderHook(() => useLocalStorageObject<{ theme: string; lang: string }>('test-key', { theme: 'dark', lang: 'en' }));
      
      expect(result.current.object).toEqual({ theme: 'dark', lang: 'en' });
      
      act(() => {
        result.current.remove('lang');
      });
      
      expect(result.current.object).toEqual({ theme: 'dark' });
    });

    it('should clear object', () => {
      const { result } = renderHook(() => useLocalStorageObject<{ theme: string }>('test-key', { theme: 'dark' }));
      
      act(() => {
        result.current.clear();
      });
      
      expect(result.current.object).toEqual({});
    });

    it('should update object with updater function', () => {
      const { result } = renderHook(() => useLocalStorageObject<{ count: number }>('test-key', { count: 0 }));
      
      expect(result.current.object).toEqual({ count: 0 });
      
      act(() => {
        result.current.update(prev => ({ ...prev, count: prev.count + 1 }));
      });
      
      expect(result.current.object).toEqual({ count: 1 });
      
      act(() => {
        result.current.update(prev => ({ ...prev, count: prev.count + 1 }));
      });
      
      expect(result.current.object).toEqual({ count: 2 });
    });

    it('should handle nested objects', () => {
      const { result } = renderHook(() => 
        useLocalStorageObject<{ settings: { theme: string; notifications: boolean } }>('test-key', {
          settings: { theme: 'light', notifications: true }
        })
      );
      
      expect(result.current.object.settings.theme).toBe('light');
      
      act(() => {
        result.current.set({ settings: { theme: 'dark', notifications: true } });
      });
      
      expect(result.current.object.settings.theme).toBe('dark');
    });
  });

  describe('edge cases', () => {
    it('should handle null values', () => {
      mockLocalStorage.data['test-key'] = JSON.stringify(null);
      
      const { result } = renderHook(() => useLocalStorage<string | null>('test-key', 'initial'));
      
      expect(result.current[0]).toBeNull();
    });

    it('should handle zero values', () => {
      mockLocalStorage.data['test-key'] = JSON.stringify(0);
      
      const { result } = renderHook(() => useLocalStorage<number>('test-key', 1));
      
      expect(result.current[0]).toBe(0);
    });

    it('should handle false values', () => {
      mockLocalStorage.data['test-key'] = JSON.stringify(false);
      
      const { result } = renderHook(() => useLocalStorage<boolean>('test-key', true));
      
      expect(result.current[0]).toBe(false);
    });

    it('should handle empty strings', () => {
      mockLocalStorage.data['test-key'] = JSON.stringify('');
      
      const { result } = renderHook(() => useLocalStorage<string>('test-key', 'default'));
      
      expect(result.current[0]).toBe('');
    });

    it('should handle empty arrays', () => {
      mockLocalStorage.data['test-key'] = JSON.stringify([]);
      
      const { result } = renderHook(() => useLocalStorageArray<string>('test-key', ['item']));
      
      expect(result.current.array).toEqual([]);
    });

    it('should handle empty objects', () => {
      mockLocalStorage.data['test-key'] = JSON.stringify({});
      
      const { result } = renderHook(() => useLocalStorageObject<{ theme: string }>('test-key', { theme: 'dark' }));
      
      expect(result.current.object).toEqual({});
    });
  });
});