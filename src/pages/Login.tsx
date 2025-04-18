
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '@/hooks/useUsers';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { data: users } = useUsers();

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a mockup authentication for demo purposes
    // In a real app, this would be handled by a proper auth service
    setTimeout(() => {
      const foundUser = users?.find(user => user.email === staffEmail);
      
      if (foundUser) {
        // Store user info in localStorage for this demo
        localStorage.setItem('staffLoggedIn', 'true');
        localStorage.setItem('userId', foundUser.id);
        localStorage.setItem('userName', foundUser.name);
        localStorage.setItem('userRole', foundUser.role);
        
        toast({
          title: 'Login successful',
          description: `Welcome back, ${foundUser.name}!`,
        });
        
        navigate('/');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password.',
          variant: 'destructive',
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Hotel Manager</h1>
        <p className="text-muted-foreground">Your complete hotel management solution</p>
      </div>
      
      <Card className="border-none shadow-lg w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Staff Login</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access the system</CardDescription>
        </CardHeader>
        <form onSubmit={handleStaffLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="staff-email">Email</Label>
              <Input 
                id="staff-email" 
                type="email" 
                placeholder="your.email@example.com"
                value={staffEmail}
                onChange={(e) => setStaffEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="staff-password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="staff-password" 
                type="password"
                value={staffPassword}
                onChange={(e) => setStaffPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login to Dashboard'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <p className="mt-4 text-center text-sm">
        <Link to="/owner/login" className="text-primary hover:underline">
          Owner Login
        </Link>
      </p>
    </div>
  );
};

export default Login;
