import { 
  bookings, 
  rooms,
  guests,
  users,
  owners,
  expenses,
  cleaningStatus as cleaningTasks,
  auditLogs,
  properties, // Added properties
  roomTypes, // Added roomTypes
  expenseCategories,
  agents // Added agents
} from '@/lib/mock-data';
import type { Room, Booking, Guest, User, Owner, Expense, CleaningTask, BookingSource, ExpenseCategory, Agent, Property, RoomType } from '@/lib/mock-types'; // Added Property, RoomType
import type { Database } from './supabase-types'; // Import Database type

/**
 * Generic fetch function for any entity type
 */
export async function fetchData<T>(
  entityType: string,
  options: {
    filter?: Record<string, any>;
    limit?: number;
    offset?: number;
    order?: { column: string; ascending?: boolean };
  } = {}
): Promise<{ data: T[] | null; error: Error | null }> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { filter = {}, limit, offset, order } = options;
    
    // Get the right mock data based on entity type
    let mockData: any[] = [];
    switch (entityType) {
      case 'rooms':
        mockData = rooms;
        break;
      case 'bookings':
        mockData = bookings;
        break;
      case 'guests':
        mockData = guests;
        break;
      case 'users':
        mockData = users;
        break;
      case 'owners':
        mockData = owners;
        break;
      case 'expenses':
        mockData = expenses;
        break;
      case 'cleaning_tasks':
        mockData = cleaningTasks;
        break;
      case 'audit_logs':
        mockData = auditLogs;
        break;
      case 'properties': // Added case for properties
        mockData = properties;
        break;
      case 'room_types': // Added case for room_types
        mockData = roomTypes;
        break;
      case 'booking_sources': // Added case for booking_sources
        mockData = [{id: 'bsrc-1', name: 'Website', created_at: new Date().toISOString(), updated_at: new Date().toISOString()}]; 
        break;
      case 'expense_categories': // Added case for expense_categories
        mockData = expenseCategories;
        break;
      case 'agents': // Added case for agents
        mockData = agents;
        break;
      default:
        mockData = [];
    }
    
    // Apply filters
    let filteredData = [...mockData];
    Object.entries(filter).forEach(([key, value]) => {
      filteredData = filteredData.filter(item => item[key] === value);
    });
    
    // Apply ordering
    if (order) {
      const { column, ascending = true } = order;
      filteredData.sort((a, b) => {
        if (a[column] < b[column]) return ascending ? -1 : 1;
        if (a[column] > b[column]) return ascending ? 1 : -1;
        return 0;
      });
    }
    
    // Apply pagination
    if (offset !== undefined && limit !== undefined) {
      filteredData = filteredData.slice(offset, offset + limit);
    } else if (limit !== undefined) {
      filteredData = filteredData.slice(0, limit);
    }
    
    return { data: filteredData as T[], error: null };
  } catch (error) {
    console.error(`Error fetching data:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Generic function to fetch a single item by ID
 */
export async function fetchById<T>(
  entityType: string,
  id: string
): Promise<{ data: T | null; error: Error | null }> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get the right mock data based on entity type
    let mockData: any[] = [];
    switch (entityType) {
      case 'rooms':
        mockData = rooms;
        break;
      case 'bookings':
        mockData = bookings;
        break;
      case 'guests':
        mockData = guests;
        break;
      case 'users':
        mockData = users;
        break;
      case 'owners':
        mockData = owners;
        break;
      case 'expenses':
        mockData = expenses;
        break;
      case 'cleaning_tasks':
        mockData = cleaningTasks;
        break;
      default:
        mockData = [];
    }
    
    const item = mockData.find(item => item.id === id);
    
    if (!item) {
      throw new Error(`Item not found with id: ${id}`);
    }
    
    return { data: item as T, error: null };
  } catch (error) {
    console.error(`Error fetching item:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Generic function to create an item
 */
export async function createItem<T>(
  entityType: string,
  item: Partial<T>
): Promise<{ data: T | null; error: Error | null }> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a new item with an ID
    const newItem = {
      id: `new-${Date.now()}`,
      created_at: new Date().toISOString(),
      ...item,
    };
    
    return { data: newItem as T, error: null };
  } catch (error) {
    console.error(`Error creating item:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Generic function to update an item
 */
export async function updateItem<T>(
  entityType: string,
  id: string,
  updates: Partial<T>
): Promise<{ data: T | null; error: Error | null }> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // First check if the item exists
    const { data: existingItem, error: fetchError } = await fetchById<T>(entityType, id);
    
    if (fetchError || !existingItem) {
      throw new Error(`Item not found with id: ${id}`);
    }
    
    // Update the item
    const updatedItem = {
      ...existingItem,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    
    return { data: updatedItem as T, error: null };
  } catch (error) {
    console.error(`Error updating item:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Generic function to delete an item
 */
export async function deleteItem(
  entityType: string,
  id: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In a real application, we would delete the item from the database
    // Here we just pretend it was successful
    
    return { success: true, error: null };
  } catch (error) {
    console.error(`Error deleting item:`, error);
    return { success: false, error: error as Error };
  }
}

// Specialized functions for specific entities

/**
 * Fetch rooms with details about their property
 */
export async function fetchRooms(options?: { // Made options optional
  filter?: Record<string, any>;
  limit?: number;
  offset?: number;
}): Promise<{ data: Room[] | null; error: Error | null }> {
  return fetchData<Room>('rooms', options);
}

/**
 * Fetch bookings with guest and room details
 */
export async function fetchBookings(options?: { // Made options optional
  filter?: Record<string, any>;
  limit?: number;
  offset?: number;
}): Promise<{ data: Booking[] | null; error: Error | null }> {
  return fetchData<Booking>('bookings', options);
}

/**
 * Fetch booking by ID with full details
 */
export async function fetchBookingById(id: string): Promise<{ data: Booking | null; error: Error | null }> {
  return fetchById<Booking>('bookings', id);
}

/**
 * Check room availability for a given date range
 */
export async function checkRoomAvailability(
  roomId: string,
  checkInDate: string,
  checkOutDate: string
): Promise<{ available: boolean; error: Error | null }> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // For mock purposes, just return a random availability
    const available = Math.random() > 0.3; // 70% chance of being available
    
    return { available, error: null };
  } catch (error) {
    console.error('Error checking room availability:', error);
    return { available: false, error: error as Error };
  }
}

