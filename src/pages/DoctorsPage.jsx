import { useEffect, useState } from "react";
import axios from "axios";

import { Hand } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}/auth/users?role=doctor`,
        );
        console.log(res);
        setDoctors(res.data.users);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookingClick = (doctor) => {
    setSelectedDoctor(doctor);
    navigate("/book-appointment", {
      state: {
        doctorId: doctor,
      },
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Available Doctors
      </h1>

      {/* Loading */}
      {loading && <p className="text-center">Loading doctors...</p>}

      {/* Doctors List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors?.length > 0 &&
          doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-xl shadow p-5">
              <img
                src={
                  doctor.pic ||
                  "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
                }
                alt={doctor.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
              />

              <h2 className="text-lg font-semibold text-center">
                {doctor.name}
              </h2>

              <p className="text-sm text-gray-600 text-center">
                Age: {doctor.age || "N/A"}
              </p>

              <button
                onClick={() => handleBookingClick(doctor._id)}
                className="mt-4 w-full bg-[#0b7285] text-white py-2 rounded-lg hover:bg-[#095c6b]"
              >
                Book Appointment
              </button>
            </div>
          ))}
      </div>

      {/* Booking Modal */}
      {/* {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )} */}
    </div>
  );
}
