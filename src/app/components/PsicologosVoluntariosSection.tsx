import { useState, useRef, useLayoutEffect } from "react";
import imgPsicologa from "../../imports/ApoyoPsicologico/psicologa-sesion.jpg";
import { guardarSolicitud } from "../solicitudes";

const ESPECIALIDADES = [
  "Pérdida neonatal",
  "Aborto espontáneo",
  "Muerte perinatal",
  "Muerte infantil",
  "Duelo de pareja",
  "Duelo de hermanos",
];

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0 mt-[1px]">
      <circle cx="11" cy="11" r="11" fill="#fa7e7b" />
      <polyline points="6,11.5 9.5,15 16,8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function BenefitCard({ title, description, bgClass, textClass }: { title: string; description: string; bgClass: string; textClass: string }) {
  return (
    <div className={`${bgClass} flex-1 min-w-0 rounded-[10px] p-[24px] flex flex-col gap-[8px]`}>
      <p className={`font-['Poppins:Bold',sans-serif] leading-[24px] text-[16px] tracking-[-0.25px] ${textClass}`}>{title}</p>
      <p className={`font-['Poppins:Regular',sans-serif] leading-[24px] not-italic text-[16px] tracking-[-0.25px] ${textClass}`}>{description}</p>
    </div>
  );
}

function RequirementItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-[14px]">
      <CheckIcon />
      <p className="font-['Poppins:Regular',sans-serif] leading-[24px] not-italic text-white text-[16px] tracking-[0.1px]">{text}</p>
    </li>
  );
}

