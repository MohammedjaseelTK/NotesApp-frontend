import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/api";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Work");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchNote = async () => {
    try {
      const res = await api.get(`notes/${id}/`);
      setTitle(res.data.title || "");
      setContent(res.data.content || "");
      setCategory(res.data.category || "Work");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in title and content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`notes/${id}/`, { title, content, category });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed to save note");
      setSaving(false);
    }
  };

  const deleteNote = async () => {
    if (confirm("Delete this note?")) {
      try {
        await api.delete(`notes/${id}/`);
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        alert("Failed to delete");
      }
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f1e7]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black mx-auto mb-3"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f1e7] p-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <Link to="/dashboard" className="text-gray-600 hover:text-black transition">
            ← Back
          </Link>
          <button
            onClick={deleteNote}
            className="text-red-500 hover:text-red-700 transition text-sm"
          >
            🗑 Delete
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-[#efe7d6] rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-6">Edit Note</h1>

          <input
            className="w-full p-3 mb-4 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <div className="flex gap-3 mb-4">
            {["Work", "Study", "Personal"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl transition ${
                  category === cat
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <textarea
            className="w-full p-3 mb-5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-black"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
          />

          <div className="text-sm text-gray-500 mb-4">
            {content.length} characters • {content.trim().split(/\s+/).filter(Boolean).length} words
          </div>

          <button
            onClick={updateNote}
            disabled={saving}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {saving ? "Saving..." : "💾 Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}