import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function EditCard({ product, onSave, onCancel }) {
  const [form, setForm] = useState({ ...product });
  const [preview, setPreview] = useState(product.image || null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm({ ...form, image: url });
    setPreview(url);
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.stock) return;
    onSave({
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    });
  };

  const inputClass =
    "w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-yellow-400";

  return (
    <div className="bg-gray-900 border border-yellow-400 rounded-2xl overflow-hidden flex flex-col">
      <div className="w-full h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl">👟</span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2">
        <input
          className={inputClass}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <select
          className={inputClass}
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option>Sneakers</option>
          <option>Hoodies</option>
          <option>Tees</option>
          <option>Accessories</option>
        </select>
        <div className="flex gap-2">
          <input
            className={inputClass}
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            min="0"
            step="0.01"
          />
          <input
            className={inputClass}
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            min="0"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600 cursor-pointer"
        />
        <StatusBadge stock={parseInt(form.stock) || 0} />
        <div className="flex gap-2 mt-1">
          <button
            onClick={handleSave}
            className="flex-1 bg-yellow-400 text-black text-xs font-semibold py-2 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-700 text-gray-300 text-xs font-semibold py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
