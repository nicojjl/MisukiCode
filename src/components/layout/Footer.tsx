import React from "react";
import { LessonStatus } from "../../types/exercise";
import { Button } from "../ui/Button";

interface FooterProps {
  status: LessonStatus;
  feedback: string;
  isInputEmpty: boolean;
  onCheck: () => void;
  onNext: () => void;
  className?: string;
}

/**
 * Barra inferior fija reactiva estilo Duolingo.
 * Presenta transiciones de color y micro-retroalimentación según el estado de la evaluación.
 */
export const Footer: React.FC<FooterProps> = ({
  status,
  feedback,
  isInputEmpty,
  onCheck,
  onNext,
  className = "",
}) => {
  const isError = status === "error";
  const isSuccess = status === "success";

  const containerBg = isSuccess
    ? "bg-emerald-50 border-t-2 border-emerald-200"
    : isError
    ? "bg-rose-50 border-t-2 border-rose-200"
    : "bg-white border-t-2 border-slate-200/90";

  return (
    <footer
      className={`w-full py-5 px-4 sm:px-8 transition-colors duration-200 ${containerBg} ${className}`}
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Sección izquierda: Feedback visual con icono amigable */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {isSuccess && (
            <div className="flex items-center gap-3 text-emerald-700 font-bold text-lg animate-in fade-in slide-in-from-bottom-2">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                ✓
              </span>
              <span>{feedback || "¡Excelente! Solución correcta."}</span>
            </div>
          )}

          {isError && (
            <div className="flex items-center gap-3 text-rose-600 font-bold text-lg animate-in fade-in slide-in-from-bottom-2">
              <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                ✕
              </span>
              <span>{feedback || "Solución incorrecta. Inténtalo de nuevo."}</span>
            </div>
          )}
        </div>

        {/* Sección derecha: Botón de acción principal con listeners onClick rigurosos */}
        <div className="w-full sm:w-auto flex justify-end">
          {status === "idle" && (
            <Button
              variant={isInputEmpty ? "inactive" : "primary"}
              disabled={isInputEmpty}
              onClick={onCheck}
              className="w-full sm:w-auto"
            >
              Comprobar
            </Button>
          )}

          {status === "checking" && (
            <Button
              variant="inactive"
              disabled={true}
              className="w-full sm:w-auto"
            >
              Comprobando...
            </Button>
          )}

          {status === "error" && (
            <Button
              variant="danger"
              disabled={false}
              onClick={onCheck}
              className="w-full sm:w-auto"
            >
              Reintentar
            </Button>
          )}

          {status === "success" && (
            <Button
              variant="primary"
              disabled={false}
              onClick={onNext}
              className="w-full sm:w-auto"
            >
              Continuar
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
};

