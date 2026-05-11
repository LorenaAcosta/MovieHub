import axios from "axios";


export interface Movie {
    id: number;
    title: string;
    poster_path:string;
    overview: string;
}


export interface Detail{
    id: number;
    adult: boolean;
    backdrop_path: string;
    genre: string[];
    origin_country: string[];
    title: string;
    overview: string;
    release_date: string;
}
const apiKey = "d169976745ac59d79122af7892b71227";

export async function getMovies(): Promise<Movie[]>{
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`
    );
    return response.data.results;
}

export async function getDetails( movie_id: string): Promise<Detail>{
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=es-ES`
    );
    return response.data;
}