// Mock authentication service with no Supabase dependencies
// This is a simplified version that works with our mock data implementation

// Types that were previously from Supabase are now defined locally
export type AuthResponse = {
  data: {
    user: any | null;
    session: any | null;
  };
  error: Error | null;
};

export type SignUpData = {
  email: string;
  password: string;
  name: string;
  userType: 'staff' | 'owner';
  role?: 'admin' | 'agent';
};

/**
 * Handles user sign-in with email and password (mock implementation)
 */
export const signInWithEmail = async (
  email: string,
  password: string,
  userType: 'staff' | 'owner' = 'staff'
): Promise<AuthResponse> => {
  // Log authentication attempt for debugging
  console.log(`Mock sign-in: ${email} as ${userType}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock successful authentication with no validation
  // In a real app, you'd validate credentials here
  const mockUser = {
    id: userType === 'owner' ? '2' : '1',
    email,
    app_metadata: { user_type: userType },
    user_metadata: { name: userType === 'owner' ? 'Owner User' : 'Admin User' }
  };
  
  const mockSession = {
    user: mockUser,
    access_token: 'mock-token-' + Date.now()
  };
  
  return {
    data: {
      user: mockUser,
      session: mockSession
    },
    error: null
  };
};

/**
 * Handles user sign-up with email and password (mock implementation)
 */
export const signUpWithEmail = async ({
  email,
  password,
  name,
  userType,
  role = 'agent'
}: SignUpData): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock user creation (always succeeds)
  const mockUser = {
    id: 'new-' + Date.now(),
    email,
    app_metadata: { 
      user_type: userType,
      ...(userType === 'staff' && { role })
    },
    user_metadata: { name }
  };
  
  return {
    data: {
      user: mockUser,
      session: null
    },
    error: null
  };
};

/**
 * Signs the user out (mock implementation)
 */
export const signOut = async (): Promise<{ error: Error | null }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { error: null };
};

/**
 * Gets the current user session (mock implementation)
 */
export const getSession = async () => {
  // In a real implementation, this would check for a valid session
  // Here we just simulate a delay and return no session
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return { 
    data: { 
      session: null 
    } 
  };
};

/**
 * Gets user profile based on user type (mock implementation)
 */
export const getUserProfile = async (userId: string, userType: 'staff' | 'owner') => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return a mock profile based on the user type
  if (userType === 'staff') {
    return {
      id: userId,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      avatar_url: null
    };
  } else {
    return {
      id: userId,
      name: 'Owner User',
      email: 'owner@example.com',
      phone: '+1234567890',
      avatar_url: null
    };
  }
};

/**
 * Updates a user profile (mock implementation)
 */
export const updateUserProfile = async (
  userId: string,
  userType: 'staff' | 'owner',
  profile: Record<string, any>
) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Return the updated profile (just merge the input with some defaults)
  return {
    id: userId,
    ...profile,
    updated_at: new Date().toISOString()
  };
};