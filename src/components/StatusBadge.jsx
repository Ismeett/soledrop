import { getStatus } from "../App";

export default function StatusBadge({ stock }) {
  const status = getStatus(stock);
  const styles = {
    "In Stock": "bg-[#0f2a0f] text-[#4ade80]",
    "Low Stock": "bg-[#2a1a00] text-[#FF8C33]",
    "Out of Stock": "bg-[#2a0f0f] text-[#f87171]",
  };
  return (
    <span
      className={`px-5 py-1 rounded-full text-md font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
