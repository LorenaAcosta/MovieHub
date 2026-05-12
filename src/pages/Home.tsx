import React, {useEffect, useState} from "react";
import {searchMovies, getMovies, type Movie} from "../api/movies.js";
import MovieCard from "../components/MovieCard.js";
import { Link } from "react-router-dom";

const Home: React.FC = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setLoading(true);
            setError(null);
            if (search.trim() === "") {
                getMovies()
                    .then(setMovies)
                    .catch(() => setError("Error al cargar las peliculas"))
                    .finally(() => setLoading(false));
            } else {
                searchMovies(search)
                    .then(setMovies)
                    .catch(() => setError("Error al buscar peliculas"))
                    .finally(() => setLoading(false));
            }
        }, 500); // 500ms debounce
        return () => clearTimeout(delayDebounce);
    }, [search]);

    if (loading) return <div className="text-center text-lg py-10">Cargando...</div>
    if (error) return <div className="text-center text-red-600 py-10">{error}</div>

    return (
        <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-end mt-4 gap-2">
                <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</Link>
                <Link to="/favorites" className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500 transition">Favoritos</Link>
            </div>
            <div className="flex items-center gap-4 my-8">
                <h1 className="text-3xl font-bold">Películas populares</h1>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar..."
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Home;