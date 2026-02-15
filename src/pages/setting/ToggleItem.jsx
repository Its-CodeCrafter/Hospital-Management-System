export default function ToggleItem({ item, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">
          {item.label}
        </p>
        <p className="text-xs text-gray-500">
          {item.desc}
        </p>
      </div>

      <button
        onClick={onChange}
        className={`w-11 h-6 flex items-center cursor-pointer rounded-full p-1 transition ${
          checked ? "bg-green-800"  : "bg-gray-300"
        }`}
      >
        <span
          className={`bg-white w-4 h-4 rounded-full transform transition ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
