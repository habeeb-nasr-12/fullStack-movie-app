import { useQuery } from "@tanstack/react-query";
import { moviesAPI } from "@/services/api";

export const useMovie = (id: number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => moviesAPI.getById(id),
    enabled: !!id,
  });
}; 