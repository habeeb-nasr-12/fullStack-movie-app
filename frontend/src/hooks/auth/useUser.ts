import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { authAPI } from "@/services/api";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authAPI.me,
    enabled: !!Cookies.get("auth_token"),
    retry: false,
  });
}; 