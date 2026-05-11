import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Movie } from "../../api/movies";

export type FavoriteContextType = {
    favorites: Movie[];
    addFavorite: (movie: Movie) => void;
    removeFavorite: (movieId: string) => void;
    isFavorite: (movieId: string) => boolean;
    clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoriteContextType | undefined>(undefined);
const FAVORITES_KEY = "favorites_movies";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {

    const [favorites, setFavorites] = useState<Movie[]>(() => {
        const stored = localStorage.getItem(FAVORITES_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (movie: Movie) => {
        setFavorites((prev) => prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]);
    };

    const removeFavorite = (movieId: string) => {
        setFavorites((prev) => prev.filter((m) => m.id.toString() !== movieId));
    };

    const isFavorite = (movieId: string) => favorites.some((m) => m.id.toString() === movieId);

    const clearFavorites = () => {
        setFavorites([]);
        localStorage.removeItem(FAVORITES_KEY);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, clearFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error("useFavorites must be used within a FavoritesProvider");
    return context;
};