export function PsicologosVoluntariosSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    cedula: "",
    experiencia: "",
    mensaje: "",
    especialidades: [] as string[],
  });
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [cvNombre, setCvNombre] = useState<string>("");
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [leftMaxH, setLeftMaxH] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (submitted) {
      // Success message is much shorter than the form; don't clamp
      // the left column to it or its content gets cut off.
      setLeftMaxH(undefined);
      return;
    }
    const update = () => {
      if (formRef.current) setLeftMaxH(formRef.current.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    if (formRef.current) ro.observe(formRef.current);
    return () => ro.disconnect();
  }, [submitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setCvNombre("");
      setCvUrl(null);
      return;
    }
    setCvNombre(file.name);
    const reader = new FileReader();
    reader.onload = () => setCvUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const toggleEspecialidad = (esp: string) => {
    setFormData(prev => ({
      ...prev,
      especialidades: prev.especialidades.includes(esp)
        ? prev.especialidades.filter(e => e !== esp)
        : [...prev.especialidades, esp],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.especialidades.length === 0) return;
    guardarSolicitud({
      nombre: formData.nombre,
      email: formData.email,
      cedula: formData.cedula,
      experiencia: formData.experiencia,
      especialidades: formData.especialidades,
      mensaje: formData.mensaje,
      fotoUrl: fotoPreview ?? undefined,
      cvNombre: cvNombre || undefined,
      cvUrl: cvUrl ?? undefined,
    });
    setSubmitted(true);
  };

  return (
    <section className="relative w-full shrink-0 overflow-hidden" data-name="Psicologos Voluntarios Section">
      {/* Background */}
      <div className="absolute inset-0 bg-[#506685]" />

      <div className="relative flex flex-col items-center gap-[48px] px-[96px] py-[72px]">

        {/* Header */}
        <div className="flex flex-col items-center gap-[24px] text-center max-w-[700px]">
          {/* Badge */}
          <div className="bg-[#fa7e7b] px-[16px] py-[4px] rounded-[50px] shrink-0">
            <p className="font-['Poppins:Regular',sans-serif] leading-[24px] not-italic text-white text-[12px] tracking-[0.1px] whitespace-nowrap">
              Para psicólogos y psicólogas
            </p>
          </div>

          {/* Title */}
          <p className="font-['Quicksand:Bold',sans-serif] font-bold leading-[56px] text-white text-[56px] tracking-[-1px]">
            Dona tu tiempo,<br />
            <span style={{ color: "#fa7e7b" }}>acompaña familias</span>
          </p>

          {/* Subtitle */}
          <p className="font-['Poppins:Regular',sans-serif] leading-[24px] not-italic text-[#cbdcef] text-[16px] tracking-[0.1px] max-w-[580px]">
            Baby Bear conecta a psicólogos especializados en duelo perinatal con familias que los necesitan. Si tienes experiencia en pérdida gestacional o neonatal y deseas donar horas de atención, este espacio es para ti.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="flex gap-[24px] items-stretch w-full max-w-[1320px]">
          <BenefitCard
            bgClass="bg-[#cbdcef]"
            textClass="text-[#506685]"
            title="Impacto real y directo"
            description="Conectas con familias en uno de los momentos más difíciles de su vida. Tu acompañamiento puede marcar la diferencia entre el aislamiento y el inicio de la sanación."
          />
          <BenefitCard
            bgClass="bg-[#fa7e7b]"
            textClass="text-white"
            title="Flexibilidad total"
            description="Tú decides cuántas sesiones donar y en qué horarios. Puedes actualizar tu disponibilidad cuando quieras, sin compromisos fijos ni mínimos obligatorios."
          />
          <BenefitCard
            bgClass="bg-[#f8dcd8]"
            textClass="text-[#506685]"
            title="Red de profesionales"
            description="Forma parte de una comunidad de psicólogos comprometidos. Accede a recursos, supervisión entre pares y espacios de formación continua en duelo perinatal."
          />
        </div>

        {/* Requirements + Form */}
        <div className="flex gap-[48px] items-start w-full max-w-[1320px]">

          {/* Requirements */}
          <div
            className="flex flex-col gap-[24px] flex-1 min-w-0"
            style={leftMaxH ? { maxHeight: leftMaxH } : undefined}
          >
            <p className="font-['Quicksand:SemiBold',sans-serif] font-semibold leading-[37px] text-[#fa7e7b] text-[27px]">
              ¿A quién buscamos?
            </p>
            <ul className="flex flex-col gap-[16px] list-none p-0 m-0">
              <RequirementItem text="Título de psicología con cédula profesional vigente." />
              <RequirementItem text="Experiencia comprobable en duelo perinatal, pérdida gestacional o neonatal." />
              <RequirementItem text="Disponibilidad mínima de 2 horas semanales para atención vía Google Meet." />
              <RequirementItem text="Compromiso con el secreto profesional y el marco ético de la profesión." />
              <RequirementItem text="Disposición para colaborar en un modelo de servicio completamente gratuito para las familias." />
            </ul>
            <div className="h-[320px] shrink-0 rounded-[10px] overflow-hidden">
              <img
                src={imgPsicologa}
                alt="Psicóloga en sesión"
                className="w-full h-full object-cover object-center block"
              />
            </div>
            <div className="bg-[rgba(203,220,239,0.15)] border border-[rgba(203,220,239,0.3)] rounded-[10px] p-[24px] flex flex-col gap-[8px]">
              <p className="font-['Poppins:Bold',sans-serif] leading-[24px] text-white text-[16px]">¿Cómo funciona el proceso?</p>
              <ol className="list-none p-0 m-0 flex flex-col gap-[8px]">
                {[
                  "Llena el formulario de interés.",
                  "Nuestro equipo revisa tu perfil en un plazo de 5 días hábiles.",
                  "Si califica, te contactamos para una breve videollamada de bienvenida.",
                  "Configuras tu disponibilidad en la plataforma y empiezas a recibir citas.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-[12px]">
                    <span className="shrink-0 w-[24px] h-[24px] rounded-full bg-[#fa7e7b] flex items-center justify-center font-['Poppins:Bold',sans-serif] text-white text-[12px]">
                      {i + 1}
                    </span>
                    <p className="font-['Poppins:Regular',sans-serif] leading-[24px] not-italic text-[#cbdcef] text-[16px] tracking-[0.1px]">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Registration Form */}
          <div ref={formRef} className="flex-1 min-w-0 bg-white rounded-[10px] p-[40px] flex flex-col gap-[24px]">
            {submitted ? (
              <div className="flex flex-col items-center gap-[24px] py-[24px] text-center">
                <div className="w-[64px] h-[64px] rounded-full bg-[#f8dcd8] flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M8 17L13 22L24 11" stroke="#fa7e7b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-['Quicksand:SemiBold',sans-serif] font-semibold leading-[37px] text-[#506685] text-[27px]">
                  ¡Gracias por tu interés!
                </p>
                <p className="font-['Poppins:Regular',sans-serif] leading-[24px] not-italic text-[#506685] text-[16px] tracking-[0.1px]">
                  Hemos recibido tu solicitud. Nuestro equipo revisará tu perfil y se pondrá en contacto contigo en los próximos 5 días hábiles.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-[4px]">
                  <p className="font-['Quicksand:SemiBold',sans-serif] font-semibold leading-[37px] text-[#506685] text-[27px]">
                    Inscríbete como voluntario/a
                  </p>
                  <p className="font-['Poppins:Regular',sans-serif] leading-[24px] not-italic text-[#856b50] text-[14px] tracking-[0.1px]">
                    Completa el formulario y nos pondremos en contacto contigo.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                  {/* Nombre + Email */}
                  <div className="grid grid-cols-2 gap-[16px]">
                    <div className="flex flex-col gap-[4px]">
                      <label className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[-0.25px]">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Escriba aquí"
                        className="w-full bg-transparent border-b-[1.5px] border-b-[#fa7e7b] px-[8px] py-[8px] font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[0.1px] outline-none placeholder-[#cbdcef]"
                      />
                    </div>

                    <div className="flex flex-col gap-[4px]">
                      <label className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[-0.25px]">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="@"
                        className="w-full bg-transparent border-b-[1.5px] border-b-[#fa7e7b] px-[8px] py-[8px] font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[0.1px] outline-none placeholder-[#cbdcef]"
                      />
                    </div>
                  </div>

                  {/* Cédula + Años de experiencia */}
                  <div className="grid grid-cols-2 gap-[16px]">
                    <div className="flex flex-col gap-[4px]">
                      <label className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[-0.25px]">
                        Número de documento
                      </label>
                      <input
                        type="text"
                        name="cedula"
                        required
                        value={formData.cedula}
                        onChange={handleChange}
                        placeholder="Escriba aquí"
                        className="w-full bg-transparent border-b-[1.5px] border-b-[#fa7e7b] px-[8px] py-[8px] font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[0.1px] outline-none placeholder-[#cbdcef]"
                      />
                    </div>

                    <div className="flex flex-col gap-[4px]">
                      <label className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[-0.25px]">
                        Años de experiencia
                      </label>
                      <div className="relative">
                        <select
                          name="experiencia"
                          required
                          value={formData.experiencia}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b-[1.5px] border-b-[#fa7e7b] px-[8px] py-[8px] font-['Poppins:Regular',sans-serif] text-[16px] leading-[24px] tracking-[0.1px] outline-none appearance-none cursor-pointer pr-[28px]"
                          style={{ color: formData.experiencia ? "#506685" : "#cbdcef" }}
                        >
                          <option value="" disabled>Seleccione</option>
                          <option value="1-2">1 – 2 años</option>
                          <option value="3-5">3 – 5 años</option>
                          <option value="6-10">6 – 10 años</option>
                          <option value="mas-10">Más de 10 años</option>
                        </select>
                        <svg className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2" width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="#506685" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Foto + Hoja de vida */}
                  <div className="grid grid-cols-2 gap-[16px]">
                    <div className="flex flex-col gap-[4px]">
                      <label className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[-0.25px]">
                        Foto de perfil
                      </label>
                      <label className="flex items-center gap-[10px] h-[38px] border border-dashed border-[#cbdcef] rounded-[8px] px-[10px] py-[8px] cursor-pointer hover:border-[#fa7e7b] transition-colors">
                        {fotoPreview ? (
                          <img src={fotoPreview} alt="Foto seleccionada" className="w-[20px] h-[20px] rounded-full object-cover shrink-0" />
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                            <circle cx="10" cy="7" r="3" stroke="#cbdcef" strokeWidth="1.5" />
                            <path d="M3.5 17c1.2-3 4-4.5 6.5-4.5s5.3 1.5 6.5 4.5" stroke="#cbdcef" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        )}
                        <span className="font-['Poppins:Regular',sans-serif] text-[13px] leading-[18px] truncate" style={{ color: fotoPreview ? "#506685" : "#cbdcef" }}>
                          {fotoPreview ? "Foto seleccionada" : "Subir foto"}
                        </span>
                        <input type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
                      </label>
                    </div>

                    <div className="flex flex-col gap-[4px]">
                      <label className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[-0.25px]">
                        Hoja de vida
                      </label>
                      <label className="flex items-center gap-[10px] h-[38px] border border-dashed border-[#cbdcef] rounded-[8px] px-[10px] py-[8px] cursor-pointer hover:border-[#fa7e7b] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                          <path d="M6 2.5h5.5L15 6v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" stroke={cvNombre ? "#fa7e7b" : "#cbdcef"} strokeWidth="1.5" strokeLinejoin="round" />
                          <path d="M11.5 2.5V6H15" stroke={cvNombre ? "#fa7e7b" : "#cbdcef"} strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        <span className="font-['Poppins:Regular',sans-serif] text-[13px] leading-[18px] truncate" style={{ color: cvNombre ? "#506685" : "#cbdcef" }}>
                          {cvNombre || "Subir hoja de vida (PDF)"}
                        </span>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvChange} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Especialidades */}
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex flex-col gap-[4px]">
                      <label className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[-0.25px]">
                        Especialidad(es)
                      </label>
                      <p className="font-['Poppins:Regular',sans-serif] text-[#cbdcef] text-[13px] leading-[20px] tracking-[0.1px]">
                        Selecciona una o más
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-[8px]">
                      {ESPECIALIDADES.map(esp => (
                        <button
                          key={esp}
                          type="button"
                          onClick={() => toggleEspecialidad(esp)}
                          className={`cursor-pointer px-[14px] py-[6px] rounded-full border text-[14px] font-['Poppins:Regular',sans-serif] transition-colors ${
                            formData.especialidades.includes(esp)
                              ? "bg-[#fa7e7b] border-[#fa7e7b] text-white"
                              : "border-[#cbdcef] text-[#506685] hover:border-[#fa7e7b]"
                          }`}
                        >
                          {esp}
                        </button>
                      ))}
                    </div>
                    {formData.especialidades.length === 0 && (
                      <p className="font-['Poppins:Regular',sans-serif] text-[#fa7e7b] text-[12px]">
                        Selecciona al menos una especialidad
                      </p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div className="flex flex-col gap-[4px]">
                    <label className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[-0.25px]">
                      ¿Por qué deseas ser voluntario/a? (opcional)
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Escriba aquí"
                      className="w-full bg-transparent border-b-[1.5px] border-b-[#fa7e7b] px-[8px] py-[8px] font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[0.1px] outline-none placeholder-[#cbdcef] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#fa7e7b] text-white font-['Quicksand:SemiBold',sans-serif] font-semibold text-[18px] leading-[30px] px-[24px] py-[12px] rounded-[5px] w-full cursor-pointer hover:bg-[#e86d6a] transition-colors mt-[8px]"
                  >
                    Enviar solicitud
                  </button>

                  <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#c7c9cd] text-[12px] text-center">
                    Al enviar este formulario aceptas que revisemos tu información con fines de selección de voluntarios. Tus datos no serán compartidos con terceros.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
