import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Check,
  X
} from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { QuizQuestion } from "@/components/types";

const Quizzes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizDescription, setNewQuizDescription] = useState("");
  const [newQuizCourse, setNewQuizCourse] = useState("");
  
  // For creating quiz questions (unchanged initial state)
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: "q1",
      question: "",
      options: [
        { id: "o1", text: "" },
        { id: "o2", text: "" },
        { id: "o3", text: "" },
        { id: "o4", text: "" }
      ],
      correctOptionId: "o1",
      explanation: ""
    }
  ]);

  // Updated mock data for quizzes
  const [quizzes, setQuizzes] = useState([
    {
      id: "1",
      title: "Operating Systems - Process Scheduling",
      description: "Test understanding of CPU scheduling algorithms",
      course: "SCSB2401",
      createdAt: "2025-04-08",
      createdBy: "Dr. John Doe",
      automated: false,
      questionsCount: 5
    },
    {
      id: "2",
      title: "DBMS - Normalization Concepts",
      description: "Assess knowledge of database normalization techniques",
      course: "S11BLH41",
      createdAt: "2025-04-07",
      createdBy: "Prof. Alice Brown",
      automated: true,
      questionsCount: 10
    },
    {
      id: "3",
      title: "Machine Learning - Clustering Algorithms",
      description: "Evaluate understanding of clustering methods like K-Means",
      course: "SCSB4009",
      createdAt: "2025-04-06",
      createdBy: "Dr. Emily Carter",
      automated: false,
      questionsCount: 8
    },
    {
      id: "4",
      title: "Data Structures - Binary Search Trees",
      description: "Test knowledge of BST operations and complexity",
      course: "CS101",
      createdAt: "2025-04-05",
      createdBy: "Prof. Mark Lee",
      automated: true,
      questionsCount: 6
    }
  ]);

  const filteredQuizzes = quizzes.filter(
    quiz => quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            quiz.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpandQuiz = (id: string) => {
    if (expandedQuiz === id) {
      setExpandedQuiz(null);
    } else {
      setExpandedQuiz(id);
    }
  };

  const handleDeleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    toast.success("Quiz deleted successfully");
  };

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q${questions.length + 1}`,
      question: "",
      options: [
        { id: `o${questions.length + 1}-1`, text: "" },
        { id: `o${questions.length + 1}-2`, text: "" },
        { id: `o${questions.length + 1}-3`, text: "" },
        { id: `o${questions.length + 1}-4`, text: "" }
      ],
      correctOptionId: `o${questions.length + 1}-1`,
      explanation: ""
    };

    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    if (questions.length <= 1) {
      toast.error("Quiz must have at least one question");
      return;
    }
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const updateQuestion = (questionId: string, field: string, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  const updateOption = (questionId: string, optionId: string, text: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(o => {
            if (o.id === optionId) {
              return { ...o, text };
            }
            return o;
          })
        };
      }
      return q;
    }));
  };

  const setCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, correctOptionId: optionId };
      }
      return q;
    }));
  };

  const handleCreateQuiz = () => {
    // Validate form
    if (!newQuizTitle.trim()) {
      toast.error("Please enter a quiz title");
      return;
    }
    
    if (!newQuizCourse.trim()) {
      toast.error("Please select a course");
      return;
    }
    
    // Validate questions
    let isValid = true;
    
    questions.forEach((question, index) => {
      if (!question.question.trim()) {
        toast.error(`Question ${index + 1} is empty`);
        isValid = false;
      }
      
      question.options.forEach((option, optIndex) => {
        if (!option.text.trim()) {
          toast.error(`Option ${optIndex + 1} in Question ${index + 1} is empty`);
          isValid = false;
        }
      });
    });
    
    if (!isValid) return;
    
    // Create new quiz
    const newQuiz = {
      id: `${quizzes.length + 1}`,
      title: newQuizTitle,
      description: newQuizDescription,
      course: newQuizCourse,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: "Current Staff Member",
      automated: false,
      questionsCount: questions.length
    };
    
    setQuizzes([newQuiz, ...quizzes]);
    
    // Reset form
    setNewQuizTitle("");
    setNewQuizDescription("");
    setNewQuizCourse("");
    setQuestions([
      {
        id: "q1",
        question: "",
        options: [
          { id: "o1", text: "" },
          { id: "o2", text: "" },
          { id: "o3", text: "" },
          { id: "o4", text: "" }
        ],
        correctOptionId: "o1",
        explanation: ""
      }
    ]);
    
    setShowCreateDialog(false);
    toast.success("Quiz created successfully");
  };

  const generateQuizFromLecture = () => {
    toast.success("Quiz generation started. This may take a few minutes.");
    // In a real application, this would call an API to generate the quiz from lecture recording
  };

  return (
    <DashboardLayout title="Create and Manage Quizzes">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search quizzes by title or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-pastel"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => generateQuizFromLecture()}
              variant="outline"
            >
              <FileText className="mr-2 h-5 w-5" />
              Generate from Lecture
            </Button>
            <Button 
              onClick={() => setShowCreateDialog(true)}
              className="bg-pastel-purple hover:bg-pastel-purple/80 text-primary-foreground"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Quiz
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Quizzes</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="auto">Auto-Generated</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <Card key={quiz.id} className={`card-pastel ${quiz.automated ? 'border-pastel-green' : 'border-pastel-purple'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">{quiz.title}</CardTitle>
                      <Badge className={quiz.automated ? 'bg-pastel-green text-primary-foreground' : 'bg-pastel-purple text-primary-foreground'}>
                        {quiz.automated ? 'Auto-generated' : 'Manual'}
                      </Badge>
                    </div>
                    <CardDescription>
                      Course: {quiz.course} • {quiz.questionsCount} questions • Created: {new Date(quiz.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <p className="text-muted-foreground">{quiz.description}</p>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteQuiz(quiz.id)}
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleExpandQuiz(quiz.id)}
                    >
                      {expandedQuiz === quiz.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CardFooter>
                  
                  {expandedQuiz === quiz.id && (
                    <CardContent className="pt-0 border-t mt-2">
                      <div className="space-y-4 pt-2">
                        <div className="text-sm space-y-2">
                          <p><span className="font-medium">Created by:</span> {quiz.createdBy}</p>
                          <p><span className="font-medium">Questions:</span> {quiz.questionsCount}</p>
                          <p><span className="font-medium">Created on:</span> {new Date(quiz.createdAt).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button size="sm" className="bg-pastel-blue hover:bg-pastel-blue/80 text-primary-foreground">
                            Preview Quiz
                          </Button>
                          <Button size="sm" className="bg-pastel-green hover:bg-pastel-green/80 text-primary-foreground">
                            Assign to Students
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No quizzes found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          {/* Manual and Auto-generated tabs would show filtered content */}
          <TabsContent value="manual" className="space-y-4">
            <div className="text-center py-10">
              <p className="text-muted-foreground">Filter by manually created quizzes.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="auto" className="space-y-4">
            <div className="text-center py-10">
              <p className="text-muted-foreground">Filter by auto-generated quizzes.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Quiz Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Quiz</DialogTitle>
            <DialogDescription>
              Create a new quiz for your students. Add questions, options, and mark correct answers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Quiz Title
                </label>
                <Input 
                  id="title" 
                  placeholder="e.g., Operating Systems - Process Scheduling"
                  value={newQuizTitle}
                  onChange={(e) => setNewQuizTitle(e.target.value)}
                  className="input-pastel"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description (Optional)
                </label>
                <Textarea 
                  id="description" 
                  placeholder="Enter quiz description"
                  value={newQuizDescription}
                  onChange={(e) => setNewQuizDescription(e.target.value)}
                  className="input-pastel"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="course" className="text-sm font-medium">
                  Course
                </label>
                <Input 
                  id="course" 
                  placeholder="e.g., SCSB2401"
                  value={newQuizCourse}
                  onChange={(e) => setNewQuizCourse(e.target.value)}
                  className="input-pastel"
                />
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Questions</h3>
              
              <div className="space-y-8">
                {questions.map((question, qIndex) => (
                  <div key={question.id} className="border p-4 rounded-md relative">
                    <div className="absolute -top-3 left-3 bg-background px-2 text-sm text-muted-foreground">
                      Question {qIndex + 1}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-2">
                          <label htmlFor={`question-${question.id}`} className="text-sm font-medium">
                            Question Text
                          </label>
                          <Textarea 
                            id={`question-${question.id}`}
                            placeholder="Enter your question here"
                            value={question.question}
                            onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                            className="input-pastel"
                          />
                        </div>
                        
                        <Button 
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive mt-6"
                          onClick={() => removeQuestion(question.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Answer Options
                        </label>
                        {question.options.map((option, oIndex) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className={`rounded-full w-6 h-6 p-0 ${
                                question.correctOptionId === option.id ? 'bg-pastel-green text-primary-foreground' : ''
                              }`}
                              onClick={() => setCorrectOption(question.id, option.id)}
                            >
                              {question.correctOptionId === option.id ? <Check className="h-4 w-4" /> : <span>{String.fromCharCode(65 + oIndex)}</span>}
                            </Button>
                            <Input 
                              placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                              value={option.text}
                              onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                              className="input-pastel"
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor={`explanation-${question.id}`} className="text-sm font-medium">
                          Explanation (Optional)
                        </label>
                        <Textarea 
                          id={`explanation-${question.id}`}
                          placeholder="Explain why the correct answer is right"
                          value={question.explanation || ""}
                          onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                          className="input-pastel"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  onClick={addQuestion}
                  variant="outline"
                  className="w-full border-dashed"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateQuiz} className="bg-pastel-purple hover:bg-pastel-purple/80 text-primary-foreground">
              Create Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Quizzes;