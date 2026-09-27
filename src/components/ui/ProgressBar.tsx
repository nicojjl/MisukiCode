import React from "react";

interface ProgressBarProps {
  className?: string;
}

/**
 * Componente atómico de barra de progreso visual.
 * En la Capa 1 actúa como cascarón estructural (track vacío) sin estado de avance.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({ className = "" }) => {
  return (
    <div
      role="progressbar"
      aria-label="Progreso de la lección"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      className={`h-3.5 w-full bg-slate-200 rounded-full overflow-hidden ${className}`}
    >
      {/* Carril de relleno vacío reservado para capas posteriores */}
      <div className="h-full w-0 bg-transparent transition-all duration-300" />
    </div>
  );
};
