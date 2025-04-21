
export type ClassRecording = {
  id: string;
  title: string;
  date: string;
  duration: string; // in seconds or formatted string
  status: "recording" | "processing" | "completed" | "error";
  transcriptionStatus: "pending" | "processing" | "completed" | "error";
  staffId: string;
  staffName: string;
  captureBlackboard: boolean;
  audioUrl?: string;
  transcriptionUrl?: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  recordingId: string;
  date: string;
  course?: string;
  blackboardImages?: BlackboardImage[];
};

export type BlackboardImage = {
  id: string;
  url: string;
  timestamp: string; // relative to recording start
  recordingId: string;
  noteId: string;
};

export type Flashcard = {
  id: string;
  term: string;
  definition: string;
  noteId: string;
  recordingId: string;
  course?: string;
  createdAt: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation?: string;
};

export type Quiz = {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  noteId?: string;
  recordingId?: string;
  course?: string;
  createdAt: string;
  createdBy: string;
  automated: boolean;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  course: string;
  createdBy: string;
  createdAt: string;
  files?: { id: string; name: string; url: string }[];
};

export type StudentAssignment = {
  id: string;
  assignmentId: string;
  studentId: string;
  status: "not_started" | "in_progress" | "submitted" | "graded";
  submittedAt?: string;
  grade?: number;
  feedback?: string;
  files?: { id: string; name: string; url: string }[];
};
