import {useState} from "react";
import { useAuth } from "../features/auth/AuthContext";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@")){
            setError("El correo no es válido");
            return;
        }
        setError("");
        login(email);
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
            <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">
                Iniciar sesión
            </button>
        </form>
    )
}


export default Login;