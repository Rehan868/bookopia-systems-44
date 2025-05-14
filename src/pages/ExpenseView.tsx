import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileEdit, User, Clock } from 'lucide-react';
import { useExpense } from '@/hooks/useExpenses';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';

const ExpenseView = () => {
  const { id } = useParams();
  const { data: expense, isLoading, error } = useExpense(id || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !expense) {
    return <div>Error loading expense details</div>;
  }

  const formatDisplayDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'N/A';
    try {
      return format(parseISO(dateString), 'PPPpp');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="mr-4">
            <Link to="/expenses">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Expenses
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Expense Details</h1>
            <p className="text-muted-foreground mt-1">View expense information</p>
          </div>
        </div>
        <Button asChild>
          <Link to={`/expenses/edit/${expense.id}`}>
            <FileEdit className="h-4 w-4 mr-2" />
            Edit Expense
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{expense.description}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium">${expense.amount.toFixed(2)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{expense.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <Badge variant="outline">{expense.category}</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Property</p>
              <p className="font-medium">{expense.property}</p>
            </div>
            {expense.vendor && (
              <div>
                <p className="text-sm text-muted-foreground">Vendor</p>
                <p className="font-medium">{expense.vendor}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Payment Status</p>
              <Badge 
                variant={expense.payment_method === 'Paid' ? 'secondary' : 'outline'}
                className="mt-1"
              >
                {expense.status || 'Pending'}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">{expense.payment_method || 'Not specified'}</p>
            </div>
            {expense.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="font-medium">{expense.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Update History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  Created By
                </div>
                <p className="font-medium">{expense.created_by || 'System'}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  Created At
                </div>
                <p className="font-medium">{formatDisplayDate(expense.created_at)}</p>
              </div>
            </div>
            {(expense.updated_by || (expense.updated_at && expense.created_at && expense.updated_at !== expense.created_at)) && (
            <div className="grid grid-cols-1 gap-4 pt-4 border-t">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  Last Updated By
                </div>
                <p className="font-medium">{expense.updated_by || 'System'}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  Last Updated At
                </div>
                <p className="font-medium">{formatDisplayDate(expense.updated_at)}</p>
              </div>
            </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseView;
