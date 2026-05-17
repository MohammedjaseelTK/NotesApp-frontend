import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Note } from "../../interfaces/note";

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const navigate = useNavigate();

  // Helper to get category icon
  const getCategoryIcon = () => {
    switch (note.category) {
      case "Work": return "💼";
      case "Study": return "📚";
      case "Personal": return "👤";
      case "Ideas": return "💡";
      case "Shopping": return "🛒";
      default: return "📝";
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] bg-[#efe7d6] border-none"
      onClick={() => navigate(`/edit/${note.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className="bg-white text-black">
            {getCategoryIcon()} {note.category}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
          >
            Delete
          </Button>
        </div>
        <CardTitle className="line-clamp-1 text-xl mt-2">{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-3 text-sm">{note.content}</p>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-gray-400">
          {new Date(note.created_at).toLocaleDateString()}
        </span>
      </CardFooter>
    </Card>
  );
}