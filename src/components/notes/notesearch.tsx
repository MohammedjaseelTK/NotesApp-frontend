interface NoteSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function NoteSearch({ search, onSearchChange }: NoteSearchProps) {
  return (
    <input
      type="text"
      placeholder="🔍 Search notes..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      className="bg-[#efe7d6] px-4 md:px-5 py-3 md:py-4 rounded-full w-full md:w-96 lg:w-96 mb-6 md:mb-8 focus:outline-none focus:ring-2 focus:ring-black text-sm md:text-base"
    />
  );
}