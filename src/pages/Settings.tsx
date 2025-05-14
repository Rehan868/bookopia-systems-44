import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  AlertCircle,
  BadgePercent,
  Building2,
  Globe,
  Save,
  Users
} from 'lucide-react';
import UserList from '@/components/users/UserList';
import UserRoleList from '@/components/users/UserRoleList';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  // Dialog open states
  const [newPropertyDialogOpen, setNewPropertyDialogOpen] = useState(false);
  const [newRoomTypeDialogOpen, setNewRoomTypeDialogOpen] = useState(false);

  // New property form state
  const [newProperty, setNewProperty] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    timezone: 'est'
  });

  // New room type form state
  const [newRoomType, setNewRoomType] = useState({
    name: '',
    baseRate: '',
    maxOccupancy: '2',
    description: ''
  });
  
  // Form states
  const [companyName, setCompanyName] = useState('HotelManager Co.');
  const [companyEmail, setCompanyEmail] = useState('info@hotelmanager.com');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [currencyFormat, setCurrencyFormat] = useState('USD');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoCheckout, setAutoCheckout] = useState(true);
  
  // More advanced settings form states
  const [defaultCheckInTime, setDefaultCheckInTime] = useState('14:00');
  const [defaultCheckOutTime, setDefaultCheckOutTime] = useState('11:00');
  const [taxRate, setTaxRate] = useState('7.5');
  const [reminderDays, setReminderDays] = useState('1');
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "Your general settings have been updated successfully.",
    });
  };
  
  const handleSaveProperty = () => {
    toast({
      title: "Property Settings Saved",
      description: "Your property settings have been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  const handleSaveUsers = () => {
    toast({
      title: "User Settings Saved",
      description: "User access settings have been updated successfully.",
    });
  };

  // Property form handlers
  const handlePropertyInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProperty(prev => ({ ...prev, [name]: value }));
  };

  const handlePropertySelectChange = (name: string, value: string) => {
    setNewProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProperty = () => {
    // In a real app, this would send data to an API
    toast({
      title: "Property Added",
      description: `${newProperty.name} has been added successfully.`,
    });
    
    // Reset form and close dialog
    setNewProperty({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: '',
      timezone: 'est'
    });
    setNewPropertyDialogOpen(false);
  };

  // Room type form handlers
  const handleRoomTypeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRoomType(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRoomType = () => {
    // In a real app, this would send data to an API
    toast({
      title: "Room Type Added",
      description: `${newRoomType.name} has been added successfully.`,
    });
    
    // Reset form and close dialog
    setNewRoomType({
      name: '',
      baseRate: '',
      maxOccupancy: '2',
      description: ''
    });
    setNewRoomTypeDialogOpen(false);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences and configuration</p>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-8"
      >
        <div className="bg-card border rounded-md p-1 sticky top-[72px] z-30 bg-background/95 backdrop-blur-sm">
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-auto w-full">
            <TabsTrigger value="general" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>General</span>
                </div>
                <span className="text-xs text-muted-foreground">Basic settings</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="property" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>Properties</span>
                </div>
                <span className="text-xs text-muted-foreground">Location settings</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="users" className="flex justify-start px-3 py-2 h-auto">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </div>
                <span className="text-xs text-muted-foreground">Access control</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the basic settings for your hotel management system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input 
                      id="company-name" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                    />
                    <p className="text-sm text-muted-foreground">
                      This will appear on all invoices and emails
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Company Email</Label>
                    <Input 
                      id="company-email" 
                      type="email" 
                      value={companyEmail} 
                      onChange={(e) => setCompanyEmail(e.target.value)} 
                    />
                    <p className="text-sm text-muted-foreground">
                      This email will be used for system notifications
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select 
                      value={dateFormat} 
                      onValueChange={setDateFormat}
                    >
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select 
                      value={currencyFormat} 
                      onValueChange={setCurrencyFormat}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                        <SelectItem value="AUD">AUD (A$)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Behavior</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically send email notifications for bookings and check-ins
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-checkout">Automatic Checkout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically check out guests at the scheduled checkout time
                    </p>
                  </div>
                  <Switch
                    id="auto-checkout"
                    checked={autoCheckout}
                    onCheckedChange={setAutoCheckout}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-checkin">Default Check-in Time</Label>
                    <Input 
                      id="default-checkin" 
                      type="time" 
                      value={defaultCheckInTime} 
                      onChange={(e) => setDefaultCheckInTime(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-checkout">Default Check-out Time</Label>
                    <Input 
                      id="default-checkout" 
                      type="time" 
                      value={defaultCheckOutTime} 
                      onChange={(e) => setDefaultCheckOutTime(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                    <Input 
                      id="tax-rate" 
                      type="number" 
                      value={taxRate} 
                      onChange={(e) => setTaxRate(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reminder-days">Reminder Days</Label>
                    <Input 
                      id="reminder-days" 
                      type="number" 
                      value={reminderDays} 
                      onChange={(e) => setReminderDays(e.target.value)} 
                    />
                    <p className="text-sm text-muted-foreground">
                      Days before check-in to send reminder emails
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end gap-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveGeneral} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Configure backups and data export options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Automated Backups</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The system automatically backs up your data every day at midnight.
                  </p>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Backup frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Data Export</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Export your system data in various formats.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Export as CSV</Button>
                    <Button variant="outline">Export as JSON</Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-amber-50">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <div>
                    <h4 className="font-medium text-amber-800">Data Retention Policy</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      By default, the system retains booking data for 7 years. Audit logs are kept for 2 years.
                      You can modify these settings in the security tab.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="property" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Management</CardTitle>
              <CardDescription>
                Configure your hotel properties and locations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Active Properties</h3>
                
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left font-medium p-3">Name</th>
                        <th className="text-left font-medium p-3">Address</th>
                        <th className="text-left font-medium p-3">Rooms</th>
                        <th className="text-right font-medium p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Marina Tower</td>
                        <td className="p-3">123 Oceanfront Dr, Miami, FL</td>
                        <td className="p-3">12</td>
                        <td className="p-3 text-right">
                          <Button size="sm" variant="ghost">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Downtown Heights</td>
                        <td className="p-3">456 Urban Ave, Miami, FL</td>
                        <td className="p-3">8</td>
                        <td className="p-3 text-right">
                          <Button size="sm" variant="ghost">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <Button onClick={() => setNewPropertyDialogOpen(true)}>Add New Property</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Property Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-property">Default Property</Label>
                    <Select defaultValue="marina">
                      <SelectTrigger id="default-property">
                        <SelectValue placeholder="Select default property" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marina">Marina Tower</SelectItem>
                        <SelectItem value="downtown">Downtown Heights</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      This property will be selected by default when creating new bookings
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Property Timezone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="property-notes">Property Notes</Label>
                  <Textarea 
                    id="property-notes" 
                    placeholder="Enter any special instructions or notes for this property"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-on-booking">Show on Booking Sites</Label>
                    <Switch id="show-on-booking" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable this to make your properties visible on connected booking platforms
                  </p>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end gap-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveProperty} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Property Settings
              </Button>
            </div>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Room Types & Pricing</CardTitle>
              <CardDescription>
                Manage room categories and rate plans
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left font-medium p-3">Room Type</th>
                      <th className="text-left font-medium p-3">Base Rate</th>
                      <th className="text-left font-medium p-3">Max Occupancy</th>
                      <th className="text-right font-medium p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 font-medium">Standard Room</td>
                      <td className="p-3">$120</td>
                      <td className="p-3">2</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-medium">Deluxe Suite</td>
                      <td className="p-3">$180</td>
                      <td className="p-3">3</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-medium">Executive Suite</td>
                      <td className="p-3">$250</td>
                      <td className="p-3">4</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-medium">Penthouse Suite</td>
                      <td className="p-3">$400</td>
                      <td className="p-3">4</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={() => setNewRoomTypeDialogOpen(true)}>Add Room Type</Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <BadgePercent className="h-4 w-4" />
                  Manage Rate Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserList />
              <UserRoleList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add New Property Dialog */}
      <Dialog open={newPropertyDialogOpen} onOpenChange={setNewPropertyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Enter the details of your new property. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="property-name">Property Name*</Label>
              <Input 
                id="property-name"
                name="name" 
                value={newProperty.name}
                onChange={handlePropertyInputChange}
                placeholder="e.g. Mountain View Resort"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="property-address">Address*</Label>
              <Input 
                id="property-address"
                name="address" 
                value={newProperty.address}
                onChange={handlePropertyInputChange}
                placeholder="Street address"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="property-city">City*</Label>
                <Input 
                  id="property-city"
                  name="city" 
                  value={newProperty.city}
                  onChange={handlePropertyInputChange}
                  placeholder="City"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property-state">State/Province*</Label>
                <Input 
                  id="property-state"
                  name="state" 
                  value={newProperty.state}
                  onChange={handlePropertyInputChange}
                  placeholder="State/Province"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="property-zipCode">Zip/Postal Code*</Label>
                <Input 
                  id="property-zipCode"
                  name="zipCode" 
                  value={newProperty.zipCode}
                  onChange={handlePropertyInputChange}
                  placeholder="Zip/Postal Code"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property-phone">Phone Number*</Label>
                <Input 
                  id="property-phone"
                  name="phone" 
                  value={newProperty.phone}
                  onChange={handlePropertyInputChange}
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="property-email">Email Address*</Label>
              <Input 
                id="property-email"
                name="email" 
                type="email"
                value={newProperty.email}
                onChange={handlePropertyInputChange}
                placeholder="Email Address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="property-timezone">Timezone*</Label>
              <Select
                value={newProperty.timezone}
                onValueChange={(value) => handlePropertySelectChange('timezone', value)}
              >
                <SelectTrigger id="property-timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">Eastern Time (ET)</SelectItem>
                  <SelectItem value="cst">Central Time (CT)</SelectItem>
                  <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewPropertyDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProperty}>Save Property</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add New Room Type Dialog */}
      <Dialog open={newRoomTypeDialogOpen} onOpenChange={setNewRoomTypeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Room Type</DialogTitle>
            <DialogDescription>
              Add a new room type to your property. This will be available for room assignments.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="room-type-name">Room Type Name*</Label>
              <Input 
                id="room-type-name"
                name="name" 
                value={newRoomType.name}
                onChange={handleRoomTypeInputChange}
                placeholder="e.g. Deluxe Suite"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="room-type-baseRate">Base Rate (per night)*</Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                <Input
                  id="room-type-baseRate"
                  name="baseRate"
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-7"
                  value={newRoomType.baseRate}
                  onChange={handleRoomTypeInputChange}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="room-type-maxOccupancy">Maximum Occupancy*</Label>
              <Input 
                id="room-type-maxOccupancy"
                name="maxOccupancy" 
                type="number"
                min="1"
                value={newRoomType.maxOccupancy}
                onChange={handleRoomTypeInputChange}
                placeholder="Number of guests"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="room-type-description">Description</Label>
              <Textarea 
                id="room-type-description"
                name="description" 
                value={newRoomType.description}
                onChange={handleRoomTypeInputChange}
                placeholder="Describe the room features, amenities, etc."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewRoomTypeDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddRoomType}>Save Room Type</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
