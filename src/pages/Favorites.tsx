import React from "react";
import { useFavorites } from "../features/favorites/FavoritesContext";
import MovieCard from "../components/MovieCard";
import GoBackBtn from "../components/GoBackBtn";

const Favorites: React.FC = () => {
    const { favorites, clearFavorites } = useFavorites();

    return (
        <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl font-bold my-8 text-center">Mis Favoritas</h1>
            <div className="flex justify-end mb-4">

                <GoBackBtn />
                <button
                    onClick={clearFavorites}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                >
                    Eliminar todos los favoritos
                </button>

            </div>
            {
                favorites.length === 0 && (
                    <div className="text-center py-10 text-gray-500">No tienes películas favoritas.</div>)
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
