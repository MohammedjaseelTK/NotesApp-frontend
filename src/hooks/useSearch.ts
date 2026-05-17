import { useState, useMemo } from "react";
import { Note, Category } from "../interfaces/note";

export function useSearch(notes: Note[]) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredNotes = useMemo(() => {
    let filtered = notes;

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter((note) => note.category === activeCategory);
    }

    // Filter by search
    if (search) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.content.toLowerCase().includes(search.toLowerCase()) ||
          note.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [notes, search, activeCategory]);

  return {
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    filteredNotes,
  };
}