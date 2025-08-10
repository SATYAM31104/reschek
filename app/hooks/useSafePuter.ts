import { useEffect, useState } from 'react';
import { usePuterStore } from '~/lib/puter';

// Safe hook that handles Puter loading states
export const useSafePuter = () => {
  const [isReady, setIsReady] = useState(false);
  const store = usePuterStore();

  useEffect(() => {
    // Only mark as ready when Puter is actually loaded
    if (store.puterReady && !store.isLoading) {
      setIsReady(true);
    }
  }, [store.puterReady, store.isLoading]);

  return {
    ...store,
    isReady,
    // Safe methods that check if Puter is ready
    safeAuth: isReady ? store.auth : {
      user: null,
      isAuthenticated: false,
      signIn: async () => console.warn('Puter not ready'),
      signOut: async () => console.warn('Puter not ready'),
      refreshUser: async () => console.warn('Puter not ready'),
      checkAuthStatus: async () => false,
      getUser: () => null,
    },
    safeFs: isReady ? store.fs : {
      write: async () => console.warn('Puter not ready'),
      read: async () => console.warn('Puter not ready'),
      readDir: async () => console.warn('Puter not ready'),
      delete: async () => console.warn('Puter not ready'),
      upload: async () => console.warn('Puter not ready'),
    },
    safeKv: isReady ? store.kv : {
      set: async () => console.warn('Puter not ready'),
      get: async () => console.warn('Puter not ready'),
      list: async () => [],
      delete: async () => console.warn('Puter not ready'),
      flush: async () => console.warn('Puter not ready'),
    },
    safeAi: isReady ? store.ai : {
      chat: async () => console.warn('Puter not ready'),
      feedback: async () => console.warn('Puter not ready'),
    },
  };
};

// Hook for components that require Puter to be ready
export const usePuterRequired = () => {
  const puter = useSafePuter();
  
  if (!puter.isReady && !puter.isLoading && !puter.error) {
    // Try to initialize if not already done
    try {
      const { init } = usePuterStore.getState();
      init();
    } catch (error) {
      console.error('Failed to initialize Puter:', error);
    }
  }

  return puter;
};