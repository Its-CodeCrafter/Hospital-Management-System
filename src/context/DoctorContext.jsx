import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const loadPatients = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/patient`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPatients(res.data.patients);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadPatients();
    }
  }, [token, loadPatients]);

  return (
    <PatientContext.Provider value={{ patients, setPatients, loadPatients }}>
      {children}
    </PatientContext.Provider>
  );
};
