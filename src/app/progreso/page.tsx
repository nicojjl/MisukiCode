"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MODULES } from "@/lib/curriculum";

const LEVEL_MAP: Record<string, number> = {
  principiante: 0,
  basico: 1,
  intermedio: 2,
  avanzado: 3,
};

const LEVEL_NAMES: Record<number, string> = {
  0: "Principiante",
  1: "Básico",
  2: "Intermedio",
  3: "Avanzado",
};

/**
 * Vista de Árbol de Habilidades (/progreso).
 * Acordeón interactivo de 10 módulos con nodos de estudio secuenciales.
 */
export default function ProgresoPage() {
  const [userLevel, setUserLevel] = useState<number>(0);
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  // Leer nivel del usuario desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mz_level");
      if (stored && stored in LEVEL_MAP) {
        setUserLevel(LEVEL_MAP[stored]);
      } else {
        setUserLevel(0);
      }
    } catch {
      setUserLevel(0);
    }
  }, []);

  const toggleModule = (id: number) => {
    setExpandedModule((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      {/* 1. Barra de Navegación Superior */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-12 py-4 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/inicio" className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-lg shadow-sm">
              C
            </span>
            <span className="text-xl font-black tracking-tight text-slate-900">
              MizukiCode
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/welcome"
              title="Cambiar nivel"
              className="text-xs font-bold text-violet-700 bg-violet-100 hover:bg-violet-200 px-3 py-1.5 rounded-full transition-colors"
            >
              Nivel: {LEVEL_NAMES[userLevel]} ⚙️
            </Link>

            <Link
              href="/inicio"
              className="text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Encabezado del Árbol de Habilidades */}
      <main className="max-w-4xl mx-auto px-6 pt-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-violet-700 bg-violet-100 px-3 py-1 rounded-full mb-3 inline-block">
            Ruta de Aprendizaje
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Árbol de Habilidades
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Explora los 10 módulos pedagógicos de C. Expande cada etapa para estudiar los nodos
            clave y las materias de profundización.
          </p>
        </div>

        {/* 3. Lista de Módulos (Acordeón) */}
        <div className="flex flex-col gap-4">
          {MODULES.map((module) => {
            const isUnlocked = module.requiredLevel <= userLevel;
            const isExpanded = isUnlocked && expandedModule === module.id;

            // Estado: Bloqueado
            if (!isUnlocked) {
              return (
                <div
                  key={module.id}
                  className="w-full bg-slate-50 text-slate-400 border border-slate-200 rounded-2xl p-5 select-none cursor-not-allowed opacity-85"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-slate-200 text-slate-400 font-bold flex items-center justify-center text-sm">
                        🔒
                      </span>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-400">
                          {module.title}
                        </h2>
                        <p className="text-xs text-slate-400">
                          Requiere nivel {LEVEL_NAMES[module.requiredLevel]} o superior
                        </p>
                      </div>
                    </div>

                    <span className="bg-slate-200 text-slate-500 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                      BLOQUEADO
                    </span>
                  </div>
                </div>
              );
            }

            // Estado: Desbloqueado
            return (
              <div
                key={module.id}
                className="w-full bg-white border-2 border-violet-300 rounded-2xl p-5 transition-all shadow-sm hover:border-violet-400 hover:shadow-md"
              >
                {/* Cabecera del Módulo interactivo */}
                <div
                  onClick={() => toggleModule(module.id)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 font-black flex items-center justify-center text-sm shadow-sm">
                      {module.id}
                    </span>
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-slate-900">
                        {module.title}
                      </h2>
                      <p className="text-xs text-violet-600 font-bold">
                        {module.lessons.length} nodos formativos
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-[11px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      DESBLOQUEADO
                    </span>
                    <svg
                      className={`w-5 h-5 text-violet-600 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* 4. Camino Interno (Nodos de Estudio) */}
                {isExpanded && (
                  <div className="flex flex-col gap-4 pl-4 border-l-2 border-violet-200 ml-4 mt-6 pt-1">
                    {module.lessons.map((lesson) => {
                      if (lesson.isOptional) {
                        return (
                          <div
                            key={lesson.id}
                            className="bg-violet-50 text-violet-700 text-sm border border-violet-200 rounded-lg p-3 relative transition-all"
                          >
                            {/* Círculo (nodo) en la línea izquierda */}
                            <div className="absolute -left-[23px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-500 ring-2 ring-white" />

                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-violet-800">
                                {lesson.title}
                              </span>
                              <span className="text-[10px] font-black uppercase tracking-wider bg-violet-200/80 text-violet-800 px-2 py-0.5 rounded-md shrink-0">
                                Opcional
                              </span>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={lesson.id}
                          className="bg-white border border-violet-200 rounded-lg p-3 relative shadow-sm transition-all"
                        >
                          {/* Círculo (nodo) en la línea izquierda */}
                          <div className="absolute -left-[23px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-500 ring-2 ring-white" />

                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-slate-900 text-sm">
                              {lesson.title}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
