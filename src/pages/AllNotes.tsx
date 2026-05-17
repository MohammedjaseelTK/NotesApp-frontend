import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Note } from "../interfaces/note";

export default function AllNotes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await api.get("notes/");
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: number) => {
    if (confirm("Delete this note?")) {
      try {
        await api.delete(`notes/${id}/`);
        fetchNotes();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()) ||
      note.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f1e7]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p>Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f1e7] p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 hover:text-black transition flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">📄 All Notes</h1>
          <div className="w-20"></div>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search all notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#efe7d6] px-5 py-4 rounded-full mb-8 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Stats */}
        <div className="mb-4 text-gray-600">
          {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"} found
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 bg-[#efe7d6] rounded-3xl">
            <p className="text-gray-500">No notes found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => navigate(`/edit/${note.id}`)}
                className="bg-[#efe7d6] p-6 rounded-3xl cursor-pointer hover:scale-[1.02] transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm bg-white px-3 py-1 rounded-full">
                    {note.category === "Work" && "💼"}
                    {note.category === "Study" && "📚"}
                    {note.category === "Personal" && "👤"}
                    {note.category === "Ideas" && "💡"}
                    {note.category === "Shopping" && "🛒"} {note.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                <p className="text-gray-700 line-clamp-3">{note.content}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(note.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}