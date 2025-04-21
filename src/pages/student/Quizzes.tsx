import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BookOpenCheck, Calendar, Check, Clock, Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Updated quizzes based on Operating Systems, DBMS, and Machine Learning
const quizzes = [
  {
    id: 1,
    title: "Operating Systems: Process Scheduling",
    course: "SCSB2401",
    questions: 10,
    duration: "20 min",
    dueDate: "2025-04-15",
    completed: false,
    score: null,
  },
  {
    id: 2,
    title: "Database Management: Normalization",
    course: "S11BLH41",
    questions: 15,
    duration: "30 min",
    dueDate: "2025-04-18",
    completed: true,
    score: 90,
  },
  {
    id: 3,
    title: "Machine Learning: Clustering Algorithms",
    course: "SCSB4009",
    questions: 12,
    duration: "25 min",
    dueDate: "2025-04-20",
    completed: false,
    score: null,
  },
];

// Updated sample quiz questions
const sampleQuizQuestions = [
  {
    id: 1,
    question: "Which scheduling algorithm allocates CPU time in a fixed time slice to each process?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "First-Come, First-Served" },
      { id: "b", text: "Shortest Job Next" },
      { id: "c", text: "Round-Robin" },
      { id: "d", text: "Priority Scheduling" },
    ],
    answer: "c",
  },
  {
    id: 2,
    question: "Which of the following are benefits of database normalization? (Select all that apply)",
    type: "checkbox",
    options: [
      { id: "a", text: "Reduces data redundancy" },
      { id: "b", text: "Improves query performance" },
      { id: "c", text: "Ensures data integrity" },
      { id: "d", text: "Increases storage requirements" },
    ],
    answers: ["a", "b", "c"],
  },
  {
    id: 3,
    question: "In K-Means clustering, what is the primary objective?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Maximize inter-cluster variance" },
      { id: "b", text: "Minimize intra-cluster variance" },
      { id: "c", text: "Maximize the number of clusters" },
      { id: "d", text: "Minimize the number of iterations" },
    ],
    answer: "b",
  },
];

const StudentQuizzes = () => {
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes in seconds
  const [quizComplete, setQuizComplete] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const startQuiz = (quizId: number) => {
    setActiveQuiz(quizId);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(1200);
    setQuizComplete(false);
  };

  const handleSingleAnswer = (questionId: number, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleMultipleAnswer = (questionId: number, value: string) => {
    const currentAnswers = (answers[questionId] as string[]) || [];
    const updatedAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter((v) => v !== value)
      : [...currentAnswers, value];

    setAnswers({
      ...answers,
      [questionId]: updatedAnswers,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    toast.success("Quiz submitted successfully!");
    setQuizComplete(true);
  };

  const exitQuiz = () => {
    setActiveQuiz(null);
  };

  // Handle the current question
  const question = sampleQuizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === sampleQuizQuestions.length - 1;

  return (
    <DashboardLayout title="Quizzes">
      {!activeQuiz ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-maroon-800">Your Quizzes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{quiz.course}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <BookOpenCheck className="h-4 w-4 mr-1 text-maroon-600" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-maroon-600" />
                      <span>{quiz.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-maroon-600" />
                    <span>Due: {new Date(quiz.dueDate).toLocaleDateString()}</span>
                  </div>

                  {quiz.completed ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Score</span>
                        <span className="font-medium text-maroon-700">{quiz.score}%</span>
                      </div>
                      <Progress value={quiz.score as number} className="h-2" />
                      <Button
                        className="w-full bg-maroon-700 hover:bg-maroon-800 text-white"
                        onClick={() => toast.success("Viewing quiz results")}
                      >
                        View Results
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-maroon-700 hover:bg-maroon-800 text-white"
                      onClick={() => startQuiz(quiz.id)}
                    >
                      Start Quiz
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : quizComplete ? (
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto py-12">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Quiz Submitted!</h2>
          <p className="text-center text-muted-foreground mb-6">
            Your quiz has been submitted successfully. Your instructor will grade it shortly.
          </p>
          <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quiz</span>
                <span className="font-medium">{quizzes.find((q) => q.id === activeQuiz)?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Questions</span>
                <span className="font-medium">{quizzes.find((q) => q.id === activeQuiz)?.questions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Submitted</span>
                <span className="font-medium">{new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
          <Button
            className="mt-8 bg-maroon-700 hover:bg-maroon-800 text-white"
            onClick={exitQuiz}
          >
            Return to Quizzes
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quiz Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
            <div>
              <h2 className="font-semibold text-lg">{quizzes.find((q) => q.id === activeQuiz)?.title}</h2>
              <p className="text-sm text-muted-foreground">{quizzes.find((q) => q.id === activeQuiz)?.course}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm font-medium">
                <Timer className="h-4 w-4 mr-1 text-maroon-600" />
                Time Remaining: {formatTime(timeRemaining)}
              </div>
              <Button variant="outline" className="border-red-300 text-red-700" onClick={exitQuiz}>
                Exit Quiz
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="flex justify-between items-center text-sm">
            <span>Question {currentQuestion + 1} of {sampleQuizQuestions.length}</span>
            <span>Progress</span>
          </div>
          <Progress value={(currentQuestion + 1) / sampleQuizQuestions.length * 100} className="h-2" />

          {/* Question Card */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">{question.question}</h3>

              {question.type === "multiple-choice" && (
                <RadioGroup
                  value={answers[question.id] as string | ""}
                  onValueChange={(value) => handleSingleAnswer(question.id, value)}
                  className="space-y-2"
                >
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={`q${question.id}-${option.id}`} />
                      <Label
                        htmlFor={`q${question.id}-${option.id}`}
                        className="flex-grow p-2 rounded-md hover:bg-gray-50"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === "checkbox" && (
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`q${question.id}-${option.id}`}
                        checked={(answers[question.id] as string[] || []).includes(option.id)}
                        onCheckedChange={() => handleMultipleAnswer(question.id, option.id)}
                      />
                      <Label
                        htmlFor={`q${question.id}-${option.id}`}
                        className="flex-grow p-2 rounded-md hover:bg-gray-50"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>

                {isLastQuestion ? (
                  <Button
                    className="bg-maroon-700 hover:bg-maroon-800 text-white"
                    onClick={submitQuiz}
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    className="bg-maroon-700 hover:bg-maroon-800 text-white"
                    onClick={nextQuestion}
                  >
                    Next Question
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentQuizzes;