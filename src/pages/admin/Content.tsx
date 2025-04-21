import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, FileText, Trash2, Video } from "lucide-react";

const AdminContent = () => {
  return (
    <DashboardLayout title="Content Management">
      <div className="space-y-6">
        <Tabs defaultValue="recordings" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="recordings">Recordings</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
          </TabsList>

          <TabsContent value="recordings" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Class Recordings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: "Operating Systems - Process Scheduling",
                      date: "April 5, 2025",
                      duration: "52 minutes",
                      instructor: "Dr. Robert Chen", 
                      status: "Processed",
                      views: 28
                    },
                    { 
                      title: "DBMS - Normalization Techniques",
                      date: "April 3, 2025",
                      duration: "45 minutes",
                      instructor: "Dr. Lisa Wong",
                      status: "Processed",
                      views: 32
                    },
                    { 
                      title: "Machine Learning - K-Means Clustering",
                      date: "April 2, 2025",
                      duration: "48 minutes",
                      instructor: "Dr. Michael Barnes",
                      status: "Processed",
                      views: 45
                    },
                    { 
                      title: "Data Structures - Binary Search Trees",
                      date: "March 30, 2025",
                      duration: "60 minutes",
                      instructor: "Prof. Sarah Johnson",
                      status: "Processed",
                      views: 37
                    }
                  ].map((recording, index) => (
                    <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex items-start space-x-3 mb-3 md:mb-0">
                        <div className="bg-primary/20 p-2 rounded-md">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{recording.title}</h3>
                          <div className="text-sm text-muted-foreground">
                            {recording.date} • {recording.duration} • {recording.instructor}
                          </div>
                          <div className="flex items-center mt-1 gap-2">
                            <Badge variant="outline">{recording.status}</Badge>
                            <span className="text-xs text-muted-foreground">{recording.views} views</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full md:w-auto">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Generated Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: "Operating Systems Notes - Process Scheduling",
                      date: "April 5, 2025",
                      pages: 5,
                      type: "Auto-generated", 
                      views: 17
                    },
                    { 
                      title: "DBMS Notes - Normalization Techniques",
                      date: "April 3, 2025",
                      pages: 4,
                      type: "Auto-generated", 
                      views: 24
                    },
                    { 
                      title: "Machine Learning Notes - K-Means Clustering",
                      date: "April 2, 2025",
                      pages: 6,
                      type: "Auto-generated", 
                      views: 29
                    },
                    { 
                      title: "Data Structures Notes - Binary Search Trees",
                      date: "March 30, 2025",
                      pages: 8,
                      type: "Manual", 
                      views: 31
                    }
                  ].map((note, index) => (
                    <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex items-start space-x-3 mb-3 md:mb-0">
                        <div className="bg-secondary/50 p-2 rounded-md">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{note.title}</h3>
                          <div className="text-sm text-muted-foreground">
                            {note.date} • {note.pages} pages • {note.type}
                          </div>
                          <div className="mt-1">
                            <span className="text-xs text-muted-foreground">{note.views} views</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full md:w-auto">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Quizzes and Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: "Operating Systems Quiz - Process Scheduling",
                      date: "April 10, 2025",
                      questions: 15,
                      type: "Auto-generated",
                      status: "Active", 
                      submissions: 8
                    },
                    { 
                      title: "DBMS Assignment - Database Design Project",
                      date: "April 18, 2025",
                      type: "Manual",
                      status: "Scheduled", 
                      submissions: 0
                    },
                    { 
                      title: "Machine Learning Quiz - Clustering Algorithms",
                      date: "March 28, 2025",
                      questions: 10,
                      type: "Auto-generated",
                      status: "Completed", 
                      submissions: 22
                    },
                    { 
                      title: "Data Structures Assignment - Binary Search Tree Implementation",
                      date: "April 22, 2025",
                      questions: 12,
                      type: "Manual",
                      status: "Active", 
                      submissions: 5
                    }
                  ].map((assessment, index) => (
                    <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex items-start space-x-3 mb-3 md:mb-0">
                        <div className="bg-accent/50 p-2 rounded-md">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{assessment.title}</h3>
                          <div className="text-sm text-muted-foreground">
                            {assessment.date} • {assessment.type}
                            {assessment.questions && ` • ${assessment.questions} questions`}
                          </div>
                          <div className="flex items-center mt-1 gap-2">
                            <Badge 
                              variant="outline" 
                              className={
                                assessment.status === "Active" ? "border-green-500 text-green-600" : 
                                assessment.status === "Scheduled" ? "border-blue-500 text-blue-600" :
                                "border-gray-500 text-gray-600"
                              }
                            >
                              {assessment.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{assessment.submissions} submissions</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full md:w-auto">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminContent;