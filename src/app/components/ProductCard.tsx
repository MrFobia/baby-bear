import type { Product } from "../products";
import type { Lang } from "../navigation";

export function ProductCard({ product, lang = "es" }: { product: Product; lang?: Lang }) {
  const name = lang === "en" ? product.en.name : product.name;
  const tagline = lang === "en" ? product.en.tagline : product.tagline;
  return (
    <a
      href={product.purchaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-start text-left w-[320px] bg-white border border-[#c7c9cd] rounded-[10px] overflow-hidden cursor-pointer transition-shadow hover:shadow-[0_12px_32px_rgba(80,102,133,0.16)]"
    >
      <div className="relative w-full aspect-square bg-[#cbdcef] overflow-hidden flex items-center justify-center p-[32px]">
        <img
          src={product.images[0]}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <div className="absolute top-[12px] left-[12px] bg-[#506685] rounded-[50px] px-[10px] py-[4px]">
          <span className="font-['Poppins:Regular',sans-serif] text-[#cbdcef] text-[12px] tracking-[0.1px]">
            {product.donationPercent}% {lang === "en" ? "donated" : "donado"}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-start gap-[8px] p-[24px] w-full">
        <p className="font-['Quicksand:SemiBold',sans-serif] font-semibold text-[#fa7e7b] text-[22px] leading-[28px]">
          {name}
        </p>
        <p className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] leading-[20px] tracking-[0.1px]">
          {tagline}
        </p>
        <div className="flex items-center justify-between w-full mt-[8px]">
          <span className="font-['Quicksand:Bold',sans-serif] font-bold text-[#506685] text-[20px]">
            ${product.price.toFixed(2)}
          </span>
          <span className="font-['Poppins:SemiBold',sans-serif] text-[#fa7e7b] text-[14px] tracking-[0.1px] group-hover:underline">
            {lang === "en" ? "View product →" : "Ver producto →"}
          </span>
        </div>
      </div>
    </a>
  );
}
