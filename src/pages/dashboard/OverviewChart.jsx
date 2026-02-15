// const OverviewChart = () => {
//   return (
//     <div className="rounded-xl bg-white p-2 px-5 border border-gray-200 shadow-sm">
//       <h3 className="mb-4 font-semibold text-gray-800">
//         Patients Overview
//       </h3>

//       <div className="flex items-center justify-center">
//         <div className="h-32 w-32 rounded-full border-[14px] border-emerald-500 border-t-emerald-200"></div>
//       </div>

//       <div className="mt-4 flex justify-center gap-4 text-sm">
//         <span className="flex items-center gap-2">
//           <span className="h-3 w-3 rounded-full bg-emerald-600" />
//           Male 180
//         </span>
//         <span className="flex items-center gap-2">
//           <span className="h-3 w-3 rounded-full bg-emerald-400" />
//           Female 130
//         </span>
//         <span className="flex items-center gap-2">
//           <span className="h-3 w-3 rounded-full bg-emerald-200" />
//           Child 90
//         </span>
//       </div>
//     </div>
//   );
// };

// export default OverviewChart;



import { useContext, useMemo } from "react";
import { PatientContext } from "../../context/PatientContext";


const OverviewChart = () => {
  const { patients } = useContext(PatientContext);

  const stats = useMemo(() => {
    let male = 0;
    let female = 0;
    let child = 0;

    if (!patients || patients.length === 0) {
      return { male, female, child, total: 0 };
    }

    patients.forEach((p) => {
      if (p.age < 18) {
        child++;
      } else if (p.gender?.toLowerCase() === "male") {
        male++;
      } else if (p.gender?.toLowerCase() === "female") {
        female++;
      }
    });

    return {
      male,
      female,
      child,
      total: patients.length,
    };
  }, [patients]);

  return (
    <div className="rounded-xl bg-white p-2 px-5 border border-gray-200 shadow-sm">
      <h3 className="mb-4 font-semibold text-gray-800">
        Patients Overview
      </h3>

      {/* Donut UI (static visual, dynamic data) */}
      <div className="flex items-center justify-center">
        <div className="h-32 w-32 rounded-full border-[14px] border-emerald-500 border-t-emerald-200" />
      </div>

      {/* Legends */}
      <div className="mt-4 flex justify-center gap-4 text-sm">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-600" />
          Male {stats.male}
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          Female {stats.female}
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-200" />
          Child {stats.child}
        </span>
      </div>
    </div>
  );
};

export default OverviewChart;
