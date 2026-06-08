import { useEffect, useState } from "react";
import { getMovies, Movie } from "../api/movies";

interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export default function useMovies(): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getMovies().then((data) => {
        setMovies(data);
        setError(null);
      })
      .catch((err) => {
        setError("Error al cargar películas");
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { movies, loading, error };
}

