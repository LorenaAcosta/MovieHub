import type { Movie } from "../api/movies.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import {useFavorites} from "../features/favorites/FavoritesContext.js";

type MovieCardProps = {
    movie: Movie;
};


const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    const {addFavorite, removeFavorite, isFavorite} = useFavorites();
    const favorite = isFavorite(movie.id.toString());
    const navigate = useNavigate();

    if (!movie.id) {
        return <div>Error: Película sin ID</div>;
    }

    return (
        <div onClick={() => navigate(`/movie/${movie.id}`)} className="cursor-pointer">
            <div className="relative bg-yellow-300 rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform">

                <button
                    onClick={e => {
                        e.stopPropagation();
                        favorite ? removeFavorite(movie.id.toString()) : addFavorite(movie);
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-full ${favorite ? "bg-yellow-400" : "bg-gray-200"}`}
                    aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                    {favorite ? "★" : "☆"}
                </button>

                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-40 h-60 object-cover rounded mb-2"
                />
                <h2 className="text-lg font-bold mb-1 text-center">{movie.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-2 text-center">
                    {movie.overview}
                </p>
                <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Ver detalles
                </button>

            </div>
        </div>
    );
};

export default MovieCard;