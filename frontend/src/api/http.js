import axios from 'axios';

// withCredentials → envía la cookie httpOnly de sesión en cada petición
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});

/** Extrae un mensaje legible de cualquier error de la API. */
export const errorMessage = (err) => err?.response?.data?.message || 'No se pudo conectar con el servidor';

export default http;
