import { useState, useEffect } from 'react';
import { Booking, Guest } from '@/services/supabase-types';
import { 
  fetchBookings, 
  fetchBookingById, 
  createBooking, 
  updateBooking, 
  deleteBooking,
  fetchTodayCheckins,
  fetchTodayCheckouts,
  updateBookingStatus
} from '@/services/api';

// Mock data available for fallback if needed
const mockBookings = [
  {
    id: '1',
    booking_number: 'BK-2023-0001',
    guest_name: 'John Smith',
    check_in_date: '2023-06-15',
    check_out_date: '2023-06-18',
    status: 'confirmed',
    total_amount: 450,
    rooms: { number: '101', property_id: 'Marina Tower' },
    commission: 45,
    tourism_fee: 13.5,
    vat: 22.5,
    net_to_owner: 369,
    security_deposit: 100,
    base_rate: 150,
    adults: 2,
    children: 0,
    guests: { 
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567'
    },
    payment_status: 'paid',
    amount_paid: 450,
    pending_amount: 0,
    notes: 'Guest requested a high floor with ocean view.',
    reference: 'BK-2023-0001'
  },
  {
    id: '2',
    booking_number: 'BK-2023-0002',
    guest_name: 'Emma Johnson',
    check_in_date: '2023-06-14',
    check_out_date: '2023-06-16',
    status: 'checked-in',
    total_amount: 350,
    rooms: { number: '205', property_id: 'Downtown Heights' },
    commission: 35,
    tourism_fee: 10.5,
    vat: 18,
    net_to_owner: 295,
    security_deposit: 100,
    base_rate: 150,
    adults: 1,
    children: 1,
    guests: { 
      email: 'emma.johnson@example.com',
      phone: '+1 (555) 987-6543'
    },
    payment_status: 'pending',
    amount_paid: 350,
    pending_amount: 0
  },
  {
    id: '3',
    booking_number: 'BK-2023-0003',
    guest_name: 'Michael Chen',
    check_in_date: '2023-06-12',
    check_out_date: '2023-06-13',
    status: 'checked-out',
    total_amount: 175,
    rooms: { number: '304', property_id: 'Marina Tower' },
    commission: 17.5,
    tourism_fee: 5.25,
    vat: 8.75,
    net_to_owner: 142.5,
    security_deposit: 100,
    base_rate: 150,
    adults: 1,
    children: 0,
    guests: { 
      email: 'michael.chen@example.com',
      phone: '+1 (555) 555-1234'
    },
    payment_status: 'paid',
    amount_paid: 175,
    pending_amount: 0
  },
  {
    id: '4',
    booking_number: 'BK-2023-0004',
    guest_name: 'Sarah Davis',
    check_in_date: '2023-06-18',
    check_out_date: '2023-06-20',
    status: 'confirmed',
    total_amount: 300,
    rooms: { number: '102', property_id: 'Downtown Heights' },
    commission: 30,
    tourism_fee: 9,
    vat: 16.5,
    net_to_owner: 253.5,
    security_deposit: 100,
    base_rate: 150,
    adults: 2,
    children: 0,
    guests: { 
      email: 'sarah.davis@example.com',
      phone: '+1 (555) 321-6543'
    },
    payment_status: 'pending',
    amount_paid: 300,
    pending_amount: 0
  },
  {
    id: '5',
    booking_number: 'BK-2023-0005',
    guest_name: 'David Wilson',
    check_in_date: '2023-06-10',
    check_out_date: '2023-06-15',
    status: 'checked-out',
    total_amount: 625,
    rooms: { number: '401', property_id: 'Marina Tower' },
    commission: 62.5,
    tourism_fee: 18.75,
    vat: 31.25,
    net_to_owner: 521.25,
    security_deposit: 100,
    base_rate: 150,
    adults: 2,
    children: 0,
    guests: { 
      email: 'david.wilson@example.com',
      phone: '+1 (555) 789-1234'
    },
    payment_status: 'paid',
    amount_paid: 625,
    pending_amount: 0
  },
];

