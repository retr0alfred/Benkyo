
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type UserRole = "student" | "staff" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: "1",
    name: "Student User",
    email: "student@example.com",
    role: "student",
  },
  {
    id: "2",
    name: "Staff Member",
    email: "staff@example.com",
    role: "staff",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      
      // Redirect to dashboard if on login or register page
      const currentPath = window.location.pathname;
      if (currentPath === "/login" || currentPath === "/register" || currentPath === "/") {
        navigate(`/${parsedUser.role}/dashboard`);
      }
    }
  }, [navigate]);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll use mock data instead of actual API calls
      // In a production app, this would call an authentication API
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === "password") { // Simple password check for demo
        setUser(foundUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(foundUser));
        toast.success("Login successful");
        
        // Redirect to appropriate dashboard based on role
        navigate(`/${foundUser.role}/dashboard`);
        return true;
      } else {
        toast.error("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
      return false;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // For demo purposes, we'll use mock data instead of actual API calls
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        toast.error("Email already registered");
        return false;
      }
      
      // Create new user (in a real app, this would be saved to a database)
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9), // Generate random ID
        name,
        email,
        role,
      };
      
      mockUsers.push(newUser);
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Registration successful");
      
      // Redirect to appropriate dashboard
      navigate(`/${newUser.role}/dashboard`);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Please try again.");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
