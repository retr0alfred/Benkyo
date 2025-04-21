
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  BookOpen, 
  Home, 
  LogOut, 
  Menu, 
  User,
  FileText,
  BookOpenCheck,
  MessageSquare,
  ClipboardCheck,
  Users
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Define navigation items based on user role
  const getNavItems = () => {
    switch (user?.role) {
      case "student":
        return [
          { name: "Dashboard", icon: Home, path: "/student/dashboard" },
          { name: "Notes", icon: BookOpen, path: "/student/notes" },
          { name: "Flashcards", icon: FileText, path: "/student/flashcards" },
          { name: "Quizzes", icon: BookOpenCheck, path: "/student/quizzes" },
          { name: "Assignments", icon: ClipboardCheck, path: "/student/assignments" },
        ];
      case "staff":
        return [
          { name: "Dashboard", icon: Home, path: "/staff/dashboard" },
          { name: "Students", icon: Users, path: "/staff/students" },
          { name: "Recordings", icon: BookOpen, path: "/staff/recordings" },
          { name: "Quizzes", icon: BookOpenCheck, path: "/staff/quizzes" },
          { name: "Assignments", icon: ClipboardCheck, path: "/staff/assignments" },
        ];
      case "admin":
        return [
          { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
          { name: "Users", icon: Users, path: "/admin/users" },
          { name: "Content", icon: FileText, path: "/admin/content" },
          { name: "Settings", icon: User, path: "/admin/settings" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-sidebar text-sidebar-foreground fixed h-full left-0 top-0 z-40`}
      >
        <div className="p-[1.12rem] flex justify-between items-center border-b border-sidebar-border">
          <h1 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>
          Benkyō
          </h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="text-sidebar-foreground"
          >
            <Menu />
          </Button>
        </div>

        <div className="py-4">
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center py-3 px-6 hover:bg-sidebar-accent transition-colors duration-200"
              >
                <item.icon className="h-5 w-5" />
                {sidebarOpen && <span className="ml-4">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full border-t border-sidebar-border p-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-sidebar-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
            {sidebarOpen && (
              <span className="ml-4 font-medium cursor-pointer" onClick={handleLogout}>
                Logout
              </span>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
              <Bell />
            </Button>
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate(`/${user?.role}/profile`)}
            >
              <div className="h-10 w-10 rounded-full bg-maroon-700 flex items-center justify-center text-white">
                {user?.name?.charAt(0) || <User />}
              </div>
              <div className="hidden md:block">
                <div className="font-medium">{user?.name}</div>
                <div className="text-sm text-muted-foreground capitalize">{user?.role}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
