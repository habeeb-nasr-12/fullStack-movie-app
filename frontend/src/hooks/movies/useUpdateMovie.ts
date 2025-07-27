import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moviesAPI } from "@/services/api";
import { UpdateMovieTVShowRequest } from "@/types";
import { message } from "antd";

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMovieTVShowRequest }) =>
      moviesAPI.update(id, data),
    onSuccess: () => {
      message.success("Movie/TV show updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie"] });
      queryClient.invalidateQueries({ queryKey: ["movieStats"] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to update movie/TV show";
      message.error(errorMessage);
    },
  });
}; 