
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddEditBookingForm } from "@/components/bookings/AddEditBookingForm";
import { useBooking } from "@/hooks/useBookings";
import { useToast } from "@/hooks/use-toast";

function BookingEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { booking, isLoading, error } = useBooking(id || '');
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3">Loading booking...</span>
      </div>
    );
  }
  
  if (error || !booking) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Could not load booking. {error?.message || 'Booking not found.'}</p>
          <Button 
            className="mt-4" 
            variant="secondary" 
            onClick={() => navigate('/bookings')}
          >
            Back to Bookings
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Edit Booking</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate(`/bookings/${id}`)}
        >
          Cancel
        </Button>
      </div>
      
      <AddEditBookingForm mode="edit" bookingId={id || ''} />
    </div>
  );
}

export default BookingEdit;
