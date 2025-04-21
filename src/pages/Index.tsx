
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, MessageSquare, ArrowRight, Headphones } from "lucide-react";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "student") {
        navigate("/student/dashboard");
      } else if (user.role === "staff") {
        navigate("/staff/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const features = [
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Audio Recording",
      description: "Automatically record and transcribe lectures for easy review."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Smart Notes",
      description: "AI-generated notes from lecture recordings with key points highlighted."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Auto Quizzes",
      description: "Generate quizzes and flashcards from lecture content to enhance learning."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Assignment Tracking",
      description: "Stay on top of assignments with automated reminders and due dates."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-maroon-900 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            Benkyō
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100 animate-fade-in">
              Transform your learning experience with AI-powered lecture recording, 
              automatic note-taking, and smart study tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button 
                onClick={() => navigate("/register")}
                size="lg"
                className="bg-maroon-700 hover:bg-maroon-800 text-white"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")}
                size="lg"
                className="border-white text-maroon-900 hover:bg-grey hover:text-maroon-900"
              >
                Login
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:flex justify-end">
            <div className="relative">
              <div className="bg-maroon-800 rounded-lg p-6 relative z-10 shadow-xl transform animate-fade-in">
                <div className="absolute -top-4 -right-4 bg-maroon-700 rounded-full p-3">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold mb-3">Available Features:</h2>
                <div className="space-y-2 text-left">
                  <p className="border-l-2 border-maroon-500 pl-2">AI-Powered notes summarisation</p>
                  <p className="border-l-2 border-maroon-500 pl-2">Student specific tailored quiz and assignments</p>
                  <p className="border-l-2 border-maroon-500 pl-2">Know where you stand with progress report</p>
                </div>
                <div className="mt-4 bg-maroon-700 p-2 rounded text-sm">
                  <p className="flex items-center"><MessageSquare className="h-4 w-4 mr-2" /> The ultimate learning tool</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-maroon-900">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-maroon-100 p-3 rounded-lg inline-flex mb-4 text-maroon-700">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-maroon-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-maroon-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-maroon-900">Ready to Begin Your Learning?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join your peers and professors and make your learning journey easier!
          </p>
          <Button 
            onClick={() => navigate("/register")}
            size="lg"
            className="bg-maroon-800 hover:bg-maroon-900 text-white"
          >
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-maroon-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Intelligent Student Assistant</h2>
              <p className="text-maroon-200">Your AI-powered learning companion</p>
            </div>
            <div>
              <p className="text-maroon-300">© {new Date().getFullYear()} ISAssistant. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
