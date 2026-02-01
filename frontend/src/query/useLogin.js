import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginApi } from "../redux/auth_redux/authApi";
import { setCredentials } from "../redux/auth_redux/authSlice";

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await loginApi(payload);
      return response.data; 
    },

    onSuccess: (data) => {  
      const { user, token } = data;

      dispatch(setCredentials({ user, token }));
      localStorage.setItem("token", token);
    },

    onError: (error) => {
      console.log("LOGIN ERROR:", error.response?.data || error.message);
    },
  });
};