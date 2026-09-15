import type { Product } from "../products";
import { goToProduct } from "../navigation";

export function ProductCard({ product }: { product: Product }) {
  return (
    <button
      onClick={() => goToProduct(product.slug)}
      className="group flex flex-col items-start text-left w-[320px] bg-white border border-[#c7c9cd] rounded-[10px] overflow-hidden cursor-pointer transition-shadow hover:shadow-[0_12px_32px_rgba(80,102,133,0.16)]"
    >
      <div className="relative w-full aspect-square bg-[#cbdcef] overflow-hidden flex items-center justify-center p-[32px]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <div className="absolute top-[12px] left-[12px] bg-[#506685] rounded-[50px] px-[10px] py-[4px]">
          <span className="font-['Poppins:Regular',sans-serif] text-[#cbdcef] text-[12px] tracking-[0.1px]">
            {product.donationPercent}% donado
          </span>
        </div>
      </div>

      <div className="flex flex-col items-start gap-[8px] p-[24px] w-full">
        <p className="font-['Quicksand:SemiBold',sans-serif] font-semibold text-[#fa7e7b] text-[22px] leading-[28px]">
          {product.name}
        </p>
        <p className="font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] leading-[20px] tracking-[0.1px]">
          {product.tagline}
        </p>
        <div className="flex items-center justify-between w-full mt-[8px]">
          <span className="font-['Quicksand:Bold',sans-serif] font-bold text-[#506685] text-[20px]">
            ${product.price.toFixed(2)}
          </span>
          <span className="font-['Poppins:SemiBold',sans-serif] text-[#fa7e7b] text-[14px] tracking-[0.1px] group-hover:underline">
            Ver producto →
          </span>
        </div>
      </div>
    </button>
  );
}
