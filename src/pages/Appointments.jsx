import { useState, useMemo, useContext, useEffect } from "react";
import AppointmentModal from "../components/AppointmentModal";
import { PatientContext } from "../context/PatientContext";
import PatientModal from "../components/PatientModal";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ITEMS_PER_PAGE = 5;

export default function Appointments() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { user } = useContext(AuthContext);
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

        const matchGender = gender
          ? p.gender?.toLowerCase() === gender.toLowerCase()
          : true;
        const matchType = type
          ? p.patientType?.toLowerCase() == type.toLowerCase()
          : true;

        return matchSearch && matchGender && matchType;
      })
    );
  }, [formattedPatients, search, gender, type]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedData =
    filtered?.length > 0 &&
    filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleAction = async (id, action) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}/patient/${id}`,
        { status: action },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      // setPatients([])
      loadPatients();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100">
      {/* Header */}
      <div className="px-6 py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <h2 className="text-lg font-semibold">All Appointments</h2>

        {/* Filters */}
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
        </div>
      </div>

      <div className="block md:hidden divide-y">
        {paginatedData?.length > 0 &&
          paginatedData.map((item) => {
            console.log(item);
            return (
              <div
                key={item.id}
                className="p-4 space-y-1 cursor-pointer hover:bg-green-50"
              >
                <div
                  className="flex justify-between"
                  onClick={() => setSelected(item)}
                >
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.id}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {item.disease} • {item.gender}
                </p>
                <p className="text-xs text-gray-500">{item.lastVisit}</p>
                <div>
                  {item.status == "acceptable" && (
                    <div className="px-6 py-4 flex items-center justify-between ">
                      <button
                        className="py-2 px-3 border bg-blue-500 text-white rounded-lg cursor-pointer"
                        onClick={() => handleAction(item.id, "pending")}
                      >
                        Accept
                      </button>
                      <button
                        className="py-2 px-3 border bg-red-500 text-white rounded-lg cursor-pointer"
                        onClick={() => handleAction(item.id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {item.status == "pending" && (
                    <div className="px-6 py-4 flex items-center justify-between">
                      <button
                        className="py-2 px-3 border bg-yellow-200 text-black rounded-lg cursor-pointer"
                        onClick={() => handleAction(item.id, "completed")}
                      >
                        Pending
                      </button>
                      <button
                        className="py-2 px-3 border bg-green-600 text-white rounded-lg cursor-pointer"
                        onClick={() => handleAction(item.id, "completed")}
                      >
                        complete
                      </button>
                    </div>
                  )}
                  {item.status == "completed" && (
                    <button className="py-2 px-3 border bg-green-700 text-white rounded-lg cursor-not-allowed">
                      Completed
                    </button>
                  )}
                  {item.status == "rejected" && (
                    <button className="py-2 px-3 border bg-red-500 text-white rounded-lg cursor-not-allowed">
                      Rejected
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* ===== DESKTOP / TABLET VIEW ===== */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Visit ID</th>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Gender</th>
              <th className="px-6 py-3 text-left">Disease</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData?.length > 0 &&
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-green-50 cursor-pointer">
                  <td
                    className="px-6 py-4 font-medium"
                    onClick={() => setSelected(item)}
                  >
                    {item.id}
                  </td>
                  <td className="px-6 py-4" onClick={() => setSelected(item)}>
                    {item.name}
                  </td>
                  <td className="px-6 py-4" onClick={() => setSelected(item)}>
                    {item.lastVisit}
                  </td>
                  <td className="px-6 py-4" onClick={() => setSelected(item)}>
                    {item.gender}
                  </td>
                  <td className="px-6 py-4" onClick={() => setSelected(item)}>
                    {item.disease}
                  </td>
                  <td>
                    {item.status == "acceptable" && (
                      <div className="px-6 py-4 flex items-center justify-center gap-1">
                        <button
                          className="py-2 px-3 border bg-blue-500 text-white rounded-lg cursor-pointer"
                          onClick={() => handleAction(item.id, "pending")}
                        >
                          Accept
                        </button>
                        <button
                          className="py-2 px-3 border bg-red-500 text-white rounded-lg cursor-pointer"
                          onClick={() => handleAction(item.id, "rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {item.status == "pending" && (
                      <div className="px-6 py-4 flex items-center justify-center gap-1">
                        <button
                          className="py-2 px-3 border bg-yellow-200 text-gray-800 rounded-lg cursor-pointer"
                          onClick={() => handleAction(item.id, "completed")}
                        >
                          Pending
                        </button>
                        <button
                          className="py-2 px-3 border bg-green-200 text-gray-950 rounded-lg cursor-pointer"
                          onClick={() => handleAction(item.id, "completed")}
                        >
                          Complete
                        </button>
                      </div>
                    )}

                    {item.status == "completed" && (
                      <button className="py-2 px-3 border bg-green-100 text-gray-950 rounded-lg cursor-not-allowed">
                        Completed
                      </button>
                    )}
                    {item.status == "rejected" && (
                      <button className="py-2 px-3 border bg-red-500 text-white rounded-lg cursor-not-allowed">
                        Rejected
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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
