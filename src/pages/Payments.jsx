import { useMemo, useState } from "react";
import PaymentModal from "../components/PaymentModal";

const PAYMENTS = [
  {
    transactionId: "TXN-1001",
    patientName: "Ramesh Kumar",
    amount: 500,
    method: "UPI",
    status: "Success",
    date: "12/10/2023",
    visitId: "OPD-234",
    doctor: "Dr. Sharma",
    notes: "Clinic consultation",
  },
  {
    transactionId: "TXN-1008",
    patientName: "Neha Singh",
    amount: 800,
    method: "Card",
    status: "Success",
    date: "14/10/2023",
    visitId: "VID-119",
    doctor: "Dr. Gupta",
    notes: "Video consultation",
  },
  {
    transactionId: "TXN-1012",
    patientName: "Amit Verma",
    amount: 600,
    method: "Cash",
    status: "Pending",
    date: "13/10/2023",
    visitId: "HOM-087",
    doctor: "Dr. Mehta",
    notes: "Home visit",
  },
];

const ITEMS_PER_PAGE = 5;

export default function Payments() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [method, setMethod] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return PAYMENTS.filter((p) => {
      const matchSearch =
        p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
        p.patientName.toLowerCase().includes(search.toLowerCase()) ||
        p.method.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status ? p.status === status : true;
      const matchMethod = method ? p.method === method : true;

      return matchSearch && matchStatus && matchMethod;
    });
  }, [search, status, method]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100">
      {/* Header & Filters */}
      <div className="px-6 py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <h2 className="text-lg font-semibold">Payments</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Status</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          <select
            value={method}
            onChange={(e) => {
              setMethod(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Methods</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
            <option value="NetBanking">Net Banking</option>
          </select>
        </div>
      </div>

      {/* Table */}
     {/* Payments List */}
<div className="overflow-x-auto">

  {/* Desktop / Tablet Table */}
  <div className="hidden md:block">
    <table className="w-full text-sm">
      <thead className="bg-green-700 text-white">
        <tr>
          <th className="px-6 py-3 text-left">Txn ID</th>
          <th className="px-6 py-3 text-left">Patient</th>
          <th className="px-6 py-3 text-left">Amount (₹)</th>
          <th className="px-6 py-3 text-left">Method</th>
          <th className="px-6 py-3 text-left">Status</th>
          <th className="px-6 py-3 text-left">Date</th>
        </tr>
      </thead>

      <tbody>
        {paginated.length > 0 ? (
          paginated.map((p) => (
            <tr
              key={p.transactionId}
              onClick={() => setSelected(p)}
              className="hover:bg-green-50 cursor-pointer"
            >
              <td className="px-6 py-4 font-medium">
                {p.transactionId}
              </td>
              <td className="px-6 py-4">{p.patientName}</td>
              <td className="px-6 py-4">₹{p.amount}</td>
              <td className="px-6 py-4">{p.method}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    p.status === "Success"
                      ? "bg-green-100 text-green-700"
                      : p.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.status}
                </span>
              </td>
              <td className="px-6 py-4">{p.date}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-6 text-gray-500">
              No transactions found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Mobile Card View */}
  <div className="md:hidden divide-y">
    {paginated.length > 0 ? (
      paginated.map((p) => (
        <div
          key={p.transactionId}
          onClick={() => setSelected(p)}
          className="p-4 space-y-2 cursor-pointer hover:bg-green-50"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              {p.patientName}
            </span>
            <span className="text-xs text-gray-500">
              {p.date}
            </span>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Txn ID:</strong> {p.transactionId}</p>
            <p><strong>Amount:</strong> ₹{p.amount}</p>
            <p><strong>Method:</strong> {p.method}</p>
          </div>

          <div>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                p.status === "Success"
                  ? "bg-green-100 text-green-700"
                  : p.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {p.status}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-6 text-gray-500">
        No transactions found
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
        <PaymentModal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
