import React from 'react';
import { Button } from '@/components/ui/button';
import { PenSquare, Trash2, Shield, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useUserRoles } from '@/hooks/useUserRoles';

const UserRoleList = () => {
  const { userRoles, deleteUserRole } = useUserRoles();
  const navigate = useNavigate();

  const handleDeleteRole = (id: string, name: string, isSystem?: boolean) => {
    if (isSystem) {
      alert("System roles cannot be deleted");
      return;
    }
    
    if (confirm(`Are you sure you want to delete the role "${name}"?`)) {
      deleteUserRole(id);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">User Roles</h3>
        <Button 
          onClick={() => navigate('/settings/user-roles/add')} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Shield className="h-4 w-4" />
          Add User Role
        </Button>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left font-medium p-3">Role Name</th>
              <th className="text-left font-medium p-3">Description</th>
              <th className="text-left font-medium p-3">Type</th>
              <th className="text-right font-medium p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userRoles.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Shield className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{role.name}</span>
                  </div>
                </td>
                <td className="p-3">{role.description}</td>
                <td className="p-3">
                  {role.isSystem ? (
                    <Badge className="bg-blue-100 text-blue-800">System</Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-800">Custom</Badge>
                  )}
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => navigate(`/settings/user-roles/edit/${role.id}`)}
                      disabled={role.isSystem}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-destructive"
                      onClick={() => handleDeleteRole(role.id, role.name, role.isSystem)}
                      disabled={role.isSystem}
                    >
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

export default UserRoleList;
