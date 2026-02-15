import { useContext, useEffect, useMemo, useState } from "react";
import HistoryModal from "../components/HistoryModal";
import { PatientContext } from "../context/PatientContext";

const ITEMS_PER_PAGE = 5;

export default function History() {
  const { patients, loadPatients } = useContext(PatientContext);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [visitType, setVisitType] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(null);

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
        visitType: p.patientType,
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

        const matchGender = gender
          ? p.gender?.toLowerCase() === gender.toLowerCase()
          : true
        const matchType = type
          ? p.visitType?.toLowerCase() === type.toLowerCase()
          : true;

        return matchSearch && matchGender && matchType;
      })
    );
  }, [formattedPatients, search, gender, type]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedData =
    filtered?.length > 0 &&
    filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100">
      {/* Header & Filters */}
      <div className="px-6 py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <h2 className="text-lg font-semibold">History</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search history..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            value={visitType}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Visit Types</option>
            <option value="new">New</option>
            <option value="old">Old</option>
            <option value="follow-up">Follow Up</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {/* Table */}
      <div className="overflow-x-auto">
        {/* Desktop / Tablet Table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Visit ID</th>
                <th className="px-6 py-3 text-left">Patient</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Gender</th>
                <th className="px-6 py-3 text-left">Disease</th>
                <th className="px-6 py-3 text-left">Visit Type</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((h) => (
                  <tr
                    key={h.visitId}
                    onClick={() => setSelected(h)}
                    className="hover:bg-green-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium">{h.id}</td>
                    <td className="px-6 py-4">{h.name}</td>
                    <td className="px-6 py-4">{h.lastVisit}</td>
                    <td className="px-6 py-4">{h.gender}</td>
                    <td className="px-6 py-4">{h.disease}</td>
                    <td className="px-6 py-4 capitalize">{h.visitType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y">
          {paginatedData?.length > 0 &&
            paginatedData?.map((h) => (
              <div
                key={h.visitId}
                onClick={() => setSelected(h)}
                className="p-4 space-y-2 cursor-pointer hover:bg-green-50"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{h.patientName}</span>
                  <span className="text-xs text-gray-500">{h.date}</span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>ID:</strong> {h.visitId}
                  </p>
                  <p>
                    <strong>Disease:</strong> {h.disease}
                  </p>
                  <p>
                    <strong>Gender:</strong> {h.gender}
                  </p>
                  <p>
                    <strong>Visit:</strong> {h.visitType}
                  </p>
                </div>
              </div>
            ))}
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
        <HistoryModal data={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
