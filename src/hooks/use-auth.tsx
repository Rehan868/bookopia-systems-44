
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  ownerLogin: (email: string, password: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  getRole: () => "admin" | "agent" | "owner" | null;
  isAdmin: () => boolean;
  isAgent: () => boolean;
  isOwner: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize and listen for auth changes
  useEffect(() => {
    async function initializeAuth() {
      setIsLoading(true);
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      
      // Set up subscription for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user || null);
          setIsLoading(false);
        }
      );
      
      setIsLoading(false);
      
      // Cleanup subscription
      return () => subscription.unsubscribe();
    }
    
    initializeAuth();
  }, []);

  // Regular staff login (admin, agent)
  async function login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { error };
      }
      
      // Check if user has correct role
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user?.id)
        .single();
      
      if (profileData?.role === 'owner') {
        // If owner is trying to login via staff portal, log them out
        await supabase.auth.signOut();
        return { error: new Error("Please use the Owner Portal to login") };
      }
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }
  
  // Owner login
  async function ownerLogin(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { error };
      }
      
      // Check if user has owner role
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user?.id)
        .single();
      
      if (profileData?.role !== 'owner') {
        // If staff is trying to login via owner portal, log them out
        await supabase.auth.signOut();
        return { error: new Error("Please use the Staff Portal to login") };
      }
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async function logout() {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  }

  function getRole(): "admin" | "agent" | "owner" | null {
    if (!user) return null;
    
    // Return from user metadata if available
    const roleFromMeta = user.user_metadata?.role as "admin" | "agent" | "owner" | null;
    if (roleFromMeta) return roleFromMeta;
    
    // Fallback to app_metadata
    const roleFromApp = user.app_metadata?.role as "admin" | "agent" | "owner" | null;
    return roleFromApp || null;
  }

  function isAdmin() {
    return getRole() === "admin";
  }

  function isAgent() {
    return getRole() === "agent";
  }

  function isOwner() {
    return getRole() === "owner";
  }

  const value = {
    user,
    session,
    isAuthenticated: !!user,
    isLoading,
    login,
    ownerLogin,
    logout,
    getRole,
    isAdmin,
    isAgent,
    isOwner,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
