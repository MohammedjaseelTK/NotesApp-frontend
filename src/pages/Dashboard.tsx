import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sidebar from "../components/layout/sidebar";
import NoteForm from "../components/notes/noteform";
import NoteSearch from "../components/notes/notesearch";
import NoteGrid from "../components/notes/notegrid";
import { useNotes } from "../hooks/useNotes";
import { useSearch } from "../hooks/useSearch";

export default function Dashboard() {
  const navigate = useNavigate();
  const { notes, createNote, deleteNote, loading } = useNotes();
  const { search, setSearch, activeCategory, setActiveCategory, filteredNotes } = useSearch(notes);
  const [greeting, setGreeting] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleCreateNote = async (title: string, content: string, category: string) => {
    await createNote(title, content, category);
  };

  const getCategoryTitle = () => {
    if (activeCategory === "All") return "All Notes";
    return `${activeCategory} Notes`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_email");
    navigate("/login");
  };

  const getInitials = () => {
    if (!username) return "?";
    return username.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f1e7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading your notes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f1e7] flex">
      
      {/* Sidebar - Fixed */}
      <div className="w-72 flex-shrink-0 sticky top-0 h-screen">
        <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto h-screen">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          
          {/* Header with shadcn Profile Dropdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <div>
              <p className="text-gray-500 text-base md:text-lg">{greeting}!</p>
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                {getCategoryTitle()}
              </h1>
              <p className="text-gray-500 text-sm md:text-base mt-1 md:mt-2">
                {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
              </p>
            </div>
            
            {/* shadcn Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 bg-[#efe7d6] hover:bg-[#e8cf9e]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-black text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline font-semibold">{username || "User"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#efe7d6]">
                <DropdownMenuLabel>{username || "User"}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs font-normal text-gray-500">
                  {localStorage.getItem("user_email") || "user@notesapp.com"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/all-notes")} className="cursor-pointer">
                  📄 All Notes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                  📊 Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  🚪 Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <NoteSearch search={search} onSearchChange={setSearch} />

          {/* Create Note Form */}
          <NoteForm onCreate={handleCreateNote} />

          {/* Notes Grid */}
          {filteredNotes.length === 0 && !loading && (
            <div className="text-center py-12 md:py-16 bg-[#efe7d6] rounded-2xl md:rounded-3xl">
              <div className="text-5xl md:text-6xl mb-4">📝</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">No notes yet</h3>
              <p className="text-gray-500 text-sm md:text-base">Create your first note using the form above!</p>
            </div>
          )}
          
          <NoteGrid notes={filteredNotes} onDelete={deleteNote} />
          
          {/* Footer */}
          {filteredNotes.length > 0 && (
            <div className="mt-6 md:mt-8 pt-4 border-t border-gray-300 text-center text-xs md:text-sm text-gray-500">
              💡 Tip: Click on any note to edit it
            </div>
          )}
        </div>
      </div>
    </div>
  );
}