import { useQuery } from "@tanstack/react-query";
import { moviesAPI } from "@/services/api";
import { GetMoviesQuery } from "@/types";

export const useMovies = (params: GetMoviesQuery = {}) => {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => moviesAPI.getAll(params),
    staleTime: 5 * 60 * 1000,
  });
}; 