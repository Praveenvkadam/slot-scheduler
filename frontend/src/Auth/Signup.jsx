import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useSignup } from "../query/useSignup";
import { Link, useNavigate } from "react-router-dom";

const signupSchema = z
  .object({
    fullName: z.string().min(2),
    username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
    email: z.string().email(),
    password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/),
    confirmPassword: z.string(),
    countryCode: z.string(),
    phone: z.string().min(7).regex(/^[0-9]+$/),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } =
    useForm({ resolver: zodResolver(signupSchema) });

  const { mutate: signup, isPending, error } = useSignup();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (data) => {
    signup(data);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="bg-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input {...register("fullName")} className="w-full h-12 px-4 rounded-xl bg-white outline-none" />
                <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input {...register("username")} className="w-full h-12 px-4 rounded-xl bg-white outline-none" />
                <p className="text-red-500 text-sm mt-1">{errors.username?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" {...register("email")} className="w-full h-12 px-4 rounded-xl bg-white outline-none" />
                <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    {...register("password")}
                    className="w-full h-12 px-4 pr-10 rounded-xl bg-white outline-none"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <div className="grid grid-cols-[110px_1fr] gap-3">
                  <select {...register("countryCode")} className="h-12 px-3 rounded-xl bg-white outline-none">
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+91">+91</option>
                    <option value="+61">+61</option>
                  </select>
                  <input {...register("phone")} className="h-12 px-4 rounded-xl bg-white outline-none" />
                </div>
                <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirmPassword")}
                    className="w-full h-12 px-4 pr-10 rounded-xl bg-white outline-none"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
              </div>

            </div>
          </div>

          <p className="text-center text-gray-500 mt-2">
            <Link to="/login" className="text-purple-700 font-medium">
              Already have an account? Login
            </Link>
          </p>

          {error && (
            <p className="text-red-500 text-center mt-4">
              {error?.response?.data?.message || error?.message || "Signup failed"}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 h-12 rounded-md bg-purple-700 text-white font-medium"
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
