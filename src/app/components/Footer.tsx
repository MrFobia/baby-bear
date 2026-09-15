import svgPaths from "../../imports/ApoyoPsicologico/svg-vm890ft95n";
import { imgControl } from "../../imports/ApoyoPsicologico/svg-dt6p2";

function FooterLogo() {
  return (
    <div className="h-[44.663px] overflow-clip relative shrink-0 w-[135px]" data-name="Logo Baby Bear">
      <div className="absolute inset-[20%_0_41.33%_38.95%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82.4209 17.2727">
          <g>
            <path d={svgPaths.p3690a000} fill="#506685" />
            <path d={svgPaths.p369d3f00} fill="#506685" />
            <path d={svgPaths.p20225a00} fill="#506685" />
            <path d={svgPaths.p2e1bde80} fill="#506685" />
            <path d={svgPaths.p211f8300} fill="#506685" />
            <path d={svgPaths.p1b739200} fill="#506685" />
            <path d={svgPaths.p2ff52b00} fill="#506685" />
            <path d={svgPaths.p353ead00} fill="#506685" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-[0_66.92%_0_0]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.6628 44.6628">
          <path d={svgPaths.pd69380} fill="#506685" />
        </svg>
      </div>
      <div className="absolute inset-[71.11%_8.72%_13.32%_47.66%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 58.8926 6.95084">
          <g>
            <path d={svgPaths.p3db0180} fill="#506685" />
            <path d={svgPaths.p2717c00} fill="#506685" />
            <path d={svgPaths.p3882d400} fill="#506685" />
            <path d={svgPaths.p8843000} fill="#506685" />
            <path d={svgPaths.p2132c400} fill="#506685" />
            <path d={svgPaths.p1e682c00} fill="#506685" />
            <path d={svgPaths.p3999980} fill="#506685" />
            <path d={svgPaths.p34f3ed00} fill="#506685" />
            <path d={svgPaths.p352cd580} fill="#506685" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="flex flex-wrap gap-[16px] items-start w-full">
      <svg className="size-[24.471px]" fill="none" viewBox="0 0 24.4706 24.4706">
        <path d={svgPaths.p22645180} fill="#506685" />
      </svg>
      <svg className="size-[24.471px]" fill="none" viewBox="0 0 24.4706 24.4706">
        <path clipRule="evenodd" fillRule="evenodd" d={svgPaths.p3daa1600} fill="#506685" />
      </svg>
      <svg className="size-[24.471px]" fill="none" viewBox="0 0 24.4706 24.4706">
        <path clipRule="evenodd" fillRule="evenodd" d={svgPaths.p1692dcc0} fill="#506685" />
      </svg>
      <svg className="h-[24.471px] w-[31.353px]" fill="none" viewBox="0 0 31.3529 24.4706">
        <path d={svgPaths.pf269840} fill="#506685" />
      </svg>
    </div>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-[18px] items-start w-[170px]">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[24px] text-[#506685] text-[16px] tracking-[0.1px] w-full">
        {title}
      </p>
      <div className="font-['Poppins:Regular',sans-serif] leading-[24px] text-[#506685] text-[16px] w-full">
        {items.map(item => (
          <p key={item} className="mb-0">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="bg-[#e0d2b7] relative shrink-0 w-full" data-name="Footer">
      <div className="flex flex-col items-center px-[24px] md:px-[93px] py-[48px] gap-[24px] w-full">
        <div className="flex flex-wrap items-start justify-between gap-[40px] w-full max-w-[1320px]">
          <div className="flex flex-col gap-[56px] items-start w-[170px]">
            <FooterLogo />
            <SocialIcons />
          </div>

          <FooterColumn
            title="Acerca de nosotros"
            items={["Nuestra historia", "Porqué lo hacemos", "Cómo lo hacemos"]}
          />
          <FooterColumn title="Únete a la familia" items={["Donaciones", "Cómo sumarme"]} />
          <FooterColumn title="Contáctanos" items={["Laurasanint@babybear", "foundation.org"]} />

          <div className="flex flex-col gap-[22px] items-start">
            <p className="font-['Poppins:SemiBold',sans-serif] leading-[24px] text-[#506685] text-[16px] tracking-[0.1px] whitespace-nowrap">
              Suscríbete
            </p>
            <div className="h-[48px] w-[280px] md:w-[350px] bg-[#cbdcef]/40 rounded-[4px] flex items-center px-[16px] justify-between">
              <span className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] tracking-[0.1px] opacity-50">
                Suscríbete
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path clipRule="evenodd" fillRule="evenodd" d={svgPaths.p42680} fill="#506685" />
              </svg>
            </div>
            <p className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[12px] w-[280px] md:w-[350px]">
              Suscríbete a nuestro boletín para estar al día de todas nuestras acciones.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[14px] items-center text-[#506685] text-[14px]">
          <div className="flex flex-wrap gap-[24px] items-start justify-center font-['Poppins:Medium',sans-serif] p-[16px]">
            <p>Términos y condiciones</p>
            <p>Política de privacidad</p>
            <p>Documentación Legal</p>
          </div>
          <p className="font-['Poppins:Regular',sans-serif]">© 2024 Baby Bear Foundation. All right reserved.</p>
        </div>
      </div>
    </div>
  );
}
