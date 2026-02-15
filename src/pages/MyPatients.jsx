import { useContext, useEffect, useMemo, useState } from "react";
import PatientModal from "../components/PatientModal";
import { PatientContext } from "../context/PatientContext";

const ITEMS_PER_PAGE = 10;

export default function MyPatients() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const { patients, loadPatients } = useContext(PatientContext);

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
      }))
    );
  }, [patients]);
  
  const filtered = useMemo(() => {
    return (
      formattedPatients?.length > 0 &&
      formattedPatients.filter((p) => {
        const matchSearch =
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.id?.toLowerCase().includes(search.toLowerCase()) ||
          p.disease?.toLowerCase().includes(search.toLowerCase());

        const matchGender = gender
          ? p.gender?.toLowerCase() === gender.toLowerCase()
          : true;

        return matchSearch && matchGender;
      })
    );
  }, [formattedPatients, search, gender]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated =
    filtered?.length > 0 &&
    filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100">
      {/* Header + Filters */}
      <div className="px-6 py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <h2 className="text-lg font-semibold">My Patients</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search patient..."
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
        </div>
      </div>

      {/* Table */}
      {/* Patients List */}
      <div className="overflow-x-auto">
        {/* Desktop / Tablet Table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Patient ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Age</th>
                <th className="px-6 py-3 text-left">Gender</th>
                <th className="px-6 py-3 text-left">Disease</th>
                <th className="px-6 py-3 text-left">Last Visit</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length > 0 ? (
                paginated.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="hover:bg-green-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium">{p.id}</td>
                    <td className="px-6 py-4">{p.name}</td>
                    <td className="px-6 py-4">{p.age}</td>
                    <td className="px-6 py-4">{p.gender}</td>
                    <td className="px-6 py-4">{p.disease}</td>
                    <td className="px-6 py-4">{p.lastVisit}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No patients found
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
                key={p.id}
                onClick={() => setSelected(p)}
                className="p-4 space-y-2 cursor-pointer hover:bg-green-50"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-xs text-gray-500">{p.lastVisit}</span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>ID:</strong> {p.id}
                  </p>
                  <p>
                    <strong>Age:</strong> {p.age}
                  </p>
                  <p>
                    <strong>Gender:</strong> {p.gender}
                  </p>
                  <p>
                    <strong>Disease:</strong> {p.disease}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No patients found
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
        <PatientModal data={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
