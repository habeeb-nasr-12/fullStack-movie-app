import { useQuery } from "@tanstack/react-query";
import { moviesAPI } from "@/services/api";

export const useMovieStats = () => {
  return useQuery({
    queryKey: ["movieStats"],
    queryFn: () => moviesAPI.getStats(),
    staleTime: 5 * 60 * 1000,
  });
}; 