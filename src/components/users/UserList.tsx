import React from 'react';
import { Button } from '@/components/ui/button';
import { User, PenSquare, Trash2, Shield, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '@/hooks/useUsers';

const UserList = () => {
  const { users } = useUsers();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">System Users</h3>        <div className="flex gap-2">
          <Button onClick={() => navigate('/settings/user-roles/add')} variant="outline" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Add User Role
          </Button>
          <Button onClick={() => navigate('/user-add')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left font-medium p-3">Name</th>
              <th className="text-left font-medium p-3">Email</th>
              <th className="text-left font-medium p-3">Role</th>
              <th className="text-left font-medium p-3">Status</th>
              <th className="text-right font-medium p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <Badge className={`${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/user-view/${user.id}`)}>
                      View
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/user-edit/${user.id}`)}>
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
