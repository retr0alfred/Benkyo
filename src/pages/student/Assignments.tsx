import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileTextIcon, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Updated assignments based on Operating Systems, DBMS, Machine Learning, and Data Structures
const assignments = [
  {
    id: 1,
    title: "Operating Systems: Process Scheduler Implementation",
    course: "Operating Systems",
    dueDate: "2025-04-15",
    progress: 75,
    status: "in-progress",
  },
  {
    id: 2,
    title: "DBMS: Database Design Project",
    course: "Database Management System",
    dueDate: "2025-04-18",
    progress: 30,
    status: "in-progress",
  },
  {
    id: 3,
    title: "Machine Learning: Clustering Analysis Report",
    course: "Introduction to Machine Learning",
    dueDate: "2025-04-20",
    progress: 0,
    status: "not-started",
  },
  {
    id: 4,
    title: "Data Structures: Binary Search Tree Implementation",
    course: "Data Structures and Algorithms",
    dueDate: "2025-04-10",
    progress: 100,
    status: "completed",
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "in-progress":
      return "bg-blue-100 text-blue-700";
    case "not-started":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "Completed";
    case "in-progress":
      return "In Progress";
    case "not-started":
      return "Not Started";
    default:
      return status;
  }
};

const StudentAssignments = () => {
  return (
    <DashboardLayout title="Assignments">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-maroon-800">Your Assignments</h2>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-maroon-300 text-maroon-700">
              Filter
            </Button>
            <Button className="bg-maroon-700 hover:bg-maroon-800 text-white">
              Create Study Plan
            </Button>
          </div>
        </div>

        {/* Assignment List */}
        <div className="grid gap-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-maroon-100 rounded-lg">
                        <FileTextIcon className="h-6 w-6 text-maroon-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>

                        <div className="flex items-center mt-2 text-sm">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1 text-maroon-600" />
                          <span className="text-muted-foreground">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </span>

                          <span className="mx-2">•</span>

                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeClass(
                              assignment.status
                            )}`}
                          >
                            {getStatusText(assignment.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 w-full md:w-48">
                    {assignment.status !== "completed" && (
                      <>
                        <div className="flex justify-between items-center text-xs">
                          <span>Progress</span>
                          <span>{assignment.progress}%</span>
                        </div>
                        <Progress value={assignment.progress} className="h-2" />
                      </>
                    )}
                    <Button
                      className="w-full bg-maroon-700 hover:bg-maroon-800 text-white"
                      onClick={() => alert(`Opening assignment: ${assignment.title}`)}
                    >
                      {assignment.status === "completed" ? "View Submission" : "Continue"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAssignments;