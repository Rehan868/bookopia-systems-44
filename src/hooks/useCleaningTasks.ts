
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCleaningTasks } from '@/services/api';
import { useToast } from './use-toast';

export const useCleaningTasks = () => {
  return useQuery({
    queryKey: ['cleaning-tasks'],
    queryFn: async () => {
      return await fetchCleaningTasks();
    }
  });
};

// Create a separate hook for updating cleaning task status
export const useUpdateCleaningTaskStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      // For now we'll just create a placeholder function since we don't have the actual API function
      // This will be replaced with the real API call when it's available
      console.log(`Updating task ${id} to status ${status}`);
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cleaning-tasks'] });
      toast({
        title: 'Cleaning task updated',
        description: 'The cleaning task status has been updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update cleaning task',
        description: error.message,
        variant: 'destructive',
      });
    }
  });
};
