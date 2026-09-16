import type { ReactNode } from "react";
import { Header } from "../../app/components/Header";
import { Footer } from "../../app/components/Footer";
import { ProductCard } from "../../app/components/ProductCard";
import { ImageWithFallback } from "../../app/components/figma/ImageWithFallback";
import { PRODUCTS } from "../../app/products";
import { goToProduct } from "../../app/navigation";
import BANNER_IMG from "./banner-productos.jpg";

function HeartIcon({ stroke = "#fa7e7b" }: { stroke?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7.5-4.6-10-9.3C.5 8.2 2.3 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5c3.3 0 5.1 3.2 3.6 6.7C15.5 16.4 12 21 12 21Z" />
    </svg>
  );
}

function GiftIcon({ stroke = "#506685" }: { stroke?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M3 12h18M12 8v13" />
      <path d="M12 8c-1.5-4-6-4-6-1.5S9 8 12 8Zm0 0c1.5-4 6-4 6-1.5S15 8 12 8Z" />
    </svg>
  );
}

function SparkleIcon({ stroke = "#506685" }: { stroke?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}

function Banner() {
  const featured = PRODUCTS[0];
  return (
    <div className="h-[520px] overflow-clip relative shrink-0 w-full" data-name="Banner">
      <div className="absolute inset-0" aria-hidden>
        <img alt="" className="absolute inset-0 w-full h-full object-cover object-center" src={BANNER_IMG} />
        <div className="absolute bg-[#506685] inset-0 mix-blend-multiply" />
      </div>

      <div className="absolute inset-0 flex flex-col items-start justify-center gap-[24px] left-[24px] lg:left-[96px] max-w-[620px]">
        <div className="bg-[#506685] content-stretch flex items-center justify-center px-[10px] py-[5px] rounded-[50px] shrink-0">
          <p className="font-['Poppins:Regular',sans-serif] text-[#cbdcef] text-[12px] tracking-[0.1px] whitespace-nowrap">
            Lissa Gail Gives Back
          </p>
        </div>

        <h1 className="font-['Quicksand:Bold',sans-serif] font-bold leading-[56px] text-[#fa7e7b] text-[44px] lg:text-[56px]">
          Piezas que acompañan
        </h1>

        <p className="font-['Poppins:Regular',sans-serif] leading-[24px] text-[16px] text-white tracking-[0.1px] max-w-[520px]">
          Joyería diseñada con intención por Lissa Gail. El {featured.donationPercent}% de cada
          venta se dona directamente a familias en duelo perinatal a través de la Fundación Baby Bear.
        </p>

        <button
          onClick={() => goToProduct(featured.slug)}
          className="bg-[#fa7e7b] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[5px] shrink-0 cursor-pointer hover:bg-[#e86e6b] transition-colors"
        >
          <span className="font-['Quicksand:SemiBold',sans-serif] font-semibold text-[18px] text-white whitespace-nowrap">
            Ver {featured.name}
          </span>
        </button>
      </div>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
  variant,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  variant: "light" | "dark" | "pink";
}) {
  const bg = variant === "dark" ? "bg-[#506685]" : variant === "pink" ? "bg-[#f8dcd8]" : "bg-[#cbdcef]";
  const text = variant === "dark" ? "text-white" : "text-[#506685]";
  return (
    <div className={`${bg} flex-[1_0_0] min-w-[240px] rounded-[10px]`}>
      <div className="flex flex-col items-start gap-[12px] p-[24px]">
        {icon}
        <p className={`font-['Poppins:Bold',sans-serif] ${text} text-[16px]`}>{title}</p>
        <p className={`font-['Poppins:Regular',sans-serif] ${text} text-[16px] tracking-[-0.25px]`}>{description}</p>
      </div>
    </div>
  );
}

const STORY_PRODUCT = PRODUCTS[0];

export default function ProductosCatalogo() {
  return (
    <div className="size-full bg-white flex flex-col items-center">
      <Header />
      <Banner />

      {/* Value strip */}
      <div className="flex flex-wrap gap-[32px] items-start justify-center w-full max-w-[1320px] px-[24px] lg:px-0 -mt-[64px] relative z-10">
        <ValueCard
          variant="light"
          icon={<GiftIcon />}
          title="Empaque con intención"
          description="Cada pieza llega en un empaque cuidado, con una tarjeta con mensaje incluida."
        />
        <ValueCard
          variant="dark"
          icon={<HeartIcon stroke="#fa7e7b" />}
          title="10% se dona"
          description="Del valor de cada venta se destina directo a familias en duelo perinatal."
        />
        <ValueCard
          variant="pink"
          icon={<SparkleIcon />}
          title="Diseño exclusivo"
          description={'Piezas creadas por Lissa Gail para el programa "Lissa Gail Gives Back".'}
        />
      </div>

      {/* Catalog */}
      <div className="flex flex-col items-center w-full px-[24px] py-[80px]">
        <p className="font-['Poppins:SemiBold',sans-serif] text-[#fa7e7b] text-[14px] tracking-[0.2px] uppercase mb-[8px]">
          Producto
        </p>
        <h2 className="font-['Quicksand:SemiBold',sans-serif] font-semibold text-[#506685] text-[40px] leading-[48px] text-center tracking-[-0.5px] max-w-[700px]">
          Compra con propósito
        </h2>
        <p className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[0.1px] text-center max-w-[600px] mt-[16px]">
          Comenzamos con una pieza. Pronto sumaremos más productos a esta colección, cada una
          diseñada para acompañar y para dar.
        </p>

        <div className="flex flex-wrap items-start justify-center gap-[32px] mt-[48px] w-full">
          {PRODUCTS.map(product => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>

      {/* Story section */}
      <div className="bg-[#cbdcef] w-full py-[64px] px-[24px] lg:px-[48px]">
        <div className="max-w-[900px] mx-auto flex flex-col items-center gap-[24px] text-center">
          <h2 className="font-['Quicksand:SemiBold',sans-serif] font-semibold text-[#fa7e7b] text-[32px] leading-[40px] tracking-[-0.5px]">
            Un regalo con propósito
          </h2>
          {STORY_PRODUCT.story.map((paragraph, i) => (
            <p
              key={i}
              className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[26px] tracking-[0.1px] max-w-[680px]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Card + poem */}
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row items-center justify-center gap-[48px] mt-[48px]">
          <div className="w-[260px] rounded-[10px] overflow-hidden border border-white shadow-[0_12px_32px_rgba(80,102,133,0.18)]">
            <ImageWithFallback
              src={STORY_PRODUCT.cardImage}
              alt="Tarjeta incluida con la pulsera Baby Bear"
              className="w-full h-auto object-contain bg-white"
            />
          </div>

          <div className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[26px] tracking-[-0.25px] text-center md:text-left italic">
            {STORY_PRODUCT.poem.map((line, i) =>
              line === "" ? <br key={i} /> : <span key={i}>{line}<br /></span>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
