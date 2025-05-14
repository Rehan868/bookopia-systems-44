// Mock types to replace Supabase types
// These are simplified versions just for our mock data implementation

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Basic types for our application entities
export interface MockDatabase {
  rooms: Room[];
  bookings: Booking[];
  guests: Guest[];
  users: User[];
  owners: Owner[];
  expenses: Expense[];
  cleaningTasks: CleaningTask[];
}

// Type definitions for our entities
export type Room = {
  id: string;
  number: string;
  property_id: string;
  room_type_id: string;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  floor: string;
  size: number | null;
  description: string | null;
  max_adults: number;
  max_children: number;
  base_rate: number;
  active: boolean;
  notes: string | null;
  amenities: any;
  image_urls: string[] | null;
  created_at: string;
  updated_at: string;
  property?: any;
};

export type Booking = {
  id: string;
  reference: string;
  room_id: string;
  guest_id: string;
  check_in_date: string;
  check_out_date: string;
  adults: number;
  children: number;
  base_rate: number;
  total_amount: number;
  security_deposit: number;
  commission: number;
  tourism_fee: number;
  vat: number;
  net_to_owner: number;
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show';
  payment_status: 'pending' | 'partial' | 'paid' | 'refunded';
  amount_paid: number;
  pending_amount?: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
  updated_by?: string | null;
  rooms?: any;
  guests?: Guest; // Changed to use the full Guest type
  guest_name?: string;
  source_id?: string; // Added from previous step
  agent_id?: string; // Added for booking agent
};

export type Guest = {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;
  nationality: string | null;
  passport_number: string | null;
  id_document_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar_url: string | null;
  last_active: string | null;
  created_at: string;
  updated_at: string;
};

export type Owner = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  payment_info: any;
  created_at: string;
  updated_at: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  property: string;
  vendor: string | null;
  payment_method: string;
  status: string;
  receipt: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
};

export type CleaningTask = {
  id: string;
  room_id: string;
  date: string;
  assigned_to: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Integration = {
  id: string;
  name: string;
  type: 'channel_manager' | 'payment_gateway' | 'accounting' | 'other';
  enabled: boolean;
  settings: Record<string, any>;
  last_synced_at?: string;
};

export type BookingSource = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Agent = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type ExpenseCategory = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Property = {
  id: string;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
  // Add other relevant fields as needed
};

export type RoomType = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  // Add other relevant fields as needed
};