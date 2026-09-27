import React from "react";

interface ProgressBarProps {
  progress?: number;
  className?: string;
}

/**
 * Componente atómico de barra de progreso visual estilo Duolingo.
 * Controla el porcentaje de llenado mediante estilos en línea reactivos al prop `progress`.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  className = "",
}) => {
  return (
    <div
      role="progressbar"
      aria-label="Progreso de la lección"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.max(0, Math.min(100, progress))}
      className={`h-3.5 w-full bg-slate-200 rounded-full overflow-hidden ${className}`}
    >
      {/* Carril interior dinámico con transición fluida y estilo en línea reactivo */}
      <div
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
      />
    </div>
  );
};
