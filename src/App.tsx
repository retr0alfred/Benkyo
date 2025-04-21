
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Student Pages
import StudentDashboard from '@/pages/student/Dashboard';
import StudentNotes from '@/pages/student/Notes';
import StudentFlashcards from '@/pages/student/Flashcards';
import StudentQuizzes from '@/pages/student/Quizzes';
import StudentAssignments from '@/pages/student/Assignments';

// Staff Pages
import StaffDashboard from '@/pages/staff/Dashboard';
import StaffRecordings from '@/pages/staff/Recordings';
import StaffQuizzes from '@/pages/staff/Quizzes';
import StaffAssignments from '@/pages/staff/Assignments';
import StaffStudents from '@/pages/staff/Students';

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminUsers from '@/pages/admin/Users';
import AdminContent from '@/pages/admin/Content';
import AdminSettings from '@/pages/admin/Settings';

// Create a client
const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Simple placeholder component for profile and notifications
const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-maroon-700 mb-4">User Profile</h1>
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="h-24 w-24 bg-maroon-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">{user?.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">{user?.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md capitalize">{user?.role}</div>
          </div>
          <Button 
            className="w-full bg-maroon-500 hover:bg-maroon-600 text-white"
            onClick={() => window.history.back()}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-maroon-700 mb-4">Notifications</h1>
        <p className="text-muted-foreground mb-4">You have no new notifications.</p>
        <Button 
          className="w-full bg-maroon-500 hover:bg-maroon-600 text-white"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

const StudentProfilePage = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout title="Student Profile">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-24 w-24 mb-4 border-4 border-maroon-200">
              <AvatarFallback className="bg-maroon-500 text-white text-2xl">A</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <p className="text-muted-foreground">Student ID: STU12345</p>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-maroon-700 mb-1">Email Address</h3>
                <p>alex.j@example.edu</p>
              </div>
              <div>
                <h3 className="font-medium text-maroon-700 mb-1">Phone Number</h3>
                <p>(555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-medium text-maroon-700 mb-1">Program</h3>
                <p>Computer Science</p>
              </div>
              <div>
                <h3 className="font-medium text-maroon-700 mb-1">Year</h3>
                <p>Junior (3rd year)</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-maroon-700 mb-2">Academic Performance</h3>
              <div className="grid grid-cols-2 gap-y-2 border-t border-gray-200 pt-2">
                <div>Current GPA:</div>
                <div className="font-medium">3.8/4.0</div>
                <div>Attendance:</div>
                <div className="font-medium">92%</div>
                <div>Assignments Completed:</div>
                <div className="font-medium">15/16</div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                className="bg-maroon-500 hover:bg-maroon-600 text-white"
                onClick={() => navigate('/staff/messages/1')}
              >
                Send Message
              </Button>
              <Button 
                variant="outline"
                className="border-maroon-200 hover:bg-maroon-50"
                onClick={() => window.history.back()}
              >
                Back to List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const MessagesPage = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout title="Messages">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-6">
            <Avatar className="h-12 w-12 mr-4 border-2 border-maroon-200">
              <AvatarFallback className="bg-maroon-500 text-white">A</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold">Alex Johnson</h2>
              <p className="text-muted-foreground text-sm">Last active today</p>
            </div>
          </div>
          
          <div className="border rounded-lg h-64 bg-gray-50 p-4 mb-4 overflow-y-auto">
            <p className="text-center text-sm text-muted-foreground">Messages will appear here</p>
          </div>
          
          <div className="flex space-x-2">
            <Input placeholder="Type your message..." className="input-maroon" />
            <Button className="bg-maroon-500 hover:bg-maroon-600 text-white">Send</Button>
          </div>
          
          <div className="mt-4">
            <Button 
              variant="outline"
              className="border-maroon-200 hover:bg-maroon-50"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* Profile Routes */}
        <Route path="/student/profile" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/staff/profile" element={
          <ProtectedRoute allowedRoles={["staff"]}>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/profile" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ProfilePage />
          </ProtectedRoute>
        } />
        
        {/* Student Detail & Messages */}
        <Route path="/staff/student/:id" element={
          <ProtectedRoute allowedRoles={["staff"]}>
            <StudentProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/staff/messages/:id" element={
          <ProtectedRoute allowedRoles={["staff"]}>
            <MessagesPage />
          </ProtectedRoute>
        } />

        {/* Student Routes */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/notes" 
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentNotes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/flashcards" 
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentFlashcards />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/quizzes" 
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentQuizzes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/assignments" 
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentAssignments />
            </ProtectedRoute>
          } 
        />

        {/* Staff Routes */}
        <Route 
          path="/staff/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/staff/recordings" 
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffRecordings />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/staff/quizzes" 
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffQuizzes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/staff/assignments" 
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffAssignments />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/staff/students" 
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffStudents />
            </ProtectedRoute>
          } 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/content" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminContent />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminSettings />
            </ProtectedRoute>
          } 
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
