import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth_redux/authSlice";
import { resetPasswordApi } from "../redux/auth_redux/authApi";

export const useResetPassword = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: resetPasswordApi,

    onSuccess: (data) => {
      dispatch(setCredentials(data));
    },
  });
};
