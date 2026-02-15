const statusStyles = {
  Accepted: "bg-emerald-100 text-emerald-700",
  Declined: "bg-red-100 text-red-700",
  Discharged: "bg-gray-100 text-gray-700",
  Read: "bg-emerald-100 text-emerald-700",
  Sent: "bg-blue-100 text-blue-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
