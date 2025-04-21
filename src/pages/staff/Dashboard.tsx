import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Camera, BookOpen, FileText, Calendar } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

interface LectureState {
  title: string;
  shouldCaptureBlackboard: boolean;
  durationInSeconds: number;
}

interface BackendConnection {
  isConnected: boolean;
  statusMessage: string;
}

interface StaffStatistics {
  recordedLectures: number;
  generatedQuizzes: number;
  pendingAssignments: number;
}

const StaffDashboard = () => {
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [currentLecture, setCurrentLecture] = useState<LectureState>({
    title: "",
    shouldCaptureBlackboard: false,
    durationInSeconds: 0
  });

  const [backendConnection, setBackendConnection] = useState<BackendConnection>({
    isConnected: false,
    statusMessage: "Connecting to backend service..."
  });

  const [staffStatistics, setStaffStatistics] = useState<StaffStatistics>({
    recordedLectures: 28,
    generatedQuizzes: 15,
    pendingAssignments: 10
  });

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/health");
        if (response.ok) {
          setBackendConnection({
            isConnected: true,
            statusMessage: "Backend service connected"
          });
        } else {
          throw new Error(`Backend responded with status: ${response.status}`);
        }
      } catch (error) {
        setBackendConnection({
          isConnected: false,
          statusMessage: "Backend service unavailable"
        });
        console.error("Backend health check failed:", error);
      }
    };

    checkBackendHealth();
    const healthCheckInterval = setInterval(checkBackendHealth, 30000);
    return () => clearInterval(healthCheckInterval);
  }, []);

  useEffect(() => {
    let recordingInterval: NodeJS.Timeout;
    if (isRecordingActive) {
      recordingInterval = setInterval(() => {
        setCurrentLecture(prev => ({
          ...prev,
          durationInSeconds: prev.durationInSeconds + 1
        }));
      }, 1000);
    }
    return () => clearInterval(recordingInterval);
  }, [isRecordingActive]);

  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startRecordingMutation = useMutation({
    mutationFn: async () => {
      if (!currentLecture.title.trim()) {
        throw new Error("Lecture title is required");
      }

      const response = await fetch("http://localhost:5000/api/recordings/start", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lectureTitle: currentLecture.title,
          captureBlackboard: currentLecture.shouldCaptureBlackboard
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.json();
    },
    onSuccess: () => {
      setIsRecordingActive(true);
      toast.success(`Recording started: ${currentLecture.title}`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to start recording: ${error.message}`);
    }
  });

  const stopRecordingMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:5000/api/recordings/stop", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lectureTitle: currentLecture.title,
          duration: currentLecture.durationInSeconds
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unexpected error");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setIsRecordingActive(false);
      setCurrentLecture(prev => ({ ...prev, durationInSeconds: 0 }));
      setStaffStatistics(prev => ({
        ...prev,
        recordedLectures: prev.recordedLectures + 1
      }));
      toast.success(`Recording saved (${formatRecordingTime(currentLecture.durationInSeconds)})`);
      console.log("Recording stopped, summary file:", data.summary_file);
    },
    onError: (error: Error) => {
      toast.error(`Failed to stop recording: ${error.message}`);
    },
    onSettled: () => {
      setIsRecordingActive(false);
    }
  });

  const handleStartRecording = () => {
    if (!backendConnection.isConnected) {
      toast.error("Cannot start recording: Backend service unavailable");
      return;
    }
    startRecordingMutation.mutate();
  };

  const handleStopRecording = () => {
    stopRecordingMutation.mutate();
  };

  return (
    <DashboardLayout title="Staff Dashboard">
      <div className="space-y-6">
        <Card className={`border-2 ${isRecordingActive ? "border-red-500" : "border-transparent"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isRecordingActive ? (
                <Mic className="h-5 w-5 text-red-500" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
              {isRecordingActive ? "Active Lecture Recording" : "New Lecture Recording"}
            </CardTitle>
            <CardDescription>
              {isRecordingActive
                ? `Recording: ${currentLecture.title} (${formatRecordingTime(currentLecture.durationInSeconds)})`
                : "Record lectures to generate automated materials"}
              {!backendConnection.isConnected && (
                <span className="text-red-500 ml-2">({backendConnection.statusMessage})</span>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Input
                value={currentLecture.title}
                onChange={(e) => setCurrentLecture({ ...currentLecture, title: e.target.value })}
                placeholder="Enter lecture title"
                disabled={isRecordingActive || stopRecordingMutation.isPending}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-gray-600" />
                <span className="text-sm">Enable blackboard capture</span>
              </div>
              <Switch
                checked={currentLecture.shouldCaptureBlackboard}
                onCheckedChange={(checked) =>
                  setCurrentLecture({ ...currentLecture, shouldCaptureBlackboard: checked })
                }
                disabled={isRecordingActive || stopRecordingMutation.isPending}
              />
            </div>

            {isRecordingActive && (
              <div className="p-3 bg-red-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="font-medium">Recording: {formatRecordingTime(currentLecture.durationInSeconds)}</span>
                </div>
                <span className="text-sm text-gray-600">{currentLecture.title}</span>
              </div>
            )}
          </CardContent>

          <CardFooter>
            {!isRecordingActive ? (
              <Button
                className="w-full bg-[#800000] hover:bg-[#6a0000] text-white transition-colors duration-200"
                onClick={handleStartRecording}
                disabled={startRecordingMutation.isPending || !backendConnection.isConnected}
              >
                <Mic className="mr-2 h-4 w-4" />
                {startRecordingMutation.isPending ? "Starting..." : "Start Recording"}
              </Button>
            ) : (
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={handleStopRecording}
                disabled={stopRecordingMutation.isPending}
              >
                <MicOff className="mr-2 h-4 w-4" />
                {stopRecordingMutation.isPending ? "Stopping..." : "Stop Recording"}
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={<BookOpen className="h-5 w-5 text-blue-600" />}
            title="Recorded Lectures"
            value={staffStatistics.recordedLectures}
            description="+4 this week"
          />
          <StatCard
            icon={<FileText className="h-5 w-5 text-green-600" />}
            title="Generated Quizzes"
            value={staffStatistics.generatedQuizzes}
            description="+3 this week"
          />
          <StatCard
            icon={<Calendar className="h-5 w-5 text-purple-600" />}
            title="Pending Assignments"
            value={staffStatistics.pendingAssignments}
            description="Due: Tomorrow"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ icon, title, value, description }: {
  icon: React.ReactNode;
  title: string;
  value: number;
  description: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default StaffDashboard;
