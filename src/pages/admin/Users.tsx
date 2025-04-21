
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Lock, 
  Unlock, 
  MoreVertical,
  UserPlus,
  Mail,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type User = {
  id: string;
  name: string;
  email: string;
  role: "student" | "staff" | "admin";
  status: "active" | "suspended" | "pending";
  registeredOn: string;
  lastActive?: string;
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  
  // For new user form
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"student" | "staff" | "admin">("student");
  const [newUserPassword, setNewUserPassword] = useState("");

  // Mock data for users
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "student",
      status: "active",
      registeredOn: "2025-03-15",
      lastActive: "2025-04-09"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "staff",
      status: "active",
      registeredOn: "2025-02-20",
      lastActive: "2025-04-08"
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      role: "admin",
      status: "active",
      registeredOn: "2025-01-10",
      lastActive: "2025-04-09"
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      role: "student",
      status: "suspended",
      registeredOn: "2025-03-01",
      lastActive: "2025-03-25"
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael@example.com",
      role: "student",
      status: "pending",
      registeredOn: "2025-04-05"
    }
  ]);

  const filteredUsers = users.filter(
    user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const students = filteredUsers.filter(user => user.role === "student");
  const staff = filteredUsers.filter(user => user.role === "staff");
  const admins = filteredUsers.filter(user => user.role === "admin");

  const handleStatusChange = (userId: string, newStatus: "active" | "suspended" | "pending") => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, status: newStatus };
      }
      return user;
    }));
    
    toast.success(`User status changed to ${newStatus}`);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("User deleted successfully");
  };

  const handleResetPassword = (userId: string) => {
    // In a real app, this would trigger a password reset email
    toast.success("Password reset email sent");
  };

  const handleAddUser = () => {
    // Validate form
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPassword.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Check if email already exists
    if (users.some(user => user.email.toLowerCase() === newUserEmail.toLowerCase())) {
      toast.error("A user with this email already exists");
      return;
    }
    
    // Create new user
    const newUser: User = {
      id: `${users.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "active",
      registeredOn: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUser]);
    
    // Reset form
    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("student");
    setNewUserPassword("");
    
    setShowAddUserDialog(false);
    toast.success("User created successfully");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-pastel-green text-primary-foreground">Active</Badge>;
      case "suspended":
        return <Badge className="bg-destructive">Suspended</Badge>;
      case "pending":
        return <Badge className="bg-pastel-yellow text-primary-foreground">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-pastel-purple text-primary-foreground">Admin</Badge>;
      case "staff":
        return <Badge className="bg-pastel-blue text-primary-foreground">Staff</Badge>;
      case "student":
        return <Badge className="bg-pastel-green text-primary-foreground">Student</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const renderUsersList = (usersList: User[]) => {
    if (usersList.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No users found matching your search criteria.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {usersList.map((user) => (
          <Card key={user.id} className="card-pastel border-pastel-blue">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <div>Registered on: {new Date(user.registeredOn).toLocaleDateString()}</div>
                {user.lastActive && (
                  <div>Last active: {new Date(user.lastActive).toLocaleDateString()}</div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => toast.info("Edit user details")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                    <Lock className="h-4 w-4 mr-2" />
                    Reset Password
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user.status === "active" ? (
                    <DropdownMenuItem onClick={() => handleStatusChange(user.id, "suspended")}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Suspend User
                    </DropdownMenuItem>
                  ) : user.status === "suspended" ? (
                    <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activate User
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve User
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout title="User Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-pastel"
            />
          </div>
          
          <Button 
            onClick={() => setShowAddUserDialog(true)}
            className="bg-pastel-blue hover:bg-pastel-blue/80 text-primary-foreground"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Add User
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Users ({filteredUsers.length})</TabsTrigger>
            <TabsTrigger value="students">Students ({students.length})</TabsTrigger>
            <TabsTrigger value="staff">Staff ({staff.length})</TabsTrigger>
            <TabsTrigger value="admin">Admins ({admins.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {renderUsersList(filteredUsers)}
          </TabsContent>
          
          <TabsContent value="students" className="space-y-4">
            {renderUsersList(students)}
          </TabsContent>
          
          <TabsContent value="staff" className="space-y-4">
            {renderUsersList(staff)}
          </TabsContent>
          
          <TabsContent value="admin" className="space-y-4">
            {renderUsersList(admins)}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. The user will receive an email to set their password.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input 
                id="name" 
                placeholder="John Doe"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="input-pastel"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input 
                id="email" 
                type="email"
                placeholder="john@example.com"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="input-pastel"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Select value={newUserRole} onValueChange={(value: "student" | "staff" | "admin") => setNewUserRole(value)}>
                <SelectTrigger className="input-pastel">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Initial Password
              </label>
              <Input 
                id="password" 
                type="password"
                placeholder="••••••••"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
                className="input-pastel"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser} className="bg-pastel-blue hover:bg-pastel-blue/80 text-primary-foreground">
              <Plus className="h-4 w-4 mr-1" />
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Users;
