import React from "react";
import Link from "next/link";

/**
 * Vista de Progreso y Ruta de Aprendizaje (/progreso).
 * Placeholder informativo para la ruta estructurada de módulos.
 */
export default function ProgresoPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      {/* Barra de navegación */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-12 py-4 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/inicio" className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-lg shadow-sm">
              C
            </span>
            <span className="text-xl font-black tracking-tight text-slate-900">
              MizukiCode
            </span>
          </Link>
          <Link
            href="/inicio"
            className="text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
          >
            ← Volver al Cuartel General
          </Link>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-2xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-sm border border-purple-200">
          🗺️
        </div>

        <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full mb-4">
          En Desarrollo
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Tu Ruta de Progreso
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
          Estamos ensamblando la vista de árbol interactivo con tus módulos desbloqueados,
          hitos de memoria dinámica y evaluaciones periódicas.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link
            href="/programa"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-purple-600 text-white font-black text-sm shadow-[0_4px_0_0_#7e22ce] hover:bg-purple-500 active:translate-y-1 active:shadow-none transition-all"
          >
            Ver Programa Completo
          </Link>
          <Link
            href="/inicio"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-black text-sm shadow-[0_4px_0_0_#e2e8f0] hover:border-slate-300 active:translate-y-1 active:shadow-none transition-all"
          >
            Volver a Inicio
          </Link>
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-slate-400 font-semibold border-t border-slate-200/60 bg-white/40">
        MizukiCode — Plataforma Interactiva de Aprendizaje en C
      </footer>
    </div>
  );
}
