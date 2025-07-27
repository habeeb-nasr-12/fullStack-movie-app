import { useInfiniteQuery } from "@tanstack/react-query";
import { moviesAPI } from "@/services/api";
import { GetMoviesQuery, GetMoviesResponse } from "@/types";

export const useInfiniteMovies = (params: GetMoviesQuery = {}) => {
  return useInfiniteQuery({
    queryKey: ["movies", "infinite", params],
    queryFn: ({ pageParam = 1 }) => 
      moviesAPI.getAll({ ...params, page: pageParam }),
    getNextPageParam: (lastPage: GetMoviesResponse) => {
      return lastPage.pagination.has_next_page 
        ? lastPage.pagination.current_page + 1 
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
}; 