import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { authAPI } from "@/services/api";
import { SignupRequest } from "@/types";
import { message } from "antd";

export const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupRequest) => authAPI.signup(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        Cookies.set("auth_token", response.data.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(response.data.user), { expires: 7 });
        
        message.success("Account created successfully!");
        navigate("/");
        
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Signup failed";
      message.error(errorMessage);
    },
  });
}; 