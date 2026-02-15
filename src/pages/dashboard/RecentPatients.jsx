import { useContext, useEffect, useMemo } from "react";
import StatusBadge from "./StatusBadge";
import { PatientContext } from "../../context/PatientContext";

const RecentPatients = () => {
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

  return (
    <div className="rounded-xl">
      <h3 className="p-4 font-semibold text-gray-800">Recent Patients</h3>

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-3 px-4 pb-4">
        {formattedPatients?.length > 0 &&
          formattedPatients.map((p, i) => {
            console.log(p);
            return (
              <div key={i} className="border rounded-xl p-4 shadow-sm bg-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{p.name}</span>
                  <StatusBadge status={p.status || "Visited"} />
                </div>

                <p className="text-xs text-gray-500">{p.id}</p>

                <div className="mt-2 grid grid-cols-2 gap-y-1 text-sm">
                  <span className="text-gray-500">Date</span>
                  <span>{p.lastVisit}</span>

                  <span className="text-gray-500">Gender</span>
                  <span>{p.gender}</span>

                  <span className="text-gray-500">Disease</span>
                  <span>{p.disease}</span>
                </div>
              </div>
            );
          })}
      </div>

      {/* ================= TABLET & DESKTOP VIEW ================= */}
      <div className="hidden md:block overflow-x-auto rounded-xl">
        <div className="w-full text-sm border rounded-xl border-gray-100 shadow-xl border-t-0 overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3">Visit Id</th>
                <th className="p-3">Date</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Disease</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {formattedPatients?.length > 0 &&
                formattedPatients.map((p, i) => (
                  <tr key={i} className="text-center hover:bg-emerald-50">
                    <td className="p-3 text-left">{p.name}</td>
                    <td>{p.id}</td>
                    <td>{p.lastVisit}</td>
                    <td>{p.gender}</td>
                    <td>{p.disease}</td>
                    <td>
                      <StatusBadge status={p.status || "Accepted"} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentPatients;
