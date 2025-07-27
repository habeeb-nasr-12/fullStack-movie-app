export interface MovieTVShow {
  id: number;
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: number;
  location: string;
  duration: number;
  year: number;
  genre?: string | null;
  rating?: number | null;
  description?: string | null;
  poster_url?: string | null;
  status: "Watched" | "Want to Watch" | "Currently Watching";
  created_at: string;
  updated_at: string;
}

export interface CreateMovieTVShowRequest {
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: number;
  location: string;
  duration: number;
  year: number;
  genre?: string | null;
  rating?: number | null;
  description?: string | null;
  poster_url?: string | null;
  status?: "Watched" | "Want to Watch" | "Currently Watching";
}

export interface UpdateMovieTVShowRequest
  extends Partial<CreateMovieTVShowRequest> {}

export interface GetMoviesQuery {
  page?: number;
  limit?: number;
  search?: string;
  type?: "Movie" | "TV Show";
  status?: "Watched" | "Want to Watch" | "Currently Watching";
  rating?: string;
  sort_by?: "title" | "year" | "rating" | "created_at";
  sort_order?: "ASC" | "DESC";
}

export interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{
    field?: string;
    message: string;
    code?: string;
  }>;
}

export interface GetMoviesResponse {
  success: boolean;
  movies: MovieTVShow[];
  pagination: PaginationInfo;
}

export interface Stats {
  total: number;
  by_type: {
    movies: number;
    tv_shows: number;
  };
  by_status: {
    watched: number;
    want_to_watch: number;
    currently_watching: number;
  };
}

export interface GetStatsResponse extends ApiResponse<Stats> {}

export interface MovieTVShowFormData {
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: number;
  location: string;
  duration: number;
  year: number;
  genre?: string;
  rating?: number;
  description?: string;
  poster_url?: string;
  status: "Watched" | "Want to Watch" | "Currently Watching";
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface AuthApiResponse extends ApiResponse<AuthResponse> {}

export interface UserApiResponse extends ApiResponse<User> {}
