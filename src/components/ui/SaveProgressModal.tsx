"use client";

import React from "react";
import { createClient } from "@/lib/supabase/client";

interface SaveProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  nivel: string | null;
}

/**
 * Modal 'Guarda tu progreso' para retener a usuarios del Guest Flow tras su primera victoria.
 */
export function SaveProgressModal({
  isOpen,
  onClose,
  nivel,
}: SaveProgressModalProps) {
  if (!isOpen) return null;

  const handleLogin = async () => {
    // 1. Guardamos el estado temporal en el navegador antes de ir a Google
    localStorage.setItem(
      "mz_pending_save",
      JSON.stringify({ level: nivel, exerciseCompleted: true })
    );
    // 2. Redirigimos a Google
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center flex flex-col items-center">
        {/* Ícono de éxito */}
        <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm">
          🏆
        </div>

        {/* Título Principal */}
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          ¡Excelente código!
        </h2>

        {/* Texto persuasivo */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Acabas de completar tu primer desafío. Crea una cuenta gratis para guardar tu progreso y desbloquear el siguiente módulo.
        </p>

        {/* Efecto Endowment (Visual) */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            <span>Tu inventario actual:</span>
            <span className="capitalize text-purple-600 font-extrabold">
              {nivel || "Principiante"}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1.5">
            <span>Progreso de XP</span>
            <span className="font-bold text-purple-600">10 / 100 XP</span>
          </div>

          {/* Barra de XP falsa llena al 10% en color morado */}
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-[10%] h-full bg-purple-600 rounded-full" />
          </div>
        </div>

        {/* Botón Primario: Continuar con Google */}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full py-3.5 px-4 rounded-2xl font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-[0_4px_0_0_#0f172a] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-3 text-sm cursor-pointer mb-3"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.34 7.31 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.15Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.66 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
            />
          </svg>
          <span>Continuar con Google</span>
        </button>

        {/* Botón Secundario: Seguir explorando como invitado */}
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors py-2 cursor-pointer"
        >
          Seguir explorando como invitado
        </button>
      </div>
    </div>
  );
}
