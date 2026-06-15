export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  MOVIES: {
    BASE: "/movies",
    BY_ID: (id: number) => `/movies/${id}`,
    SEARCH: "/movies",
  },
} as const;