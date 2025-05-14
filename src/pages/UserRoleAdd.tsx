import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserRoles, PagePermissions } from '@/hooks/useUserRoles';

// Define the page permissions structure
const pagesWithPermissions = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    permissions: ['view']
  },
  {
    id: 'bookings',
    name: 'Bookings',
    permissions: ['view', 'create', 'update', 'delete']
  },
  {
    id: 'rooms',
    name: 'Rooms',
    permissions: ['view', 'create', 'update', 'delete']
  },
  {
    id: 'guests',
    name: 'Guests',
    permissions: ['view', 'create', 'update', 'delete']
  },
  {
    id: 'owners',
    name: 'Owners',
    permissions: ['view', 'create', 'update', 'delete']
  },
  {
    id: 'users',
    name: 'Users',
    permissions: ['view', 'create', 'update', 'delete']
  },
  {
    id: 'reports',
    name: 'Reports',
    permissions: ['view', 'export']
  },
  {
    id: 'auditLogs',
    name: 'Audit Logs',
    permissions: ['view']
  },
  {
    id: 'cleaning',
    name: 'Cleaning Status',
    permissions: ['view', 'update']
  },
  {
    id: 'expenses',
    name: 'Expenses',
    permissions: ['view', 'create', 'update', 'delete']
  },
  {
    id: 'settings',
    name: 'Settings',
    permissions: ['view', 'update']
  }
];

const UserRoleAdd = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addUserRole } = useUserRoles();
  
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [permissions, setPermissions] = useState(() => {
    // Initialize permissions object
    const initialPermissions = {};
    pagesWithPermissions.forEach(page => {
      initialPermissions[page.id] = {};
      page.permissions.forEach(permission => {
        initialPermissions[page.id][permission] = false;
      });
    });
    return initialPermissions;
  });

  // Toggle all permissions for a page
  const toggleAllPagePermissions = (pageId, value) => {
    setPermissions(prevPermissions => {
      const updatedPermissions = { ...prevPermissions };
      const pagePermissions = { ...updatedPermissions[pageId] };
      
      Object.keys(pagePermissions).forEach(permission => {
        pagePermissions[permission] = value;
      });
      
      updatedPermissions[pageId] = pagePermissions;
      return updatedPermissions;
    });
  };

  // Toggle a specific permission
  const togglePermission = (pageId, permission, value) => {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [pageId]: {
        ...prevPermissions[pageId],
        [permission]: value
      }
    }));
  };

  // Check if all permissions for a page are enabled
  const areAllPagePermissionsEnabled = (pageId) => {
    const pagePermissions = permissions[pageId];
    return Object.values(pagePermissions).every(value => value === true);
  };

  // Check if any permissions for a page are enabled
  const areAnyPagePermissionsEnabled = (pageId) => {
    const pagePermissions = permissions[pageId];
    return Object.values(pagePermissions).some(value => value === true);
  };  const handleSave = () => {
    if (!roleName.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive"
      });
      return;
    }

    // Add the new role
    addUserRole({
      name: roleName,
      description: roleDescription,
      permissions: permissions as PagePermissions
    });

    toast({
      title: "Role Created",
      description: `User role "${roleName}" has been created successfully.`
    });

    // Navigate back to settings
    navigate('/settings');
  };
  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center">
        <Button 
          variant="ghost" 
          className="mr-4" 
          onClick={() => navigate('/settings')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add User Role</h1>
          <p className="text-muted-foreground mt-1">Create a new user role with specific permissions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Information</CardTitle>
          <CardDescription>
            Set the name and permissions for this role
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name*</Label>
              <Input 
                id="role-name" 
                value={roleName} 
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="e.g. Front Desk Manager"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>
              <Input 
                id="role-description" 
                value={roleDescription} 
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="Brief description of this role's responsibilities"
              />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Permissions</h3>
            <p className="text-sm text-muted-foreground">
              Configure which actions this role can perform
            </p>

            {pagesWithPermissions.map((page) => (
              <div key={page.id} className="border rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium">{page.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground mr-2">All permissions</span>
                    <Switch
                      checked={areAllPagePermissionsEnabled(page.id)}
                      onCheckedChange={(checked) => toggleAllPagePermissions(page.id, checked)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {page.permissions.map((permission) => (
                    <div key={`${page.id}-${permission}`} className="flex items-center justify-between border rounded-md p-3">
                      <Label htmlFor={`${page.id}-${permission}`} className="capitalize">
                        {permission}
                      </Label>
                      <Switch
                        id={`${page.id}-${permission}`}
                        checked={permissions[page.id][permission]}
                        onCheckedChange={(checked) => togglePermission(page.id, permission, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="px-6 py-4 flex justify-end gap-4 border-t">
          <Button variant="outline" onClick={() => navigate('/settings')}>Cancel</Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Create Role
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserRoleAdd;
