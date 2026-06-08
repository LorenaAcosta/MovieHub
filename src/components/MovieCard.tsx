import type { Movie } from "../api/movies";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../features/favorites/FavoritesContext";

type MovieCardProps = {
    movie: Movie;
  onAddWatched?: (movie: Movie) => void;
  onAddToWatch?: (movie: Movie) => void;
};


const MovieCard: React.FC<MovieCardProps> = ({ movie, onAddWatched, onAddToWatch }) => {

    const {addFavorite, removeFavorite, isFavorite} = useFavorites();
    const favorite = isFavorite(movie.id.toString());
    const navigate = useNavigate();

    const [showActions, setShowActions] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!cardRef.current) return;
            if (!cardRef.current.contains(event.target as Node)) {
                setShowActions(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

   if (!movie.id) return <div>Error: Pelicula sin ID</div>;

    return (
        <div ref={cardRef} className="cursor-pointer" onClick={() => setShowActions((prev) => !prev)}>
      <div className="relative bg-yellow-300 rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform">
        <button
          onClick={(e) => {
            e.stopPropagation();
            favorite ? removeFavorite(movie.id.toString()) : addFavorite(movie);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full ${favorite ? "bg-yellow-400" : "bg-gray-200"}`}
          aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {favorite ? "★" : "☆"}
        </button>

        { showActions && (
          <div
            className="absolute top-12 right-2 z-10 bg-white border rounded shadow p-2 flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                onAddWatched?.(movie);
                setShowActions(false);
              }}
            >
              ✅Agregar a Vistos
            </button>
            <button
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                onAddToWatch?.(movie);
                setShowActions(false);
              }}
            >
              📌 Ver después
            </button>
          </div>
        )}

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-40 h-60 object-cover rounded mb-2"
        />
        <h2 className="text-lg font-bold mb-1 text-center">{movie.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3 mb-2 text-center">{movie.overview}</p>

        <button
          className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/movie/${movie.id}`);
          }}
        >
          Ver detalles
        </button>
      </div>
    </div>
         
    );
};

export default React.memo(MovieCard); //solo se renderiza si los props cambian