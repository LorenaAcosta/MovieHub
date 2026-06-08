import {useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {type Detail, getDetails} from "../api/movies.js";
import GoBackBtn from "../components/GoBackBtn";

const MovieDetails = () =>
{
    const { id } = useParams< {id: number }>();
    const [details, setDetails] = useState<Detail>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getDetails(id)
            .then((data) => {
                setDetails(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error al cargar los detalles");
                setLoading(false);
            });
    }, [id])

    if (loading) return <div className="text-center py-10">Cargando detalles...</div>;
    if (error) return <div className="text-center text-red-600 py-10">{error}</div>;
    if (!details) return null;

    return (

        <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mt-8">
            <GoBackBtn />
            <h2 className="text-2xl font-bold mb-4 text-center">{details.title}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
                alt={details.title}
                className="mb-4 rounded mx-auto"
                style={{ maxHeight: 400 }}
            />
            <div className="mb-4 text-gray-700 text-center">
                <p><span className="font-semibold">ID:</span> {details.id}</p>
                <p><span className="font-semibold">Adulto:</span> {details.adult ? 'Sí' : 'No'}</p>
                <p><span className="font-semibold">Géneros:</span> {details.genre && details.genre.length > 0 ? details.genre.join(', ') : 'N/A'}</p>
                <p><span className="font-semibold">País de origen:</span> {details.origin_country && details.origin_country.length > 0 ? details.origin_country.join(', ') : 'N/A'}</p>
                <p><span className="font-semibold">Fecha de estreno:</span> {details.release_date}</p>
            </div>
            <p className="mb-4 text-gray-700 text-center">{details.overview}</p>
        </div>
    )


}

export default MovieDetails;