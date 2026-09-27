import React from "react";
import { Exercise, BLANK_TOKEN, LessonStatus } from "../../types/exercise";

interface CardProps {
  exercise?: Exercise | null;
  userInput?: string;
  setUserInput?: (value: string) => void;
  status?: LessonStatus;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Contenedor visual central de la lección.
 * Renderiza el enunciado, el bloque de código C y el campo de texto interactivo embebido.
 */
export const Card: React.FC<CardProps> = ({
  exercise,
  userInput = "",
  setUserInput,
  status = "idle",
  children,
  className = "",
}) => {
  // Si no se pasa ejercicio (ej. pantalla de felicitaciones), renderizamos los children
  if (!exercise) {
    return (
      <div
        className={`w-full max-w-2xl min-h-[380px] bg-white rounded-3xl border-2 border-slate-200/90 p-8 sm:p-10 shadow-sm flex flex-col justify-center items-center ${className}`}
      >
        {children}
      </div>
    );
  }

  // Tokenización del código C delimitado por BLANK_TOKEN
  const [prefix, suffix] = exercise.codeTemplate.split(BLANK_TOKEN);

  return (
    <div
      className={`w-full max-w-2xl min-h-[380px] bg-white rounded-3xl border-2 border-slate-200/90 p-8 sm:p-10 shadow-sm flex flex-col justify-between ${className}`}
    >
      {/* Encabezado del ejercicio */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mb-2">
          {exercise.title}
        </h2>
        <p className="text-slate-500 text-base sm:text-lg">
          {exercise.description}
        </p>
      </div>

      {/* Editor visual de código C */}
      <div className="w-full bg-slate-100/90 border border-slate-200/80 rounded-2xl p-6 font-mono text-sm sm:text-base leading-relaxed text-slate-800 shadow-inner overflow-x-auto my-auto">
        <pre className="inline whitespace-pre-wrap font-mono">
          {prefix}
        </pre>

        <input
          type="text"
          maxLength={20}
          value={userInput}
          onChange={(e) => setUserInput?.(e.target.value)}
          disabled={status === "checking" || status === "success"}
          placeholder="___"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="mx-1 px-3 py-1 font-mono font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-center min-w-[120px] max-w-[200px] shadow-sm transition-all inline-block"
        />

        <pre className="inline whitespace-pre-wrap font-mono">
          {suffix}
        </pre>
      </div>

      {/* Pie sutil de contexto o ayuda futura */}
      <div className="mt-4 text-xs text-slate-400 text-right">
        Lenguaje C • ISO C99/C11
      </div>
    </div>
  );
};
