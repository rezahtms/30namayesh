export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  MOVIES: {
    BASE: '/movies',
    BY_ID: (id: number) => `/movies/${id}`,
  },
  WATCHED: {
    BASE: '/watched',
    BY_ID: (id: number) => `/watched/${id}`,
  },
} as const

export default API_ENDPOINTS