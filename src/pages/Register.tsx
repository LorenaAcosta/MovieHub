import React, { useState } from "react";



const Register: React.FC = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(null);
        setSuccess(null);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!form.name || !form.email || !form.password || !form.confirmPassword) {
                setError("Todos los campos son obligatorios");
                return;
            }
            if (!form.email.includes("@")) {
                setError("El email no es válido");
                return;
            }
            if (form.password.length < 6) {
                setError("La contraseña debe tener al menos 6 caracteres");
                return;
            }
            if (form.password !== form.confirmPassword) {
                setError("Las contraseñas no coinciden");
                return;
            }

            setSuccess("¡Registro exitoso!");
            setForm({ name: "", email: "", password: "", confirmPassword: "" });
        };
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Registrarse
                </button>
            </form>
            {error && <div className="text-red-600 mt-2">{error}</div>}
            {success && <div className="text-green-600 mt-2">{success}</div>}
        </div>
    );
};

export default Register;