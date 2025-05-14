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
  property?: string;
  maintenance?: boolean;
  lastCleaned?: string;
  nextCheckIn?: string | null;
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
  rooms?: {
    number: string;
    property_id: string;
  };
  guests?: Guest; // Changed to use the full Guest type
  guest_name?: string; // Computed property for convenience
  source_id?: string; // Added for booking source
  agent_id?: string; // Added for booking agent
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
  property: string; // Added
  vendor: string | null; // Added
  payment_method: string;
  status: string;
  receipt: string | null; // Added
  notes: string | null; // Added
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

export type PropertyOwnership = {
  id: string;
  room_id: string;
  owner_id: string;
  commission_rate: number;
  contract_start_date: string;
  contract_end_date: string | null;
  created_at: string;
  updated_at: string;
};

export type Property = {
  id: string;
  name: string;
  address: string;
  // Add other relevant fields for Property
  created_at: string;
  updated_at: string;
};

export type RoomType = {
  id: string;
  name: string;
  // Add other relevant fields for RoomType
  created_at: string;
  updated_at: string;
};

export type Database = {
  Tables: {
    rooms: { Row: Room; Insert: Partial<Room>; Update: Partial<Room> };
    bookings: { Row: Booking; Insert: Partial<Booking>; Update: Partial<Booking> };
    guests: { Row: Guest; Insert: Partial<Guest>; Update: Partial<Guest> };
    users: { Row: User; Insert: Partial<User>; Update: Partial<User> };
    owners: { Row: Owner; Insert: Partial<Owner>; Update: Partial<Owner> };
    expenses: { Row: Expense; Insert: Partial<Expense>; Update: Partial<Expense> };
    cleaning_tasks: { Row: CleaningTask; Insert: Partial<CleaningTask>; Update: Partial<CleaningTask> };
    property_ownership: { Row: PropertyOwnership; Insert: Partial<PropertyOwnership>; Update: Partial<PropertyOwnership> };
    booking_sources: { Row: BookingSource; Insert: Partial<BookingSource>; Update: Partial<BookingSource> };
    expense_categories: { Row: ExpenseCategory; Insert: Partial<ExpenseCategory>; Update: Partial<ExpenseCategory> };
    agents: { Row: Agent; Insert: Partial<Agent>; Update: Partial<Agent> };
    properties: { Row: Property; Insert: Partial<Property>; Update: Partial<Property> };
    room_types: { Row: RoomType; Insert: Partial<RoomType>; Update: Partial<RoomType> };
  };
};
