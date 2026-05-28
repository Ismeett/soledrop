export default function SearchBar({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}) {
  const inputClass =
    "bg-[#141414] border border-[#333] rounded-lg px-3 py-2 text-[#f5f5f5] text-sm focus:outline-none focus:border-[#FF6B00]";
  return (
    <div className="flex gap-3 mb-4">
      <input
        className={`${inputClass} flex-1`}
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className={inputClass}
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option>All</option>
        <option>Sneakers</option>
        <option>Hoodies</option>
        <option>Tees</option>
        <option>Accessories</option>
      </select>
    </div>
  );
}
