// types/movie.ts
export type Actor = {
  id: number;
  name: string;
  avatar: string;
};

export type Movie = {
  id: number;
  title: string;
  image: string;
  rating: number;
  duration: string;
  year: number;
  director: string;
  actors: Actor[];
  genre: string[];
  summary: string;
};