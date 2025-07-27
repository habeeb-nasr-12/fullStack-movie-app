import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    Cookies.remove("auth_token");
    Cookies.remove("user");
    queryClient.clear();
    navigate("/signin");
    message.success("Logged out successfully!");
  };

  return { logout };
}; 