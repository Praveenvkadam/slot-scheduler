import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth_redux/authSlice";
import { registerApi } from "../redux/auth_redux/authApi";

export const useSignup = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (formData) => {
      const payload = {
        fullname: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: `${formData.countryCode}${formData.phone}`,
      };
      const res = await registerApi(payload);
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(setCredentials({ user: null, token: data.token }));
      localStorage.setItem("token", data.token);
    },
  });
};
