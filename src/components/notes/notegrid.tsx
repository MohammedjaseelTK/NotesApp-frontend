import { Note } from "../../interfaces/note";
import NoteCard from "./notecard";

interface NoteGridProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

export default function NoteGrid({ notes, onDelete }: NoteGridProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-[#efe7d6] rounded-2xl md:rounded-3xl">
        📝 No notes found. Create your first note above!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
}