import svgPaths from "../../imports/ApoyoPsicologico/svg-vm890ft95n";
import { goTo } from "../navigation";

function LogoBabyBear({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-[64.513px] overflow-clip relative shrink-0 w-[195px] cursor-pointer hover:opacity-80 transition-opacity"
    >
      {/* Text */}
      <div className="absolute inset-[20%_0_41.33%_38.95%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 119.052 24.9495">
          <g>
            <path d={svgPaths.p18f79800} fill="#506685" />
            <path d={svgPaths.p2dc6100} fill="#506685" />
            <path d={svgPaths.p3dd54200} fill="#506685" />
            <path d={svgPaths.p11708c80} fill="#506685" />
            <path d={svgPaths.p25333300} fill="#506685" />
            <path d={svgPaths.pb88bbf0} fill="#506685" />
            <path d={svgPaths.p10ea5a80} fill="#506685" />
            <path d={svgPaths.p26553200} fill="#506685" />
          </g>
        </svg>
      </div>
      {/* Bear icon */}
      <div className="absolute inset-[0_66.92%_0_0]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64.5129 64.5129">
          <path d={svgPaths.p21bb8c80} fill="#506685" />
          <path d={svgPaths.pbc90880} fill="white" />
          <path d={svgPaths.p140b6780} fill="white" />
          <path d={svgPaths.p11883080} fill="white" />
          <path d={svgPaths.p96d3500} fill="white" />
          <path d={svgPaths.p10cc2e00} fill="white" />
          <path d={svgPaths.pe59a700} fill="white" />
          <path d={svgPaths.p2de8ae00} fill="white" />
          <path d={svgPaths.p24ea5600} fill="white" />
          <path d={svgPaths.p8eb4e00} fill="white" />
          <path d={svgPaths.p2341ae30} fill="white" />
          <path d={svgPaths.pac26e00} fill="white" />
          <path d={svgPaths.p35caa100} fill="white" />
          <path d={svgPaths.p9ab4200} fill="white" />
        </svg>
      </div>
      {/* Foundation text */}
      <div className="absolute inset-[71.11%_8.72%_13.32%_47.66%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.0671 10.0401">
          <path d={svgPaths.p1776c500} fill="#506685" />
          <path d={svgPaths.pc4bc200} fill="#506685" />
          <path d={svgPaths.p22cdbf80} fill="#506685" />
          <path d={svgPaths.p16f69700} fill="#506685" />
          <path d={svgPaths.p121b7800} fill="#506685" />
          <path d={svgPaths.p3bd01e00} fill="#506685" />
          <path d={svgPaths.p3792df80} fill="#506685" />
          <path d={svgPaths.p3f57c800} fill="#506685" />
          <path d={svgPaths.p36710640} fill="#506685" />
        </svg>
      </div>
    </button>
  );
}

const NAV_ITEMS = [
  "Inicio",
  "Nuestra historia",
  "Cómo lo hacemos",
  "Sé parte de la familia",
  "Contáctanos",
];

