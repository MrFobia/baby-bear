import { useState, useEffect } from "react";
import svgPaths from "../PerfilAdminInscritas-1/svg-0yobswd008";
import imgEllipse624 from "../PerfilAdminInscritas-1/e83d2d2338d69fe2def34b9e7b7d8bdbb262acac.png";
import { imgControl } from "../PerfilAdminInscritas-1/svg-hyv38";
import { goTo } from "../../app/navigation";
import { Header } from "../../app/components/Header";
import { leerSolicitudesGuardadas, eliminarSolicitudGuardada, SOLICITUDES_UPDATED_EVENT } from "../../app/solicitudes";

const ESPECIALIDADES = [
  "Pérdida neonatal",
  "Aborto espontáneo",
  "Muerte perinatal",
  "Muerte infantil",
  "Duelo de pareja",
  "Duelo de hermanos",
];

const IDIOMAS = ["Español", "Inglés", "Portugués", "Francés"];
const AUDIENCIA = ["Padres", "Madres", "Parejas", "Hermanos", "Familia"];
const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

type HorarioDia = { activo: boolean; inicio: string; fin: string };

const generarLinkGoogleMeet = (): string => {
  const grupo = () => Math.random().toString(36).slice(2, 5);
  return `https://meet.google.com/${grupo()}-${grupo()}-${grupo()}`;
};

type Psicologo = {
  id: number;
  nombre: string;
  especialidades: string[];
  email: string;
  telefono: string;
  cedula?: string;
  activo: boolean;
  imagen?: string;
  descripcion?: string;
  idiomas: string[];
  audiencia: string[];
  horario: Record<string, HorarioDia>;
  cvNombre?: string;
  cvUrl?: string;
};

const horarioDefault = (): Record<string, HorarioDia> =>
  Object.fromEntries(DIAS.map(d => [d, { activo: false, inicio: "9:00", fin: "17:00" }]));

const psicologosIniciales: Psicologo[] = [
  { id: 1, nombre: "Dra. Ana Martínez", especialidades: ["Pérdida neonatal", "Muerte perinatal"], email: "ana@babybear.org", telefono: "+57 300 123 4567", activo: true, descripcion: "Psicóloga con 10 años de experiencia en duelo perinatal.", idiomas: ["Español"], audiencia: ["Madres", "Parejas"], horario: { ...horarioDefault(), Lunes: { activo: true, inicio: "8:00", fin: "17:00" }, Martes: { activo: true, inicio: "8:00", fin: "17:00" } } },
  { id: 2, nombre: "Dr. Carlos Ruiz", especialidades: ["Duelo de pareja"], email: "carlos@babybear.org", telefono: "+57 301 234 5678", activo: true, descripcion: "Especialista en terapia de pareja y duelo.", idiomas: ["Español", "Inglés"], audiencia: ["Parejas", "Padres"], horario: horarioDefault() },
  { id: 3, nombre: "Dra. Laura Gómez", especialidades: ["Aborto espontáneo", "Muerte infantil"], email: "laura@babybear.org", telefono: "+57 302 345 6789", activo: false, descripcion: "", idiomas: ["Español", "Portugués"], audiencia: ["Madres", "Familia"], horario: horarioDefault() },
];

type EstadoCita = "pendiente" | "asistio" | "no_asistio" | "cancelada";

type Cita = {
  id: number;
  psicologoId: number;
  usuarioId: number;
  usuarioNombre: string;
  usuarioEmail: string;
  fecha: string;
  hora: string;
  googleMeet: string;
  estado: EstadoCita;
};

const citasIniciales: Cita[] = [
  { id: 201, psicologoId: 1, usuarioId: 1001, usuarioNombre: "Camila Restrepo", usuarioEmail: "camila.r@correo.com", fecha: "2024-06-03", hora: "9:00", googleMeet: generarLinkGoogleMeet(), estado: "asistio" },
  { id: 202, psicologoId: 1, usuarioId: 1002, usuarioNombre: "Julián Prada", usuarioEmail: "julian.p@correo.com", fecha: "2024-06-05", hora: "10:00", googleMeet: generarLinkGoogleMeet(), estado: "no_asistio" },
  { id: 203, psicologoId: 2, usuarioId: 1003, usuarioNombre: "Mariana Ocampo", usuarioEmail: "mariana.o@correo.com", fecha: "2024-06-07", hora: "15:00", googleMeet: generarLinkGoogleMeet(), estado: "pendiente" },
  { id: 204, psicologoId: 2, usuarioId: 1004, usuarioNombre: "Andrés Salazar", usuarioEmail: "andres.s@correo.com", fecha: "2024-06-10", hora: "16:00", googleMeet: generarLinkGoogleMeet(), estado: "pendiente" },
];

const estadoCitaCfg: Record<EstadoCita, { label: string; cls: string }> = {
  pendiente: { label: "Pendiente", cls: "bg-[#cbdcef]/40 text-[#506685]" },
  asistio: { label: "Asistió", cls: "bg-green-100 text-green-700" },
  no_asistio: { label: "No asistió", cls: "bg-red-100 text-red-600" },
  cancelada: { label: "Cancelada", cls: "bg-[#e0e0e0] text-[#8a8a8a]" },
};

type Usuario = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  pais: string;
  tipoDocumento: string;
  numeroDocumento: string;
  motivo: string;
  psicologoId?: number;
  fechaInscripcion: string;
  notas?: string;
};

const usuariosIniciales: Usuario[] = [
  { id: 1001, nombre: "Camila Restrepo", email: "camila.r@correo.com", telefono: "+57 315 400 1111", pais: "Colombia", tipoDocumento: "Cédula de ciudadanía", numeroDocumento: "1020304050", motivo: "Pérdida neonatal", psicologoId: 1, fechaInscripcion: "2024-05-28", notas: "Primera vez que busca acompañamiento psicológico." },
  { id: 1002, nombre: "Julián Prada", email: "julian.p@correo.com", telefono: "+57 316 400 2222", pais: "Colombia", tipoDocumento: "Cédula de ciudadanía", numeroDocumento: "1030405060", motivo: "Muerte perinatal", psicologoId: 1, fechaInscripcion: "2024-05-30" },
  { id: 1003, nombre: "Mariana Ocampo", email: "mariana.o@correo.com", telefono: "+57 317 400 3333", pais: "Colombia", tipoDocumento: "Cédula de extranjería", numeroDocumento: "5040302010", motivo: "Duelo de pareja", psicologoId: 2, fechaInscripcion: "2024-06-02" },
  { id: 1004, nombre: "Andrés Salazar", email: "andres.s@correo.com", telefono: "+57 318 400 4444", pais: "México", tipoDocumento: "Pasaporte", numeroDocumento: "G12345678", motivo: "Duelo de pareja", psicologoId: 2, fechaInscripcion: "2024-06-05" },
  { id: 1005, nombre: "Valentina Cruz", email: "valentina.c@correo.com", telefono: "+57 319 400 5555", pais: "Colombia", tipoDocumento: "Cédula de ciudadanía", numeroDocumento: "1050607080", motivo: "Aborto espontáneo", fechaInscripcion: "2024-06-12", notas: "Se inscribió pero aún no tiene cita agendada con un psicólogo." },
];

type Solicitud = {
  id: number;
  nombre: string;
  email: string;
  cedula: string;
  experiencia: string;
  especialidades: string[];
  fecha: string;
  mensaje: string;
  fotoUrl?: string;
  cvNombre?: string;
  cvUrl?: string;
};

const solicitudesIniciales: Solicitud[] = [
  { id: 101, nombre: "Dra. Valeria Torres", email: "valeria@correo.com", cedula: "1020304050", experiencia: "6-10", especialidades: ["Duelo de hermanos"], fecha: "2024-05-10", mensaje: "Tengo 8 años de experiencia en duelo y me gustaría apoyar a las familias." },
  { id: 102, nombre: "Dr. Sebastián Mora", email: "sebastian@correo.com", cedula: "1030405060", experiencia: "3-5", especialidades: ["Pérdida neonatal", "Muerte perinatal"], fecha: "2024-05-14", mensaje: "Psicólogo clínico especializado en perinatal." },
  { id: 103, nombre: "Dra. Camila Herrera", email: "camila@correo.com", cedula: "1040506070", experiencia: "mas-10", especialidades: ["Duelo de pareja"], fecha: "2024-05-18", mensaje: "Trabajo con terapia de pareja en situaciones de pérdida." },
];

const EXPERIENCIA_LABEL: Record<string, string> = {
  "1-2": "1 – 2 años",
  "3-5": "3 – 5 años",
  "6-10": "6 – 10 años",
  "mas-10": "Más de 10 años",
};

type ModalState =
  | { type: "none" }
  | { type: "ver"; psicologo: Psicologo }
  | { type: "agregar" }
  | { type: "completar"; solicitud: Solicitud };

const labelCls = "font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[-0.25px]";
const inputCls = "w-full bg-transparent border-b-[1.5px] border-b-[#fa7e7b] px-[8px] py-[8px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#506685] placeholder-[#cbdcef] outline-none";
const sectionTitle = "font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[16px] leading-[24px] mt-[8px]";

function CheckTag({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`cursor-pointer px-[14px] py-[6px] rounded-full border text-[14px] font-['Poppins:Regular',sans-serif] transition-colors ${
        checked ? "bg-[#fa7e7b] border-[#fa7e7b] text-white" : "border-[#cbdcef] text-[#506685] hover:border-[#fa7e7b]"
      }`}
    >
      {label}
    </button>
  );
}

