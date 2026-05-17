import { useNavigate } from "react-router-dom";
import { Category } from "../../interfaces/note";

interface SidebarProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: Category[] = ["Work", "Study", "Personal", "Ideas", "Shopping"];
const categoryIcons: Record<Category, string> = {
  All: "📄",
  Work: "💼",
  Study: "📚",
  Personal: "👤",
  Ideas: "💡",
  Shopping: "🛒",
};

export default function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_email");
    navigate("/login");
  };

  const handleAllNotes = () => {
    navigate("/all-notes");
  };

  return (
    <div className="w-full h-full bg-[#efe7d6] p-6 flex flex-col">
      {/* Logo */}
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
        NotesApp
      </h1>

      {/* New Note Button */}
      <button
        onClick={() =>
          document.getElementById("create")?.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
          })
        }
        className="bg-black text-white w-full py-4 rounded-xl mb-8 hover:bg-gray-800 transition transform hover:scale-[1.02] active:scale-95"
      >
        ✨ + New Note
      </button>

      {/* All Notes Section */}
      <div className="mb-4">
        <button
          onClick={handleAllNotes}
          className="w-full text-left px-4 py-3 rounded-xl transition hover:bg-[#e8cf9e] flex items-center gap-3"
        >
          <span className="text-xl">📄</span>
          <span className="font-medium">All Notes</span>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-4"></div>

      {/* Categories Header */}
      <h2 className="text-xs font-semibold mb-4 text-gray-500 uppercase tracking-wider px-4">
        Categories
      </h2>

      {/* Categories List - No Scroll */}
      <div className="space-y-2 flex-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`w-full text-left px-4 py-3 rounded-xl transition flex items-center gap-3 ${
              activeCategory === cat 
                ? "bg-black text-white shadow-lg" 
                : "hover:bg-[#e8cf9e] text-gray-700"
            }`}
          >
            <span className="text-xl">{categoryIcons[cat]}</span>
            <span className="font-medium">{cat}</span>
            {activeCategory === cat && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Logout Button - Footer Level */}
      <div className="pt-4 mt-auto">
        <button
          onClick={handleLogout}
          className="bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 w-full"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}