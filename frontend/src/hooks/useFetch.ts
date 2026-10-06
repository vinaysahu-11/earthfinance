import { useState, useEffect, useCallback } from 'react';

export function useFetch<T>(fetchFn: () => Promise<{ success: boolean; data?: T; error?: string }>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchFn();
      if (res.success && res.data !== undefined) {
        setData(res.data);
      } else {
        setError(res.error || 'Failed to load data');
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred while loading data');
    } finally {
      setIsLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, isLoading, error, refetch: execute };
}
