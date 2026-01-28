import axios from "axios";
import type { Movie } from "../types/movie";

interface SearchMoviesResponse {
  results: Movie[];
}

const myApiKey = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (!token) {
    throw new Error(
      "VITE_TMDB_TOKEN is missing. Check your .env and restart dev server.",
    );
  }

  const { data } = await myApiKey.get<SearchMoviesResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.results;
}
