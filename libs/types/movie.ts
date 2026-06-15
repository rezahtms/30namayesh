export interface Actor {
  id: number
  name: string
  avatar: string
}

export interface Movie {
  id: number
  title: string
  image: string
  rating: number
  duration: string
  year: number
  director: string
  genre: string[]
  summary: string
  actors?: Actor[]
}