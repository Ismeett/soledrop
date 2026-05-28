import { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";
import ProductTable from "./components/ProductTable";
const API_URL = "https://6a15106c91ff9a63de07634e.mockapi.io/api/products";

export function getStatus(stock) {
  if (stock === 0) return "Out of Stock";
  if (stock < 5) return "Low Stock";
  return "In Stock";
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // POST — add new product
  const handleAdd = (newProduct) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((saved) => setProducts([...products, saved]))
      .catch((err) => setError(err.message));
  };

  // DELETE — remove product
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setProducts(products.filter((p) => p.id !== id)))
      .catch((err) => setError(err.message));
  };

  // PUT — update product
  const handleEdit = (updatedProduct) => {
    fetch(`${API_URL}/${updatedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((saved) =>
        setProducts(products.map((p) => (p.id === saved.id ? saved : p))),
      )
      .catch((err) => setError(err.message));
  };

  // filter products for display
  const filtered = products
    .filter((p) => category === "All" || p.category === category)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const inputClass =
    "bg-[#141414] border border-[#333] rounded-lg px-3 py-2 text-[#f5f5f5] text-sm focus:outline-none focus:border-[#FF6B00]";

  // Loading state
  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">👟</div>
          <p className="text-[#666]">Loading inventory...</p>
        </div>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-2">⚠️ {error}</p>
          <p className="text-[#666] text-md">
            Make sure json-server is running on port 3001
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] p-8">
      <div className="font-bold mb-1 text-center">
        <h1 className="text-5xl">SoleDrop 👟</h1>
        <p className="text-[#666] my-5 text-2xl">Inventory Manager</p>
      </div>
      <ProductForm onAdd={handleAdd} />
      <div className="flex gap-3 mb-4">
        <input
          className={`${inputClass} flex-1`}
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={inputClass}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Sneakers</option>
          <option>Hoodies</option>
          <option>Tees</option>
          <option>Accessories</option>
        </select>
      </div>
      <p className="text-[#666] text-md mb-3">
        Showing {filtered.length} of {products.length} products
      </p>
      <ProductTable
        products={filtered}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
