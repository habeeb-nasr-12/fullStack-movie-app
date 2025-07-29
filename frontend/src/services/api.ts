import axios from "axios";
import Cookies from "js-cookie";
import {
  MovieTVShow,
  CreateMovieTVShowRequest,
  UpdateMovieTVShowRequest,
  GetMoviesQuery,
  GetMoviesResponse,
  GetStatsResponse,
  ApiResponse,
  SignupRequest,
  SigninRequest,
  AuthApiResponse,
  UserApiResponse,
} from "@/types";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_URL + "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.error("Unauthorized access");
      Cookies.remove("auth_token");
      Cookies.remove("user");
      if (
        window.location.pathname !== "/signin" &&
        window.location.pathname !== "/signup"
      ) {
        window.location.href = "/signin";
      }
    } else if (error.response?.status >= 500) {
      console.error("Server error occurred");
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: async (data: SignupRequest): Promise<AuthApiResponse> => {
    const response = await api.post("/auth/signup", data);
    return response.data;
  },

  signin: async (data: SigninRequest): Promise<AuthApiResponse> => {
    const response = await api.post("/auth/signin", data);
    return response.data;
  },

  me: async (): Promise<UserApiResponse> => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export const moviesAPI = {
  getAll: async (params: GetMoviesQuery = {}): Promise<GetMoviesResponse> => {
    const response = await api.get("/movies", { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<MovieTVShow>> => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  create: async (
    data: CreateMovieTVShowRequest
  ): Promise<ApiResponse<MovieTVShow>> => {
    const response = await api.post("/movies", data);
    return response.data;
  },

  update: async (
    id: number,
    data: UpdateMovieTVShowRequest
  ): Promise<ApiResponse<MovieTVShow>> => {
    const response = await api.put(`/movies/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  },

  getStats: async (): Promise<GetStatsResponse> => {
    const response = await api.get("/movies/stats");
    return response.data;
  },
};

export default api;
