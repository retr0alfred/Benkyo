import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mic, MicOff, Search, Play, Camera, ChevronDown, ChevronUp, FileText, Edit, Trash } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { ClassRecording } from "@/components/types";

const Recordings = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [captureBlackboard, setCaptureBlackboard] = useState(true);
  const [recordingTitle, setRecordingTitle] = useState("");
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [showNewRecordingDialog, setShowNewRecordingDialog] = useState(false);
  const [expandedRecording, setExpandedRecording] = useState<string | null>(null);

  // Updated mock data for recordings
  const [recordings, setRecordings] = useState<ClassRecording[]>([
    {
      id: "rec1",
      title: "Operating Systems - Process Scheduling",
      date: "2025-04-08",
      duration: "45:32",
      status: "completed",
      transcriptionStatus: "completed",
      staffId: user?.id || "",
      staffName: user?.name || "",
      captureBlackboard: true,
      audioUrl: "#",
      transcriptionUrl: "#",
    },
    {
      id: "rec2",
      title: "DBMS - Normalization and Relational Models",
      date: "2025-04-07",
      duration: "50:15",
      status: "completed",
      transcriptionStatus: "completed",
      staffId: user?.id || "",
      staffName: user?.name || "",
      captureBlackboard: false,
    },
    {
      id: "rec3",
      title: "Machine Learning - K-Means Clustering",
      date: "2025-04-06",
      duration: "55:21",
      status: "completed",
      transcriptionStatus: "processing",
      staffId: user?.id || "",
      staffName: user?.name || "",
      captureBlackboard: true,
    },
    {
      id: "rec4",
      title: "Data Structures - Binary Search Trees",
      date: "2025-04-05",
      duration: "48:45",
      status: "completed",
      transcriptionStatus: "completed",
      staffId: user?.id || "",
      staffName: user?.name || "",
      captureBlackboard: true,
      audioUrl: "#",
      transcriptionUrl: "#",
    },
  ]);

  const filteredRecordings = recordings.filter(
    (recording) => recording.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartRecording = () => {
    if (!recordingTitle.trim()) {
      toast.error("Please enter a title for the recording");
      return;
    }

    setIsRecording(true);
    setShowNewRecordingDialog(false);

    // Mock recording timer
    const intervalId = setInterval(() => {
      setRecordingDuration((prev) => prev + 1);
    }, 1000);

    // Store the interval ID for cleanup
    localStorage.setItem("recordingIntervalId", intervalId.toString());

    toast.success(`Recording started: ${recordingTitle}`);
  };

  const handleStopRecording = () => {
    setIsRecording(false);

    // Clear the timer
    const intervalId = localStorage.getItem("recordingIntervalId");
    if (intervalId) {
      clearInterval(parseInt(intervalId));
      localStorage.removeItem("recordingIntervalId");
    }

    // Create a new recording
    const newRecording: ClassRecording = {
      id: `rec${recordings.length + 1}`,
      title: recordingTitle,
      date: format(new Date(), "yyyy-MM-dd"),
      duration: formatDuration(recordingDuration),
      status: "processing",
      transcriptionStatus: "pending",
      staffId: user?.id || "",
      staffName: user?.name || "",
      captureBlackboard,
    };

    setRecordings([newRecording, ...recordings]);
    setRecordingDuration(0);
    setRecordingTitle("");

    toast.success("Recording stopped and being processed");
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleExpandRecording = (id: string) => {
    if (expandedRecording === id) {
      setExpandedRecording(null);
    } else {
      setExpandedRecording(id);
    }
  };

  const handleDeleteRecording = (id: string) => {
    setRecordings(recordings.filter((recording) => recording.id !== id));
    toast.success("Recording deleted successfully");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "recording":
        return <Badge className="bg-red-500">Recording</Badge>;
      case "processing":
        return <Badge className="bg-pastel-yellow text-primary-foreground">Processing</Badge>;
      case "completed":
        return <Badge className="bg-pastel-green text-primary-foreground">Completed</Badge>;
      case "error":
        return <Badge className="bg-destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTranscriptionStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "processing":
        return <Badge className="bg-pastel-yellow text-primary-foreground">Processing</Badge>;
      case "completed":
        return <Badge className="bg-pastel-green text-primary-foreground">Completed</Badge>;
      case "error":
        return <Badge className="bg-destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout title="Class Recordings">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search recordings by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-pastel"
            />
          </div>

          {isRecording ? (
            <Button
              onClick={handleStopRecording}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              <MicOff className="mr-2 h-5 w-5" />
              Stop Recording ({formatDuration(recordingDuration)})
            </Button>
          ) : (
            <Button
              onClick={() => setShowNewRecordingDialog(true)}
              className="bg-pastel-blue hover:bg-pastel-blue/80 text-primary-foreground"
            >
              <Mic className="mr-2 h-5 w-5" />
              Start New Recording
            </Button>
          )}
        </div>

        {/* Recording List */}
        <div className="space-y-4">
          {filteredRecordings.length > 0 ? (
            filteredRecordings.map((recording) => (
              <Card key={recording.id} className="card-pastel border-pastel-blue">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{recording.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(recording.status)}
                      {recording.captureBlackboard && (
                        <Badge variant="outline" className="flex items-center">
                          <Camera className="h-3 w-3 mr-1" />
                          Blackboard Capture
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>
                    Recorded on {new Date(recording.date).toLocaleDateString()} • Duration: {recording.duration}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                        disabled={recording.status === "processing"}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Play
                      </Button>
                      <div className="text-sm">
                        Transcription: {getTranscriptionStatusBadge(recording.transcriptionStatus)}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpandRecording(recording.id)}
                    >
                      {expandedRecording === recording.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>

                {expandedRecording === recording.id && (
                  <CardContent className="pt-0 border-t mt-2">
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Recording Details</h4>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteRecording(recording.id)}
                          >
                            <Trash className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p>
                            <span className="font-medium">Recorded by:</span> {recording.staffName}
                          </p>
                          <p>
                            <span className="font-medium">Created on:</span>{" "}
                            {new Date(recording.date).toLocaleDateString()}
                          </p>
                          <p>
                            <span className="font-medium">Status:</span> {recording.status}
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-medium">Duration:</span> {recording.duration}
                          </p>
                          <p>
                            <span className="font-medium">Blackboard Capture:</span>{" "}
                            {recording.captureBlackboard ? "Enabled" : "Disabled"}
                          </p>
                          <p>
                            <span className="font-medium">Transcription Status:</span>{" "}
                            {recording.transcriptionStatus}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        {recording.transcriptionStatus === "completed" && (
                          <Button
                            size="sm"
                            className="bg-pastel-green hover:bg-pastel-green/80 text-primary-foreground"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            View Transcript
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className="bg-pastel-blue hover:bg-pastel-blue/80 text-primary-foreground"
                        >
                          Generate Notes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No recordings found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* New Recording Dialog */}
      <Dialog open={showNewRecordingDialog} onOpenChange={setShowNewRecordingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start New Recording</DialogTitle>
            <DialogDescription>
              Set up your class recording. The system will automatically record audio and transcribe it.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Recording Title</Label>
              <Input
                id="title"
                placeholder="e.g., Operating Systems - Process Scheduling"
                value={recordingTitle}
                onChange={(e) => setRecordingTitle(e.target.value)}
                className="input-pastel"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="blackboard-capture"
                checked={captureBlackboard}
                onCheckedChange={setCaptureBlackboard}
              />
              <Label htmlFor="blackboard-capture">Enable blackboard capture every 10 minutes</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewRecordingDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleStartRecording}
              className="bg-pastel-blue hover:bg-pastel-blue/80 text-primary-foreground"
            >
              <Mic className="mr-2 h-4 w-4" />
              Start Recording
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Recordings;