import StatusBadge from "./StatusBadge";


export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col hover:border-gray-600 transition-colors">
      {/* Product image */}
      <div className="w-full h-96 bg-gray-800 flex items-center justify-center overflow-hidden">
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
          <h3 className="font-semibold text-white text-xl leading-tight">
            {product.name}
          </h3>
          <StatusBadge stock={product.stock} />
        </div>
        <p className="text-md text-gray-400">{product.category}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-white font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-gray-400 text-md">Qty: {product.stock}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={onEdit}
            className="flex-1 bg-gray-800 text-yellow-400 text-md font-medium py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-gray-800 text-red-400 text-md font-medium py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
