import Cookies from "js-cookie";
import { useUser } from "./useUser";
import { useLogout } from "./useLogout";

export const useAuth = () => {
  const { data: userData, isLoading, error } = useUser();
  const { logout } = useLogout();

  const isAuthenticated = !!Cookies.get("auth_token") && !error;
  const user = userData?.data;

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout,
  };
}; 