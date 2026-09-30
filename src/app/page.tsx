import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { HeroHeadline } from "@/components/ui/HeroHeadline";

/**
 * Exactamente 30 frases persuasivas sobre C, punteros y memoria.
 * Seleccionadas aleatoriamente en el cliente para evitar Hydration Mismatch.
 */
const HERO_PHRASES: string[] = [
  "Domina los punteros sin perder la cabeza.",
  "De malloc() a free() con total confianza.",
  "El arte del bajo nivel, ahora interactivo.",
  "Aprende C entendiendo la memoria real.",
  "Sin recolector de basura, con control total.",
  "La base de los sistemas operativos en tus manos.",
  "Punteros, estructuras y algoritmos paso a paso.",
  "Entiende lo que el hardware realmente ejecuta.",
  "Programa sin miedo al temido Segmentation Fault.",
  "Aritmética de punteros explicada con claridad.",
  "Construye estructuras de datos desde los cimientos.",
  "Aprende el lenguaje que impulsa a Linux y Git.",
  "Gestión de memoria dinámica explicada visualmente.",
  "Conquista la consola escribiendo código C puro.",
  "De novato a maestro de la memoria del computador.",
  "Optimización real y eficiencia en cada byte.",
  "El poder de C simplificado al estilo interactivo.",
  "Aprende a depurar código como un programador senior.",
  "Comprende el Stack y el Heap de una vez por todas.",
  "Desbloquea el verdadero poder del hardware.",
  "Crea código rápido, robusto y sin fugas de memoria.",
  "Todo gran desarrollador domina el lenguaje C.",
  "La llave maestra para entender cualquier otro lenguaje.",
  "Punteros dobles y referencias sin misterios.",
  "Compilación limpia, rendimiento sin concesiones.",
  "La elegancia del código estructurado y directo.",
  "Domina C desde la memoria hasta la consola.",
  "Resuelve retos de código real línea por línea.",
  "Desarrolla el pensamiento algorítmico de bajo nivel.",
  "Tu puerta de entrada a la ingeniería de software profunda.",
];

export const metadata: Metadata = {
  title: "MizukiCode — Aprende C con interactividad visual",
  description: "Domina punteros, gestión dinámica de memoria y estructuras de datos con retroalimentación visual al instante.",
  openGraph: { images: ["/og-hero.png"] },
};

/**
 * Landing Page Principal (src/app/page.tsx).
 * Portal de inicio Hero de dos columnas con selector dinámico de frases
 * y simulación de la ventana macOS para codigo.c.
 */
