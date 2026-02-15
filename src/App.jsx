import React from "react";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SettingsPage from "./pages/SettingsPage";
import Sidebar from "./components/Sidebar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import MyPatients from "./pages/MyPatients";
import History from "./pages/History";
import Payments from "./pages/Payments";
import MessagesNotifications from "./pages/MessagesNotifications";
import Reports from "./pages/Reports";
import ReportPdfViewer from "./components/ReportPdfViewer";
import Res from "./Res";
import AppointmentForm from "./pages/AppointmentForm";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./home/Home";
import DoctorsPage from "./pages/DoctorsPage";

// Pages

// Dummy pages (create later)
const isSidebar = ["/", "/login", "/signup","/doctors","/book-appointment"];
function App() {
  const url = useLocation();
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="flex w-full min-h-screen">
      {/* isSidebar */}

      {!isSidebar.includes(url.pathname) && (
        <div className="fixed">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <main
        className={
          !isSidebar.includes(url.pathname) ? "ml-0 lg:ml-64 flex-1 " : "w-full"
        }
      >
        {!isSidebar.includes(url.pathname) && <Topbar />}
        {/* <Res/> */}
        <div
          className={
            !isSidebar.includes(url.pathname)
              ? "max-w-7xl mx-auto p-6 lg:p-8 "
              : "w-full"
          }
        >
          <Routes>
            {/* Auth */}
            <Route
              path="/signup"
              element={
                user?.token ? (
                  user?.user.role == "doctor" ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Navigate to="/doctors" />
                  )
                ) : (
                  <Signup />
                )
              }
            />

            <Route path="/" element={<Home />} />
            <Route path="/book-appointment" element={<AppointmentForm />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route
              path="/login"
              element={(user != null?.token) != "" ? <Home /> : <Login />}
            />
            <Route
              path="/settings"
              element={
                (user != null?.token) != "" ? <SettingsPage /> : <Login />
              }
            />
            <Route
              path="/dashboard"
              element={
                ((user?.role == "doctor") != null?.token) != "" ? (
                  <Dashboard />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/appointments"
              element={
                (user != null?.token) != "" ? <Appointments /> : <Login />
              }
            />
            <Route
              path="/my-patients"
              element={(user != null?.token) != "" ? <MyPatients /> : <Login />}
            />
            <Route
              path="/history"
              element={(user != null?.token) != "" ? <History /> : <Login />}
            />
            <Route
              path="/payments"
              element={(user != null?.token) != "" ? <Payments /> : <Login />}
            />
            <Route
              path="/payments"
              element={(user != null?.token) != "" ? <Payments /> : <Login />}
            />
            <Route
              path="/reports"
              element={(user != null?.token) != "" ? <Reports /> : <Login />}
            />
            <Route
              path="/messages"
              element={
                (user != null?.token) != "" ? (
                  <MessagesNotifications />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/reports/:fileName"
              element={
                (user != null?.token) != "" ? <ReportPdfViewer /> : <Login />
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
