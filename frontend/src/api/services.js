import http from './http';

export const authApi = {
  login: (data) => http.post('/auth/login', data).then((r) => r.data.user),
  logout: () => http.post('/auth/logout'),
  me: () => http.get('/auth/me').then((r) => r.data.user),
};

export const usersApi = {
  list: () => http.get('/usuarios').then((r) => r.data),
  create: (data) => http.post('/usuarios', data).then((r) => r.data),
  setActive: (id, activo) => http.patch(`/usuarios/${id}/estado`, { activo }).then((r) => r.data),
};

export const inscripcionesApi = {
  areas: () => http.get('/inscripciones/areas').then((r) => r.data),
  list: (params) => http.get('/inscripciones', { params }).then((r) => r.data),
  alerts: () => http.get('/inscripciones/alertas').then((r) => r.data),
  create: (data) => http.post('/inscripciones', data).then((r) => r.data),
  update: (id, data) => http.put(`/inscripciones/${id}`, data).then((r) => r.data),
  remove: (id) => http.delete(`/inscripciones/${id}`),
  whatsapp: (id, tipo) => http.get(`/inscripciones/${id}/whatsapp`, { params: { tipo } }).then((r) => r.data),
};

/**
 * Abre WhatsApp con el mensaje listo. Se abre la pestaña ANTES de la petición
 * para que el navegador no la bloquee como ventana emergente.
 */
export async function openWhatsapp(id, tipo = 'bienvenida') {
  const win = window.open('', '_blank');
  try {
    const { url } = await inscripcionesApi.whatsapp(id, tipo);
    win.location.href = url;
  } catch (e) {
    win?.close();
    throw e;
  }
}
