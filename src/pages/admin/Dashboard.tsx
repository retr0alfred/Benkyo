import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, User, Users, FileText, Settings } from "lucide-react";
import { toast } from "sonner";

// Mock data
const recentUsers = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "student", status: "active" },
  { id: 2, name: "Maria Garcia", email: "maria@example.com", role: "staff", status: "active" },
  { id: 3, name: "John Smith", email: "john@example.com", role: "student", status: "suspended" },
  { id: 4, name: "Sarah Wang", email: "sarah@example.com", role: "student", status: "active" },
  { id: 5, name: "David Brown", email: "david@example.com", role: "staff", status: "active" },
];

const recentContent = [
  { id: 1, title: "Operating Systems - Process Scheduling", type: "notes", creator: "Maria Garcia", created: "2025-04-09" },
  { id: 2, title: "Machine Learning - Clustering Quiz", type: "quiz", creator: "David Brown", created: "2025-04-08" },
  { id: 3, title: "DBMS - Database Design Assignment", type: "assignment", creator: "Maria Garcia", created: "2025-04-07" },
  { id: 4, title: "Data Structures - Binary Search Trees Flashcards", type: "flashcards", creator: "David Brown", created: "2025-04-06" },
];

const systemSettings = [
  { id: "audioQuality", name: "Audio Recording Quality", value: "High", options: ["Low", "Medium", "High"] },
  { id: "transcriptModel", name: "Transcription Model", value: "Enhanced", options: ["Standard", "Enhanced", "Premium"] },
  { id: "notificationFreq", name: "Student Notification Frequency", value: "Daily", options: ["Hourly", "Daily", "Weekly"] },
  { id: "contentRetention", name: "Content Retention Period", value: "1 Year", options: ["6 Months", "1 Year", "Forever"] },
];

const AdminDashboard = () => {
  const [searchUser, setSearchUser] = useState("");
  const [searchContent, setSearchContent] = useState("");
  
  const handleResetPassword = (userId: number, userName: string) => {
    toast.success(`Password reset link sent to ${userName}`);
  };
  
  const handleSuspendUser = (userId: number, userName: string) => {
    toast.success(`User ${userName} has been suspended`);
  };
  
  const handleDeleteContent = (contentId: number, contentTitle: string) => {
    toast.success(`Content "${contentTitle}" has been deleted`);
  };
  
  const handleUpdateSetting = (settingId: string, newValue: string) => {
    toast.success(`Setting updated: ${settingId} = ${newValue}`);
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+1 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+86 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Healthy</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage all student and staff accounts
              </CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted p-3 font-medium">
                  <div className="col-span-2">Name / Email</div>
                  <div>Role</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="grid grid-cols-5 p-3 items-center">
                      <div className="col-span-2">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                      <div className="capitalize">{user.role}</div>
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleResetPassword(user.id, user.name)}
                        >
                          Reset Password
                        </Button>
                        <Button 
                          variant={user.status === "active" ? "destructive" : "outline"} 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleSuspendUser(user.id, user.name)}
                        >
                          {user.status === "active" ? "Suspend" : "Activate"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button>Create New User</Button>
          </div>
        </TabsContent>
        
        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>
                Manage all content including notes, quizzes, and assignments
              </CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search content..."
                  className="pl-8"
                  value={searchContent}
                  onChange={(e) => setSearchContent(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted p-3 font-medium">
                  <div className="col-span-2">Title</div>
                  <div>Type</div>
                  <div>Created By</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {recentContent.map((content) => (
                    <div key={content.id} className="grid grid-cols-5 p-3 items-center">
                      <div className="col-span-2 font-medium">{content.title}</div>
                      <div className="capitalize">{content.type}</div>
                      <div>{content.creator}</div>
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleDeleteContent(content.id, content.title)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure global system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemSettings.map((setting) => (
                  <div key={setting.id} className="grid grid-cols-2 gap-4 items-center">
                    <div>
                      <label htmlFor={setting.id} className="font-medium">
                        {setting.name}
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Current: {setting.value}
                      </p>
                    </div>
                    <div>
                      <select
                        id={setting.id}
                        defaultValue={setting.value}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        onChange={(e) => handleUpdateSetting(setting.id, e.target.value)}
                      >
                        {setting.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button>Save All Settings</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Maintenance</CardTitle>
              <CardDescription>
                Perform maintenance tasks on the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full justify-start">
                  Clear Cache
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Backup Database
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Update System
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View System Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminDashboard;