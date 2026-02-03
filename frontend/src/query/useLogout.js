import { useDispatch } from "react-redux";
import { logout } from "../redux/auth_redux/authSlice";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    queryClient.clear();
  };

  return handleLogout;
};
