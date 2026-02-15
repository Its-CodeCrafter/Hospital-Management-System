// src/components/AppointmentForm.jsx
import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { PatientContext } from "../context/PatientContext";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const AppointmentForm = () => {
  const url = useLocation();
  const doctorId = url?.state?.doctorId;
  console.log(doctorId);
  const { patients, setPatients, loadPatients } = useContext(PatientContext);
  const { user } = useContext(AuthContext);
  let token;
  if (user != null && user.token != "") {
    token = user.token;
  } else {
    return null;
  }

  console.log(patients);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitData = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/patient/${doctorId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // if (res.data.statusText == "OK") {
      // if (res.data.error != "") {
      //   alert(res.data.error);

      // }
      // if (res.data) {

      alert(res?.data?.message);
   
      // }
      // } else {
      //   alert(res.data.message);
      // }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const onSubmit = (data) => {
    onSubmitData(data);
    reset();
  };

  useEffect(() => {
    loadPatients();
  }, []);
  return (
    <div className="flex items-center justify-center w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md min-w-full lg:min-w-175 max-w-3xl"
      >
        <h2 className="text-xl font-semibold text-center mt-5 mb-4">
          Add Appointment
        </h2>

        {/* Visit ID */}

        {/* Patient Name  */}
        <div className="mb-4">
          <label>Patient Name </label>
          <input
            {...register("name")}
            className="w-full border rounded px-3 py-2"
            placeholder="Neha Singh"
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label>Age</label>
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              min: { value: 0, message: "Invalid age" },
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="25"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label>Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label>Gender</label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>

        {/* Patient Type (OPTIONAL) */}
        <div className="mb-4">
          <label>Patient Type (Optional)</label>
          <select
            {...register("patientType")}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Type</option>
            <option value="new">New</option>
            <option value="old">Old</option>
            <option value="follow-up">Follow-up</option>
          </select>
        </div>

        {/* Disease */}
        <div className="mb-6">
          <label>Disease</label>
          <input
            {...register("disease", { required: "Disease is required" })}
            className="w-full border rounded px-3 py-2"
            placeholder="Fever"
          />
          {errors.disease && (
            <p className="text-red-500">{errors.disease.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label>Phone</label>
          <input
            {...register("phone", {
              required: "Phone is required",
              minLength: {
                value: 10,
                message: "Phone number must be 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Phone number must be 10 digits",
              },
              pattern: {
                value: /^[0-9]\d{9}$/,
                message: "Enter a valid Indian phone number",
              },
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="+91..."
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label>Address</label>
          <input
            {...register("address", { required: "Address is required" })}
            className="w-full border rounded px-3 py-2"
            placeholder="street city country "
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label>Notes</label>
          <input
            {...register("notes")}
            className="w-full border rounded px-3 py-2"
            placeholder="Notes..."
          />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>

        <button className="bg-green-700 text-white px-6 py-2 rounded">
          Save Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
