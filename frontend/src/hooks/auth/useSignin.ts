import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { authAPI } from "@/services/api";
import { SigninRequest } from "@/types";
import { message } from "antd";

export const useSignin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SigninRequest) => authAPI.signin(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        Cookies.set("auth_token", response.data.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(response.data.user), { expires: 7 });
        message.success("Login successful!");
        navigate("/");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Login failed";
      message.error(errorMessage);
    },
  });
}; 