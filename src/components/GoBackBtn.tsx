import React from "react";
import { useNavigate } from "react-router-dom";


const GoBackBtn: React.FC = () => {

    const navigate =  useNavigate();

    return (
        <button
            onClick={()=> navigate(`/`)}
            className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
            Volver
        </button>
    )
}

export default  GoBackBtn;
