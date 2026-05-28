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
    "w-full bg-[#1e1e1e] border border-[#333] rounded-lg px-3 py-2 text-[#f5f5f5] text-md focus:outline-none focus:border-[#FF6B00]";

  return (
    <div className="bg-[#141414] border border-[#FF6B00] rounded-2xl overflow-hidden flex flex-col">
      <div className="w-full h-48 bg-[#1e1e1e] flex items-center justify-center overflow-hidden">
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
          className="text-md text-[#666] file:bg-[#1e1e1e] file:text-[#f5f5f5] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 hover:file:bg-[#2a2a2a] cursor-pointer"
        />
        <StatusBadge stock={parseInt(form.stock) || 0} />
        <div className="flex gap-2 mt-1">
          <button
            onClick={handleSave}
            className="flex-1 bg-[#FF6B00] text-white text-md font-semibold py-2 rounded-lg hover:bg-[#FF8C33] transition-colors"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-[#1e1e1e] text-[#666] text-md font-semibold py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
