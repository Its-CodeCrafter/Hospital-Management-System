import StatusBadge from "./StatusBadge";

const messages = [
  {
    name: "Naina",
    date: "Mon, 12 Sep 2023",
    status: "Read",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    name: "Sahil",
    date: "Mon, 12 Sep 2023",
    status: "Sent",
    avatar: "https://i.pravatar.cc/40?img=6",
  },
  {
    name: "Sakshi",
    date: "Mon, 12 Sep 2023",
    status: "Read",
    avatar: "https://i.pravatar.cc/40?img=7",
  },
  {
    name: "Parul",
    date: "Mon, 12 Sep 2023",
    status: "Sent",
    avatar: "https://i.pravatar.cc/40?img=8",
  },
];

const Messages = () => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h3 className="font-semibold text-gray-800">Messages</h3>
        <button className="text-sm text-emerald-600 hover:underline">
          View all
        </button>
      </div>

      {/* List */}
      <div className="">
        {messages.map((m, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
          >
            {/* Avatar */}
            <img
              src={m.avatar}
              alt={m.name}
              className="h-10 w-10 rounded-full object-cover"
            />

            {/* Name + Date */}
            <div className="flex-1">
              <p className="font-medium text-gray-800">{m.name}</p>
              <p className="text-xs text-gray-400">{m.date}</p>
            </div>

            {/* Status */}
            <StatusBadge status={m.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