export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 font-sans text-slate-800">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ================= COLUMNA IZQUIERDA: TEXTO Y BOTONES ================= */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center">
          {/* Logo Textual */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-black flex items-center justify-center text-xl shadow-md">
              C
            </span>
            <span className="text-3xl font-black tracking-tight text-slate-900">
              MizukiCode
            </span>
          </div>

          {/* Título Principal Dinámico con Min-Height para evitar saltos de layout */}
          <div className="min-h-[140px] sm:min-h-[160px] flex items-center mb-4">
            <HeroHeadline
              phrases={HERO_PHRASES}
              fallback="Domina los punteros sin perder la cabeza."
            />
          </div>

          {/* Párrafo Descriptivo */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
            Aprende punteros, gestión dinámica y estructuras de datos con interactividad visual y retos de código real.
          </p>

          {/* Stack Vertical de Botones */}
          <div className="flex flex-col gap-3.5 w-full sm:w-80">
            {/* 1. Primario 'Empieza gratis' -> Conduce directamente al Cuartel General */}
            <Link
              href="/inicio"
              className="w-full py-4 px-6 rounded-2xl font-black text-center text-white bg-purple-600 shadow-[0_4px_0_0_#7e22ce] hover:bg-purple-500 active:translate-y-1 active:shadow-none transition-all uppercase tracking-wider text-base block"
            >
              Empieza gratis
            </Link>

            {/* 2. Secundario 'Ver Programa' -> Acceso al temario completo */}
            <Link
              href="/programa"
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-center bg-slate-100 text-slate-700 hover:bg-slate-200 active:translate-y-0.5 transition-all uppercase tracking-wider text-sm block"
            >
              Ver Programa
            </Link>
          </div>
        </div>

        {/* ================= COLUMNA DERECHA: VENTANA CODIGO.C ================= */}
        <div className="lg:col-span-7 w-full flex justify-center">
          <div className="w-full bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
            
            {/* Barra Superior estilo macOS */}
            <div className="bg-slate-800 px-4 py-3 flex items-center relative border-b border-slate-700/60 select-none shrink-0">
              <div className="flex items-center gap-2 z-10">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm" />
              </div>
              <span className="font-mono text-xs font-semibold text-slate-400 tracking-wider absolute left-1/2 -translate-x-1/2">
                codigo.c
              </span>
            </div>

            {/* Cuerpo del Editor: Líneas 1 a 13 con Syntax Highlighting */}
            <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-6 flex overflow-x-auto">
              
              {/* Columna Izquierda: Números de línea 1 al 13 */}
              <div className="pr-4 mr-3 text-right text-slate-600 select-none border-r border-slate-800 flex flex-col font-mono shrink-0">
                {Array.from({ length: 13 }, (_, i) => (
                  <span key={i + 1} className="h-6 leading-6">
                    {i + 1}
                  </span>
                ))}
              </div>

              {/* Columna Derecha: Código C de Estructuras y Asignación Dinámica */}
              <div className="text-slate-200 font-mono whitespace-pre flex-1">
                {/* Línea 1 */}
                <div className="h-6 leading-6">
                  <span className="text-pink-400 font-bold">#include</span>{" "}
                  <span className="text-emerald-300">&lt;stdlib.h&gt;</span>
                </div>
                {/* Línea 2 */}
                <div className="h-6 leading-6"></div>
                {/* Línea 3 */}
                <div className="h-6 leading-6">
                  <span className="text-pink-400 font-bold">typedef</span>{" "}
                  <span className="text-pink-400 font-bold">struct</span>{" "}
                  <span className="text-cyan-300 font-semibold">Nodo</span> &#123;
                </div>
                {/* Línea 4 */}
                <div className="h-6 leading-6">
                  {"    "}<span className="text-blue-300 font-semibold">int</span> valor;
                </div>
                {/* Línea 5 */}
                <div className="h-6 leading-6">
                  {"    "}<span className="text-pink-400 font-bold">struct</span>{" "}
                  <span className="text-cyan-300 font-semibold">Nodo</span>* sig;
                </div>
                {/* Línea 6 */}
                <div className="h-6 leading-6">
                  &#125; <span className="text-cyan-300 font-semibold">Nodo</span>;
                </div>
                {/* Línea 7 */}
                <div className="h-6 leading-6"></div>
                {/* Línea 8 */}
                <div className="h-6 leading-6">
                  <span className="text-cyan-300 font-semibold">Nodo</span>*{" "}
                  <span className="text-yellow-200 font-semibold">crear_nodo</span>(
                  <span className="text-blue-300 font-semibold">int</span> v) &#123;
                </div>
                {/* Línea 9 */}
                <div className="h-6 leading-6">
                  {"    "}<span className="text-cyan-300 font-semibold">Nodo</span>* n = (
                  <span className="text-cyan-300 font-semibold">Nodo</span>*)
                  <span className="text-yellow-200 font-semibold">malloc</span>(
                  <span className="text-yellow-200 font-semibold">sizeof</span>(
                  <span className="text-cyan-300 font-semibold">Nodo</span>));
                </div>
                {/* Línea 10 */}
                <div className="h-6 leading-6">
                  {"    "}n-&gt;valor = v;
                </div>
                {/* Línea 11 */}
                <div className="h-6 leading-6">
                  {"    "}n-&gt;sig = <span className="text-pink-400 font-bold">NULL</span>;
                </div>
                {/* Línea 12 */}
                <div className="h-6 leading-6">
                  {"    "}<span className="text-pink-400 font-bold">return</span> n;
                </div>
                {/* Línea 13 */}
                <div className="h-6 leading-6">&#125;</div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

