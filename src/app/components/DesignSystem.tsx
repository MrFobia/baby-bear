import React from "react";

// ─── Typography ──────────────────────────────────────────────────────────────

export const labelCls =
  "font-['Poppins:Regular',sans-serif] text-[#506685] text-[16px] leading-[24px] tracking-[-0.25px]";

export const sectionTitleCls =
  "font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[16px] leading-[24px]";

// ─── Form inputs ─────────────────────────────────────────────────────────────

const fieldInputCls =
  "w-full bg-transparent border-b-[1.5px] border-b-[#fa7e7b] px-[8px] py-[8px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#506685] placeholder-[#cbdcef] tracking-[0.1px] outline-none";

export function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[4px]">
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

export function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={fieldInputCls} />;
}

export function FormTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={fieldInputCls + " resize-none"} />;
}

export function FormSelect({
  children,
  hasValue,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { hasValue?: boolean }) {
  return (
    <div className="relative">
      <select
        {...props}
        className={fieldInputCls + " appearance-none cursor-pointer pr-[28px]"}
        style={{ color: hasValue ? "#506685" : "#cbdcef" }}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2"
        width="10" height="6" viewBox="0 0 10 6" fill="none"
      >
        <path d="M1 1L5 5L9 1" stroke="#506685" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Chips ────────────────────────────────────────────────────────────────────

export function ChipTag({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`cursor-pointer px-[14px] py-[6px] rounded-full border text-[14px] font-['Poppins:Regular',sans-serif] transition-colors ${
        checked
          ? "bg-[#fa7e7b] border-[#fa7e7b] text-white"
          : "border-[#cbdcef] text-[#506685] hover:border-[#fa7e7b]"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Buttons ─────────────────────────────────────────────────────────────────

export function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`cursor-pointer px-[20px] py-[10px] rounded-[8px] bg-[#fa7e7b] hover:bg-[#e86e6b] font-['Poppins:SemiBold',sans-serif] text-white text-[14px] transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`cursor-pointer px-[20px] py-[10px] rounded-[8px] border border-[#506685] font-['Poppins:Regular',sans-serif] text-[#506685] text-[14px] hover:bg-[#f0f4f8] transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function DangerButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`cursor-pointer px-[20px] py-[10px] rounded-[8px] border border-red-400 font-['Poppins:Regular',sans-serif] text-red-500 text-[14px] hover:bg-red-50 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

export function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`px-[10px] py-[2px] rounded-full text-[13px] font-['Poppins:SemiBold',sans-serif] ${
        active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
      }`}
    >
      {active ? "Activo" : "Inactivo"}
    </span>
  );
}

// ─── Modal shell ──────────────────────────────────────────────────────────────

export function Modal({
  title,
  onClose,
  children,
  footer,
  width = "w-[580px]",
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-[20px] ${width} max-h-[90vh] overflow-y-auto shadow-xl`}
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white px-[32px] pt-[32px] pb-[16px] flex items-center justify-between border-b border-[#f0f0f0]">
          <p className="font-['Poppins:SemiBold',sans-serif] text-[#506685] text-[20px] leading-[28px]">
            {title}
          </p>
          <button
            onClick={onClose}
            className="text-[#506685] hover:opacity-70 text-[24px] leading-none cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="px-[32px] py-[24px]">{children}</div>
        {footer && (
          <div className="sticky bottom-0 bg-white px-[32px] pb-[32px] pt-[16px] flex gap-[12px] justify-end border-t border-[#f0f0f0]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Stats card ───────────────────────────────────────────────────────────────

export function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px relative">
      <div className="relative shrink-0 size-[30px]">{icon}</div>
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[24px] text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">
        {label}
      </p>
      <p className="font-['Poppins:Regular',sans-serif] leading-[24px] text-[#506685] text-[16px] tracking-[-0.25px] whitespace-nowrap">
        {value}
      </p>
    </div>
  );
}
