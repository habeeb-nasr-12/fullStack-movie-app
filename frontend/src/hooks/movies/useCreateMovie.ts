import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moviesAPI } from "@/services/api";
import { CreateMovieTVShowRequest } from "@/types";
import { message } from "antd";

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMovieTVShowRequest) => moviesAPI.create(data),
    onSuccess: () => {
      message.success("Movie/TV show created successfully!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movieStats"] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to create movie/TV show";
      message.error(errorMessage);
    },
  });
}; 