export function Header() {
  return (
    <div className="relative h-[120px] w-full shrink-0">
      <div className="absolute inset-0 bg-[#cbdcef] flex items-center justify-between overflow-clip pl-[48px] py-[48px]">
        <LogoBabyBear onClick={() => goTo("home")} />

        {/* Nav */}
        <nav className="flex gap-[24px] items-center">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={item === "Inicio" ? () => goTo("home") : undefined}
              className="font-['Poppins:Regular',sans-serif] leading-[24px] text-[#506685] text-[16px] text-center tracking-[0.1px] whitespace-nowrap cursor-pointer hover:text-[#fa7e7b] transition-colors"
            >
              {item}
            </button>
          ))}

          {/* Language */}
          <div className="flex gap-[8px] items-center cursor-pointer">
            <span className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] tracking-[0.1px]">Esp</span>
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
              <path d="M1 1.5L5 5.5L9 1.5" stroke="#506685" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* User circle → dashboard */}
          <button
            onClick={() => goTo("dashboard")}
            className="relative shrink-0 size-[32px] cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Ir al dashboard"
          >
            <div className="absolute inset-[9.38%]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
                <path clipRule="evenodd" fillRule="evenodd" fill="#506685" d="M18.0605 1.02201C15.6442 0 13 0 13 0C10.3558 0 7.93951 1.02201 7.93951 1.02201C5.60638 2.00884 3.80761 3.80761 3.80761 3.80761C2.00885 5.60638 1.02202 7.93951 1.02202 7.93951C0 10.3558 0 13 0 13C0 15.6442 1.02202 18.0605 1.02202 18.0605C2.00884 20.3936 3.80761 22.1924 3.80761 22.1924C3.94585 22.3306 4.08724 22.4641 4.23048 22.5926C4.28288 22.6511 4.3424 22.7036 4.40817 22.7489C6.08509 24.1936 7.93951 24.978 7.93951 24.978C10.3558 26 13 26 13 26C15.6442 26 18.0605 24.978 18.0605 24.978C19.5397 24.3523 20.8042 23.4003 21.5316 22.7872C21.6374 22.7251 21.7292 22.645 21.804 22.552C22.0539 22.3308 22.1924 22.1924 22.1924 22.1924C23.9912 20.3936 24.978 18.0605 24.978 18.0605C26 15.6442 26 13 26 13C26 10.3558 24.978 7.93951 24.978 7.93951C23.9912 5.60638 22.1924 3.80761 22.1924 3.80761C20.3936 2.00884 18.0605 1.02201 18.0605 1.02201ZM8.71861 23.136C7.75535 22.7285 6.89948 22.1573 6.27559 21.6791C7.33009 20.0926 8.81505 19.1812 8.81505 19.1812C10.7406 17.9992 13 18 13 18C15.2594 18 17.185 19.1812 17.185 19.1812C18.3973 19.9253 19.2517 20.9995 19.7184 21.6931C18.4727 22.6321 17.2814 23.136 17.2814 23.136C15.2386 24 13 24 13 24C10.7614 24 8.71861 23.136 8.71861 23.136ZM7.76881 17.4766C7.76881 17.4766 8.37154 17.1069 9.32768 16.7374C9.13208 16.5903 8.94076 16.426 8.75736 16.2426C8.75736 16.2426 7 14.4853 7 12C7 12 7 9.51472 8.75736 7.75736C8.75736 7.75736 10.5147 6 13 6C13 6 15.4853 6 17.2426 7.75736C17.2426 7.75736 19 9.51472 19 12C19 12 19 14.4853 17.2426 16.2426C17.2426 16.2426 17.0369 16.4484 16.6666 16.7191C17.1862 16.914 17.7182 17.1617 18.2312 17.4766C18.2312 17.4766 19.9072 18.5054 21.2049 20.3091C21.7181 19.7113 22.5798 18.5964 23.136 17.2814C23.136 17.2814 24 15.2386 24 13C24 13 24 10.7614 23.136 8.71861C23.136 8.71861 22.3011 6.74476 20.7782 5.22183C20.7782 5.22183 19.2552 3.69889 17.2814 2.86402C17.2814 2.86402 15.2386 2 13 2C13 2 10.7614 2 8.71861 2.86402C8.71861 2.86402 6.74476 3.69889 5.22183 5.22182C5.22183 5.22182 3.6989 6.74476 2.86402 8.71861C2.86402 8.71861 2 10.7614 2 13C2 13 2 15.2386 2.86402 17.2814C2.86402 17.2814 3.5461 18.894 4.80183 20.3286C5.41468 19.4719 6.41262 18.3091 7.76881 17.4766ZM15.8284 14.8284C14.6569 16 13 16 13 16C11.3431 16 10.1716 14.8284 10.1716 14.8284C9 13.6569 9 12 9 12C9 10.3431 10.1716 9.17157 10.1716 9.17157C11.3431 8 13 8 13 8C14.6569 8 15.8284 9.17157 15.8284 9.17157C17 10.3431 17 12 17 12C17 13.6569 15.8284 14.8284 15.8284 14.8284Z" />
              </svg>
            </div>
          </button>
        </nav>

        {/* Donar */}
        <button className="bg-[#fa7e7b] flex gap-[10px] items-center justify-center overflow-clip py-[50px] w-[160px] cursor-pointer hover:bg-[#e86e6b] transition-colors">
          <span className="font-['Quicksand:SemiBold',sans-serif] font-semibold leading-[60px] text-[24px] text-white tracking-[-1px] whitespace-nowrap">Donar</span>
          <svg width="20" height="20" viewBox="0 0 20.1946 19.2605" fill="none">
            <path d={svgPaths.p54a9a80} fill="white" />
          </svg>
        </button>
      </div>

      {/* Pink separator line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FA7E7B]" />
    </div>
  );
}
