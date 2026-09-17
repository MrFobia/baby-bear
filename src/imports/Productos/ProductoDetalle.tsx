import { useState, type ReactNode } from "react";
import { Header } from "../../app/components/Header";
import { Footer } from "../../app/components/Footer";
import { ImageWithFallback } from "../../app/components/figma/ImageWithFallback";
import { getProduct } from "../../app/products";
import { goTo } from "../../app/navigation";
import type { Lang } from "../../app/navigation";
import CLOSING_BANNER_IMG from "./banner-productos.jpg";

function GiftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#506685" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M3 12h18M12 8v13" />
      <path d="M12 8c-1.5-4-6-4-6-1.5S9 8 12 8Zm0 0c1.5-4 6-4 6-1.5S15 8 12 8Z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#506685" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#506685" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7.5-4.6-10-9.3C.5 8.2 2.3 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5c3.3 0 5.1 3.2 3.6 6.7C15.5 16.4 12 21 12 21Z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
      <path d="M1.5 1.5 6.5 6l-5 4.5" stroke="#506685" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrustBadge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[8px] text-center flex-1">
      {icon}
      <span className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[13px] leading-[18px] tracking-[0.1px]">
        {label}
      </span>
    </div>
  );
}

const COPY: Record<Lang, {
  notFound: string;
  backToProducts: string;
  breadcrumbProducts: string;
  donatedBadge: (donationPercent: number) => string;
  buyNow: string;
  badge1: string;
  badge2: (donationPercent: number) => string;
  badge3: string;
  closingBannerText: string;
  closingBannerCta: (name: string) => string;
}> = {
  es: {
    notFound: "No encontramos este producto.",
    backToProducts: "Volver a Productos",
    breadcrumbProducts: "Productos",
    donatedBadge: donationPercent => `${donationPercent}% donado a la Fundación Baby Bear`,
    buyNow: "Comprar ahora",
    badge1: "Empaque cuidado, con tarjeta incluida",
    badge2: donationPercent => `${donationPercent}% se dona a familias en duelo`,
    badge3: 'Diseño exclusivo "Lissa Gail Gives Back"',
    closingBannerText: "Un pequeño gesto que sostiene a una familia entera.",
    closingBannerCta: name => `Comprar ${name}`,
  },
  en: {
    notFound: "We couldn't find this product.",
    backToProducts: "Back to Products",
    breadcrumbProducts: "Products",
    donatedBadge: donationPercent => `${donationPercent}% donated to the Baby Bear Foundation`,
    buyNow: "Buy now",
    badge1: "Thoughtful packaging, card included",
    badge2: donationPercent => `${donationPercent}% is donated to families facing loss`,
    badge3: 'Exclusive "Lissa Gail Gives Back" design',
    closingBannerText: "A small gesture that holds up an entire family.",
    closingBannerCta: name => `Buy ${name}`,
  },
};

