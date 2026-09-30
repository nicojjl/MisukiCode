import React from "react";
import Link from "next/link";
import { ProgressBar } from "../ui/ProgressBar";

interface HeaderProps {
  progress?: number;
  className?: string;
}

/**
 * Encabezado delgado de la lección al estilo Duolingo.
 * Aloja el enlace 'X' para salir al Dashboard y la barra de progreso reactiva.
 */
export const Header: React.FC<HeaderProps> = ({ progress = 0, className = "" }) => {
  return (
    <header
      className={`w-full h-16 bg-transparent px-4 sm:px-8 flex items-center justify-between gap-4 sm:gap-8 ${className}`}
    >
      <div className="w-full max-w-4xl mx-auto flex items-center gap-4 sm:gap-6">
        {/* Enlace de salida 'X' hacia el Dashboard principal */}
        <Link
          href="/"
          aria-label="Volver al menú principal"
          className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-xl hover:bg-slate-100 flex items-center justify-center shrink-0 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-[2.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>

        {/* Barra de progreso central interactiva */}
        <div className="flex-1">
          <ProgressBar progress={progress} />
        </div>
      </div>
    </header>
  );
};

