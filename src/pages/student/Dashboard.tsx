
import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, Clock, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock data
const upcomingAssignments = [
  {
    id: 1,
    title: "Operating Systems Questions",
    dueDate: "2025-04-15",
    course: "SCSB2401",
    completed: false,
  },
  {
    id: 2,
    title: "Database Schema Diagram",
    dueDate: "2025-04-18",
    course: "S11BLH41",
    completed: false,
  },
  {
    id: 3,
    title: "K-Means Sample Questions",
    dueDate: "2025-04-20",
    course: "SCSB4009",
    completed: false,
  },
];

const recentNotes = [
  {
    id: 1,
    title: "Operating Systems: Process Scheduling",
    date: "2025-04-09",
    excerpt: "Explored CPU scheduling algorithms like Round-Robin and Priority Scheduling...",
  },
  {
    id: 2,
    title: "Databases: Relational Models",
    date: "2025-04-08",
    excerpt: "Discussed normalization techniques and ER diagrams for database design...",
  },
  {
    id: 3,
    title: "Machine Learning: K-Means Clustering",
    date: "2025-04-07",
    excerpt: "Introduction to unsupervised learning and the K-Means algorithm for clustering...",
  },
];

const StudentDashboard = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState(3);
  const [totalQuizzes, setTotalQuizzes] = useState(10);
  
  return (
    <DashboardLayout title="Student Dashboard">
      <div className="grid gap-6">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Recent Notes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 in the last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Flashcards Created</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86</div>
              <p className="text-xs text-muted-foreground">+24 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Quiz Progress</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{completedQuizzes}/{totalQuizzes}</div>
                <div className="text-xs text-muted-foreground">{Math.round((completedQuizzes/totalQuizzes) * 100)}%</div>
              </div>
              <Progress value={(completedQuizzes/totalQuizzes) * 100} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Due Dates</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next due: Apr 15</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Assignments */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>
                Track your assignments and due dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div 
                    key={assignment.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        <span className="mx-2">•</span>
                        {assignment.course}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Notes */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Class Notes</CardTitle>
              <CardDescription>
                AI-generated notes from your recent classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotes.map((note) => (
                  <div 
                    key={note.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{note.title}</h4>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(note.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {note.excerpt}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-xs"
                    >
                      Read Notes
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
