// import { useRef, useState } from "react";

// export default function ProfileSettings() {
//   const fileRef = useRef(null);
//   const [avatar, setAvatar] = useState(null);

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Preview image
//     setAvatar(URL.createObjectURL(file));
//   };

//   const handleDelete = () => {
//     setAvatar(null);
//     fileRef.current.value = "";
//   };

//   return (
//     <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 mb-8">
//       <h2 className="text-lg font-semibold text-gray-900 mb-4">
//         Profile
//       </h2>

//       {/* Profile Picture */}
//       <div className="flex items-center gap-4 mb-6">
//         <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
//           {avatar ? (
//             <img
//               src={avatar}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-2xl font-semibold text-green-800">
//               A
//             </span>
//           )}
//         </div>

//         <div className="flex gap-3">
//           <input
//             ref={fileRef}
//             type="file"
//             accept="image/*"
//             onChange={handleUpload}
//             className="hidden"
//           />

//           <button
//             onClick={() => fileRef.current.click()}
//             className="text-sm font-medium text-green-800 hover:underline"
//           >
//             Upload Photo
//           </button>

//           {avatar && (
//             <button
//               onClick={handleDelete}
//               className="text-sm font-medium text-red-500 hover:underline"
//             >
//               Remove
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Profile Form */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           placeholder="Full Name"
//           defaultValue="Alex Doe"
//           className="border border-gray-100 shadow-2xl rounded-lg px-4 py-2 text-sm"
//         />
//         <input
//           placeholder="Email Address"
//           defaultValue="alex.doe@email.com"
//           className="border border-gray-100 shadow-2xl rounded-lg px-4 py-2 text-sm"
//         />
//       </div>

//       <button className="mt-4 text-sm font-medium text-green-800 hover:underline">
//         Save Profile
//       </button>
//     </div>
//   );
// }

import { useRef, useState, useContext } from "react";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileSettings() {
  const fileRef = useRef(null);
  const { user, setUser,login } = useContext(AuthContext);

  const [avatar, setAvatar] = useState(user?.pic || null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setAvatar(URL.createObjectURL(selected)); // preview
  };

  const handleDelete = () => {
    setAvatar(null);
    setFile(null);
    fileRef.current.value = "";
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      // send only changed fields
      if (name !== user?.name) formData.append("name", name);
      if (email !== user?.email) formData.append("email", email);
      if (file) formData.append("pic", file);

      const { data } = await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}/auth`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      console.log(data?.user);
      // backend should return updated user fields
      setUser({ user: data.user, token: user.token });
      login({ user: data.user, token: user.token });
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>

      {/* Profile Picture */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
          {avatar ? (
            <img
              src={avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-semibold text-green-800">
              {name?.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />

          <button
            onClick={() => fileRef.current.click()}
            className="text-sm font-medium text-green-800 hover:underline"
          >
            Upload Photo
          </button>

          {avatar && (
            <button
              onClick={handleDelete}
              className="text-sm font-medium text-red-500 hover:underline"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="border border-gray-100 shadow-2xl rounded-lg px-4 py-2 text-sm"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="border border-gray-100 shadow-2xl rounded-lg px-4 py-2 text-sm"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-4 text-sm font-medium text-green-800 hover:underline disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