function PsicologoDetalleModal({ psicologo, onClose, onInactivar }: { psicologo: Psicologo; onClose: () => void; onInactivar: (id: number) => void }) {
  const diasActivos = DIAS.filter(d => psicologo.horario[d]?.activo);
  const valueCls = "font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[16px]";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-[20px] w-[580px] max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white px-[32px] pt-[32px] pb-[16px] flex items-center justify-between border-b border-[#f0f0f0]">
          <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[20px] leading-[28px]">Información del psicólogo</p>
          <button onClick={onClose} className="text-[#506685] hover:opacity-70 text-[24px] leading-none cursor-pointer">×</button>
        </div>
        <div className="px-[32px] py-[24px] flex flex-col gap-[24px]">

          {/* Perfil público: esto es lo que ven las familias en la web */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[2px]">
              <p className="font-['Poppins:SemiBold',sans-serif] text-[#fa7e7b] text-[13px] uppercase tracking-[0.5px]">Perfil público</p>
              <p className="font-['Poppins:Regular',sans-serif] text-[#8a96a8] text-[12px]">Esto es lo que verán las familias en la página web.</p>
            </div>

            {psicologo.imagen && (
              <img src={psicologo.imagen} alt={psicologo.nombre} className="w-[80px] h-[80px] rounded-full object-cover border-2 border-[#fa7e7b]" />
            )}

            <div className="flex flex-col gap-[4px]">
              <p className={labelCls}>Nombre</p>
              <p className={valueCls}>{psicologo.nombre}</p>
            </div>

            {psicologo.descripcion && (
              <div className="flex flex-col gap-[4px]">
                <p className={labelCls}>Descripción</p>
                <p className={valueCls}>{psicologo.descripcion}</p>
              </div>
            )}

            <div className="flex flex-col gap-[8px]">
              <p className={labelCls}>Especialidades</p>
              <div className="flex flex-wrap gap-[8px]">
                {psicologo.especialidades.map(e => <span key={e} className="px-[12px] py-[4px] bg-[rgba(250,126,123,0.1)] text-[#fa7e7b] rounded-full text-[13px] font-['Poppins:Regular',sans-serif]">{e}</span>)}
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <p className={labelCls}>Idiomas</p>
              <div className="flex flex-wrap gap-[8px]">
                {psicologo.idiomas.map(i => <span key={i} className="px-[12px] py-[4px] bg-[rgba(80,102,133,0.1)] text-[#506685] rounded-full text-[13px] font-['Poppins:Regular',sans-serif]">{i}</span>)}
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <p className={labelCls}>Audiencia</p>
              <div className="flex flex-wrap gap-[8px]">
                {psicologo.audiencia.map(a => <span key={a} className="px-[12px] py-[4px] bg-[rgba(80,102,133,0.1)] text-[#506685] rounded-full text-[13px] font-['Poppins:Regular',sans-serif]">{a}</span>)}
              </div>
            </div>
          </div>

          <div className="border-t border-[#f0f0f0]" />

          {/* Información interna: solo para uso administrativo, no se publica */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[2px]">
              <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[13px] uppercase tracking-[0.5px]">Información interna</p>
              <p className="font-['Poppins:Regular',sans-serif] text-[#8a96a8] text-[12px]">Uso administrativo, no se publica en la web.</p>
            </div>

            {[
              ["Correo", psicologo.email],
              ["Teléfono", psicologo.telefono],
              ...(psicologo.cedula ? [["Cédula", psicologo.cedula]] : []),
            ].map(([lbl, val]) => (
              <div key={lbl} className="flex flex-col gap-[4px] border-b border-b-[#fa7e7b] pb-[8px]">
                <p className={labelCls}>{lbl}</p>
                <p className={valueCls}>{val}</p>
              </div>
            ))}

            <div className="flex flex-col gap-[4px]">
              <p className={labelCls}>Currículum (CV)</p>
              {psicologo.cvUrl ? (
                <a
                  href={psicologo.cvUrl}
                  download={psicologo.cvNombre || "cv"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] bg-[#f8f9fb] border border-[#e5e9f0] font-['Poppins:Regular',sans-serif] text-[#506685] text-[13px] hover:bg-[#eef1f6]"
                >
                  📄 {psicologo.cvNombre || "Ver archivo"}
                </a>
              ) : (
                <p className="font-['Poppins:Regular',sans-serif] text-[#8a96a8] text-[13px]">Sin archivo adjunto</p>
              )}
            </div>

            {diasActivos.length > 0 && (
              <div className="flex flex-col gap-[8px]">
                <p className={labelCls}>Horario disponible</p>
                {diasActivos.map(d => (
                  <div key={d} className="flex gap-[8px] items-center">
                    <span className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[14px] w-[90px]">{d}</span>
                    <span className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px]">{psicologo.horario[d].inicio} – {psicologo.horario[d].fin}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-[12px] bg-[#f8f9fb] rounded-[12px] p-[16px]">
              <p className={labelCls}>Estado del psicólogo</p>
              <div className="flex items-center gap-[12px]">
                <span className={`px-[12px] py-[4px] rounded-full text-[13px] font-['Poppins:SemiBold',sans-serif] ${psicologo.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {psicologo.activo ? "Activo" : "Inactivo"}
                </span>
              </div>
              <p className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[13px] leading-[20px]">
                {psicologo.activo
                  ? "Activo: el psicólogo aparece disponible para los usuarios y puede recibir nuevas citas, cada una con su propio link de Google Meet."
                  : "Inactivo: el psicólogo no aparece disponible para los usuarios y no puede recibir nuevas citas."}
              </p>
              <button
                onClick={() => onInactivar(psicologo.id)}
                className={`cursor-pointer self-start px-[16px] py-[8px] rounded-[8px] font-['Poppins:SemiBold',sans-serif] text-[13px] text-white transition-colors ${psicologo.activo ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
              >
                {psicologo.activo ? "Inactivar psicólogo" : "Activar psicólogo"}
              </button>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white px-[32px] pb-[32px] pt-[16px] flex gap-[12px] justify-end border-t border-[#f0f0f0]">
          <button onClick={onClose} className="cursor-pointer px-[20px] py-[10px] rounded-[8px] border border-[#506685] font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] hover:bg-[#f0f4f8]">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

type FormState = {
  nombre: string;
  email: string;
  telefono: string;
  descripcion: string;
  especialidades: string[];
  idiomas: string[];
  audiencia: string[];
  horario: Record<string, HorarioDia>;
  imagen: string;
};

function AgregarPsicologoModal({ onClose, onAgregar, solicitudInicial }: { onClose: () => void; onAgregar: (p: Omit<Psicologo, "id" | "activo">) => void; solicitudInicial?: Solicitud }) {
  const [form, setForm] = useState<FormState>({
    nombre: solicitudInicial?.nombre ?? "",
    email: solicitudInicial?.email ?? "",
    telefono: "",
    descripcion: "",
    especialidades: solicitudInicial?.especialidades ?? [],
    idiomas: [], audiencia: [],
    horario: horarioDefault(), imagen: "",
  });

  const setField = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const toggleArr = (k: "especialidades" | "idiomas" | "audiencia", val: string) =>
    setForm(f => ({
      ...f,
      [k]: f[k].includes(val) ? f[k].filter(x => x !== val) : [...f[k], val],
    }));

  const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setForm(f => ({ ...f, imagen: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const submit = () => {
    if (!form.nombre.trim()) return;
    onAgregar({
      nombre: form.nombre, email: form.email, telefono: form.telefono,
      descripcion: form.descripcion,
      especialidades: form.especialidades, idiomas: form.idiomas,
      audiencia: form.audiencia, horario: form.horario,
      imagen: form.imagen || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-[20px] w-[640px] max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white px-[32px] pt-[32px] pb-[16px] flex items-center justify-between border-b border-[#f0f0f0]">
          <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[20px] leading-[28px]">{solicitudInicial ? "Completar información del psicólogo" : "Agregar psicólogo"}</p>
          <button onClick={onClose} className="text-[#506685] hover:opacity-70 text-[24px] leading-none cursor-pointer">×</button>
        </div>

        <div className="px-[32px] py-[24px] flex flex-col gap-[24px]">
          {/* Imagen */}
          <div className="flex flex-col gap-[8px]">
            <p className={sectionTitle}>Foto de perfil</p>
            <div className="flex items-center gap-[16px]">
              {form.imagen
                ? <img src={form.imagen} alt="" className="w-[72px] h-[72px] rounded-full object-cover border-2 border-[#fa7e7b]" />
                : <div className="w-[72px] h-[72px] rounded-full bg-[#cbdcef]/30 border-2 border-dashed border-[#cbdcef] flex items-center justify-center text-[#cbdcef] text-[24px]">+</div>
              }
              <label className="cursor-pointer px-[16px] py-[8px] border-b-[1.5px] border-b-[#fa7e7b] font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] hover:opacity-70">
                Seleccionar imagen
                <input type="file" accept="image/*" className="hidden" onChange={handleImagen} />
              </label>
            </div>
          </div>

          {/* Datos básicos */}
          <div className="flex flex-col gap-[20px]">
            <p className={sectionTitle}>Información básica</p>
            {([ ["nombre","Nombre completo","text"], ["email","Correo electrónico","email"], ["telefono","Teléfono","text"] ] as const).map(([k, lbl]) => (
              <div key={k} className="flex flex-col gap-[4px]">
                <label className={labelCls}>{lbl}</label>
                <input className={inputCls} placeholder="Escriba aquí" value={form[k]} onChange={setField(k)} />
              </div>
            ))}
            <div className="flex flex-col gap-[4px]">
              <label className={labelCls}>Descripción</label>
              <textarea
                className="w-full bg-transparent border-b-[1.5px] border-b-[#fa7e7b] px-[8px] py-[8px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#506685] placeholder-[#cbdcef] outline-none resize-none"
                rows={3}
                placeholder="Escriba aquí"
                value={form.descripcion}
                onChange={setField("descripcion")}
              />
            </div>
          </div>

          {/* Especialidades */}
          <div className="flex flex-col gap-[12px]">
            <p className={sectionTitle}>Especialidades</p>
            <div className="flex flex-wrap gap-[8px]">
              {ESPECIALIDADES.map(e => (
                <CheckTag key={e} label={e} checked={form.especialidades.includes(e)} onChange={() => toggleArr("especialidades", e)} />
              ))}
            </div>
          </div>

          {/* Idiomas */}
          <div className="flex flex-col gap-[12px]">
            <p className={sectionTitle}>Idioma de atención</p>
            <div className="flex flex-wrap gap-[8px]">
              {IDIOMAS.map(i => (
                <CheckTag key={i} label={i} checked={form.idiomas.includes(i)} onChange={() => toggleArr("idiomas", i)} />
              ))}
            </div>
          </div>

          {/* Audiencia */}
          <div className="flex flex-col gap-[12px]">
            <p className={sectionTitle}>Atención dirigida a</p>
            <div className="flex flex-wrap gap-[8px]">
              {AUDIENCIA.map(a => (
                <CheckTag key={a} label={a} checked={form.audiencia.includes(a)} onChange={() => toggleArr("audiencia", a)} />
              ))}
            </div>
          </div>

        </div>

        <div className="sticky bottom-0 bg-white px-[32px] pb-[32px] pt-[16px] flex gap-[12px] justify-end border-t border-[#f0f0f0]">
          <button onClick={onClose} className="cursor-pointer px-[20px] py-[10px] rounded-[8px] border border-[#506685] font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] hover:bg-[#f0f4f8]">
            Cancelar
          </button>
          <button onClick={submit} className="cursor-pointer px-[20px] py-[10px] rounded-[8px] bg-[#fa7e7b] hover:bg-[#e86e6b] font-['Poppins:SemiBold',sans-serif] text-white text-[14px]">
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

function SolicitudModal({ solicitud, onClose, onAprobar, onRechazar }: {
  solicitud: Solicitud;
  onClose: () => void;
  onAprobar: (datos: Omit<Psicologo, "id" | "activo">) => void;
  onRechazar: () => void;
}) {
  const [form, setForm] = useState({
    telefono: "",
    descripcion: "",
    especialidades: solicitud.especialidades,
    idiomas: [] as string[],
    audiencia: [] as string[],
    horario: horarioDefault(),
    imagen: solicitud.fotoUrl ?? "",
    cvNombre: solicitud.cvNombre ?? "",
    cvUrl: solicitud.cvUrl ?? "",
  });

  const toggleArr = (k: "especialidades" | "idiomas" | "audiencia", val: string) =>
    setForm(f => ({ ...f, [k]: f[k].includes(val) ? f[k].filter(x => x !== val) : [...f[k], val] }));

  const handleCv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setForm(f => ({ ...f, cvNombre: file.name, cvUrl: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setForm(f => ({ ...f, imagen: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-[20px] w-[640px] max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white px-[32px] pt-[32px] pb-[16px] flex items-center justify-between border-b border-[#f0f0f0]">
          <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[20px] leading-[28px]">Solicitud de psicólogo</p>
          <button onClick={onClose} className="text-[#506685] hover:opacity-70 text-[24px] leading-none cursor-pointer">×</button>
        </div>

        <div className="px-[32px] py-[24px] flex flex-col gap-[24px]">
          {/* Info de la solicitud */}
          <div className="bg-[#f8f9fb] rounded-[12px] p-[16px] flex flex-col gap-[12px]">
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[14px]">Información de la solicitud</p>
            {[["Nombre", solicitud.nombre], ["Correo", solicitud.email], ["Cédula", solicitud.cedula], ["Experiencia", EXPERIENCIA_LABEL[solicitud.experiencia] ?? solicitud.experiencia], ["Fecha", solicitud.fecha]].map(([lbl, val]) => (
              <div key={lbl} className="flex gap-[8px]">
                <span className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[13px] w-[80px] shrink-0">{lbl}:</span>
                <span className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[13px]">{val}</span>
              </div>
            ))}
            {solicitud.mensaje && (
              <div className="flex flex-col gap-[4px]">
                <span className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[13px]">Mensaje:</span>
                <span className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[13px] leading-[20px]">{solicitud.mensaje}</span>
              </div>
            )}
          </div>

          {/* Foto */}
          <div className="flex flex-col gap-[8px]">
            <p className={sectionTitle}>Foto de perfil</p>
            <p className="font-['Poppins:Regular',sans-serif] text-[#8a96a8] text-[12px] -mt-[4px]">Esta es la imagen que verán las familias en la página web.</p>
            <div className="flex items-center gap-[16px]">
              {form.imagen
                ? <img src={form.imagen} alt="" className="w-[72px] h-[72px] rounded-full object-cover border-2 border-[#fa7e7b]" />
                : <div className="w-[72px] h-[72px] rounded-full bg-[#cbdcef]/30 border-2 border-dashed border-[#cbdcef] flex items-center justify-center text-[#cbdcef] text-[24px]">+</div>
              }
              {form.imagen ? (
                <div className="flex items-center gap-[16px]">
                  <label className="cursor-pointer font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] hover:opacity-70">
                    Reemplazar
                    <input type="file" accept="image/*" className="hidden" onChange={handleImagen} />
                  </label>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, imagen: "" }))}
                    className="cursor-pointer font-['Poppins:Regular',sans-serif] text-red-500 text-[14px] hover:opacity-70"
                  >
                    Eliminar
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer px-[16px] py-[8px] border-b-[1.5px] border-b-[#fa7e7b] font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] hover:opacity-70">
                  Seleccionar imagen
                  <input type="file" accept="image/*" className="hidden" onChange={handleImagen} />
                </label>
              )}
            </div>
          </div>

          {/* CV */}
          <div className="flex flex-col gap-[8px]">
            <p className={sectionTitle}>Currículum (CV)</p>
            <div className="flex items-center gap-[12px] flex-wrap">
              {form.cvUrl ? (
                <>
                  <a
                    href={form.cvUrl}
                    download={form.cvNombre || "cv"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] bg-[#f8f9fb] border border-[#e5e9f0] font-['Poppins:Regular',sans-serif] text-[#506685] text-[13px] hover:bg-[#eef1f6]"
                  >
                    📄 {form.cvNombre || "Ver archivo"}
                  </a>
                  <label className="cursor-pointer font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] hover:opacity-70">
                    Reemplazar
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCv} />
                  </label>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, cvNombre: "", cvUrl: "" }))}
                    className="cursor-pointer font-['Poppins:Regular',sans-serif] text-red-500 text-[14px] hover:opacity-70"
                  >
                    Eliminar
                  </button>
                </>
              ) : (
                <>
                  <span className="font-['Poppins:Regular',sans-serif] text-[#8a96a8] text-[13px]">Sin archivo adjunto</span>
                  <label className="cursor-pointer px-[16px] py-[8px] border-b-[1.5px] border-b-[#fa7e7b] font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] hover:opacity-70">
                    Seleccionar archivo
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCv} />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Teléfono */}
          <div className="flex flex-col gap-[4px]">
            <label className={labelCls}>Teléfono de contacto</label>
            <input className={inputCls} placeholder="Escriba aquí" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} />
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-[4px]">
            <label className={labelCls}>Descripción</label>
            <p className="font-['Poppins:Regular',sans-serif] text-[#8a96a8] text-[12px] -mt-[2px]">Este texto se mostrará como descripción del psicólogo en la página web.</p>
            <textarea className="w-full bg-transparent border-b-[1.5px] border-b-[#fa7e7b] px-[8px] py-[8px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#506685] placeholder-[#cbdcef] outline-none resize-none" rows={3} placeholder="Escriba aquí" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} />
          </div>

          {/* Especialidades */}
          <div className="flex flex-col gap-[12px]">
            <p className={sectionTitle}>Especialidades</p>
            <div className="flex flex-wrap gap-[8px]">
              {ESPECIALIDADES.map(e => <CheckTag key={e} label={e} checked={form.especialidades.includes(e)} onChange={() => toggleArr("especialidades", e)} />)}
            </div>
          </div>

          {/* Idiomas */}
          <div className="flex flex-col gap-[12px]">
            <p className={sectionTitle}>Idioma de atención</p>
            <div className="flex flex-wrap gap-[8px]">
              {IDIOMAS.map(i => <CheckTag key={i} label={i} checked={form.idiomas.includes(i)} onChange={() => toggleArr("idiomas", i)} />)}
            </div>
          </div>

          {/* Audiencia */}
          <div className="flex flex-col gap-[12px]">
            <p className={sectionTitle}>Atención dirigida a</p>
            <div className="flex flex-wrap gap-[8px]">
              {AUDIENCIA.map(a => <CheckTag key={a} label={a} checked={form.audiencia.includes(a)} onChange={() => toggleArr("audiencia", a)} />)}
            </div>
          </div>

        </div>

        <div className="sticky bottom-0 bg-white px-[32px] pb-[32px] pt-[16px] flex gap-[12px] justify-end border-t border-[#f0f0f0]">
          <button
            onClick={() => { onRechazar(); onClose(); }}
            className="cursor-pointer px-[20px] py-[10px] rounded-[8px] border border-red-400 font-['Poppins:Regular',sans-serif] text-red-500 text-[14px] hover:bg-red-50"
          >
            Rechazar solicitud
          </button>
          <button
            onClick={() => {
              onAprobar({
                nombre: solicitud.nombre, email: solicitud.email, telefono: form.telefono,
                cedula: solicitud.cedula,
                descripcion: form.descripcion,
                especialidades: form.especialidades, idiomas: form.idiomas,
                audiencia: form.audiencia, horario: form.horario,
                imagen: form.imagen || undefined,
                cvNombre: form.cvNombre || undefined,
                cvUrl: form.cvUrl || undefined,
              });
              onClose();
            }}
            className="cursor-pointer px-[20px] py-[10px] rounded-[8px] bg-[#fa7e7b] hover:bg-[#e86e6b] font-['Poppins:SemiBold',sans-serif] text-white text-[14px]"
          >
            Agregar psicólogo
          </button>
        </div>
      </div>
    </div>
  );
}

function PsicologosSection({ psicologos, toggleActivo, agregar }: {
  psicologos: Psicologo[];
  toggleActivo: (id: number) => void;
  agregar: (data: Omit<Psicologo, "id" | "activo">) => void;
}) {
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [subTab, setSubTab] = useState<"lista" | "solicitudes" | "citas">("lista");
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(() => [...solicitudesIniciales, ...leerSolicitudesGuardadas()]);
  const [citas] = useState<Cita[]>(citasIniciales);
  const [verUsuario, setVerUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const sincronizar = () => setSolicitudes([...solicitudesIniciales, ...leerSolicitudesGuardadas()]);
    window.addEventListener(SOLICITUDES_UPDATED_EVENT, sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener(SOLICITUDES_UPDATED_EVENT, sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const nombrePsicologo = (id: number) => psicologos.find(p => p.id === id)?.nombre ?? "—";

  const rechazarSolicitud = (id: number) => {
    eliminarSolicitudGuardada(id);
    setSolicitudes(s => s.filter(x => x.id !== id));
  };

  const aprobarSolicitud = (solicitud: Solicitud, datos: Omit<Psicologo, "id" | "activo">) => {
    agregar(datos);
    eliminarSolicitudGuardada(solicitud.id);
    setSolicitudes(s => s.filter(x => x.id !== solicitud.id));
  };

  const subTabCls = (active: boolean) =>
    `cursor-pointer px-[20px] py-[8px] font-['Poppins:SemiBold',sans-serif] text-[14px] rounded-full transition-colors ${
      active ? "bg-[#506685] text-white" : "text-[#506685] hover:bg-[#506685]/10"
    }`;

  return (
    <div className="w-full">
      {modal.type === "ver" && (
        <PsicologoDetalleModal
          psicologo={psicologos.find(p => p.id === modal.psicologo.id) ?? modal.psicologo}
          onClose={() => setModal({ type: "none" })}
          onInactivar={toggleActivo}
        />
      )}
      {modal.type === "agregar" && (
        <AgregarPsicologoModal onClose={() => setModal({ type: "none" })} onAgregar={agregar} />
      )}
      {modal.type === "completar" && (
        <SolicitudModal
          solicitud={modal.solicitud}
          onClose={() => setModal({ type: "none" })}
          onAprobar={datos => aprobarSolicitud(modal.solicitud, datos)}
          onRechazar={() => rechazarSolicitud(modal.solicitud.id)}
        />
      )}

      <div className="bg-[rgba(224,210,183,0.2)] rounded-[20px] p-[24px] w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-[20px]">
          <div className="flex items-center gap-[8px] bg-white rounded-full p-[4px]">
            <button className={subTabCls(subTab === "lista")} onClick={() => setSubTab("lista")}>
              Psicólogos
              {psicologos.length > 0 && (
                <span className={`ml-[6px] px-[6px] py-[1px] rounded-full text-[11px] ${subTab === "lista" ? "bg-white/30" : "bg-[#506685]/10"}`}>
                  {psicologos.length}
                </span>
              )}
            </button>
            <button className={subTabCls(subTab === "solicitudes")} onClick={() => setSubTab("solicitudes")}>
              Solicitudes
              {solicitudes.length > 0 && (
                <span className={`ml-[6px] px-[6px] py-[1px] rounded-full text-[11px] ${subTab === "solicitudes" ? "bg-white/30" : "bg-[#fa7e7b]/20 text-[#fa7e7b]"}`}>
                  {solicitudes.length}
                </span>
              )}
            </button>
            <button className={subTabCls(subTab === "citas")} onClick={() => setSubTab("citas")}>
              Citas
              {citas.length > 0 && (
                <span className={`ml-[6px] px-[6px] py-[1px] rounded-full text-[11px] ${subTab === "citas" ? "bg-white/30" : "bg-[#506685]/10"}`}>
                  {citas.length}
                </span>
              )}
            </button>
          </div>
          {subTab === "lista" && (
            <button
              onClick={() => setModal({ type: "agregar" })}
              className="cursor-pointer flex items-center gap-[8px] bg-[#fa7e7b] hover:bg-[#e86e6b] text-white font-['Poppins:SemiBold',sans-serif] text-[14px] px-[20px] py-[10px] rounded-[8px] transition-colors"
            >
              <span className="text-[18px] leading-none">+</span>
              Agregar psicólogo
            </button>
          )}
        </div>

        {/* Lista de psicólogos */}
        {subTab === "lista" && (
          <div className="w-full overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="flex gap-[16px] px-[16px] pb-[8px] border-b border-[#e0e0e0]">
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[240px] shrink-0">Nombre</p>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] flex-1">Especialidades</p>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[80px] shrink-0">Estado</p>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[80px] shrink-0">Acciones</p>
              </div>
              {psicologos.map((p, i) => (
                <div key={p.id} className={`flex gap-[16px] items-center px-[16px] py-[14px] ${i % 2 === 0 ? "bg-[#f6f6f6]" : "bg-white"} rounded-[5px]`}>
                  <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] w-[240px] shrink-0">{p.nombre}</p>
                  <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] flex-1 truncate" title={p.especialidades.join(", ")}>{p.especialidades.join(", ") || "—"}</p>
                  <div className="w-[80px] shrink-0 flex justify-start">
                    <span className={`px-[8px] py-[2px] rounded-full text-[12px] font-['Poppins:SemiBold',sans-serif] ${p.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {p.activo ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <div className="w-[80px] shrink-0 flex justify-start">
                    <button
                      onClick={() => setModal({ type: "ver", psicologo: p })}
                      className="cursor-pointer px-[10px] py-[5px] rounded-[5px] border border-[#506685] font-['Poppins:Regular',sans-serif] text-[#506685] text-[12px] hover:bg-[#f0f4f8]"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              ))}
              {psicologos.length === 0 && (
                <div className="py-[40px] text-center">
                  <p className="font-['Poppins:Regular',sans-serif] text-[#bebebe] text-[16px]">No hay psicólogos registrados</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Solicitudes */}
        {subTab === "solicitudes" && (
          <div className="w-full overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="flex gap-[16px] px-[16px] pb-[8px] border-b border-[#e0e0e0]">
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[200px] shrink-0">Nombre</p>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[190px] shrink-0">Correo</p>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] flex-1">Especialidades</p>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[90px] shrink-0">Fecha</p>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[80px] shrink-0">Acciones</p>
              </div>
              {solicitudes.map((s, i) => (
                <div key={s.id} className={`flex gap-[16px] items-center px-[16px] py-[14px] ${i % 2 === 0 ? "bg-[#f6f6f6]" : "bg-white"} rounded-[5px]`}>
                  <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] w-[200px] shrink-0">{s.nombre}</p>
                  <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] w-[190px] shrink-0 truncate">{s.email}</p>
                  <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] flex-1 truncate" title={s.especialidades.join(", ")}>{s.especialidades.join(", ")}</p>
                  <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[12px] w-[90px] shrink-0">{s.fecha}</p>
                  <div className="w-[80px] shrink-0 flex justify-start">
                    <button
                      onClick={() => setModal({ type: "completar", solicitud: s })}
                      className="cursor-pointer px-[10px] py-[5px] rounded-[5px] border border-[#506685] font-['Poppins:Regular',sans-serif] text-[#506685] text-[12px] hover:bg-[#f0f4f8]"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              ))}
              {solicitudes.length === 0 && (
                <div className="py-[40px] text-center">
                  <p className="font-['Poppins:Regular',sans-serif] text-[#bebebe] text-[16px]">No hay solicitudes pendientes</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Citas */}
        {subTab === "citas" && (
          <div className="w-full overflow-x-auto">
            <div className="min-w-[860px]">
              {verUsuario && (
                <UsuarioDetalleModal
                  usuario={verUsuario}
                  psicologo={psicologos.find(p => p.id === verUsuario.psicologoId)}
                  citas={citas.filter(c => c.usuarioId === verUsuario.id)}
                  psicologos={psicologos}
                  onClose={() => setVerUsuario(null)}
                />
              )}
              <div className="flex gap-[16px] px-[16px] pb-[8px] border-b border-[#e0e0e0]">
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[170px] shrink-0">Psicólogo</p>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[170px] shrink-0">Usuario</p>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[120px] shrink-0">Fecha</p>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] flex-1">Link Google Meet</p>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[100px] shrink-0">Acciones</p>
              </div>
              {citas.map((c, i) => {
                const usuario = usuariosIniciales.find(u => u.id === c.usuarioId);
                return (
                  <div key={c.id} className={`flex gap-[16px] items-center px-[16px] py-[14px] ${i % 2 === 0 ? "bg-[#f6f6f6]" : "bg-white"} rounded-[5px]`}>
                    <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] w-[170px] shrink-0 truncate">{nombrePsicologo(c.psicologoId)}</p>
                    <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] w-[170px] shrink-0 truncate" title={c.usuarioEmail}>{c.usuarioNombre}</p>
                    <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[13px] w-[120px] shrink-0">{c.fecha} · {c.hora}</p>
                    <a href={c.googleMeet} target="_blank" rel="noopener noreferrer" className="font-['Poppins:Regular',sans-serif] text-[#fa7e7b] text-[14px] flex-1 truncate underline">{c.googleMeet}</a>
                    <div className="w-[100px] shrink-0">
                      {usuario ? (
                        <button
                          onClick={() => setVerUsuario(usuario)}
                          className="cursor-pointer px-[10px] py-[5px] rounded-[5px] border border-[#506685] font-['Poppins:Regular',sans-serif] text-[#506685] text-[12px] hover:bg-[#f0f4f8]"
                        >
                          Ver usuario
                        </button>
                      ) : (
                        <span className="font-['Poppins:Regular',sans-serif] text-[#bebebe] text-[12px]">—</span>
                      )}
                    </div>
                  </div>
                );
              })}
              {citas.length === 0 && (
                <div className="py-[40px] text-center">
                  <p className="font-['Poppins:Regular',sans-serif] text-[#bebebe] text-[16px]">No hay citas registradas</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[20%_0_41.33%_38.95%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82.4209 17.2727">
        <g id="Group">
          <path d={svgPaths.p3690a000} fill="var(--fill-0, #506685)" id="Vector" />
          <path d={svgPaths.p369d3f00} fill="var(--fill-0, #506685)" id="Vector_2" />
          <path d={svgPaths.p20225a00} fill="var(--fill-0, #506685)" id="Vector_3" />
          <path d={svgPaths.p2e1bde80} fill="var(--fill-0, #506685)" id="Vector_4" />
          <path d={svgPaths.p211f8300} fill="var(--fill-0, #506685)" id="Vector_5" />
          <path d={svgPaths.p1b739200} fill="var(--fill-0, #506685)" id="Vector_6" />
          <path d={svgPaths.p2ff52b00} fill="var(--fill-0, #506685)" id="Vector_7" />
          <path d={svgPaths.p353ead00} fill="var(--fill-0, #506685)" id="Vector_8" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[0_66.92%_0_0]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.6628 44.6628">
        <g id="Group">
          <path d={svgPaths.pd69380} fill="var(--fill-0, #506685)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p27bef900} fill="var(--fill-0, white)" id="Vector_2" />
            <path d={svgPaths.p18285200} fill="var(--fill-0, white)" id="Vector_3" />
            <path d={svgPaths.p1e584500} fill="var(--fill-0, white)" id="Vector_4" />
            <path d={svgPaths.p31942900} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p21282880} fill="var(--fill-0, white)" id="Vector_6" />
            <path d={svgPaths.p2dfbf80} fill="var(--fill-0, white)" id="Vector_7" />
            <path d={svgPaths.p2634bb70} fill="var(--fill-0, white)" id="Vector_8" />
            <g id="Vector_9" />
            <path d={svgPaths.p3733c600} fill="var(--fill-0, white)" id="Vector_10" />
            <path d={svgPaths.p1cb92200} fill="var(--fill-0, white)" id="Vector_11" />
            <g id="Group_3">
              <path d={svgPaths.p3f4c29f0} fill="var(--fill-0, white)" id="Vector_12" />
              <path d={svgPaths.p3436480} fill="var(--fill-0, white)" id="Vector_13" />
              <path d={svgPaths.p3f355500} fill="var(--fill-0, white)" id="Vector_14" />
            </g>
            <path d={svgPaths.p12879300} fill="var(--fill-0, white)" id="Vector_15" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[71.11%_8.72%_13.32%_47.66%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 58.8926 6.95084">
        <g id="Group">
          <path d={svgPaths.p3db0180} fill="var(--fill-0, #506685)" id="Vector" />
          <path d={svgPaths.p2717c00} fill="var(--fill-0, #506685)" id="Vector_2" />
          <path d={svgPaths.p3882d400} fill="var(--fill-0, #506685)" id="Vector_3" />
          <path d={svgPaths.p8843000} fill="var(--fill-0, #506685)" id="Vector_4" />
          <path d={svgPaths.p2132c400} fill="var(--fill-0, #506685)" id="Vector_5" />
          <path d={svgPaths.p1e682c00} fill="var(--fill-0, #506685)" id="Vector_6" />
          <path d={svgPaths.p3999980} fill="var(--fill-0, #506685)" id="Vector_7" />
          <path d={svgPaths.p34f3ed00} fill="var(--fill-0, #506685)" id="Vector_8" />
          <path d={svgPaths.p352cd580} fill="var(--fill-0, #506685)" id="Vector_9" />
        </g>
      </svg>
    </div>
  );
}

function Instagram() {
  return (
    <div className="relative shrink-0 size-[24.471px]" data-name="Instagram">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.4706 24.4706">
        <g id="Instagram">
          <path d={svgPaths.p22645180} fill="var(--fill-0, #506685)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Facebook() {
  return (
    <div className="relative shrink-0 size-[24.471px]" data-name="Facebook">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.4706 24.4706">
        <g id="Facebook">
          <path clipRule="evenodd" d={svgPaths.p3daa1600} fill="var(--fill-0, #506685)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Linkedin() {
  return (
    <div className="relative shrink-0 size-[24.471px]" data-name="Linkedin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.4706 24.4706">
        <g id="Linkedin">
          <path clipRule="evenodd" d={svgPaths.p1692dcc0} fill="var(--fill-0, #506685)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Youtube() {
  return (
    <div className="h-[24.471px] relative shrink-0 w-[31.353px]" data-name="Youtube">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.3529 24.4706">
        <g id="Youtube">
          <path d={svgPaths.pf269840} fill="var(--fill-0, #506685)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-start flex flex-wrap gap-[6.117647171020508px_16px] items-start relative shrink-0 w-full">
      <Instagram />
      <Facebook />
      <Linkedin />
      <Youtube />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[56px] items-start relative shrink-0 w-[170px]">
      <div className="h-[44.663px] overflow-clip relative shrink-0 w-[135px]" data-name="Logo Baby Bear">
        <Group />
        <Group1 />
        <Group2 />
      </div>
      <Frame />
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start overflow-clip relative shrink-0 w-[170px]" data-name="Column 1">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[24px] relative shrink-0 tracking-[0.1px] w-full">Acerca de nosotros</p>
      <div className="font-['Poppins:Regular',sans-serif] h-[96px] leading-[0] relative shrink-0 w-full">
        <p className="leading-[24px] mb-0">Nuestra historia</p>
        <p className="leading-[24px] mb-0">Porqué lo hacemos</p>
        <p className="leading-[24px]">Cómo lo hacemos</p>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start overflow-clip relative shrink-0 w-[170px]" data-name="Column 4">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[24px] relative shrink-0 tracking-[0.1px] w-full">Únete a la familia</p>
      <div className="font-['Poppins:Regular',sans-serif] leading-[0] relative shrink-0 w-full">
        <p className="leading-[24px] mb-0">Donaciones</p>
        <p className="leading-[24px]">Cómo sumarme</p>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start overflow-clip relative shrink-0 w-[200px]" data-name="Column 5">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[24px] relative shrink-0 tracking-[0.1px] w-full">Contáctanos</p>
      <div className="font-['Poppins:Regular',sans-serif] leading-[0] relative shrink-0 w-full">
        <p className="leading-[24px] mb-0">Laurasanint@babybear</p>
        <p className="leading-[24px]">foundation.org</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[48px] items-start not-italic relative shrink-0 text-[#506685] text-[16px]">
      <Column />
      <Column1 />
      <Column2 />
    </div>
  );
}

function Muted() {
  return (
    <div className="absolute h-[24px] left-[16px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-16px_-12px] mask-size-[350px_48px] opacity-50 overflow-clip top-[12px] w-[86px]" style={{ maskImage: `url("${imgControl}")` }} data-name="Muted">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#506685] text-[16px] top-0 tracking-[0.1px] whitespace-nowrap">Suscríbete</p>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="Input">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 350 48">
        <g id="Input">
          <path clipRule="evenodd" d="M0 0H350V48H0V0Z" fill="var(--fill-0, #CBDCEF)" fillOpacity="0.4" fillRule="evenodd" style={{ mixBlendMode: "multiply" }} />
        </g>
      </svg>
      <div className="absolute bottom-[12px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-314px_-12px] mask-size-[350px_48px] opacity-40 right-[12px] size-[24px]" style={{ maskImage: `url("${imgControl}")` }} data-name="Control" />
      <Muted />
    </div>
  );
}

function Icons() {
  return (
    <div className="-translate-y-1/2 absolute right-[10px] size-[24px] top-1/2" data-name="Icons">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icons">
          <path clipRule="evenodd" d={svgPaths.p42680} fill="var(--fill-0, #506685)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Subscribe() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0" data-name="Subscribe">
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[0.1px] whitespace-nowrap">Suscríbete</p>
      <div className="h-[48px] overflow-clip relative shrink-0 w-[350px]" data-name="Input">
        <Input />
        <Icons />
      </div>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#506685] text-[12px] w-[350px]">Suscríbete a nuestro boletín para estar al día de todas nuestras acciones.</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full max-w-[1320px] mx-auto">
      <Frame3 />
      <Frame1 />
      <Subscribe />
    </div>
  );
}

function Menu() {
  return (
    <div className="content-stretch flex font-['Poppins:Medium',sans-serif] gap-[24px] items-start p-[16px] relative shrink-0" data-name="Menu">
      <p className="relative shrink-0">Términos y condiciones</p>
      <p className="relative shrink-0">Política de privacidad</p>
      <p className="relative shrink-0">Documentación Legal</p>
    </div>
  );
}

function Legales() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[14px] items-center leading-[20px] not-italic relative shrink-0 text-[#506685] text-[14px] whitespace-nowrap" data-name="Legales">
      <Menu />
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0">© 2024 Baby Bear Foundation. All right reserved.</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[20%_0_41.33%_38.95%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 119.052 24.9495">
        <g id="Group">
          <path d={svgPaths.p18f79800} fill="var(--fill-0, #506685)" id="Vector" />
          <path d={svgPaths.p2dc6100} fill="var(--fill-0, #506685)" id="Vector_2" />
          <path d={svgPaths.p3dd54200} fill="var(--fill-0, #506685)" id="Vector_3" />
          <path d={svgPaths.p11708c80} fill="var(--fill-0, #506685)" id="Vector_4" />
          <path d={svgPaths.p25333300} fill="var(--fill-0, #506685)" id="Vector_5" />
          <path d={svgPaths.pb88bbf0} fill="var(--fill-0, #506685)" id="Vector_6" />
          <path d={svgPaths.p10ea5a80} fill="var(--fill-0, #506685)" id="Vector_7" />
          <path d={svgPaths.p26553200} fill="var(--fill-0, #506685)" id="Vector_8" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[0_66.92%_0_0]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64.5129 64.5129">
        <g id="Group">
          <path d={svgPaths.p21bb8c80} fill="var(--fill-0, #506685)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.pbc90880} fill="var(--fill-0, white)" id="Vector_2" />
            <path d={svgPaths.p140b6780} fill="var(--fill-0, white)" id="Vector_3" />
            <path d={svgPaths.p11883080} fill="var(--fill-0, white)" id="Vector_4" />
            <path d={svgPaths.p96d3500} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p10cc2e00} fill="var(--fill-0, white)" id="Vector_6" />
            <path d={svgPaths.pe59a700} fill="var(--fill-0, white)" id="Vector_7" />
            <path d={svgPaths.p2de8ae00} fill="var(--fill-0, white)" id="Vector_8" />
            <g id="Vector_9" />
            <path d={svgPaths.p24ea5600} fill="var(--fill-0, white)" id="Vector_10" />
            <path d={svgPaths.p8eb4e00} fill="var(--fill-0, white)" id="Vector_11" />
            <g id="Group_3">
              <path d={svgPaths.p2341ae30} fill="var(--fill-0, white)" id="Vector_12" />
              <path d={svgPaths.pac26e00} fill="var(--fill-0, white)" id="Vector_13" />
              <path d={svgPaths.p35caa100} fill="var(--fill-0, white)" id="Vector_14" />
            </g>
            <path d={svgPaths.p9ab4200} fill="var(--fill-0, white)" id="Vector_15" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[71.11%_8.72%_13.32%_47.66%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.0671 10.0401">
        <g id="Group">
          <path d={svgPaths.p1776c500} fill="var(--fill-0, #506685)" id="Vector" />
          <path d={svgPaths.pc4bc200} fill="var(--fill-0, #506685)" id="Vector_2" />
          <path d={svgPaths.p22cdbf80} fill="var(--fill-0, #506685)" id="Vector_3" />
          <path d={svgPaths.p16f69700} fill="var(--fill-0, #506685)" id="Vector_4" />
          <path d={svgPaths.p121b7800} fill="var(--fill-0, #506685)" id="Vector_5" />
          <path d={svgPaths.p3bd01e00} fill="var(--fill-0, #506685)" id="Vector_6" />
          <path d={svgPaths.p3792df80} fill="var(--fill-0, #506685)" id="Vector_7" />
          <path d={svgPaths.p3f57c800} fill="var(--fill-0, #506685)" id="Vector_8" />
          <path d={svgPaths.p36710640} fill="var(--fill-0, #506685)" id="Vector_9" />
        </g>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] text-center tracking-[0.1px] whitespace-nowrap">Eng</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <div className="relative size-[10px]">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66026 7.5">
                <path d={svgPaths.p2c884700} fill="var(--fill-0, #506685)" id="Polygon 1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Menu1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0" data-name="Menu">
      <button onClick={() => goTo("home")} className="cursor-pointer hover:opacity-70 transition-opacity [word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] text-center tracking-[0.1px] whitespace-nowrap">Inicio</button>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] text-center tracking-[0.1px] whitespace-nowrap">Nuestra historia</p>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] text-center tracking-[0.1px] whitespace-nowrap">Cómo lo hacemos</p>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] text-center tracking-[0.1px] whitespace-nowrap">Sé parte de la familia</p>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] text-center tracking-[0.1px] whitespace-nowrap">Cursos</p>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] text-center tracking-[0.1px] whitespace-nowrap">Contáctanos</p>
      <Frame26 />
      <button
        onClick={() => goTo("dashboard")}
        className="relative shrink-0 size-[32px] cursor-pointer hover:opacity-70 transition-opacity"
        data-name="UserCircle"
        aria-label="Ir al dashboard"
      >
        <div className="absolute inset-[9.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
            <path clipRule="evenodd" d={svgPaths.p1f62a880} fill="var(--fill-0, #506685)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </button>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#fa7e7b] col-1 content-stretch flex gap-[10px] items-center justify-center ml-0 mt-0 overflow-clip py-[50px] relative row-1 w-[160px]">
      <p className="[word-break:break-word] font-['Quicksand:SemiBold',sans-serif] font-semibold leading-[60px] relative shrink-0 text-[24px] text-white tracking-[-1px] whitespace-nowrap">Donar</p>
      <div className="h-[19.261px] relative shrink-0 w-[20.195px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1946 19.2605">
          <path d={svgPaths.p54a9a80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DonacionesButton() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Donaciones Button">
      <Frame25 />
    </div>
  );
}

function HeaderMenu1() {
  return (
    <div className="absolute bg-[#cbdcef] content-stretch flex inset-0 items-center justify-between overflow-clip pl-[48px] py-[48px]" data-name="Header Menu">
      <button onClick={() => goTo("home")} className="cursor-pointer hover:opacity-80 transition-opacity h-[64.513px] overflow-clip relative shrink-0 w-[195px]" data-name="Logo Baby Bear">
        <Group3 />
        <Group4 />
        <Group5 />
      </button>
      <Menu1 />
      <DonacionesButton />
    </div>
  );
}

function HeaderMenu() {
  return (
    <div className="relative h-[120px] w-full" data-name="Header Menu">
      <div className="mx-auto max-w-[1512px]">
        <HeaderMenu1 />
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="block w-full h-[2px]" fill="none" preserveAspectRatio="none" viewBox="0 0 1512 2">
          <line id="Line 1" stroke="var(--stroke-0, #FA7E7B)" strokeWidth="2" x2="1512" y1="1" y2="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:SemiBold',sans-serif] leading-[28px] min-w-px not-italic relative text-[#506685] text-[24px]">Estadísticas generales</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px relative">
      <div className="relative shrink-0 size-[30px]" data-name="UsersThree">
        <div className="absolute inset-[17.24%_1.56%_12.5%_1.56%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.0625 21.0783">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.pfe394e0} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
              <path d={svgPaths.p175a0c00} fill="var(--fill-0, #FA7E7B)" />
              <path d={svgPaths.p3d054f00} fill="var(--fill-0, #FA7E7B)" />
              <path d={svgPaths.p204ac000} fill="var(--fill-0, #FA7E7B)" />
              <path d={svgPaths.p1e447f80} fill="var(--fill-0, #FA7E7B)" />
              <path d={svgPaths.p139dd300} fill="var(--fill-0, #FA7E7B)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">Usuarios inscritos</p>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">50</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px relative">
      <div className="relative shrink-0 size-[30px]" data-name="GraduationCap">
        <div className="absolute inset-[9.38%_0_3.13%_0]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 26.25">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p2ad15780} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
              <path d={svgPaths.p13c61000} fill="var(--fill-0, #FA7E7B)" />
              <path d={svgPaths.p13768700} fill="var(--fill-0, #FA7E7B)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">Cursos inscritos</p>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">70</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px relative">
      <div className="relative shrink-0 size-[30px]" data-name="CheckCircle">
        <div className="absolute inset-[9.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.375 24.375">
            <g id="Vector">
              <path d={svgPaths.p37200380} fill="var(--fill-0, #FA7E7B)" />
              <path clipRule="evenodd" d={svgPaths.p235c9280} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">Cursos completados</p>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">20</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame27 />
      <Frame28 />
      <Frame29 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px relative">
      <div className="relative shrink-0 size-[30px]" data-name="BookOpen">
        <div className="absolute inset-[18.75%_6.25%_6.25%_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.25 22.5">
            <g id="Vector">
              <path d={svgPaths.p12d1db80} fill="var(--fill-0, #FA7E7B)" />
              <path clipRule="evenodd" d={svgPaths.p33d1e100} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">Certificados generados</p>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">15</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px opacity-0 relative">
      <div className="relative shrink-0 size-[30px]" data-name="CheckCircle">
        <div className="absolute inset-[9.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.375 24.375">
            <g id="Vector">
              <path d={svgPaths.p37200380} fill="var(--fill-0, #FA7E7B)" />
              <path clipRule="evenodd" d={svgPaths.p235c9280} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">Cursos inscritos</p>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">70</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px opacity-0 relative">
      <div className="relative shrink-0 size-[30px]" data-name="CheckCircle">
        <div className="absolute inset-[9.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.375 24.375">
            <g id="Vector">
              <path d={svgPaths.p37200380} fill="var(--fill-0, #FA7E7B)" />
              <path clipRule="evenodd" d={svgPaths.p235c9280} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">Cursos completados</p>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">20</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame30 />
      <Frame31 />
      <Frame32 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative">
      <Frame9 />
      <Frame11 />
      <Frame12 />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px relative">
      <div className="relative shrink-0 size-[30px]">{icon}</div>
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">{label}</p>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">{value}</p>
    </div>
  );
}

function UsersThreeIcon() {
  return (
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.0625 21.0783">
      <g id="Vector">
        <path clipRule="evenodd" d={svgPaths.pfe394e0} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
        <path d={svgPaths.p175a0c00} fill="var(--fill-0, #FA7E7B)" />
        <path d={svgPaths.p3d054f00} fill="var(--fill-0, #FA7E7B)" />
        <path d={svgPaths.p204ac000} fill="var(--fill-0, #FA7E7B)" />
        <path d={svgPaths.p1e447f80} fill="var(--fill-0, #FA7E7B)" />
        <path d={svgPaths.p139dd300} fill="var(--fill-0, #FA7E7B)" />
      </g>
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.375 24.375">
      <g id="Vector">
        <path d={svgPaths.p37200380} fill="var(--fill-0, #FA7E7B)" />
        <path clipRule="evenodd" d={svgPaths.p235c9280} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
      </g>
    </svg>
  );
}

function ContactInfo({ tab, psicologos }: { tab: "usuarios" | "psicologos"; psicologos: Psicologo[] }) {
  const activos = psicologos.filter(p => p.activo).length;
  const inactivos = psicologos.filter(p => !p.activo).length;
  const especialidades = new Set(psicologos.flatMap(p => p.especialidades)).size;

  return (
    <div className="bg-[rgba(224,210,183,0.2)] content-start flex flex-wrap gap-y-[48px] items-start overflow-clip p-[24px] rounded-[20px] w-[1119px]" data-name="Contact  info">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative">
        <div className="content-stretch flex items-center relative shrink-0 w-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:SemiBold',sans-serif] leading-[28px] min-w-px not-italic relative text-[#506685] text-[24px]">Estadísticas generales</p>
        </div>
        {tab === "usuarios" ? (
          <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
            <StatCard icon={<div className="absolute inset-[17.24%_1.56%_12.5%_1.56%]"><UsersThreeIcon /></div>} label="Usuarios inscritos" value={50} />
            <StatCard
              icon={
                <div className="absolute inset-[9.38%_0_3.13%_0]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 26.25">
                    <g id="Vector">
                      <path clipRule="evenodd" d={svgPaths.p2ad15780} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
                      <path d={svgPaths.p13c61000} fill="var(--fill-0, #FA7E7B)" />
                      <path d={svgPaths.p13768700} fill="var(--fill-0, #FA7E7B)" />
                    </g>
                  </svg>
                </div>
              }
              label="Cursos inscritos"
              value={70}
            />
            <StatCard icon={<div className="absolute inset-[9.38%]"><CheckCircleIcon /></div>} label="Cursos completados" value={20} />
            <StatCard
              icon={
                <div className="absolute inset-[18.75%_6.25%_6.25%_6.25%]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.25 22.5">
                    <g id="Vector">
                      <path d={svgPaths.p12d1db80} fill="var(--fill-0, #FA7E7B)" />
                      <path clipRule="evenodd" d={svgPaths.p33d1e100} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
              }
              label="Certificados generados"
              value={15}
            />
          </div>
        ) : (
          <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
            <StatCard icon={<div className="absolute inset-[17.24%_1.56%_12.5%_1.56%]"><UsersThreeIcon /></div>} label="Total psicólogos" value={psicologos.length} />
            <StatCard icon={<div className="absolute inset-[9.38%]"><CheckCircleIcon /></div>} label="Psicólogos activos" value={activos} />
            <StatCard
              icon={
                <div className="absolute inset-[9.38%]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.375 24.375">
                    <g id="Vector">
                      <path d={svgPaths.p37200380} fill="var(--fill-0, #FA7E7B)" />
                    </g>
                  </svg>
                </div>
              }
              label="Psicólogos inactivos"
              value={inactivos}
            />
            <StatCard
              icon={
                <div className="absolute inset-[9.38%_0_3.13%_0]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 26.25">
                    <g id="Vector">
                      <path clipRule="evenodd" d={svgPaths.p2ad15780} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
                      <path d={svgPaths.p13c61000} fill="var(--fill-0, #FA7E7B)" />
                      <path d={svgPaths.p13768700} fill="var(--fill-0, #FA7E7B)" />
                    </g>
                  </svg>
                </div>
              }
              label="Especialidades"
              value={especialidades}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[275px]">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:SemiBold',sans-serif] leading-[28px] min-w-px not-italic relative text-[#506685] text-[24px]">Usuarios insicritos</p>
    </div>
  );
}

function Frame4() {
  return (
    <button className="bg-white cursor-pointer flex-[1_0_0] h-[41px] min-w-px relative rounded-[5px]">
      <div aria-hidden className="absolute border border-[#bebebe] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[8px] py-[16px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Regular',sans-serif] leading-[24px] min-w-px not-italic relative text-[#bebebe] text-[16px] text-left tracking-[-0.25px]">Seleccione</p>
          <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
              <path d={svgPaths.p2c14e6b2} fill="var(--fill-0, #BEBEBE)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

function Frame5() {
  return (
    <button className="bg-white cursor-pointer flex-[1_0_0] h-[41px] min-w-px relative rounded-[5px]">
      <div aria-hidden className="absolute border border-[#bebebe] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[8px] py-[16px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Regular',sans-serif] leading-[24px] min-w-px not-italic relative text-[#bebebe] text-[16px] text-left tracking-[-0.25px]">Seleccione</p>
          <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
              <path d={svgPaths.p2c14e6b2} fill="var(--fill-0, #BEBEBE)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[16px] h-[41px] items-start relative shrink-0">
      <div className="bg-white content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[346.337px]" data-name="campos">
        <button className="cursor-pointer h-[41px] relative rounded-[5px] shrink-0 w-full">
          <div aria-hidden className="absolute border border-[#bebebe] border-solid inset-0 pointer-events-none rounded-[5px]" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[10px] items-center p-[16px] relative size-full">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Regular',sans-serif] leading-[24px] min-w-px not-italic relative text-[#bebebe] text-[16px] text-left tracking-[-0.25px]">Buscar</p>
              <div className="bg-white overflow-clip relative shrink-0 size-[15px]" data-name="u:search">
                <div className="absolute inset-[8.25%_8.37%_8.43%_8.24%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5074 12.4979">
                    <path d={svgPaths.p3247b080} fill="var(--fill-0, #BEBEBE)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[260px]" data-name="Filtro">
        <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#3f364b] text-[16px] tracking-[-0.25px] whitespace-nowrap">Filtrar por:</p>
        <Frame4 />
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[260px]" data-name="Filtro">
        <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#3f364b] text-[16px] tracking-[-0.25px] whitespace-nowrap">Status</p>
        <Frame5 />
      </div>
    </div>
  );
}

function FuncionalidadParaSeguimiento() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-full" data-name="Funcionalidad para seguimiento">
      <Frame8 />
    </div>
  );
}

function Eliminar() {
  return (
    <div className="content-stretch flex gap-[7px] items-center p-[4px] relative rounded-[5px] shrink-0" data-name="Eliminar">
      <div className="relative shrink-0 size-[24px]" data-name="TrashSimple">
        <div className="absolute inset-[6.25%_12.5%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 19.5">
            <g id="Vector">
              <path d={svgPaths.p2d49c500} fill="var(--fill-0, #506685)" />
              <path d={svgPaths.p2b435400} fill="var(--fill-0, #506685)" />
              <path d={svgPaths.p33101300} fill="var(--fill-0, #506685)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Descargar() {
  return (
    <div className="content-stretch flex gap-[7px] items-center p-[4px] relative rounded-[5px] shrink-0" data-name="Descargar">
      <div className="relative shrink-0 size-[24px]" data-name="FileArrowUp">
        <div className="absolute inset-[9.38%_15.63%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 19.5">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p3514dc80} fill="var(--fill-0, #506685)" fillRule="evenodd" />
              <path d={svgPaths.p37695680} fill="var(--fill-0, #506685)" />
              <path d={svgPaths.p3a2e8500} fill="var(--fill-0, #506685)" />
              <path d={svgPaths.p3779b000} fill="var(--fill-0, #506685)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Categorias() {
  return (
    <div className="content-stretch flex gap-[16px] items-center opacity-0 relative shrink-0" data-name="Categorias">
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[32px]" data-name="Checkbox">
        <div className="relative shrink-0 size-[32px]" data-name="Maximize">
          <div className="absolute inset-[21.88%]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path clipRule="evenodd" d={svgPaths.p2879df00} fill="var(--fill-0, #506685)" fillRule="evenodd" id="Subtract" />
            </svg>
          </div>
        </div>
      </div>
      <Eliminar />
      <Descargar />
    </div>
  );
}

function Etiquetas() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Etiquetas">
      <Categorias />
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#506685] text-[12px] tracking-[-0.25px] whitespace-nowrap">
        <span className="leading-[24px]">{`Total no Inscritos: `}</span>
        <span className="font-['Poppins:SemiBold',sans-serif] leading-[24px]">50.000</span>
      </p>
    </div>
  );
}

function Group6() {
  return (
    <div className="h-[11px] relative shrink-0 w-[6px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
        <g id="Group 1491">
          <path d={svgPaths.p1cfa9230} fill="var(--fill-0, #C4C4C4)" id="Polygon 2" />
          <path d={svgPaths.p1fabd770} fill="var(--fill-0, #C4C4C4)" id="Polygon 3" />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[327px]">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Regular',sans-serif] leading-[24px] min-w-px not-italic relative text-[#3f364b] text-[14px] tracking-[-0.25px]">Nombre de la persona</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#f6f6f6] h-[56px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center px-[24px] py-[16px] relative size-full">
          <Frame34 />
          <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#3f364b] text-[14px] tracking-[-0.25px] w-[128.936px]">12</p>
          <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#3f364b] text-[14px] tracking-[-0.25px] w-[105.198px]">134m</p>
          <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#3f364b] text-[14px] tracking-[-0.25px] w-[89.819px]">12</p>
          <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#3f364b] text-[14px] tracking-[-0.25px] w-[120.566px]">5</p>
          <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#3f364b] text-[14px] tracking-[-0.25px] w-[110px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-white h-[56px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Poppins:Regular',sans-serif] gap-[24px] items-center leading-[24px] not-italic px-[24px] py-[16px] relative size-full text-[#3f364b] text-[14px] tracking-[-0.25px]">
          <p className="relative shrink-0 w-[329.153px]">Nombre de la persona</p>
          <p className="relative shrink-0 w-[128.936px]">12</p>
          <p className="relative shrink-0 w-[105.198px]">134m</p>
          <p className="relative shrink-0 w-[89.819px]">12</p>
          <p className="relative shrink-0 w-[120.566px]">5</p>
          <p className="relative shrink-0 w-[110px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#f6f6f6] h-[56px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Poppins:Regular',sans-serif] gap-[24px] items-center leading-[24px] not-italic px-[24px] py-[16px] relative size-full text-[#3f364b] text-[14px] tracking-[-0.25px]">
          <p className="relative shrink-0 w-[329.153px]">Nombre de la persona</p>
          <p className="relative shrink-0 w-[128.936px]">12</p>
          <p className="relative shrink-0 w-[105.198px]">134m</p>
          <p className="relative shrink-0 w-[89.819px]">12</p>
          <p className="relative shrink-0 w-[120.566px]">5</p>
          <p className="relative shrink-0 w-[110px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-white h-[56px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Poppins:Regular',sans-serif] gap-[24px] items-center leading-[24px] not-italic px-[24px] py-[16px] relative size-full text-[#3f364b] text-[14px] tracking-[-0.25px]">
          <p className="relative shrink-0 w-[329.153px]">Nombre de la persona</p>
          <p className="relative shrink-0 w-[128.936px]">12</p>
          <p className="relative shrink-0 w-[105.198px]">134m</p>
          <p className="relative shrink-0 w-[89.819px]">12</p>
          <p className="relative shrink-0 w-[120.566px]">5</p>
          <p className="relative shrink-0 w-[110px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[#f6f6f6] h-[56px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Poppins:Regular',sans-serif] gap-[24px] items-center leading-[24px] not-italic px-[24px] py-[16px] relative size-full text-[#3f364b] text-[14px] tracking-[-0.25px]">
          <p className="relative shrink-0 w-[329.153px]">Nombre de la persona</p>
          <p className="relative shrink-0 w-[128.936px]">12</p>
          <p className="relative shrink-0 w-[105.198px]">134m</p>
          <p className="relative shrink-0 w-[89.819px]">12</p>
          <p className="relative shrink-0 w-[120.566px]">5</p>
          <p className="relative shrink-0 w-[110px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-white h-[56px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Poppins:Regular',sans-serif] gap-[24px] items-center leading-[24px] not-italic px-[24px] py-[16px] relative size-full text-[#3f364b] text-[14px] tracking-[-0.25px]">
          <p className="relative shrink-0 w-[329.153px]">Nombre de la persona</p>
          <p className="relative shrink-0 w-[128.936px]">12</p>
          <p className="relative shrink-0 w-[105.198px]">134m</p>
          <p className="relative shrink-0 w-[89.819px]">12</p>
          <p className="relative shrink-0 w-[120.566px]">5</p>
          <p className="relative shrink-0 w-[110px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[#f6f6f6] h-[56px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Poppins:Regular',sans-serif] gap-[24px] items-center leading-[24px] not-italic px-[24px] py-[16px] relative size-full text-[#3f364b] text-[14px] tracking-[-0.25px]">
          <p className="relative shrink-0 w-[329.153px]">Nombre de la persona</p>
          <p className="relative shrink-0 w-[128.936px]">12</p>
          <p className="relative shrink-0 w-[105.198px]">134m</p>
          <p className="relative shrink-0 w-[89.819px]">12</p>
          <p className="relative shrink-0 w-[120.566px]">5</p>
          <p className="relative shrink-0 w-[110px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-white h-[56px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Poppins:Regular',sans-serif] gap-[24px] items-center leading-[24px] not-italic px-[24px] py-[16px] relative size-full text-[#3f364b] text-[14px] tracking-[-0.25px]">
          <p className="relative shrink-0 w-[329.153px]">Nombre de la persona</p>
          <p className="relative shrink-0 w-[128.936px]">12</p>
          <p className="relative shrink-0 w-[105.198px]">134m</p>
          <p className="relative shrink-0 w-[89.819px]">12</p>
          <p className="relative shrink-0 w-[120.566px]">5</p>
          <p className="relative shrink-0 w-[110px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[#f6f6f6] h-[56px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Poppins:Regular',sans-serif] gap-[24px] items-center leading-[24px] not-italic px-[24px] py-[16px] relative size-full text-[#3f364b] text-[14px] tracking-[-0.25px]">
          <p className="relative shrink-0 w-[329.153px]">Nombre de la persona</p>
          <p className="relative shrink-0 w-[128.936px]">12</p>
          <p className="relative shrink-0 w-[105.198px]">134m</p>
          <p className="relative shrink-0 w-[89.819px]">12</p>
          <p className="relative shrink-0 w-[120.566px]">5</p>
          <p className="relative shrink-0 w-[110px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-white h-[56px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Poppins:Regular',sans-serif] gap-[24px] items-center leading-[24px] not-italic px-[24px] py-[16px] relative size-full text-[#3f364b] text-[14px] tracking-[-0.25px]">
          <p className="relative shrink-0 w-[329.153px]">Nombre de la persona</p>
          <p className="relative shrink-0 w-[128.936px]">12</p>
          <p className="relative shrink-0 w-[105.198px]">134m</p>
          <p className="relative shrink-0 w-[89.819px]">12</p>
          <p className="relative shrink-0 w-[120.566px]">5</p>
          <p className="relative shrink-0 w-[110px]">1</p>
        </div>
      </div>
    </div>
  );
}

const selectFilterCls = "h-[41px] bg-white border border-[#bebebe] rounded-[5px] px-[8px] font-['Poppins:Regular',sans-serif] text-[14px] text-[#bebebe] outline-none cursor-pointer appearance-none pr-[28px]";

function UsuarioDetalleModal({ usuario, psicologo, citas, psicologos, onClose }: {
  usuario: Usuario;
  psicologo?: Psicologo;
  citas: Cita[];
  psicologos: Psicologo[];
  onClose: () => void;
}) {
  const nombrePsicologoCita = (id: number) => psicologos.find(p => p.id === id)?.nombre ?? "—";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-[20px] w-[560px] max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white px-[32px] pt-[32px] pb-[16px] flex items-center justify-between border-b border-[#f0f0f0]">
          <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[20px] leading-[28px]">Información del usuario</p>
          <button onClick={onClose} className="text-[#506685] hover:opacity-70 text-[24px] leading-none cursor-pointer">×</button>
        </div>
        <div className="px-[32px] py-[24px] flex flex-col gap-[16px]">
          {[
            ["Nombre", usuario.nombre],
            ["Correo", usuario.email],
            ["Teléfono (WhatsApp)", usuario.telefono],
            ["País", usuario.pais],
            ["Tipo de documento", usuario.tipoDocumento],
            ["Número de documento", usuario.numeroDocumento],
            ["Motivo de inscripción", usuario.motivo],
            ["Psicólogo asignado", psicologo?.nombre ?? "Sin asignar"],
            ["Fecha de inscripción", usuario.fechaInscripcion],
          ].map(([lbl, val]) => (
            <div key={lbl} className="flex flex-col gap-[4px]">
              <p className={labelCls}>{lbl}</p>
              <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[16px]">{val}</p>
            </div>
          ))}
          {usuario.notas && (
            <div className="flex flex-col gap-[4px]">
              <p className={labelCls}>Notas</p>
              <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[16px]">{usuario.notas}</p>
            </div>
          )}
          <div className="flex flex-col gap-[8px]">
            <p className={labelCls}>Historial de citas</p>
            {citas.length === 0 && (
              <p className="font-['Poppins:Regular',sans-serif] text-[#bebebe] text-[14px]">Aún no tiene citas agendadas.</p>
            )}
            {citas.map(c => (
              <div key={c.id} className="flex items-center justify-between bg-[#f8f9fb] rounded-[10px] px-[14px] py-[10px]">
                <div className="flex flex-col">
                  <span className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[13px]">{c.fecha} · {c.hora}</span>
                  <span className="font-['Poppins:Regular',sans-serif] text-[#8a8a8a] text-[12px]">{nombrePsicologoCita(c.psicologoId)}</span>
                </div>
                <span className={`px-[8px] py-[2px] rounded-full text-[12px] font-['Poppins:SemiBold',sans-serif] ${estadoCitaCfg[c.estado].cls}`}>
                  {estadoCitaCfg[c.estado].label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="sticky bottom-0 bg-white px-[32px] pb-[32px] pt-[16px] flex gap-[12px] justify-end border-t border-[#f0f0f0]">
          <button onClick={onClose} className="cursor-pointer px-[20px] py-[10px] rounded-[8px] border border-[#506685] font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] hover:bg-[#f0f4f8]">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

const usuariosMock = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  nombre: "Nombre de la persona",
  seccionesTerminadas: 12,
  tiempoDedicado: "134m",
  cursosInscritos: 12,
  cursosCompletados: 5,
  certificados: 1,
}));

function UsuariosSection() {
  const [buscar, setBuscar] = useState("");
  const [filtrarPor, setFiltrarPor] = useState("");
  const [status, setStatus] = useState("");

  const filtrados = usuariosMock.filter(u =>
    u.nombre.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <div className="bg-[rgba(224,210,183,0.2)] rounded-[20px] p-[24px] w-full">
      {/* Título */}
      <div className="flex items-center justify-between mb-[20px]">
        <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[24px] leading-[28px]">
          Usuarios inscritos
          <span className="ml-[8px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#506685]/50">{filtrados.length}</span>
        </p>
        <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px]">
          Total no inscritos: <span className="font-['Poppins:SemiBold',sans-serif]">50.000</span>
        </p>
      </div>

      {/* Controles de filtro */}
      <div className="flex items-center gap-[16px] mb-[16px]">
        {/* Búsqueda */}
        <div className="relative w-[280px] shrink-0">
          <input
            className="h-[41px] w-full bg-white border border-[#bebebe] rounded-[5px] pl-[12px] pr-[36px] font-['Poppins:Regular',sans-serif] text-[14px] text-[#3f364b] placeholder-[#bebebe] outline-none focus:border-[#506685]"
            placeholder="Buscar"
            value={buscar}
            onChange={e => setBuscar(e.target.value)}
          />
          <svg className="absolute right-[10px] top-1/2 -translate-y-1/2 w-[14px] h-[14px]" fill="none" viewBox="0 0 12.5074 12.4979">
            <path d={svgPaths.p3247b080} fill="#BEBEBE" />
          </svg>
        </div>

        {/* Filtrar por */}
        <div className="flex items-center gap-[8px]">
          <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] whitespace-nowrap">Filtrar por:</p>
          <div className="relative">
            <select
              className={selectFilterCls + " w-[160px]"}
              value={filtrarPor}
              onChange={e => setFiltrarPor(e.target.value)}
            >
              <option value="">Seleccione</option>
              <option value="cursos">Cursos inscritos</option>
              <option value="completados">Cursos completados</option>
              <option value="certificados">Certificados</option>
            </select>
            <svg className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 w-[10px] h-[6px]" fill="none" viewBox="0 0 10 6">
              <path d={svgPaths.p2c14e6b2} fill="#BEBEBE" />
            </svg>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-[8px]">
          <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] whitespace-nowrap">Status</p>
          <div className="relative">
            <select
              className={selectFilterCls + " w-[160px]"}
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="">Seleccione</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
            <svg className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 w-[10px] h-[6px]" fill="none" viewBox="0 0 10 6">
              <path d={svgPaths.p2c14e6b2} fill="#BEBEBE" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-[#f6f6f6] h-px w-full mb-[12px]" />

      {/* Tabla */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[860px]">
          {/* Encabezado */}
          <div className="flex gap-[16px] px-[16px] pb-[8px] border-b border-[#e0e0e0]">
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] flex-1 min-w-[200px]">Nombre del usuario</p>
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[130px] shrink-0">Secc. terminadas</p>
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[110px] shrink-0">Tiempo dedicado</p>
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[100px] shrink-0">Cursos inscritos</p>
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[110px] shrink-0">Cursos completados</p>
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] w-[110px] shrink-0">Certificados</p>
          </div>

          {filtrados.map((u, i) => (
            <div key={u.id} className={`flex gap-[16px] items-center px-[16px] py-[14px] ${i % 2 === 0 ? "bg-[#f6f6f6]" : "bg-white"} rounded-[5px]`}>
              <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] flex-1 min-w-[200px]">{u.nombre}</p>
              <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] w-[130px] shrink-0">{u.seccionesTerminadas}</p>
              <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] w-[110px] shrink-0">{u.tiempoDedicado}</p>
              <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] w-[100px] shrink-0">{u.cursosInscritos}</p>
              <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] w-[110px] shrink-0">{u.cursosCompletados}</p>
              <p className="font-['Poppins:Regular',sans-serif] text-[#3f364b] text-[14px] w-[110px] shrink-0">{u.certificados}</p>
            </div>
          ))}

          {filtrados.length === 0 && (
            <div className="py-[40px] text-center">
              <p className="font-['Poppins:Regular',sans-serif] text-[#bebebe] text-[16px]">No se encontraron usuarios</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[452px] top-[224.68px]">
      <p className="[word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] leading-[28px] left-[calc(50%-304px)] not-italic text-[#506685] text-[24px] top-[224.68px] whitespace-nowrap">Daniel Vergara</p>
      <div className="absolute inset-[11.66%_56.08%_87.32%_42.59%]" data-name="PencilSimpleLine">
        <div className="absolute inset-[10.67%_10.67%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3661 15.3662">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p14ebdec0} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
              <path d={svgPaths.p2ed7be00} fill="var(--fill-0, #FA7E7B)" />
              <path d={svgPaths.pf4ffe40} fill="var(--fill-0, #FA7E7B)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function PerfilAdminInscritas() {
  const [tab, setTab] = useState<"usuarios" | "psicologos">("usuarios");
  const [psicologos, setPsicologos] = useState<Psicologo[]>(psicologosIniciales);
  const toggleActivo = (id: number) => setPsicologos(ps => ps.map(p => p.id === id ? { ...p, activo: !p.activo } : p));
  const agregar = (data: Omit<Psicologo, "id" | "activo">) => setPsicologos(ps => [...ps, { ...data, id: Date.now(), activo: true }]);

  return (
    <div className="bg-white flex flex-col min-h-screen w-full" data-name="Perfil admin (Inscritas)">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative flex-1 w-full">
        {/* Banner Background */}
        <div className="absolute bg-[#c7c9cd] h-[146.031px] left-0 opacity-20 top-0 w-full" />

        {/* Profile Section */}
        <div className="relative z-10 mx-auto max-w-[1512px] px-[48px]">
          {/* Profile Photo and Name */}
          <div className="flex items-center gap-[32px] pt-[35px] ml-[161px]">
            <div className="relative shrink-0">
              <img
                alt="Profile"
                className="block size-[180px] rounded-full object-cover"
                src={imgEllipse624}
              />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-[10px] shadow-lg">
                <div className="relative size-[20px]" data-name="PencilSimple">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3661 15.3661">
                    <g id="Vector">
                      <path clipRule="evenodd" d={svgPaths.p3ce32e00} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
                      <path d={svgPaths.p2ec4f880} fill="var(--fill-0, #FA7E7B)" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <p className="font-['Poppins:SemiBold',sans-serif] leading-[28px] text-[#506685] text-[24px] whitespace-nowrap">Daniel Vergara</p>
              <div className="relative shrink-0 size-[20px] cursor-pointer" data-name="PencilSimpleLine">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3661 15.3662">
                  <g id="Vector">
                    <path clipRule="evenodd" d={svgPaths.p14ebdec0} fill="var(--fill-0, #FA7E7B)" fillRule="evenodd" />
                    <path d={svgPaths.p2ed7be00} fill="var(--fill-0, #FA7E7B)" />
                    <path d={svgPaths.pf4ffe40} fill="var(--fill-0, #FA7E7B)" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-[48px] ml-[161px] max-w-[1119px]">
            {/* Tabs */}
            <div className="flex border-b border-[#e0e0e0] mb-[32px]">
              <button
                onClick={() => setTab("usuarios")}
                className={`cursor-pointer px-[24px] py-[12px] font-['Poppins:SemiBold',sans-serif] text-[16px] transition-colors border-b-2 -mb-px ${
                  tab === "usuarios"
                    ? "border-[#fa7e7b] text-[#fa7e7b]"
                    : "border-transparent text-[#506685] hover:text-[#fa7e7b]"
                }`}
              >
                Usuarios inscritos
              </button>
              <button
                onClick={() => setTab("psicologos")}
                className={`cursor-pointer px-[24px] py-[12px] font-['Poppins:SemiBold',sans-serif] text-[16px] transition-colors border-b-2 -mb-px ${
                  tab === "psicologos"
                    ? "border-[#fa7e7b] text-[#fa7e7b]"
                    : "border-transparent text-[#506685] hover:text-[#fa7e7b]"
                }`}
              >
                Psicólogos
              </button>
            </div>

            {/* Statistics */}
            <div className="mb-[32px]">
              <ContactInfo tab={tab} psicologos={psicologos} />
            </div>

            {/* Table */}
            {tab === "usuarios" && <UsuariosSection />}

            {tab === "psicologos" && <PsicologosSection psicologos={psicologos} toggleActivo={toggleActivo} agregar={agregar} />}
          </div>
        </div>
      </div>

      <div className="h-[64px]" />

      {/* Footer */}
      <div className="bg-[#e0d2b7] content-stretch flex flex-col gap-[24px] items-center overflow-clip px-[93px] py-[48px] w-full" data-name="Footer">
        <Frame2 />
        <Legales />
      </div>
    </div>
  );
}