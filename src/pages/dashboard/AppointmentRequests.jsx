import StatusBadge from "./StatusBadge";

const requests = [
  {
    name: "Shivam",
    reason: "Regular check up",
    time: "12:30 - 1:30",
    date: "Mon, 12 Sep 2023",
    status: "Declined",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    name: "Shubh",
    reason: "Diabetes",
    time: "11:30 - 12:00",
    date: "Mon, 12 Sep 2023",
    status: "Accepted",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    name: "Abhishek",
    reason: "Regular check up",
    time: "12:30 - 1:30",
    date: "Mon, 12 Sep 2023",
    status: "Declined",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    name: "Sonal",
    reason: "Regular check up",
    time: "17:30 - 18:30",
    date: "Mon, 12 Sep 2023",
    status: "Accepted",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
];

const AppointmentRequests = () => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between  p-4">
        <h3 className="font-semibold text-gray-800">
          Appointment Requests
        </h3>
        <button className="text-sm text-emerald-600 hover:underline">
          View all
        </button>
      </div>

      {/* List */}
      <div className="">
        {requests.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
          >
            {/* Avatar */}
            <img
              src={r.avatar}
              alt={r.name}
              className="h-10 w-10 rounded-full object-cover"
            />

            {/* Name + Date */}
            <div className="flex-1">
              <p className="font-medium text-gray-800">{r.name}</p>
              <p className="text-xs text-gray-400">{r.date}</p>
            </div>

            {/* Reason */}
            <div className="hidden sm:block text-sm text-gray-600">
              {r.reason}
            </div>

            {/* Time */}
            <div className="text-sm text-gray-500">
              {r.time}
            </div>

            {/* Status */}
            <StatusBadge status={r.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentRequests;
