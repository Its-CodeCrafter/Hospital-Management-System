
import { FaClipboard, FaHome, FaUser, FaVideo } from "react-icons/fa";
import StatCard from "./dashboard/StatCard";
import OverviewChart from "./dashboard/OverviewChart";
import AppointmentRequests from "./dashboard/AppointmentRequests";
import RecentPatients from "./dashboard/RecentPatients";
import Messages from "./dashboard/Messages";
import Appointments from "./Appointments";
import { useContext, useEffect, useState } from "react";
import { PatientContext } from "../context/PatientContext";

const Dashboard = () => {
  const { patients } = useContext(PatientContext);
  const [pType, setPtype] = useState({
    old: 0,
    nue: 0,
    flp: 0,
    total:patients.length
  });

  useEffect(() => {
    const old = patients.filter((p) => p.patientType == "old");
    const nue = patients.filter((p) => p.patientType == "new");
    const flp = patients.filter((p) => p.patientType == "follow-up");
    setPtype({
      old: old.length,
      nue: nue.length,
      flp: flp.length,
    });
  }, [patients]);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Stats + Chart */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:col-span-2">
          <StatCard icon={<FaHome />} value={pType.old} label="Old Patients" />
          <StatCard
            icon={<FaClipboard />}
            value={pType.nue}
            label="New Patients"
          />
          <StatCard
            icon={<FaUser />}
            value={patients.length}
            label="Total Patients"
          />
          <StatCard
            icon={<FaVideo />}
            value={pType.flp}
            label="Follow-Up Patients"
          />
        </div>

        {/* Chart */}
        <div className="w-full">
          <OverviewChart />
        </div>
      </div>

      {/* Recent Patients */}
      <RecentPatients />

      {/* Requests + Messages */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Appointments />
        </div>
        <Messages />
      </div>
    </div>
  );
};

export default Dashboard;
