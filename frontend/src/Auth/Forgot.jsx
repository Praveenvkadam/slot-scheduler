import React from "react";
import { Link } from "react-router-dom";

const Forgot = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">Rest You'r Password</h2>

        <form>
          <div className="bg-gray-100 rounded-3xl p-[20px] sm:p-8 space-y-5 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Id
              </label>
              <input
                type="email"
                className="w-full p-3 rounded-xl bg-white border-none outline-none focus:ring-0 shadow-none appearance-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
               Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-xl bg-white border-none outline-none focus:ring-0 shadow-none appearance-none"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-xl bg-white border-none outline-none focus:ring-0 shadow-none appearance-none"
              />
            </div>
          </div>

          <p className="text-center text-gray-500 mt-6">
          <Link to="/signup" className="text-purple-700 font-medium">
            Create a new account
          </Link>
          </p>

          <button
            type="submit"
            className="w-full mt-4 p-3 rounded-md bg-purple-700 text-white font-medium hover:bg-purple-800 transition"
          >
            Reset Password  
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
