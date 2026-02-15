import ToggleItem  from "./ToggleItem"
export default function SettingsSection({
  title,
  description,
  items,
  values,
  onToggle,
}) {
  return (
    <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        {title}
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        {description}
      </p>

      <div className="space-y-4">
        {items?.map((item) => (
          <ToggleItem
            key={item.id}
            item={item}
            checked={values[item.id]}
            onChange={() => onToggle(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
