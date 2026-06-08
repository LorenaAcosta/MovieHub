
import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");
    const { login, error, loading, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@")) {
            setLocalError("El correo no es válido");
            return;
        }
        setLocalError("");
        await login({ email, password });
    };

    // Redirigir si ya está logueado
    if (user) {
        setTimeout(() => navigate("/"), 500);
        return <div className="text-center py-10">¡Bienvenido, {user.name}! Redirigiendo...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white rounded shadow">
            <input
                className="block w-full mb-2 p-2 border rounded"
                type="email"
                placeholder="Correo"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                className="block w-full mb-2 p-2 border rounded"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            {(localError || error) && (
                <div className="text-red-600 text-sm mb-2">{localError || error}</div>
            )}
            <button
                className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
                type="submit"
                disabled={loading}
            >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
        </form>
    );
};

export default Login;