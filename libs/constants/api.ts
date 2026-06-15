export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  MOVIES: {
    BASE: '/movies',
    BY_ID: (id: number) => `/movies/${id}`,
    SEARCH: '/movies',
  },
  WATCHED: {
    BASE: '/watched',
    BY_ID: (id: number) => `/watched/${id}`,
  },
  BLOG: {
    BASE: '/blog',
    BY_ID: (id: number) => `/blog/${id}`,
  },
} as const

export default API_ENDPOINTS