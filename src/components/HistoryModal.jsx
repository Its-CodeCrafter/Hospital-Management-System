export default function HistoryModal({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-green-700">
            Visit History Details
          </h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3 text-sm">
          <Detail label="Visit ID" value={data.visitId} />
          <Detail label="Patient" value={data.patientName} />
          <Detail label="Age" value={data.age} />
          <Detail label="Gender" value={data.gender} />
          <Detail label="Disease" value={data.disease} />
          <Detail label="Doctor" value={data.doctor} />
          <Detail label="Visit Type" value={data.visitType} />
          <Detail label="Date" value={data.date} />
          <Detail label="Prescription" value={data.prescription} />
          <Detail label="Notes" value={data.notes} />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
