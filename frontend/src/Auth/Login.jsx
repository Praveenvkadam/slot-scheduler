import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../query/useLogin";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth_redux/authSlice";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

 const dispatch = useDispatch();

const onSubmit = (data) => {
  mutate(data, {
    onSuccess: (response) => {
      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        })
      );

      navigate("/");
    },
  });
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-gray-100 rounded-3xl p-5 sm:p-8 space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-3 rounded-xl bg-white outline-none"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full p-3 rounded-xl bg-white outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password.message}</p>
              )}
            </div>

            {isError && (
              <p className="text-red-600 text-sm">
                {error?.response?.data?.message || "Login failed"}
              </p>
            )}
          </div>

          <p className="text-center text-gray-500 mt-2">
            <Link to="/signup" className="text-purple-700 font-medium">
              Create a new account
            </Link>
          </p>

          <p className="text-center text-gray-500 mt-2">
            <Link to="/forgot" className="text-purple-700 font-medium">
              Forgot password?
            </Link>
          </p>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 p-3 rounded-md bg-purple-700 text-white font-medium disabled:opacity-60"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
