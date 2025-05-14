
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ExpenseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [expense, setExpense] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  
  // Mock expense data for demo purposes
  useEffect(() => {
    const fetchExpense = async () => {
      setIsLoading(true);
      try {
        // This would normally be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample expense data
        const mockExpense = {
          id: id,
          description: "Monthly cleaning service",
          amount: 1500,
          date: "2023-10-15",
          category: "Maintenance",
          property: "Marina Towers",
          vendor: "CleanPro Services",
          payment_method: "Credit Card",
          receipt: null,
          notes: "Regular monthly deep cleaning",
          status: "paid",
          created_at: "2023-10-15T08:30:00Z",
          updated_at: "2023-10-15T09:15:00Z",
          created_by: "user1",
          updated_by: "user1",
        };
        
        setExpense(mockExpense);
        setError(null);
      } catch (err) {
        setError(err as Error);
        toast({
          title: "Error",
          description: "Failed to load expense data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExpense();
  }, [id, toast]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Not implemented",
      description: "Expense update functionality is not yet implemented.",
      variant: "default",
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3">Loading expense...</span>
      </div>
    );
  }
  
  if (error || !expense) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Could not load expense details. {error?.message || ""}</p>
          <Button 
            className="mt-4" 
            onClick={() => navigate("/expenses")}
          >
            Back to Expenses
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Edit Expense</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate(`/expenses/${id}`)}
        >
          Cancel
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  defaultValue={expense.description} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  step="0.01" 
                  defaultValue={expense.amount} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  defaultValue={expense.date} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={expense.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Supplies">Supplies</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property">Property</Label>
                <Select defaultValue={expense.property}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marina Towers">Marina Towers</SelectItem>
                    <SelectItem value="Downtown Heights">Downtown Heights</SelectItem>
                    <SelectItem value="Palm Residences">Palm Residences</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input 
                  id="vendor" 
                  defaultValue={expense.vendor} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payment_method">Payment Method</Label>
                <Select defaultValue={expense.payment_method}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={expense.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="receipt">Receipt (Upload)</Label>
                <Input 
                  id="receipt" 
                  type="file" 
                  accept="image/*,.pdf" 
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  rows={4} 
                  defaultValue={expense.notes} 
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/expenses/${id}`)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Update Expense
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default ExpenseEdit;
