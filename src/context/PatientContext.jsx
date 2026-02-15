import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";

export const PatientContext = createContext();

export const PatientContextProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const { user } = useContext(AuthContext);

  const token = user?.token;

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
