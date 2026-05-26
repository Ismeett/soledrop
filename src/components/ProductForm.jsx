import { useState } from 'react'

const emptyForm = { name: '', category: 'Sneakers', price: '', stock: '', image: null }

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handles the file input separately
  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setForm({ ...form, image: url })
    setPreview(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.stock) return
    const newProduct = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      image: form.image,
    }
    onAdd(newProduct)
    setForm(emptyForm)
    setPreview(null)
  }

  const inputClass = "w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-md focus:outline-none focus:border-yellow-400"

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-white">Add New Product</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Name</label>
          <input className={inputClass} name="name" value={form.name} onChange={handleChange} placeholder="Nike Air Max 90" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Category</label>
          <select className={inputClass} name="category" value={form.category} onChange={handleChange}>
            <option>Sneakers</option>
            <option>Hoodies</option>
            <option>Tees</option>
            <option>Accessories</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Price ($)</label>
          <input className={inputClass} name="price" type="number" value={form.price} onChange={handleChange} placeholder="99.99" min="0" step="0.01" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Stock (qty)</label>
          <input className={inputClass} name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="10" min="0" />
        </div>
      </div>

      {/* Photo upload row */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-400 mb-1">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full text-md text-gray-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-gray-700 file:text-white file:text-xs hover:file:bg-gray-600 cursor-pointer"
          />
        </div>

        {/* Live preview thumbnail */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-16 h-16 object-cover rounded-lg border border-gray-700"
          />
        )}
      </div>

      <button type="submit" className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition-colors text-sm">
        + Add Product
      </button>
    </form>
  )
}