export function useBookings() {
  const [data, setData] = useState<Booking[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const bookingsData = await fetchBookings();
      setData(bookingsData);
      setError(null);
    } catch (err) {
      console.error('Error in useBookings:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch bookings'));
      
      // Only fallback to mock data in development environment
      if (process.env.NODE_ENV === 'development') {
        console.warn('Falling back to mock data');
        setData(mockBookings as unknown as Booking[]);
      }
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsRefetching(true);
    fetchData();
  };

  return { data, isLoading, error, refetch, isRefetching };
}

// Hook for individual booking data
export function useBooking(id?: string) {
  const [data, setData] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    if (!id) {
      setIsLoading(false);
      setError(new Error('No booking ID provided'));
      return;
    }
    
    try {
      setIsLoading(true);
      const bookingData = await fetchBookingById(id);
      setData(bookingData);
      setError(null);
    } catch (err) {
      console.error(`Error in useBooking for ID ${id}:`, err);
      setError(err instanceof Error ? err : new Error('Failed to fetch booking'));
      
      // Only fallback to mock data in development environment
      if (process.env.NODE_ENV === 'development') {
        console.warn('Falling back to mock data');
        const booking = mockBookings.find(booking => booking.id === id);
        if (booking) {
          setData(booking as unknown as Booking);
        }
      }
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const refetch = () => {
    setIsRefetching(true);
    fetchData();
  };

  // Create a function to handle booking status changes
  const updateStatus = async (status: string) => {
    if (!id) return;
    
    try {
      await updateBookingStatus(id, status);
      refetch(); // Refetch the booking data after updating status
      return true;
    } catch (err) {
      console.error(`Error updating booking status for ID ${id}:`, err);
      throw err;
    }
  };

  // Add CRUD operations
  const saveBooking = async (bookingData: Partial<Booking>, guestData?: Partial<Guest>) => {
    try {
      if (id) {
        // Update existing booking
        const updatedBooking = await updateBooking(id, bookingData, guestData);
        setData(updatedBooking);
        return updatedBooking;
      } else {
        // Create new booking
        if (!guestData) {
          throw new Error('Guest data is required when creating a new booking');
        }
        const newBooking = await createBooking(bookingData, guestData);
        setData(newBooking);
        return newBooking;
      }
    } catch (err) {
      console.error('Error saving booking:', err);
      throw err;
    }
  };

  const removeBooking = async () => {
    if (!id) return;
    
    try {
      await deleteBooking(id);
      setData(null);
      return true;
    } catch (err) {
      console.error(`Error deleting booking ID ${id}:`, err);
      throw err;
    }
  };

  return { 
    data, 
    isLoading, 
    error, 
    refetch, 
    isRefetching,
    updateStatus,
    saveBooking,
    removeBooking
  };
}

export function useTodayCheckins() {
  const [data, setData] = useState<Booking[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const checkinsData = await fetchTodayCheckins();
      setData(checkinsData);
      setError(null);
    } catch (err) {
      console.error('Error in useTodayCheckins:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch today\'s check-ins'));
      
      // Fallback to mock data only in development environment
      if (process.env.NODE_ENV === 'development') {
        console.warn('Falling back to mock data');
        const today = new Date().toISOString().split('T')[0];
        const checkins = mockBookings.filter(
          booking => booking.check_in_date.split('T')[0] === today && booking.status === 'confirmed'
        );
        setData(checkins as unknown as Booking[]);
      }
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsRefetching(true);
    fetchData();
  };

  return { data, isLoading, error, refetch, isRefetching };
}

export function useTodayCheckouts() {
  const [data, setData] = useState<Booking[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const checkoutsData = await fetchTodayCheckouts();
      setData(checkoutsData);
      setError(null);
    } catch (err) {
      console.error('Error in useTodayCheckouts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch today\'s check-outs'));
      
      // Fallback to mock data only in development environment
      if (process.env.NODE_ENV === 'development') {
        console.warn('Falling back to mock data');
        const today = new Date().toISOString().split('T')[0];
        const checkouts = mockBookings.filter(
          booking => booking.check_out_date.split('T')[0] === today && booking.status === 'checked-in'
        );
        setData(checkouts as unknown as Booking[]);
      }
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsRefetching(true);
    fetchData();
  };

  return { data, isLoading, error, refetch, isRefetching };
}
