
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCleaningTasks, updateCleaningTask } from '@/services/api';
import type { CleaningTask } from '@/services/supabase-types';

export const useCleaningTasks = (filterOptions?: Record<string, any>) => {
  const { 
    data, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['cleaningTasks', filterOptions],
    queryFn: async () => {
      const result = await getCleaningTasks({ filter: filterOptions });
      return result;
    }
  });

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      await updateCleaningTask(taskId, { status });
      // Refetch data after update
      refetch();
      return { success: true, error: null };
    } catch (error) {
      console.error("Error updating cleaning task:", error);
      return { success: false, error };
    }
  };

  return {
    tasks: data?.data || [],
    isLoading,
    error: error as Error | null,
    updateTaskStatus
  };
};
