import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moviesAPI } from "@/services/api";
import { message } from "antd";

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => moviesAPI.delete(id),
    onSuccess: () => {
      message.success("Movie/TV show deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movieStats"] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to delete movie/TV show";
      message.error(errorMessage);
    },
  });
}; 