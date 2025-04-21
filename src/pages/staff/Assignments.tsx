import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Plus } from "lucide-react";

const StaffAssignments = () => {
  return (
    <DashboardLayout title="Assignments">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Assignment Management</h2>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Create Assignment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Assignments */}
          <Card className="card-pastel">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { 
                    title: "Operating Systems: Process Scheduler Implementation", 
                    dueDate: "April 15, 2025",
                    submissions: 12 
                  },
                  { 
                    title: "DBMS: Database Design Project", 
                    dueDate: "April 18, 2025",
                    submissions: 8
                  },
                  { 
                    title: "Machine Learning: Clustering Analysis Report", 
                    dueDate: "April 22, 2025",
                    submissions: 5
                  }
                ].map((assignment, index) => (
                  <li key={index} className="border-b pb-3 last:border-0">
                    <div className="font-medium mb-1">{assignment.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar size={14} />
                      Due: {assignment.dueDate}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <FileText size={14} />
                      {assignment.submissions} submissions
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Draft Assignments */}
          <Card className="card-pastel">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Draft Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { title: "Data Structures: Binary Search Tree Implementation", dueDate: "Not set" },
                  { title: "Operating Systems: Process Management Guide", dueDate: "Not set" }
                ].map((assignment, index) => (
                  <li key={index} className="border-b pb-3 last:border-0">
                    <div className="font-medium mb-1">{assignment.title}</div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Publish</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Past Assignments */}
          <Card className="card-pastel">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Past Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { 
                    title: "DBMS: ER Diagram Exercise", 
                    dueDate: "March 28, 2025",
                    submissions: 20,
                    completed: true 
                  },
                  { 
                    title: "Machine Learning: Supervised Learning Report", 
                    dueDate: "March 15, 2025",
                    submissions: 18,
                    completed: true 
                  }
                ].map((assignment, index) => (
                  <li key={index} className="border-b pb-3 last:border-0">
                    <div className="font-medium mb-1">{assignment.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar size={14} />
                      Due: {assignment.dueDate}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <FileText size={14} />
                      {assignment.submissions} submissions
                    </div>
                    <Button size="sm" variant="outline" className="mt-2">View Results</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffAssignments;