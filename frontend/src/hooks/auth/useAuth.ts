import Cookies from "js-cookie";
import { useUser } from "./useUser";
import { useLogout } from "./useLogout";

export const useAuth = () => {
  const { data: userData, isLoading, error } = useUser();
  const { logout } = useLogout();

  // Check if there's a token and no authentication errors
  const hasToken = !!Cookies.get("auth_token");
  const hasAuthError = error?.response?.status === 401 || error?.response?.status === 403;
  
  // User is authenticated if they have a token, no auth errors, and user data is loaded
  const isAuthenticated = hasToken && !hasAuthError && !isLoading && !!userData?.data;
  const user = userData?.data;

  // If there's an auth error, clear the token
  if (hasAuthError && hasToken) {
    Cookies.remove("auth_token");
    Cookies.remove("user");
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout,
  };
}; 