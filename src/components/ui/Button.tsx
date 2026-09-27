import React from "react";

export type ButtonVariant = "primary" | "inactive" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

/**
 * Componente base de botón táctil estilo Duolingo.
 * Soporta variantes táctiles: primary (verde), inactive (gris) y danger (rojo).
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "inactive",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-8 py-3.5 rounded-2xl font-bold text-base tracking-wide transition-all duration-150 inline-flex items-center justify-center select-none uppercase";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-emerald-500 text-white shadow-[0_4px_0_0_#059669] hover:bg-emerald-400 active:translate-y-1 active:shadow-none cursor-pointer",
    inactive:
      "bg-slate-200 text-slate-400 shadow-[0_4px_0_0_#cbd5e1] cursor-not-allowed",
    danger:
      "bg-rose-500 text-white shadow-[0_4px_0_0_#be123c] hover:bg-rose-400 active:translate-y-1 active:shadow-none cursor-pointer",
  };

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
