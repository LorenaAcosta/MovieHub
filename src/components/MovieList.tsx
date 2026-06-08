import React, {useMemo, useState} from "react";
import MovieCard from "./MovieCard";

type Movie = {
    id: number;
    title: string;
    poster_path:string;
    overview: string;
};

interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [search, setSearch] = useState("");
  const [watchedIds, setWatchedIds] = useState<number[]>([]);
  const [toWatchIds, setToWatchIds] = useState<number[]>([]);

  const filteredMovies = useMemo(
      () => movies.filter(movie =>
          movie.title.toLowerCase().includes(search.toLowerCase())
      ), [movies, search]
  );

  const handleAddWatched = (movie: Movie) => {
    setWatchedIds((prev) => (prev.includes(movie.id) ? prev : [...prev, movie.id]));
    setToWatchIds((prev) => prev.filter((id) => id !== movie.id));
  };

  const handleAddToWatch = (movie: Movie) => {
    setToWatchIds((prev) => (prev.includes(movie.id) ? prev : [...prev, movie.id]));
    setWatchedIds((prev) => prev.filter((id) => id !== movie.id));
  };


  return (
       <div>
      <input
        type="text"
        placeholder="Filtrar por titulo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddWatched={handleAddWatched}
            onAddToWatch={handleAddToWatch}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
