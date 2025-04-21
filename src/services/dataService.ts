
import { ClassRecording, Note, Flashcard, Quiz, Assignment, StudentAssignment } from "@/components/types";

// This service provides mock data for the application
// In a real app, this would be replaced with API calls to a backend

// Mock class recordings
export const getMockRecordings = (): ClassRecording[] => [
  {
    id: "rec1",
    title: "Physics Lecture - Wave Mechanics",
    date: "2025-04-09",
    duration: "1h 15m",
    status: "completed",
    transcriptionStatus: "completed",
    staffId: "staff1",
    staffName: "Dr. Smith",
    captureBlackboard: true,
    audioUrl: "/mock-audio/recording1.mp3"
  },
  {
    id: "rec2",
    title: "Literature - Shakespeare Analysis",
    date: "2025-04-08",
    duration: "55m",
    status: "completed",
    transcriptionStatus: "completed",
    staffId: "staff2",
    staffName: "Prof. Johnson",
    captureBlackboard: false,
    audioUrl: "/mock-audio/recording2.mp3"
  },
  {
    id: "rec3",
    title: "Calculus - Differential Equations",
    date: "2025-04-07",
    duration: "1h 30m",
    status: "completed",
    transcriptionStatus: "processing",
    staffId: "staff1",
    staffName: "Dr. Smith",
    captureBlackboard: true,
    audioUrl: "/mock-audio/recording3.mp3"
  }
];

// Mock notes
export const getMockNotes = (): Note[] => [
  {
    id: "note1",
    title: "Physics: Wave Mechanics",
    content: "# Wave Mechanics\n\n## Introduction\nWaves are disturbances that transfer energy through matter or space. Wave mechanics is the study of these phenomena.\n\n## Key Concepts\n- **Amplitude**: Maximum displacement of the wave\n- **Wavelength**: Distance between consecutive wave peaks\n- **Frequency**: Number of oscillations per unit time\n\n## Wave Equation\nThe general form of the wave equation is: $v = f \\lambda$\n\nWhere:\n- $v$ is the wave velocity\n- $f$ is the frequency\n- $\\lambda$ is the wavelength",
    recordingId: "rec1",
    date: "2025-04-09"
  },
  {
    id: "note2",
    title: "Literature: Shakespeare Analysis",
    content: "# Shakespeare's Hamlet\n\n## Themes\n- **Revenge**: Central theme driving Hamlet's actions\n- **Madness**: Real or feigned, a key aspect of the protagonist\n- **Corruption**: The state of Denmark reflects moral corruption\n\n## Character Analysis\n- **Hamlet**: Complex protagonist, intellectual, overthinking\n- **Claudius**: Antagonist, manipulative, power-hungry\n- **Ophelia**: Tragic figure, caught between duty and love",
    recordingId: "rec2",
    date: "2025-04-08"
  }
];

// Mock flashcards
export const getMockFlashcards = (): Flashcard[] => [
  {
    id: "fc1",
    term: "Amplitude",
    definition: "The maximum displacement of a wave from its equilibrium position",
    noteId: "note1",
    recordingId: "rec1",
    course: "Physics 101",
    createdAt: "2025-04-09"
  },
  {
    id: "fc2",
    term: "Wavelength",
    definition: "The distance between consecutive corresponding points of the same phase on a wave",
    noteId: "note1",
    recordingId: "rec1",
    course: "Physics 101",
    createdAt: "2025-04-09"
  },
  {
    id: "fc3",
    term: "Revenge Tragedy",
    definition: "A dramatic form where the protagonist seeks revenge for an act of violence committed against a family member",
    noteId: "note2",
    recordingId: "rec2",
    course: "English Literature",
    createdAt: "2025-04-08"
  }
];

// Mock quizzes
export const getMockQuizzes = (): Quiz[] => [
  {
    id: "quiz1",
    title: "Wave Mechanics Quiz",
    description: "Test your understanding of wave properties and behavior",
    questions: [
      {
        id: "q1",
        question: "What is the relationship between wavelength and frequency?",
        options: [
          { id: "a", text: "They are directly proportional" },
          { id: "b", text: "They are inversely proportional" },
          { id: "c", text: "They are independent of each other" },
          { id: "d", text: "They are equal to each other" }
        ],
        correctOptionId: "b",
        explanation: "Wavelength and frequency are inversely proportional. As frequency increases, wavelength decreases, and vice versa."
      },
      {
        id: "q2",
        question: "Which of the following is true about wave amplitude?",
        options: [
          { id: "a", text: "It affects the speed of the wave" },
          { id: "b", text: "It is measured in Hertz" },
          { id: "c", text: "It determines the energy carried by the wave" },
          { id: "d", text: "It is the same as wavelength" }
        ],
        correctOptionId: "c",
        explanation: "The amplitude of a wave is related to the energy it carries. Higher amplitude means more energy."
      }
    ],
    noteId: "note1",
    recordingId: "rec1",
    course: "Physics 101",
    createdAt: "2025-04-09",
    createdBy: "system",
    automated: true
  }
];

// Mock assignments
export const getMockAssignments = (): Assignment[] => [
  {
    id: "assign1",
    title: "Physics Problem Set",
    description: "Complete the following problems related to wave mechanics and interference patterns.",
    dueDate: "2025-04-15",
    course: "Physics 101",
    createdBy: "staff1",
    createdAt: "2025-04-05"
  },
  {
    id: "assign2",
    title: "Literature Essay",
    description: "Write a 1500-word essay analyzing the theme of revenge in Hamlet.",
    dueDate: "2025-04-18",
    course: "English Literature",
    createdBy: "staff2",
    createdAt: "2025-04-06"
  },
  {
    id: "assign3",
    title: "Chemistry Lab Report",
    description: "Submit your report on the acid-base titration experiment conducted in lab.",
    dueDate: "2025-04-20",
    course: "Chemistry 202",
    createdBy: "staff3",
    createdAt: "2025-04-07"
  }
];

// Mock student assignments
export const getMockStudentAssignments = (): StudentAssignment[] => [
  {
    id: "sa1",
    assignmentId: "assign1",
    studentId: "student1",
    status: "in_progress"
  },
  {
    id: "sa2",
    assignmentId: "assign2",
    studentId: "student1",
    status: "not_started"
  },
  {
    id: "sa3",
    assignmentId: "assign3",
    studentId: "student1",
    status: "not_started"
  }
];
