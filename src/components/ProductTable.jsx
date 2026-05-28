import { useState } from "react";
import ProductCard from "./ProductCard";
import EditCard from "./EditCard";

export default function ProductTable({ products, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);

  const handleSave = (updatedProduct) => {
    onEdit(updatedProduct);
    setEditingId(null);
  };

  if (products.length === 0)
    return (
      <div className="text-center text-[#666] py-20">No products found.</div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) =>
        editingId === product.id ? (
          <EditCard
            key={product.id}
            product={product}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => setEditingId(product.id)}
            onDelete={() => onDelete(product.id)}
          />
        ),
      )}
    </div>
  );
}