/**
 * Fetch cleaning tasks with room and assignment details
 */
export async function fetchCleaningTasks(options: {
  filter?: Record<string, any>;
  limit?: number;
  offset?: number;
}): Promise<{ data: CleaningTask[] | null; error: Error | null }> {
  return fetchData<CleaningTask>('cleaning_tasks', options);
}

/**
 * Fetch expenses with details
 */
export async function fetchExpenses(options: {
  filter?: Record<string, any>;
  limit?: number;
  offset?: number;
}): Promise<{ data: Expense[] | null; error: Error | null }> {
  return fetchData<Expense>('expenses', options);
}

/**
 * Fetch properties with details
 */
export async function fetchProperties(options?: { // Made options optional
  filter?: Record<string, any>;
  limit?: number;
  offset?: number;
}): Promise<{ data: Database['Tables']['properties']['Row'][] | null; error: Error | null }> {
  return fetchData<Database['Tables']['properties']['Row']>('properties', options);
}

/**
 * Fetch a property by ID
 */
export async function fetchPropertyById(id: string): Promise<{ data: Database['Tables']['properties']['Row'] | null; error: Error | null }> {
  return fetchById<Database['Tables']['properties']['Row']>('properties', id);
}

/**
 * Upload a file (mock implementation)
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<{ url: string | null; error: Error | null }> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a mock URL
    const url = `https://example.com/mock-storage/${bucket}/${path}`;
    
    return { url, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { url: null, error: error as Error };
  }
}

/**
 * Delete a file (mock implementation)
 */
