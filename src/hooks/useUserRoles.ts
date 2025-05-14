import { useState } from 'react';

// Define types
export type Permission = 'view' | 'create' | 'update' | 'delete' | 'export';

export interface PagePermissions {
  [pageId: string]: {
    [permission in Permission]?: boolean;
  };
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: PagePermissions;
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const initialUserRoles: UserRole[] = [
  {
    id: 'role-1',
    name: 'Administrator',
    description: 'Full system access',
    permissions: {},
    isSystem: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'role-2',
    name: 'Manager',
    description: 'Can manage bookings, rooms, and view reports',
    permissions: {
      bookings: { view: true, create: true, update: true, delete: false },
      rooms: { view: true, create: true, update: true, delete: false },
      reports: { view: true, export: true }
    },
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z'
  },
  {
    id: 'role-3',
    name: 'Staff',
    description: 'Limited access to day-to-day operations',
    permissions: {
      bookings: { view: true, create: true, update: false, delete: false },
      rooms: { view: true, create: false, update: false, delete: false }
    },
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z'
  }
];

export const useUserRoles = () => {
  const [userRoles, setUserRoles] = useState<UserRole[]>(initialUserRoles);

  const addUserRole = (newRole: Omit<UserRole, 'id' | 'createdAt' | 'updatedAt'>) => {
    const role: UserRole = {
      ...newRole,
      id: `role-${userRoles.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setUserRoles([...userRoles, role]);
    return role;
  };

  const updateUserRole = (id: string, updatedRole: Partial<UserRole>) => {
    setUserRoles(prev => 
      prev.map(role => 
        role.id === id ? 
        { 
          ...role, 
          ...updatedRole, 
          updatedAt: new Date().toISOString() 
        } : role
      )
    );
  };

  const deleteUserRole = (id: string) => {
    setUserRoles(prev => prev.filter(role => role.id !== id));
  };

  const getUserRole = (id: string) => {
    return userRoles.find(role => role.id === id);
  };

  return {
    userRoles,
    addUserRole,
    updateUserRole,
    deleteUserRole,
    getUserRole
  };
};
