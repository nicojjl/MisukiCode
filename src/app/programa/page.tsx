"use client";

import React from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { ModuleAnimation } from "@/components/ui/ModuleAnimation";

interface ModuleData {
  id: number;
  slug: string;
  title: string;
  color: string;
  topics: string[];
}

/**
 * Los 10 módulos oficiales del currículo integral de C en MizukiCode.
 * Colores alternados de Tailwind para dinamismo visual estilo Duolingo.
 */
const CURRICULUM_MODULES: ModuleData[] = [
  {
    id: 1,
    slug: "modulo_1_fundamentos",
    title: "Fundamentos del Lenguaje",
    color: "text-emerald-500",
    topics: [
      "Estructura básica de un programa en C",
      "Tipos de datos primitivos y modificadores",
      "Variables, constantes y ámbito (scope)",
      "Operadores aritméticos, lógicos y a nivel de bits",
      "Entrada y salida estándar con printf() y scanf()",
    ],
  },
  {
    id: 2,
    slug: "modulo_2_control_flujo",
    title: "Control de Flujo",
    color: "text-blue-500",
    topics: [
      "Estructuras condicionales (if, else if, else)",
      "Sentencias de selección múltiple (switch / case)",
      "Estructuras iterativas (while, do-while, for)",
      "Instrucciones de salto y control (break, continue, goto)",
    ],
  },
  {
    id: 3,
    slug: "modulo_3_modularidad_funciones",
    title: "Modularidad y Funciones",
    color: "text-purple-500",
    topics: [
      "Declaración, prototipos y definición de funciones",
      "Paso de parámetros por valor y por referencia",
      "Clases de almacenamiento (auto, register, static, extern)",
      "Recursividad y gestión del Stack de llamadas",
    ],
  },
  {
    id: 4,
    slug: "modulo_4_estructuras_datos_estaticas",
    title: "Estructuras de Datos Estáticas",
    color: "text-amber-500",
    topics: [
      "Arreglos unidimensionales y bidimensionales (matrices)",
      "Cadenas de caracteres (strings y terminador nulo '\\0')",
      "Funciones estándar de cadenas (string.h)",
      "Memoria contigua y almacenamiento en Stack",
    ],
  },
  {
    id: 5,
    slug: "modulo_5_punteros",
    title: "Gestión de Memoria y Punteros (Nivel Intermedio)",
    color: "text-rose-500",
    topics: [
      "Concepto de dirección de memoria y operador &",
      "Declaración y desreferenciación de punteros (*)",
      "Aritmética de punteros y navegación de memoria",
      "Paso de arreglos y referencias a funciones",
      "Punteros dobles y punteros a punteros (**)",
    ],
  },
  {
    id: 6,
    slug: "modulo_6_tipos_definidos_usuario",
    title: "Tipos de Datos Definidos por el Usuario",
    color: "text-teal-500",
    topics: [
      "Estructuras (struct) y alineación en memoria (padding)",
      "Uniones (union) y optimización de espacio",
      "Definición de alias con typedef",
      "Enumeraciones (enum) para código semántico y limpio",
    ],
  },
  {
    id: 7,
    slug: "modulo_7_memoria_dinamica_algoritmia",
    title: "Memoria Dinámica y Algoritmia (Nivel Avanzado)",
    color: "text-indigo-500",
    topics: [
      "Asignación dinámica con malloc(), calloc(), realloc() y free()",
      "Detección y prevención de fugas de memoria (memory leaks)",
      "Estructuras enlazadas: Listas, Pilas, Colas y Árboles",
      "Algoritmos de búsqueda y ordenamiento (Bubble, QuickSort, MergeSort)",
    ],
  },
  {
    id: 8,
    slug: "modulo_8_gestion_archivos",
    title: "Gestión de Archivos",
    color: "text-orange-500",
    topics: [
      "Flujos de archivos (FILE*) y modos de apertura (fopen, fclose)",
      "Lectura y escritura en archivos de texto (fprintf, fscanf, fgets)",
      "Manejo de archivos binarios (fread, fwrite)",
      "Posicionamiento y desplazamiento de puntero (fseek, ftell, rewind)",
    ],
  },
  {
    id: 9,
    slug: "modulo_9_preprocesador",
    title: "El Preprocesador de C",
    color: "text-pink-500",
    topics: [
      "Directivas de inclusión (#include)",
      "Definición de macros simples y parametrizadas (#define)",
      "Compilación condicional (#ifdef, #ifndef, #endif)",
      "Operadores de preprocesador (# y ##) y macros predefinidas",
    ],
  },
  {
    id: 10,
    slug: "modulo_10_sistemas_entornos",
    title: "Nivel Laboral: Sistemas y Entornos",
    color: "text-cyan-500",
    topics: [
      "Punteros a funciones y callbacks",
      "Manejo de errores, errno y señales del sistema (signal.h)",
      "Llamadas al sistema operativo (POSIX / Win32 API)",
      "Introducción al multihilo y concurrencia (pthreads)",
      "Estándares del lenguaje (C99, C11, C17, C23)",
      "Automatización de compilación con Makefiles",
      "Depuración y análisis de memoria con GDB y Valgrind",
    ],
  },
];

/**
 * Sub-componente de Sección con diseño en Zig-Zag y estado reactivo local.
 */
function ModuleSection({
  module,
  index,
  isViewed,
  isCompleted,
  onMarkAsViewed,
}: {
  module: ModuleData;
  index: number;
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

        <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight ${module.color}`}>
          {module.title}
        </h2>
        <ul className="space-y-2.5 text-slate-600 text-lg mb-6">
          {module.topics.map((topic, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`font-bold text-xl leading-none mt-1 ${module.color}`}>•</span>
              <span>{topic}</span>
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
          <ModuleAnimation moduleId={module.slug} />
        </div>
      </div>
    </section>
  );
}

/**
 * Página principal del Programa (/programa).
 * Exportada por defecto como componente React conectado al almacenamiento local.
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
          {CURRICULUM_MODULES.map((module, index) => {
            const modProgress = progress[module.slug] || progress[`modulo_${module.id}`];
            return (
              <ModuleSection
                key={module.id}
                module={module}
                index={index}
                isViewed={Boolean(modProgress?.visto)}
                isCompleted={Boolean(modProgress?.completado)}
                onMarkAsViewed={() => markAsViewed(module.slug)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
