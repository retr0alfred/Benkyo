import { useEffect, useState, useMemo } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, Calendar, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

type BlackboardImage = {
  id: string;
  url: string;
  timestamp: string;
  recordingId: string;
  noteId: string;
};

type Note = {
  id: string;
  title: string;
  date: string;
  content: string;
  course?: string;
  blackboardImages: BlackboardImage[];
};

const formatDisplayDate = (apiTimestamp: string) => {
  if (!apiTimestamp) return "No date available";
  
  try {
    if (/^\d{8}_\d{6}$/.test(apiTimestamp)) {
      const year = apiTimestamp.substring(0, 4);
      const month = apiTimestamp.substring(4, 6);
      const day = apiTimestamp.substring(6, 8);
      const hours = apiTimestamp.substring(9, 11);
      const minutes = apiTimestamp.substring(11, 13);
      
      const date = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );
      
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
    }
    return "Invalid date format";
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

const getTitleFromContent = (content: string) => {
  const clean = content?.trim().split(".")[0] || "Class Note";
  return clean.length > 60 ? clean.slice(0, 60) + "..." : clean;
};

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Memoize filtered notes to prevent unnecessary recalculations
  const filteredNotes = useMemo(() => {
    return notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.course || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:5000/api/transcriptions");
        const data = res.data;

        const formattedNotes = data.map((item: any, index: number) => {
          // Generate consistent image paths
          const generateImagePaths = (timestamp: string, count: number = 5) => {
            if (!timestamp) return [];
            const baseDate = timestamp.substring(0, 8);
            const baseTime = timestamp.substring(9, 15);
            
            return Array.from({ length: count }, (_, i) => ({
              id: `img${i}`,
              url: `/images/blackboard_${baseDate}-${baseTime}.jpg`, // Single image per note
              timestamp,
              recordingId: timestamp,
              noteId: timestamp || `${index}`
            }));
          };

          return {
            id: item.timestamp || `${index}`,
            title: getTitleFromContent(item.corrected_summary || item.summary),
            date: item.timestamp,
            content: item.corrected_summary || item.summary,
            course: item.course || "",
            blackboardImages: generateImagePaths(item.timestamp, item.images?.length || 1)
          };
        });

        setNotes(formattedNotes);
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const renderNotes = useMemo(() => {
    return (notesList: Note[]) => notesList.map(note => (
      <Card key={note.id} className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-medium">{note.title}</CardTitle>
              <CardDescription>
                {formatDisplayDate(note.date)}
              </CardDescription>
            </div>
            {note.course && (
              <Badge variant="secondary" className="ml-2">
                {note.course}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 whitespace-pre-line">
            {note.content}
          </p>

          {note.blackboardImages.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <p className="text-sm font-medium">Blackboard Images</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {note.blackboardImages.map(image => (
                  <div
                    key={image.id}
                    className="relative group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      //src={image.url}
                      alt=""
                      className="w-full h-40 object-contain bg-gray-100"
                      loading="lazy" // Lazy load images
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-image.png';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-white text-xs truncate">
                        {formatDisplayDate(image.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Generate Flashcards
            </Button>
            <Button size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              View Full Notes
            </Button>
          </div>
        </CardContent>
      </Card>
    ));
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout title="Class Notes">
        <div className="flex justify-center items-center h-64">
          <p>Loading notes...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Class Notes">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              placeholder="Search notes by title, content or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Notes</TabsTrigger>
            <TabsTrigger value="os">Operating Systems</TabsTrigger>
            <TabsTrigger value="dbms">Database Systems</TabsTrigger>
            <TabsTrigger value="ml">Machine Learning</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredNotes.length > 0 ? (
              renderNotes(filteredNotes)
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No notes found matching your search.</p>
              </div>
            )}
          </TabsContent>

          {['os', 'dbms', 'ml'].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-6">
              {renderNotes(
                filteredNotes.filter(note => 
                  note.course?.toLowerCase().includes(tab === 'os' ? 'operating' : 
                    tab === 'dbms' ? 'database' : 'machine')
                )
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notes;