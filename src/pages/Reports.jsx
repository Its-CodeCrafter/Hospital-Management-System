import { useContext, useEffect, useMemo, useState } from "react";
import ReportModal from "../components/ReportModal";
import { useNavigate } from "react-router-dom";
import pdf from "../assets/JA Plus brochure.pdf";
import { PatientContext } from "../context/PatientContext";

const ITEMS_PER_PAGE = 5;

export default function Reports() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { patients, loadPatients, setPatients } = useContext(PatientContext);
  useEffect(() => {
    loadPatients();
  }, [loadPatients]);
  console.log(patients);
  const formattedPatients = useMemo(() => {
    return (
      patients?.length > 0 &&
      patients.map((p) => ({
        id: p._id,
        name: p.name,
        age: p.age,
        gender: p.gender,
        disease: p.disease, // mapping
        lastVisit: new Date(p.date).toLocaleDateString(),
        doctor: p.doctor,
        phone: p.phone,
        address: p.address,
        notes: p.notes,
        status: p.status,
        patientType: p.patientType,
      }))
    );
  }, [patients]);
  const filtered = useMemo(() => {
    return (
      formattedPatients?.length > 0 &&
      formattedPatients?.filter((p) => {
        const matchSearch =
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.id?.toLowerCase().includes(search.toLowerCase()) ||
          p.disease?.toLowerCase().includes(search.toLowerCase());

        const matchStatus = status
          ? p.status?.toLowerCase() === status.toLowerCase()
          : true;
        const matchType = type
          ? p.patientType?.toLowerCase() == type.toLowerCase()
          : true;

        return matchSearch && matchStatus && matchType;
      })
    );
  }, [formattedPatients, search, status, type]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedData =
    filtered?.length > 0 &&
    filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100">
      {/* Header & Filters */}
      <div className="px-6 py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <h2 className="text-lg font-semibold">Reports</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search reports..."
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
            <option value="new">New</option>
            <option value="old">Old</option>
            <option value="follow-up">Follow Up</option>
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
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {/* Reports List */}
      <div className="overflow-x-auto">
        {/* Desktop / Tablet Table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Report ID</th>
                <th className="px-6 py-3 text-left">Patient</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((r) => (
                  <tr
                    key={r.reportId}
                    onClick={() => setSelected(r)}
                    className="hover:bg-green-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium">{r.id}</td>
                    <td className="px-6 py-4">{r.name}</td>
                    <td className="px-6 py-4">{r.patientType}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          r.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{r.lastVisit}</td>
                    <td className="px-6 py-4">
                      {r.fileUrl ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/reports/${r.patientName}`, {
                              state: {
                                pdfUrl: r.fileUrl,
                                reportId: r.reportId,
                                patientName: r.patientName,
                                reportType: r.reportType,
                              },
                            });
                          }}
                          className="text-green-600 underline"
                        >
                          View PDF
                        </button>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No reports found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y">
          {paginatedData.length > 0 ? (
            paginatedData.map((r) => (
              <div
                key={r.reportId}
                onClick={() => setSelected(r)}
                className="p-4 space-y-2 cursor-pointer hover:bg-green-50"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-xs text-gray-500">{r.lastVisit}</span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Report ID:</strong> {r.id}
                  </p>
                  <p>
                    <strong>Type:</strong> {r.patientType}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {r.doctor}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      r.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {r.status}
                  </span>

                  {r.fileUrl ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/reports/${r.name}`, {
                          state: {
                            pdfUrl: r.fileUrl,
                            reportId: r.id,
                            patientName: r.name,
                            reportType: r.patientType,
                          },
                        });
                      }}
                      className="text-green-600 text-sm underline"
                    >
                      View PDF
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">No File</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No reports found
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
        <ReportModal data={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
