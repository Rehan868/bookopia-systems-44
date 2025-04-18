
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { OwnerLayout } from "@/components/layout/OwnerLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import BookingView from "./pages/BookingView";
import BookingAdd from "./pages/BookingAdd";
import BookingEdit from "./pages/BookingEdit";
import Availability from "./pages/Availability";
import Rooms from "./pages/Rooms";
import RoomView from "./pages/RoomView";
import RoomAdd from "./pages/RoomAdd";
import RoomEdit from "./pages/RoomEdit";
import CleaningStatus from "./pages/CleaningStatus";
import Expenses from "./pages/Expenses";
import ExpenseAdd from "./pages/ExpenseAdd";
import Users from "./pages/Users";
import UserAdd from "./pages/UserAdd";
import Owners from "./pages/Owners";
import OwnerAdd from "./pages/OwnerAdd";
import Reports from "./pages/Reports";
import AuditLogs from "./pages/AuditLogs";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerBookings from "./pages/OwnerBookings";
import OwnerAvailability from "./pages/OwnerAvailability";
import OwnerCleaningStatus from "./pages/OwnerCleaningStatus";
import OwnerReports from "./pages/OwnerReports";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-background overflow-auto">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/owner/login" element={<OwnerLogin />} />
          
          {/* Staff routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id" element={<BookingView />} />
            <Route path="bookings/new" element={<BookingAdd />} />
            <Route path="bookings/edit/:id" element={<BookingEdit />} />
            <Route path="availability" element={<Availability />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="rooms/view/:id" element={<RoomView />} />
            <Route path="rooms/add" element={<RoomAdd />} />
            <Route path="rooms/edit/:id" element={<RoomEdit />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="expenses/add" element={<ExpenseAdd />} />
            <Route path="expenses/:id" element={<BookingView />} />
            <Route path="expenses/edit/:id" element={<BookingEdit />} />
            <Route path="cleaning" element={<CleaningStatus />} />
            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<UserAdd />} />
            <Route path="users/:id" element={<BookingView />} />
            <Route path="users/edit/:id" element={<BookingEdit />} />
            <Route path="owners" element={<Owners />} />
            <Route path="owners/add" element={<OwnerAdd />} />
            <Route path="owners/:id" element={<BookingView />} />
            <Route path="owners/edit/:id" element={<BookingEdit />} />
            <Route path="reports" element={<Reports />} />
            <Route path="audit" element={<AuditLogs />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Owner routes */}
          <Route path="/owner" element={<OwnerLayout />}>
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="bookings" element={<OwnerBookings />} />
            <Route path="availability" element={<OwnerAvailability />} />
            <Route path="cleaning" element={<OwnerCleaningStatus />} />
            <Route path="reports" element={<OwnerReports />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
