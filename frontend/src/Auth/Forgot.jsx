import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useResetPassword } from "../query/useResetPassword";
import { Eye, EyeOff } from "lucide-react";

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const Forgot = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useResetPassword();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = schema.safeParse(formData);

    if (!result.success) {
      const formatted = result.error.flatten().fieldErrors;
      setErrors(formatted);
      return;
    }

    setErrors({});

    mutate(result.data, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">Reset Your Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="bg-gray-100 rounded-3xl p-5 sm:p-8 space-y-5 shadow-sm">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white outline-none"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-10 text-gray-500"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password[0]}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-10 text-gray-500"
              >
                {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">
                  {errors.confirmPassword[0]}
                </p>
              )}
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">
                {error.message}
              </p>
            )}
          </div>

          <p className="text-center text-gray-500 mt-6">
            <Link to="/signup" className="text-purple-700 font-medium">
              Create a new account
            </Link>
          </p>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 p-3 rounded-md bg-purple-700 text-white font-medium hover:bg-purple-800 transition disabled:opacity-50"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