export async function deleteFile(
  bucket: string,
  path: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Create a new booking with guest details
 */
export async function createBooking(
  bookingData: Partial<Booking>,
  guestData: Partial<Guest>
): Promise<Booking> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a new booking with an ID
    const newBooking = {
      id: `booking-${Date.now()}`,
      booking_number: `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'confirmed',
      guest_name: `${guestData.first_name} ${guestData.last_name}`,
      guest_email: guestData.email,
      guest_phone: guestData.phone,
      ...bookingData,
    };
    
    return newBooking as Booking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

/**
 * Update an existing booking and optional guest details
 */
export async function updateBooking(
  id: string,
  bookingData: Partial<Booking>,
  guestData?: Partial<Guest>
): Promise<Booking> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In a real implementation, we would fetch the existing booking first
    const { data: existingBooking, error } = await fetchBookingById(id);
    
    if (error || !existingBooking) {
      throw new Error(`Booking not found with id: ${id}`);
    }
    
    // Update the booking
    const updatedBooking = {
      ...existingBooking,
      ...bookingData,
      updated_at: new Date().toISOString(),
    };
    
    // If guest data is provided, we would update the guest record too
    // This is just a mock implementation
    
    return updatedBooking as Booking;
  } catch (error) {
    console.error(`Error updating booking:`, error);
    throw error;
  }
}

/**
 * Delete a booking by ID
 */
export async function deleteBooking(id: string): Promise<boolean> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In a real application, we would delete the booking from the database
    // Here we just pretend it was successful
    
    return true;
  } catch (error) {
    console.error(`Error deleting booking:`, error);
    throw error;
  }
}

/**
 * Update a booking's status
 */
export async function updateBookingStatus(id: string, status: string): Promise<Booking> {
  try {
    // This is just a specialized version of updateBooking
    return updateBooking(id, { status } as Partial<Booking>);
  } catch (error) {
    console.error(`Error updating booking status:`, error);
    throw error;
  }
}

/**
 * Fetch today's check-ins
 */
export async function fetchTodayCheckins(): Promise<Booking[]> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Filter bookings that have check-in date today and status 'confirmed'
    const todayCheckins = bookings.filter(booking => 
      booking.check_in === today && booking.status === 'confirmed'
    );
    
    return todayCheckins as unknown as Booking[];
  } catch (error) {
    console.error('Error fetching today\'s check-ins:', error);
    throw error;
  }
}

/**
 * Fetch today's check-outs
 */
export async function fetchTodayCheckouts(): Promise<Booking[]> {
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Filter bookings that have check-out date today and status 'checked-in'
    const todayCheckouts = bookings.filter(booking => 
      (booking as any).check_out === today && booking.status === 'checked-in' // Added type assertion for check_out
    );
    
    return todayCheckouts as unknown as Booking[];
  } catch (error) {
    console.error('Error fetching today\'s check-outs:', error);
    throw error;
  }
}

/**
 * Create a new property
 */
export async function createProperty(property: Database['Tables']['properties']['Insert']): Promise<{ data: Database['Tables']['properties']['Row'] | null; error: Error | null }> {
  return createItem('properties', property);
}

/**
 * Delete a property by ID
 */
export async function deleteProperty(id: string): Promise<{ success: boolean; error: Error | null }> {
  return deleteItem('properties', id);
}

/**
 * Update a property by ID
 */
export async function updateProperty(id: string, updates: Database['Tables']['properties']['Update']): Promise<{ data: Database['Tables']['properties']['Row'] | null; error: Error | null }> {
  return updateItem('properties', id, updates);
}

/**
 * Create a new room type
 */
export async function createRoomType(roomType: Database['Tables']['room_types']['Insert']): Promise<{ data: Database['Tables']['room_types']['Row'] | null; error: Error | null }> {
  return createItem('room_types', roomType);
}

/**
 * Delete a room type by ID
 */
export async function deleteRoomType(id: string): Promise<{ success: boolean; error: Error | null }> {
  return deleteItem('room_types', id);
}

/**
 * Fetch a room type by ID
 */
export async function fetchRoomTypeById(id: string): Promise<{ data: Database['Tables']['room_types']['Row'] | null; error: Error | null }> {
  return fetchById<Database['Tables']['room_types']['Row']>('room_types', id);
}

/**
 * Fetch room types with details
 */
export async function fetchRoomTypes(options: {
  filter?: Record<string, any>;
  limit?: number;
  offset?: number;
}): Promise<{ data: Database['Tables']['room_types']['Row'][] | null; error: Error | null }> {
  return fetchData<Database['Tables']['room_types']['Row']>('room_types', options);
}

/**
 * Update a room type by ID
 */
export async function updateRoomType(id: string, updates: Database['Tables']['room_types']['Update']): Promise<{ data: Database['Tables']['room_types']['Row'] | null; error: Error | null }> {
  return updateItem('room_types', id, updates);
}

/**
 * Fetch booking sources
 */
export async function fetchBookingSources(options?: {
  filter?: Record<string, any>;
  limit?: number;
  offset?: number;
}): Promise<{ data: BookingSource[] | null; error: Error | null }> {
  return fetchData<BookingSource>('booking_sources', options);
}

/**
 * Add a new booking source
 */
export async function addBookingSource(
  sourceData: Partial<BookingSource>
): Promise<{ data: BookingSource | null; error: Error | null }> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newSource = {
      id: `bsrc-${Date.now().toString()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...sourceData,
    } as BookingSource;
    return { data: newSource, error: null };
  } catch (error) {
    console.error(`Error creating booking source:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Fetch Expense Categories
 */
export async function fetchExpenseCategories(options?: {
  filter?: Record<string, any>;
  limit?: number;
  offset?: number;
}): Promise<{ data: ExpenseCategory[] | null; error: Error | null }> {
  return fetchData<ExpenseCategory>('expense_categories', options);
}

/**
 * Add Expense Category
 */
export async function addExpenseCategory(categoryName: string): Promise<{ data: ExpenseCategory | null; error: Error | null }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const newCategory: ExpenseCategory = {
    id: `ecat-${Date.now()}`,
    name: categoryName,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  // In a real app, you would add this to your data store
  // For mock purposes, we can push to the mockData array if needed, or just return
  expenseCategories.push(newCategory); // Add to the mock data array
  return { data: newCategory, error: null };
}

/**
 * Fetch Agents
 */
export async function fetchAgents(options?: {
  filter?: Record<string, any>;
  limit?: number;
  offset?: number;
}): Promise<{ data: Agent[] | null; error: Error | null }> {
  return fetchData<Agent>('agents', options);
}

/**
 * Add Agent
 */
export async function addAgent(agentName: string): Promise<{ data: Agent | null; error: Error | null }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const newAgent: Agent = {
    id: `agent-${Date.now()}`,
    name: agentName,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  // In a real app, you would add this to your data store
  agents.push(newAgent); // Add to the mock data array
  return { data: newAgent, error: null };
}
