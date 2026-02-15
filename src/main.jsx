import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Notificationprovider } from "./context/NotifictaionContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { PatientContextProvider } from "./context/PatientContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <Router>
    <AuthContextProvider>
      <PatientContextProvider>
        <Notificationprovider>
          <App />
        </Notificationprovider>
      </PatientContextProvider>
    </AuthContextProvider>
  </Router>,
);
