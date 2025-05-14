
/// <reference types="vite/client" />

// Add type declarations for any global types we need

declare module '@/hooks/use-toast' {
  import { Toast } from '@/components/ui/toast';
  export function useToast(): {
    toast: (props: Toast) => void;
  };
  export const toast: (props: Toast) => void;
}

