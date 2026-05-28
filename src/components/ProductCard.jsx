import StatusBadge from "./StatusBadge";

export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-2xl overflow-hidden flex flex-col hover:border-[#FF6B00] transition-colors">
      {/* Product image */}
      <div className="w-full h-96 bg-[#1e1e1e] flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl">👟</span>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[#f5f5f5] text-xl leading-tight">
            {product.name}
          </h3>
          <StatusBadge stock={product.stock} />
        </div>
        <p className="text-md text-[#666]">{product.category}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[#FF6B00] font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[#666] text-md">Qty: {product.stock}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={onEdit}
            className="flex-1 bg-[#1e1e1e] text-[#FF6B00] border border-[#FF6B00] text-md font-medium py-2 rounded-lg hover:bg-[#FF6B00] hover:text-white transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-[#1e1e1e] text-[#666] border border-[#333] text-md font-medium py-2 rounded-lg hover:border-[#f87171] hover:text-[#f87171] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
