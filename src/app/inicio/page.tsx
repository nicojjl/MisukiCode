"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MZ_LEVEL_KEY, MZ_USER_NAME_KEY } from "@/lib/store";

/**
 * Cuartel General / Dashboard Principal (/inicio).
 * Client Component autónomo y local con saludo personalizado y selección de 3 modos de aprendizaje.
 */
export default function InicioPage() {
  const [nombre, setNombre] = useState<string>("Cadete");
  const [nivel, setNivel] = useState<string>("Principiante");

  useEffect(() => {
    try {
      const storedName = localStorage.getItem(MZ_USER_NAME_KEY);
      if (storedName) setNombre(storedName);

      const storedLevel = localStorage.getItem(MZ_LEVEL_KEY);
      if (storedLevel) setNivel(storedLevel);
    } catch {
      // Ignorar errores en SSR
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Barra de navegación superior del Dashboard */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-12 py-4 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/inicio"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer"
          >
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
              title="Cambiar nivel de aprendizaje"
              className="text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-full capitalize transition-colors"
            >
              Nivel: {nivel} ⚙️
            </Link>
          </div>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="max-w-5xl mx-auto px-6 pt-10 sm:pt-14">
        {/* Encabezado y Saludo */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-2">
            ¡Hola {nombre}, bienvenido!
          </h1>
          <p className="text-lg sm:text-xl font-bold text-slate-500 tracking-tight">
            Elige tu modo de aprendizaje
          </p>
        </div>

        {/* Grid Responsivo de 3 Modos de Aprendizaje */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Tarjeta 1: Progreso (Diseño Primario) */}
          <Link
            href="/progreso"
            className="group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-purple-50/80 to-white border-2 border-purple-200 shadow-[0_4px_0_0_#e9d5ff] hover:border-purple-400 hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <div>
              {/* Ilustración visual de nodos de ruta */}
              <div className="w-full h-36 bg-purple-100/60 rounded-2xl flex items-center justify-center p-4 mb-6 border border-purple-200/80">
                <svg
                  className="w-28 h-20 text-purple-600"
                  viewBox="0 0 120 80"
                  fill="none"
                >
                  <path
                    d="M30 25 C60 25, 60 55, 90 55"
                    stroke="#c084fc"
                    strokeWidth="4"
                    strokeDasharray="4 4"
                  />
                  <circle cx="30" cy="25" r="14" fill="#a855f7" />
                  <path
                    d="M26 25l3 3 6-6"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="90" cy="55" r="14" fill="#9333ea" />
                  <circle cx="90" cy="55" r="5" fill="white" />
                </svg>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full mb-3 inline-block">
                Ruta Principal
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-purple-600 transition-colors">
                Progreso
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Continúa tu ruta de aprendizaje estructurada
              </p>
            </div>

            <div className="mt-6 flex items-center text-sm font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
              Continuar ruta →
            </div>
          </Link>

          {/* Tarjeta 2: Desafíos (Diseño Secundario) */}
          <Link
            href="/desafios/primer-reto"
            className="group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-[0_4px_0_0_#e2e8f0] hover:border-slate-300 hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <div>
              {/* Ilustración visual de escalada hacia la bandera */}
              <div className="w-full h-36 bg-slate-100 rounded-2xl flex items-center justify-center p-4 mb-6 border border-slate-200">
                <svg
                  className="w-28 h-20 text-slate-700"
                  viewBox="0 0 120 80"
                  fill="none"
                >
                  {/* Escalones */}
                  <path
                    d="M20 70 H45 V52 H70 V34 H95 V16"
                    stroke="#94a3b8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Mástil y bandera */}
                  <line
                    x1="95"
                    y1="16"
                    x2="95"
                    y2="4"
                    stroke="#64748b"
                    strokeWidth="3"
                  />
                  <path d="M95 4 L112 9 L95 14 Z" fill="#ef4444" />
                  {/* Personaje escalador */}
                  <circle cx="45" cy="38" r="6" fill="#3b82f6" />
                  <path
                    d="M45 44 L45 54 M45 48 L39 44 M45 48 L51 44 M45 54 L40 64 M45 54 L50 64"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full mb-3 inline-block">
                Práctica Guiada
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                Desafíos
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Pon a prueba tus conocimientos con ejercicios específicos
              </p>
            </div>

            <div className="mt-6 flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
              Ver retos →
            </div>
          </Link>

          {/* Tarjeta 3: Compilador C (Diseño Secundario) */}
          <Link
            href="/sandbox"
            className="group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-[0_4px_0_0_#e2e8f0] hover:border-slate-300 hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <div>
              {/* Ilustración visual de consola/compilador C */}
              <div className="w-full h-36 bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-4 mb-6 border border-slate-800 shadow-inner">
                <div className="w-12 h-12 rounded-xl bg-purple-600 text-white font-black text-2xl flex items-center justify-center shadow-md mb-2">
                  C
                </div>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  &gt;_ gcc main.c
                </span>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full mb-3 inline-block">
                Laboratorio
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-emerald-600 transition-colors">
                Compilador Libre
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Escribe y prueba código C sin restricciones
              </p>
            </div>

            <div className="mt-6 flex items-center text-sm font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              Abrir consola →
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
