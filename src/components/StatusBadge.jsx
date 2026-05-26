import { getStatus } from "../App";

export default function StatusBadge({ stock }) {
  const status = getStatus(stock);
  const styles = {
    "In Stock": "bg-green-900 text-green-300",
    "Low Stock": "bg-yellow-900 text-yellow-300",
    "Out of Stock": "bg-red-900 text-red-300",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
