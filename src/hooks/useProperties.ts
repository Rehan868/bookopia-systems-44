
import { useState, useEffect } from 'react';
import { fetchProperties } from '@/services/api';
import { Property } from '@/services/supabase-types';

export function useProperties() {
  const [data, setData] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProperties() {
      try {
        setIsLoading(true);
        const result = await fetchProperties();
        // Ensure we're setting just the data array, not an object containing the data
        setData(Array.isArray(result) ? result : (result.data || []));
      } catch (err) {
        console.error('Error loading properties:', err);
        setError(err instanceof Error ? err : new Error('Failed to load properties'));
        // Set empty array on error to avoid null pointer exceptions
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadProperties();
  }, []);

  return { data, isLoading, error };
}
