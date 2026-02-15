import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">MediCare</h1>
        <p className="text-gray-600 mb-10">
          Book doctors. Manage patients. Simple healthcare.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctor Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Doctor
            </h2>
            <p className="text-gray-500 mb-6">
              Manage your appointments and patients
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register as Doctor
            </button>
          </div>

          {/* Patient Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Patient
            </h2>
            <p className="text-gray-500 mb-6">
              Find doctors & book appointments
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Register as Patient
            </button>
          </div>
        </div>

        <p className="mt-8 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
