
import React from 'react';
import { useUsers } from '@/hooks/useUsers';

export function UserList() {
  const { data: usersData, isLoading, error } = useUsers();
  
  if (isLoading) return <div>Loading users...</div>;
  
  if (error) return <div>Error loading users: {error.message}</div>;
  
  // Added null check and default to empty array if no data
  const users = usersData || [];
  
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
