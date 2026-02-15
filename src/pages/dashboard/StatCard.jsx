

const StatCard = ({ icon, value, label }) => {

  return (
    <div className="flex w-[300px] items-center gap-4 rounded-xl border border-white hover:border hover:border-green-300 bg-white p-5 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
