

import React from "react";
import { IoClose } from "react-icons/io5";
import LogoutImg from "../assets/logout.png";

export default function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] backdrop-blur-[1px] px-3">
      <div className="bg-white w-full max-w-[380px] rounded-2xl p-4 sm:p-5 shadow-2xl relative animate-scaleIn max-h-[95vh] overflow-y-auto">
        
        {/* Close Icon */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-red-500 hover:text-red-700 cursor-pointer"
        >
          <IoClose size={22} />
        </button>

        {/* Illustration */}
        <div className="flex justify-center mb-4">
          <img
            src={LogoutImg}
            alt="logout illustration"
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-36 md:h-36 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-2">
          Are You Logging Out?
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-600 text-xs sm:text-sm mb-5 sm:mb-6 leading-relaxed">
          You can always log back in at any time. If you just want to switch
          accounts, you can add another account.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={onCancel}
            className="w-full sm:w-1/2 bg-red-50 py-2.5 border border-red-300 rounded-full font-semibold text-red-700 cursor-pointer hover:bg-red-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-1/2 py-2.5 bg-green-800 text-white rounded-full font-semibold hover:bg-green-900 cursor-pointer transition"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Animation CSS */}
      <style>{`
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
