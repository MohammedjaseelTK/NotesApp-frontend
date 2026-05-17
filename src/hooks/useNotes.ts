import { useState, useEffect } from "react";
import api from "../api/api";
import { Note } from "../interfaces/note";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await api.get("notes/");
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (title: string, content: string, category: string): Promise<void> => {
    try {
      await api.post("notes/", { title, content, category });
      await fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id: number): Promise<void> => {
    try {
      await api.delete(`notes/${id}/`);
      await fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, loading, createNote, deleteNote, fetchNotes };
}