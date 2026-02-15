import { useLocation, useNavigate } from "react-router-dom";

export default function ReportPdfViewer() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.pdfUrl) {
    navigate("/reports");
    return null;
  }

  const { pdfUrl, reportId, patientName, reportType } = state;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-3 flex justify-between items-center shadow">
        <div>
          <h2 className="text-lg font-semibold text-green-700">
            Report PDF
          </h2>
          <p className="text-xs text-gray-500">
            {reportId} • {patientName} • {reportType}
          </p>
        </div>

        <div className="flex gap-2">
          <a
            href={pdfUrl}
            download
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Download
          </a>

          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 border rounded"
          >
            Back
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 bg-gray-100">
        <iframe
          src={pdfUrl}
          title="Report PDF"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
}
