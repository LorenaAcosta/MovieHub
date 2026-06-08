import React from "react";
import useMovies from "../hooks/useMovies";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import MovieList from "../components/MovieList";
import { useAuth } from "../features/auth/AuthContext";

const Home: React.FC = () => {
    const { movies, loading, error } = useMovies();
    const { user, logout, loading: authLoading } = useAuth();

    if (loading) return <Spinner />;
    if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-end mt-4 gap-2">
                {user ? (
                    <>
                        <Link to="/profile" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition">Perfil</Link>
                        <button
                            onClick={logout}
                            disabled={authLoading}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-60"
                        >
                            {authLoading ? "Cerrando sesión..." : "Logout"}
                        </button>
                        <Link to="/favorites" className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500 transition">Favoritos</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</Link>
                        <Link to="/favorites" className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500 transition">Favoritos</Link>
                        <Link to="/watched" className="bg-green-400 text-gray-800 px-4 py-2 rounded hover:bg-green-500 transition">Vistos</Link>
                    </>
                )}
            </div>

            <h1 className="text-3xl font-bold">Películas populares</h1>
            {!loading && movies.length === 0 && (
                <div className="text-center py-10">No se encontraron películas.</div>
            )}

            <div>
                <h1 className="text-2xl font-bold mb-4">Películas</h1>
                <MovieList movies={movies} />
            </div>
        </div>
    );
};

export default Home;