export default function ProductoDetalle({ slug, lang = "es" }: { slug: string; lang?: Lang }) {
  const product = getProduct(slug);
  const [activeImage, setActiveImage] = useState(0);
  const copy = COPY[lang];

  if (!product) {
    return (
      <div className="size-full bg-white">
        <Header lang={lang} />
        <div className="flex flex-col items-center py-[120px] gap-[16px]">
          <p className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px]">
            {copy.notFound}
          </p>
          <button
            onClick={() => goTo("productos")}
            className="font-['Quicksand:SemiBold',sans-serif] font-semibold text-[#fa7e7b] text-[16px] cursor-pointer"
          >
            {copy.backToProducts}
          </button>
        </div>
      </div>
    );
  }

  const name = lang === "en" ? product.en.name : product.name;
  const tagline = lang === "en" ? product.en.tagline : product.tagline;

  return (
    <div className="size-full bg-white">
      <Header lang={lang} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-[8px] px-[48px] pt-[32px]">
        <button
          onClick={() => goTo("productos")}
          className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] tracking-[0.1px] cursor-pointer hover:text-[#fa7e7b] transition-colors"
        >
          {copy.breadcrumbProducts}
        </button>
        <ChevronIcon />
        <span className="font-['Poppins:SemiBold',sans-serif] text-[#fa7e7b] text-[14px] tracking-[0.1px]">
          {name}
        </span>
      </div>

      {/* Main grid */}
      <div className="flex flex-col lg:flex-row gap-[56px] px-[48px] py-[40px] max-w-[1320px] mx-auto">
        {/* Gallery */}
        <div className="flex flex-col gap-[16px] w-full lg:w-[560px] shrink-0">
          <div className="w-full aspect-square bg-[#cbdcef] rounded-[12px] overflow-hidden flex items-center justify-center p-[48px]">
            <ImageWithFallback
              src={product.images[activeImage]}
              alt={name}
              className="w-full h-full object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-[12px]">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImage(i)}
                  className={`w-[88px] h-[88px] rounded-[8px] overflow-hidden cursor-pointer border-2 transition-colors bg-[#cbdcef] p-[8px] ${
                    i === activeImage ? "border-[#fa7e7b]" : "border-transparent hover:border-[#c7c9cd]"
                  }`}
                >
                  <ImageWithFallback src={src} alt={`${name} ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy box */}
        <div id="comprar" className="flex flex-col items-start gap-[20px] w-full lg:w-[420px] scroll-mt-[32px]">
          <div className="flex items-center gap-[8px] bg-[#f8dcd8] rounded-[50px] px-[12px] py-[6px]">
            <span className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[12px] tracking-[0.1px]">
              {copy.donatedBadge(product.donationPercent)}
            </span>
          </div>

          <h1 className="font-['Quicksand:Bold',sans-serif] font-bold text-[#506685] text-[36px] leading-[42px] tracking-[-0.5px]">
            {name}
          </h1>
          <p className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[0.1px]">
            {tagline}
          </p>

          <span className="font-['Quicksand:Bold',sans-serif] font-bold text-[#fa7e7b] text-[32px]">
            ${product.price.toFixed(2)}
          </span>

          <a
            href={product.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-[44px] bg-[#fa7e7b] rounded-[5px] cursor-pointer hover:bg-[#e86e6b] transition-colors flex items-center justify-center"
          >
            <span className="font-['Quicksand:SemiBold',sans-serif] font-semibold text-[16px] text-white">
              {copy.buyNow}
            </span>
          </a>

          {/* Trust badges */}
          <div className="flex items-start w-full gap-[8px] mt-[16px] pt-[24px] border-t border-[#c7c9cd]">
            <TrustBadge icon={<GiftIcon />} label={copy.badge1} />
            <TrustBadge icon={<HeartIcon />} label={copy.badge2(product.donationPercent)} />
            <TrustBadge icon={<SparkleIcon />} label={copy.badge3} />
          </div>
        </div>
      </div>

      {/* Closing banner */}
      <div className="h-[320px] overflow-clip relative shrink-0 w-full mt-[40px]" data-name="Closing Banner">
        <div className="absolute inset-0" aria-hidden>
          <img alt="" className="absolute inset-0 w-full h-full object-cover object-center" src={CLOSING_BANNER_IMG} />
          <div className="absolute bg-[#506685] inset-0 mix-blend-multiply" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[20px] px-[24px] text-center">
          <p className="font-['Quicksand:SemiBold',sans-serif] font-semibold text-white text-[28px] leading-[36px] max-w-[560px]">
            {copy.closingBannerText}
          </p>
          <a
            href={product.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#fa7e7b] px-[32px] py-[14px] rounded-[5px] cursor-pointer hover:bg-[#e86e6b] transition-colors"
          >
            <span className="font-['Quicksand:SemiBold',sans-serif] font-semibold text-[18px] text-white">
              {copy.closingBannerCta(name)}
            </span>
          </a>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
