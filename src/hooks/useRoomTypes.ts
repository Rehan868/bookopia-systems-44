
import { useState, useEffect } from 'react';
import { getRoomTypes, getRoomTypeById } from '@/services/api';
import type { RoomType } from '@/services/supabase-types';

export const useRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const result = await getRoomTypes();
        if (result.error) {
          setError(result.error);
        } else {
          setRoomTypes(result.data);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { roomTypes, isLoading, error };
};

export const useRoomType = (id: string) => {
  const [roomType, setRoomType] = useState<RoomType | null>(null);
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
        const result = await getRoomTypeById(id);
        if (result.error) {
          setError(result.error);
        } else {
          setRoomType(result.data);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { roomType, isLoading, error };
};
