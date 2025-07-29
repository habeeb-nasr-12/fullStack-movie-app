import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { authAPI } from "@/services/api";

export const useUser = () => {
  const token = Cookies.get("auth_token");
  
  return useQuery({
    queryKey: ["user"],
    queryFn: authAPI.me,
    enabled: !!token && token.trim() !== "",
    retry: (failureCount, error: any) => {
      // Don't retry on 401 or 403 errors (authentication issues)
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      // Only retry once for other errors
      return failureCount < 1;
    },
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}; 