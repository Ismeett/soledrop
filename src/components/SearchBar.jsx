export default function SearchBar({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}) {
  const inputClass =
    "bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-md focus:outline-none focus:border-yellow-400";

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
