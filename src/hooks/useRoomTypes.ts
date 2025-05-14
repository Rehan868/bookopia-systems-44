
import { useState, useEffect } from 'react';
import { RoomType } from '@/services/supabase-types';
import { fetchRoomTypes } from '@/services/api';

export function useRoomTypes() {
  const [data, setData] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadRoomTypes() {
      try {
        setIsLoading(true);
        // Make sure we're calling fetchRoomTypes with any required parameters
        const result = await fetchRoomTypes({});
        // Ensure we're setting just the data array, not an object containing the data
        setData(Array.isArray(result) ? result : (result.data || []));
      } catch (err) {
        console.error('Error loading room types:', err);
        setError(err instanceof Error ? err : new Error('Failed to load room types'));
        // Set empty array on error to avoid null pointer exceptions
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadRoomTypes();
  }, []);

  return { data, isLoading, error };
}
