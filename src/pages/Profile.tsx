import { useAuth } from "../features/auth/AuthContext";
import {Link} from "react-router-dom";
import React from "react";

const Profile = () => {
    const { user, logout, loading } = useAuth();

    if (!user) return <div className="text-center py-10">No autenticado.</div>;

    return (
        <div className="max-w-md mx-auto mt-10 bg-white rounded shadow p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Perfil de usuario</h2>
            <div className="mb-4">
                <div><b>Nombre:</b> {user.name}</div>
                <div><b>Email:</b> {user.email}</div>
            </div>
            <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-60"
                onClick={logout}
                disabled={loading}
            >
                {loading ? "Cerrando sesión..." : "Cerrar sesión"}
            </button>
            <Link to="/                                                                                                                                                                                             " className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500 transition">Volver</Link>
        </div>
    );
}

export default Profile;