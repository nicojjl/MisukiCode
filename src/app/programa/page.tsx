"use client";

import React from "react";
import Link from "next/link";
import { MODULES, type CurriculumModule, getModuleProgressKey } from "@/lib/curriculum";
import { useProgress } from "@/hooks/useProgress";
import { ModuleAnimation } from "@/components/ui/ModuleAnimation";

const MODULE_COLORS = [
  "text-emerald-500",
  "text-blue-500",
  "text-purple-500",
  "text-amber-500",
  "text-rose-500",
  "text-teal-500",
  "text-indigo-500",
  "text-orange-500",
  "text-pink-500",
  "text-cyan-500",
];

/**
 * Sub-componente de Sección con diseño en Zig-Zag y estado reactivo local.
 */
function ModuleSection({
  module,
  index,
  color,
  isViewed,
  isCompleted,
  onMarkAsViewed,
}: {
  module: CurriculumModule;
  index: number;
  color: string;
  isViewed: boolean;
  isCompleted: boolean;
  onMarkAsViewed: () => void;
}) {
  const isEven = index % 2 === 0;

  return (
    <section
      className={`flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Columna de Texto */}
      <div className="flex-1 max-w-xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full inline-block">
            Módulo {module.id}
          </span>
          {isCompleted ? (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
              ✓ Completado
            </span>
          ) : isViewed ? (
            <span className="text-xs font-bold text-teal-700 bg-teal-100 px-3 py-1 rounded-full flex items-center gap-1">
              ✓ Visto
            </span>
          ) : null}
        </div>

        <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight ${color}`}>
          {module.title}
        </h2>
        <ul className="space-y-2.5 text-slate-600 text-lg mb-6">
          {module.lessons.map((lesson) => (
            <li key={lesson.id} className="flex items-start gap-3">
              <span className={`font-bold text-xl leading-none mt-1 ${color}`}>•</span>
              <span>{lesson.title}</span>
            </li>
          ))}
        </ul>

        {/* Acciones locales de progreso */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMarkAsViewed}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
              isCompleted
                ? "bg-emerald-100 text-emerald-800"
                : isViewed
                ? "bg-teal-100 text-teal-800 hover:bg-teal-200"
                : "bg-slate-200 hover:bg-slate-300 text-slate-700"
            }`}
          >
            {isCompleted
              ? "✓ Módulo Validado"
              : isViewed
              ? "✓ Marcado como Visto"
              : "Marcar como Visto"}
          </button>
        </div>
      </div>

      {/* Columna Visual Temática con Micro-animación SVG */}
      <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-violet-50/50 border-2 border-violet-100 flex flex-col items-center justify-center shrink-0 shadow-sm relative p-4">
        {isCompleted ? (
          <span className="absolute top-3 right-3 text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full z-10">
            🏆 Completado
          </span>
        ) : isViewed ? (
          <span className="absolute top-3 right-3 text-[11px] font-black uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full z-10">
            📖 Visto
          </span>
        ) : null}

        <div className="w-24 h-24 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
          <ModuleAnimation moduleId={module.id} />
        </div>
      </div>
    </section>
  );
}

/**
 * Página principal del Programa (/programa).
 * Syllabus público que itera sobre la única fuente de verdad (MODULES).
 */
export default function ProgramaPage() {
  const { progress, markAsViewed } = useProgress();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24 selection:bg-emerald-200 selection:text-emerald-900">
      {/* Barra de navegación superior con botón Volver */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-12 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/inicio"
            className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2 cursor-pointer select-none"
          >
            ← Volver al Dashboard
          </Link>

          <Link
            href="/desafios/primer-reto"
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-500 shadow-[0_3px_0_0_#059669] hover:bg-emerald-400 active:translate-y-0.5 active:shadow-none transition-all uppercase tracking-wide select-none"
          >
            Probar Desafío
          </Link>
        </div>
      </header>

      {/* Contenedor central del Currículo */}
      <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-16 sm:pt-20">
        {/* Encabezado Principal */}
        <div className="text-center max-w-2xl mx-auto mb-20 sm:mb-28">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full mb-3 inline-block">
            Currículo Integral
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Currículo de C
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Un recorrido pedagógico en 10 etapas diseñado para llevarte desde la sintaxis básica hasta la gestión de memoria profunda y el nivel laboral.
          </p>
        </div>

        {/* Iteración de los 10 módulos en diseño zig-zag con espaciado amplio */}
        <div className="space-y-24 sm:space-y-32">
          {MODULES.map((module, index) => {
            const moduleKey = getModuleProgressKey(module.id);
            const modProgress =
              progress[moduleKey] ||
              progress[String(module.id)] ||
              Object.entries(progress).find(([key]) => key.startsWith(`${moduleKey}_`))?.[1];
            const color = MODULE_COLORS[(module.id - 1) % MODULE_COLORS.length];
            return (
              <ModuleSection
                key={module.id}
                module={module}
                index={index}
                color={color}
                isViewed={Boolean(modProgress?.visto)}
                isCompleted={Boolean(modProgress?.completado)}
                onMarkAsViewed={() => markAsViewed(moduleKey)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
