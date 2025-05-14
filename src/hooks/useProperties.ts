
import { useState, useEffect } from 'react';
import { getProperties, getPropertyById } from '@/services/api';
import type { Property } from '@/services/supabase-types';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const result = await getProperties();
        if (result.error) {
          setError(result.error);
        } else {
          setProperties(result.data);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { properties, isLoading, error };
};

export const useProperty = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      try {
        const result = await getPropertyById(id);
        if (result.error) {
          setError(result.error);
        } else {
          setProperty(result.data);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { property, isLoading, error };
};
