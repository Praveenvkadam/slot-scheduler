import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">Create Account</h2>

        <form>
          <div className="bg-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full p-3 rounded-xl bg-white border-none outline-none focus:ring-0 shadow-none appearance-none"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input type="text" className="w-full p-3 rounded-xl bg-white border-none outline-none focus:ring-0 shadow-none appearance-none"/>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full p-3 rounded-xl bg-white border-none outline-none focus:ring-0 shadow-none appearance-none"/>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" className="w-full p-3 rounded-xl bg-white border-none outline-none focus:ring-0 shadow-none appearance-none"/>
              </div>

              {/* Phone */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="flex gap-2">
                  <select className="w-28 p-3 rounded-xl bg-white border-none outline-none focus:ring-0 shadow-none appearance-none">
                    <option>+1</option>
                    <option>+44</option>
                    <option>+91</option>
                    <option>+61</option>
                  </select>
                  <input type="tel" placeholder="Phone number" className="flex-1 p-3 rounded-xl bg-white border-none outline-none focus:ring-0 shadow-none appearance-none"/>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" className="w-full p-3 rounded-xl bg-white border-none outline-none focus:ring-0 shadow-none appearance-none"/>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-700 font-medium hover:underline">
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="w-full mt-4 p-3 rounded-md bg-purple-700 text-white font-medium hover:bg-purple-800 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};


