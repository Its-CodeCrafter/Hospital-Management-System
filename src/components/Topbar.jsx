import { Bell } from "lucide-react";

import { Link } from "react-router-dom";
import { useNotifications } from "../context/NotifictaionContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Topbar = () => {
  const unreadMsg = useNotifications();
  console.log(unreadMsg);
  const { user } = useContext(AuthContext);
  const [pic, setPic] = useState("https://i.pravatar.cc/30");
  console.log(`${import.meta.env.VITE_REACT_IMAGE_URL}/uploads/${user?.user?.pic}`)
  useEffect(() => {
    setPic(`${import.meta.env.VITE_REACT_IMAGE_URL}/uploads/${user?.user?.pic}`);
  }, [user]);
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center md:justify-between justify-end px-4 py-3 md:px-6">
        {/* Search */}
        <div className="flex-1 max-w-xl md:block hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search experiences, partners, etc."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-10 text-sm outline-none focus:border-gray-300 focus:bg-white"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="ml-4 flex items-center gap-4">
          {/* add patient btn in here  */}
          {/* <Link to={"/add-patient"} className="bg-green-600 py-2 px-5 text-white rounded ">
          Add Patient
          </Link> */}
          {/* Notification */}
          <Link
            to={"/messages"}
            className="relative rounded-full p-2 hover:bg-gray-100"
          >
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -right-1 text-center top-0  text-white   h-5 w-5 rounded-full bg-red-500">
              {unreadMsg}
            </span>
          </Link>

          {/* Profile */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={pic}
              alt="profile"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-medium text-gray-800">
                {user?.user?.name || "Bob"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.user?.email || "eend@gmail.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
