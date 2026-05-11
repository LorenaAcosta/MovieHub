import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App.js";
// @ts-ignore
import './index.css';

// Asegura que el elemento root existe y es del tipo correcto
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("No se encontró el elemento root");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
