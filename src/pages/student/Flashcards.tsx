import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Plus, Search, RefreshCw, Check, X } from "lucide-react";
import { toast } from "sonner";

// Updated flashcard sets
const flashcardSets = [
  { id: 1, title: "Operating Systems", cardCount: 20, lastReviewed: "2 days ago" },
  { id: 2, title: "Database Management System", cardCount: 22, lastReviewed: "4 days ago" },
  { id: 3, title: "Introduction to Machine Learning", cardCount: 18, lastReviewed: "1 week ago" },
  { id: 4, title: "Data Structures and Algorithms", cardCount: 25, lastReviewed: "3 days ago" },
];

// Updated sample flashcards
const sampleCards = [
  {
    id: 1,
    question: "What is a process in an operating system?",
    answer: "A process is a program in execution, including the program code, current activity, and system resources allocated to it."
  },
  {
    id: 2,
    question: "What is the purpose of normalization in a DBMS?",
    answer: "Normalization organizes data to eliminate redundancy and ensure data integrity by dividing tables into smaller, related tables."
  },
  {
    id: 3,
    question: "What is supervised learning in machine learning?",
    answer: "Supervised learning is a type of ML where a model is trained on labeled data to predict outcomes for new inputs."
  },
  {
    id: 4,
    question: "What is the time complexity of a binary search algorithm?",
    answer: "The time complexity of a binary search is O(log n), where n is the number of elements in the sorted array."
  },
];

const StudentFlashcards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSetId, setActiveSetId] = useState<number | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const startReview = (setId: number) => {
    setActiveSetId(setId);
    setCurrentCardIndex(0);
    setFlipped(false);
    toast.success(`Started reviewing ${flashcardSets.find(set => set.id === setId)?.title}`);
  };

  const nextCard = () => {
    if (currentCardIndex < sampleCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setFlipped(false);
    } else {
      toast.success("You've completed this set!");
      setActiveSetId(null);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setFlipped(false);
    }
  };

  const markCard = (correct: boolean) => {
    toast.success(correct ? "Card marked as known!" : "Card marked for review later");
    nextCard();
  };

  const filteredSets = flashcardSets.filter(set => 
    set.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Flashcards">
      {!activeSetId ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search flashcards..."
                className="pl-8 input-maroon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              className="flex items-center bg-maroon-700 hover:bg-maroon-800 text-white"
              onClick={() => toast.success("Create new flashcard set")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Set
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSets.map((set) => (
              <Card key={set.id} className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-1">{set.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {set.cardCount} cards • Last reviewed {set.lastReviewed}
                  </p>
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      className="border-maroon-300 text-maroon-700"
                      onClick={() => toast.success(`Editing ${set.title}`)}
                    >
                      Edit
                    </Button>
                    <Button 
                      className="bg-maroon-700 hover:bg-maroon-800 text-white"
                      onClick={() => startReview(set.id)}
                    >
                      Study
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-8 w-full flex justify-between items-center">
            <Button 
              variant="outline"
              className="border-maroon-300 text-maroon-700"
              onClick={() => setActiveSetId(null)}
            >
              Back to Sets
            </Button>
            <div className="text-center">
              <h3 className="font-semibold">
                {flashcardSets.find(set => set.id === activeSetId)?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                Card {currentCardIndex + 1} of {sampleCards.length}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setFlipped(false)}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <div 
            className={`w-full max-w-2xl aspect-video rounded-xl shadow-lg cursor-pointer transition-all duration-500 ${
              flipped ? "bg-maroon-50" : "bg-white"
            }`}
            style={{ perspective: "1000px" }}
            onClick={() => setFlipped(!flipped)}
          >
            <div 
              className={`w-full h-full relative transition-transform duration-500 ${
                flipped ? "rotate-y-180" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front side */}
              <div 
                className={`absolute w-full h-full flex items-center justify-center p-8 backface-hidden ${
                  flipped ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="text-center">
                  <h2 className="text-xl md:text-2xl font-bold text-maroon-800">
                    {sampleCards[currentCardIndex].question}
                  </h2>
                  <p className="text-muted-foreground mt-4">Click to reveal answer</p>
                </div>
              </div>

              {/* Back side */}
              <div 
                className={`absolute w-full h-full flex items-center justify-center p-8 rotate-y-180 backface-hidden ${
                  flipped ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-center">
                  <p className="text-lg md:text-xl text-maroon-900">
                    {sampleCards[currentCardIndex].answer}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={prevCard}
              disabled={currentCardIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button 
              variant="outline"
              size="lg"
              className="border-red-300 text-red-700"
              onClick={() => markCard(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Review Again
            </Button>

            <Button 
              variant="outline"
              size="lg"
              className="border-green-300 text-green-700"
              onClick={() => markCard(true)}
            >
              <Check className="h-4 w-4 mr-2" />
              Got It
            </Button>

            <Button 
              variant="outline" 
              size="icon"
              onClick={nextCard}
              disabled={currentCardIndex === sampleCards.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentFlashcards;