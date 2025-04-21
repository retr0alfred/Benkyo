
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const students = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.j@example.edu",
    avatar: "",
    attendance: "92%",
    assignments: "15/16"
  },
  {
    id: "2",
    name: "Maya Patel",
    email: "maya.p@example.edu",
    avatar: "",
    attendance: "88%",
    assignments: "14/16"
  },
  {
    id: "3",
    name: "Cameron Lee",
    email: "cameron.l@example.edu",
    avatar: "",
    attendance: "95%",
    assignments: "16/16"
  }
];

const StaffStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredStudents = students.filter(
    student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewProfile = (studentId: string) => {
    navigate(`/staff/student/${studentId}`);
    toast.success("Navigating to student profile");
  };
  
  const handleMessage = (studentId: string) => {
    navigate(`/staff/messages/${studentId}`);
    toast.success("Opening message thread");
  };

  return (
    <DashboardLayout title="Student Management">
      <div className="grid gap-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            className="pl-10 input-maroon" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="border-maroon-200 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-maroon-500">
                    <AvatarFallback className="bg-maroon-500 text-white">{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-maroon-500" />
                    <span>Attendance</span>
                  </div>
                  <div className="text-right font-medium">{student.attendance}</div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-maroon-500" />
                    <span>Assignments</span>
                  </div>
                  <div className="text-right font-medium">{student.assignments}</div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-maroon-200 hover:bg-maroon-50 hover:text-maroon-500"
                    onClick={() => handleViewProfile(student.id)}
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-10 p-0 border-maroon-200 hover:bg-maroon-50 hover:text-maroon-500"
                    onClick={() => handleMessage(student.id)}
                  >
                    <MessageCircle size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffStudents;
