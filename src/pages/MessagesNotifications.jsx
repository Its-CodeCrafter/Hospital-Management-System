import { useMemo, useState } from "react";
import MessageModal from "../components/MessageModal";

const DATA = [
  {
    id: "MSG-101",
    type: "Message",
    title: "Appointment Query",
    sender: "Ramesh Kumar",
    content: "Doctor, I want to reschedule my appointment.",
    status: "Unread",
    date: "15/10/2023",
  },
  {
    id: "NOT-208",
    type: "Notification",
    title: "Payment Received",
    sender: "System",
    content: "₹500 payment received for OPD-234.",
    status: "Read",
    date: "14/10/2023",
  },
  {
    id: "MSG-112",
    type: "Message",
    title: "Prescription Doubt",
    sender: "Neha Singh",
    content: "Can I take medicine after dinner?",
    status: "Unread",
    date: "14/10/2023",
  },
];

const ITEMS_PER_PAGE = 5;

export default function MessagesNotifications() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return DATA.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.sender.toLowerCase().includes(search.toLowerCase());

      const matchType = type ? item.type === type : true;
      const matchStatus = status ? item.status === status : true;

      return matchSearch && matchType && matchStatus;
    });
  }, [search, type, status]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100">
      {/* Header & Filters */}
      <div className="px-6 py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <h2 className="text-lg font-semibold">
          Messages & Notifications
        </h2>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Types</option>
            <option value="Message">Messages</option>
            <option value="Notification">Notifications</option>
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Status</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
          </select>
        </div>
      </div>

      {/* Table */}
  {/* Messages / Notifications */}
<div className="overflow-x-auto">

  {/* Desktop & Tablet Table */}
  <div className="hidden md:block">
    <table className="w-full text-sm">
      <thead className="bg-green-700 text-white">
        <tr>
          <th className="px-6 py-3 text-left">Type</th>
          <th className="px-6 py-3 text-left">Title</th>
          <th className="px-6 py-3 text-left">From</th>
          <th className="px-6 py-3 text-left">Status</th>
          <th className="px-6 py-3 text-left">Date</th>
        </tr>
      </thead>

      <tbody>
        {paginated.length > 0 ? (
          paginated.map((item) => (
            <tr
              key={item.id}
              onClick={() => setSelected(item)}
              className={`cursor-pointer hover:bg-green-50 ${
                item.status === "Unread" ? "font-semibold" : ""
              }`}
            >
              <td className="px-6 py-4">{item.type}</td>
              <td className="px-6 py-4">{item.title}</td>
              <td className="px-6 py-4">{item.sender}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.status === "Unread"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4">{item.date}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center py-6 text-gray-500">
              No messages or notifications found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Mobile Card View */}
  <div className="md:hidden divide-y">
    {paginated.length > 0 ? (
      paginated.map((item) => (
        <div
          key={item.id}
          onClick={() => setSelected(item)}
          className={`p-4 space-y-2 cursor-pointer hover:bg-green-50 ${
            item.status === "Unread" ? "font-semibold" : ""
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{item.type}</span>
            <span className="text-xs text-gray-500">{item.date}</span>
          </div>

          <p className="text-sm">{item.title}</p>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>From: {item.sender}</span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                item.status === "Unread"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-6 text-gray-500">
        No messages or notifications found
      </div>
    )}
  </div>

</div>


      {/* Pagination */}
      <div className="px-6 py-4 flex justify-between items-center text-sm">
        <span>
          Page {page} of {totalPages || 1}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <MessageModal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
