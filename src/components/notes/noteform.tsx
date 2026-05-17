import { useState } from "react";

interface NoteFormProps {
  onCreate: (title: string, content: string, category: string) => Promise<void>;
}

export default function NoteForm({ onCreate }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Work");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    await onCreate(title, content, category);
    setTitle("");
    setContent("");
    setCategory("Work");
  };

  return (
    <form id="create" className="bg-[#efe7d6] p-4 md:p-6 rounded-2xl md:rounded-3xl mb-6 md:mb-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm md:text-base"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm md:text-base"
        >
          <option value="Work">💼 Work</option>
          <option value="Study">📚 Study</option>
          <option value="Personal">👤 Personal</option>
          <option value="Ideas">💡 Ideas</option>
          <option value="Shopping">🛒 Shopping</option>
        </select>

        <button
          type="submit"
          className="bg-black text-white rounded-xl hover:bg-gray-800 transition py-3 text-sm md:text-base"
        >
          Add Note +
        </button>
      </div>

      <textarea
        placeholder="Write your note content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="w-full p-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm md:text-base"
        required
      />
    </form>
  );
}