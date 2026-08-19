export type SolicitudPsicologo = {
  id: number;
  nombre: string;
  email: string;
  cedula: string;
  experiencia: string;
  especialidades: string[];
  mensaje: string;
  fotoUrl?: string;
  cvNombre?: string;
  cvUrl?: string;
  fecha: string;
};

const STORAGE_KEY = "babybear_solicitudes_psicologos";
export const SOLICITUDES_UPDATED_EVENT = "babybear:solicitudes-updated";

export function leerSolicitudesGuardadas(): SolicitudPsicologo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SolicitudPsicologo[]) : [];
  } catch {
    return [];
  }
}

export function guardarSolicitud(datos: Omit<SolicitudPsicologo, "id" | "fecha">): SolicitudPsicologo {
  const nueva: SolicitudPsicologo = {
    ...datos,
    id: Date.now(),
    fecha: new Date().toISOString().slice(0, 10),
  };
  const actuales = leerSolicitudesGuardadas();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...actuales, nueva]));
  window.dispatchEvent(new Event(SOLICITUDES_UPDATED_EVENT));
  return nueva;
}

export function eliminarSolicitudGuardada(id: number) {
  const actuales = leerSolicitudesGuardadas();
  const filtradas = actuales.filter(s => s.id !== id);
  if (filtradas.length !== actuales.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas));
    window.dispatchEvent(new Event(SOLICITUDES_UPDATED_EVENT));
  }
}
