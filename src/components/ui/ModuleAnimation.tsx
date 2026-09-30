"use client";

import React from "react";

interface ModuleAnimationProps {
  moduleId: string | number;
  className?: string;
}

/**
 * Normaliza cualquier formato de identificador a la clave canónica del módulo.
 */
function normalizeId(id: string | number): string {
  const str = String(id).toLowerCase();
  if (str.includes("fundamento") || str === "1" || str === "m1") return "fundamentos";
  if (str.includes("flujo") || str.includes("control") || str === "2" || str === "m2") return "control_flujo";
  if (str.includes("funcione") || str.includes("modularidad") || str === "3" || str === "m3") return "funciones";
  if (str.includes("arreglo") || str.includes("string") || str === "4" || str === "m4") return "arreglos";
  if (str.includes("puntero") || str === "5" || str === "m5") return "punteros";
  if ((str.includes("estructura") && !str.includes("dinamica")) || str.includes("union") || str === "6" || str === "m6") return "estructuras";
  if (str.includes("dinamica_algoritmia") || str.includes("malloc") || str.includes("memoria") || str === "7" || str === "m7") return "memoria_dinamica";
  if (str.includes("lista") || str.includes("enlazada") || str === "8" || str === "m8") return "listas_enlazadas";
  if (str.includes("archivo") || str === "9" || str === "m9") return "archivos";
  if (str.includes("herramienta") || str.includes("sistema") || str.includes("gdb") || str === "10" || str === "m10") return "herramientas";
  return "fundamentos";
}

/**
 * Micro-animaciones SVG temáticas y elegantes para los 10 módulos de C.
 * Estética estricta: stroke-width="1.5", stroke-violet-500, fill-violet-50/transparent, stroke-linecap="round".
 */
export const ModuleAnimation: React.FC<ModuleAnimationProps> = ({
  moduleId,
  className = "w-14 h-14",
}) => {
  const key = normalizeId(moduleId);

  switch (key) {
    // ==========================================
    // 1. FUNDAMENTOS: Consola y pulso de datos
    // ==========================================
    case "fundamentos":
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${className} stroke-violet-500 stroke-[1.5] stroke-linecap-round stroke-linejoin-round`}
          fill="none"
        >
          {/* Marco de ventana de consola */}
          <rect
            x="10"
            y="12"
            width="44"
            height="40"
            rx="6"
            className="fill-violet-50/70"
          />
          {/* Barra superior de terminal */}
          <line x1="10" y1="22" x2="54" y2="22" />
          <circle cx="16" cy="17" r="1.5" className="fill-violet-400 stroke-none" />
          <circle cx="21" cy="17" r="1.5" className="fill-violet-300 stroke-none" />
          <circle cx="26" cy="17" r="1.5" className="fill-violet-300 stroke-none" />

          {/* Símbolo de prompt '>_' */}
          <path d="M16 30 L22 35 L16 40" />
          {/* Cursor parpadeante */}
          <line
            x1="26"
            y1="40"
            x2="35"
            y2="40"
            strokeWidth="2.5"
            className="stroke-violet-600 animate-pulse"
          />
          {/* Señal de bit en la base */}
          <path
            d="M38 33 H42 L45 28 L48 35 L50 33"
            className="stroke-violet-400 animate-pulse"
          />
        </svg>
      );

    // ==========================================
    // 2. CONTROL DE FLUJO: Bifurcación (If/Else)
    // ==========================================
    case "control_flujo":
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${className} stroke-violet-500 stroke-[1.5] stroke-linecap-round stroke-linejoin-round`}
          fill="none"
        >
          {/* Rombo de decisión condicional */}
          <path
            d="M32 10 L44 22 L32 34 L20 22 Z"
            className="fill-violet-50/80"
          />
          {/* Pulso dentro del rombo */}
          <circle
            cx="32"
            cy="22"
            r="3"
            className="fill-violet-500 stroke-none animate-ping opacity-75"
          />
          <circle
            cx="32"
            cy="22"
            r="2"
            className="fill-violet-600 stroke-none"
          />

          {/* Rama izquierda (Else) */}
          <path d="M20 22 H12 V46 H18" />
          <path d="M15 43 L18 46 L15 49" />

          {/* Rama derecha (If - True) */}
          <path d="M44 22 H52 V46 H46" />
          <path d="M49 43 L46 46 L49 49" />

          {/* Círculo que viaja por la rama derecha */}
          <circle
            cx="52"
            cy="36"
            r="2.5"
            className="fill-violet-500 stroke-none animate-pulse"
          />
          {/* Círculo secundario */}
          <circle
            cx="12"
            cy="32"
            r="2"
            className="fill-violet-300 stroke-none animate-pulse"
          />
        </svg>
      );

    // ==========================================
    // 3. FUNCIONES: Engranajes entrelazados
    // ==========================================
    case "funciones":
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${className} stroke-violet-500 stroke-[1.5] stroke-linecap-round stroke-linejoin-round`}
          fill="none"
        >
          {/* Engranaje 1 (Giro horario suave) */}
          <g className="animate-[spin_8s_linear_infinite] origin-[25px_27px]">
            <circle cx="25" cy="27" r="11" className="fill-violet-50/60" />
            <circle cx="25" cy="27" r="4" className="fill-white" />
            {/* Dientes del engranaje 1 */}
            <path d="M25 13 V16 M25 38 V41 M11 27 H14 M36 27 H39" strokeWidth="2.5" />
            <path d="M15 17 L17 19 M33 35 L35 37 M15 37 L17 35 M33 19 L35 17" strokeWidth="2.5" />
          </g>

          {/* Engranaje 2 (Giro anti-horario complementario) */}
          <g className="animate-[spin_5s_linear_infinite_reverse] origin-[43px_41px]">
            <circle cx="43" cy="41" r="8" className="fill-violet-50/80" />
            <circle cx="43" cy="41" r="2.5" className="fill-white" />
            {/* Dientes del engranaje 2 */}
            <path d="M43 30 V33 M43 49 V52 M32 41 H35 M51 41 H54" strokeWidth="2" />
            <path d="M35 33 L37 35 M49 47 L51 49 M35 49 L37 47 M49 35 L51 33" strokeWidth="2" />
          </g>
        </svg>
      );

    // ==========================================
    // 4. ARREGLOS Y STRINGS: Celdas contiguas
    // ==========================================
    case "arreglos":
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${className} stroke-violet-500 stroke-[1.5] stroke-linecap-round stroke-linejoin-round`}
          fill="none"
        >
          {/* Celdas contiguas de memoria (Array) */}
          <rect x="8" y="24" width="11" height="18" rx="2" className="fill-violet-50" />
          <rect x="21" y="24" width="11" height="18" rx="2" className="fill-violet-100/70" />
          <rect x="34" y="24" width="11" height="18" rx="2" className="fill-violet-50" />
          <rect x="47" y="24" width="11" height="18" rx="2" className="fill-violet-200/60" />

          {/* Caracteres o índices dentro */}
          <circle cx="13.5" cy="33" r="2" className="fill-violet-400 stroke-none" />
          <circle cx="26.5" cy="33" r="2" className="fill-violet-500 stroke-none animate-pulse" />
          <circle cx="39.5" cy="33" r="2" className="fill-violet-400 stroke-none" />
          {/* Terminador nulo '\0' */}
          <line x1="50" y1="30" x2="55" y2="36" className="stroke-violet-600" />
          <line x1="55" y1="30" x2="50" y2="36" className="stroke-violet-600" />

          {/* Flecha de puntero indexador que pulsa */}
          <path
            d="M26.5 14 V19 M24 16.5 L26.5 19 L29 16.5"
            className="stroke-violet-600 animate-bounce"
            strokeWidth="1.8"
          />

          {/* Índices numéricos inferiores */}
          <line x1="13.5" y1="46" x2="13.5" y2="48" className="stroke-slate-300" />
          <line x1="26.5" y1="46" x2="26.5" y2="48" className="stroke-slate-300" />
          <line x1="39.5" y1="46" x2="39.5" y2="48" className="stroke-slate-300" />
          <line x1="52.5" y1="46" x2="52.5" y2="48" className="stroke-slate-300" />
        </svg>
      );

    // ==========================================
    // 5. PUNTEROS: Flecha animada apuntando a celda
    // ==========================================
    case "punteros":
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${className} stroke-violet-500 stroke-[1.5] stroke-linecap-round stroke-linejoin-round`}
          fill="none"
        >
          {/* Caja de memoria destino */}
          <rect
            x="36"
            y="18"
            width="22"
            height="26"
            rx="4"
            className="fill-violet-50/80"
          />
          <text
            x="47"
            y="34"
            textAnchor="middle"
            className="text-[9px] font-mono fill-violet-700 stroke-none font-bold"
          >
            0x7F
          </text>

          {/* Nodo puntero que apunta hacia la celda */}
          <circle cx="10" cy="31" r="3.5" className="fill-violet-500 stroke-none" />
          <circle cx="10" cy="31" r="6" className="stroke-violet-400 animate-ping opacity-40" />

          {/* Flecha oscilante hacia la derecha */}
          <g className="animate-[pulse_1.5s_ease-in-out_infinite]">
            <line x1="14" y1="31" x2="30" y2="31" strokeWidth="2" />
            <path
              d="M25 26 L31 31 L25 36"
              strokeWidth="2"
              className="fill-transparent"
            />
          </g>

          {/* Identificador *ptr */}
          <path d="M12 48 H22 M17 44 V52 M14 46 L20 50 M14 50 L20 46" className="stroke-violet-400" />
        </svg>
      );

    // ==========================================
    // 6. ESTRUCTURAS: Campos empaquetados
    // ==========================================
    case "estructuras":
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${className} stroke-violet-500 stroke-[1.5] stroke-linecap-round stroke-linejoin-round`}
          fill="none"
        >
          {/* Contenedor principal de struct */}
          <rect
            x="12"
            y="12"
            width="40"
            height="40"
            rx="5"
            className="fill-violet-50/40"
          />

          {/* Campo 1 (int id) */}
          <rect
            x="16"
            y="16"
            width="32"
            height="9"
            rx="2"
            className="fill-violet-100/80"
          />
          <circle cx="21" cy="20.5" r="1.5" className="fill-violet-600 stroke-none" />

          {/* Campo 2 (char name[]) - Pulso de asignación */}
          <rect
            x="16"
            y="28"
            width="32"
            height="9"
            rx="2"
            className="fill-violet-200/50 animate-pulse"
          />
          <circle cx="21" cy="32.5" r="1.5" className="fill-violet-500 stroke-none" />

          {/* Campo 3 (float value) */}
          <rect
            x="16"
            y="40"
            width="32"
            height="8"
            rx="2"
            className="fill-violet-100/60"
          />
          <circle cx="21" cy="44" r="1.5" className="fill-violet-400 stroke-none" />

          {/* Soporte de unión compartida */}
          <path d="M44 19 V42" strokeDasharray="2 2" className="stroke-violet-400" />
        </svg>
      );

    // ==========================================
    // 7. MEMORIA DINÁMICA: malloc / free en RAM
    // ==========================================
    case "memoria_dinamica":
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${className} stroke-violet-500 stroke-[1.5] stroke-linecap-round stroke-linejoin-round`}
          fill="none"
        >
          {/* Marco exterior del Heap */}
          <rect
            x="10"
            y="10"
            width="44"
            height="44"
            rx="6"
            className="fill-violet-50/30"
          />

          {/* Cuadrícula de 9 bloques de RAM con parpadeo escalonado */}
          {/* Fila 1 */}
          <rect x="14" y="14" width="10" height="10" rx="2" className="fill-violet-300/60" />
          <rect x="27" y="14" width="10" height="10" rx="2" className="fill-violet-100 animate-pulse" />
          <rect x="40" y="14" width="10" height="10" rx="2" className="fill-transparent" />

          {/* Fila 2: Bloque malloc() parpadeando */}
          <rect x="14" y="27" width="10" height="10" rx="2" className="fill-transparent" />
          <rect
            x="27"
            y="27"
            width="10"
            height="10"
            rx="2"
            className="fill-violet-500/80 stroke-violet-600 animate-pulse"
          />
          <rect x="40" y="27" width="10" height="10" rx="2" className="fill-violet-300/40" />

          {/* Fila 3: Bloque free() */}
          <rect x="14" y="40" width="10" height="10" rx="2" className="fill-violet-200/70" />
          <rect x="27" y="40" width="10" height="10" rx="2" className="fill-transparent" />
          <rect
            x="40"
            y="40"
            width="10"
            height="10"
            rx="2"
            className="fill-violet-400/50 animate-pulse"
          />
        </svg>
      );

    // ==========================================
    // 8. LISTAS ENLAZADAS: Nodos y punteros next
    // ==========================================
    case "listas_enlazadas":
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${className} stroke-violet-500 stroke-[1.5] stroke-linecap-round stroke-linejoin-round`}
          fill="none"
        >
          {/* Nodo 1 */}
          <rect x="8" y="24" width="14" height="16" rx="3" className="fill-violet-50" />
          <line x1="17" y1="24" x2="17" y2="40" />
          <circle cx="12.5" cy="32" r="1.5" className="fill-violet-600 stroke-none" />

          {/* Puntero 1 -> 2 */}
          <path d="M17 32 H28" strokeWidth="1.8" />
          <path d="M25 29 L28 32 L25 35" strokeWidth="1.8" />

          {/* Nodo 2 (Pulsando) */}
          <rect
            x="28"
            y="24"
            width="14"
            height="16"
            rx="3"
            className="fill-violet-100/90 animate-pulse"
          />
          <line x1="37" y1="24" x2="37" y2="40" />
          <circle cx="32.5" cy="32" r="1.5" className="fill-violet-600 stroke-none" />

          {/* Puntero 2 -> NULL */}
          <path d="M37 32 H47" strokeWidth="1.8" />
          <path d="M44 29 L47 32 L44 35" strokeWidth="1.8" />

          {/* Indicador de NULL (Tierra) */}
          <line x1="49" y1="28" x2="49" y2="36" strokeWidth="2" />
          <line x1="52" y1="30" x2="52" y2="34" strokeWidth="1.5" />
          <line x1="55" y1="31" x2="55" y2="33" strokeWidth="1" />
        </svg>
      );

    // ==========================================
    // 9. ARCHIVOS: FILE* y cursor de escaneo
    // ==========================================
    case "archivos":
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${className} stroke-violet-500 stroke-[1.5] stroke-linecap-round stroke-linejoin-round`}
          fill="none"
        >
          {/* Hoja de documento con esquina doblada */}
          <path
            d="M16 10 H36 L48 22 V54 H16 Z"
            className="fill-violet-50/70"
          />
          <path d="M36 10 V22 H48" className="fill-violet-100/60" />

          {/* Líneas de código/texto en el archivo */}
          <line x1="22" y1="28" x2="42" y2="28" />
          <line x1="22" y1="35" x2="38" y2="35" />
          <line x1="22" y1="42" x2="40" y2="42" />

          {/* Cabezal de lectura/escritura (fseek) oscilante */}
          <g className="animate-pulse">
            <line
              x1="22"
              y1="48"
              x2="32"
              y2="48"
              strokeWidth="2.5"
              className="stroke-violet-600"
            />
            <circle cx="34" cy="48" r="2" className="fill-violet-600 stroke-none" />
          </g>
        </svg>
      );

    // ==========================================
    // 10. HERRAMIENTAS: GDB, Makefiles y Valgrind
    // ==========================================
    case "herramientas":
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${className} stroke-violet-500 stroke-[1.5] stroke-linecap-round stroke-linejoin-round`}
          fill="none"
        >
          {/* Diana / Retícula de depuración de GDB */}
          <circle cx="32" cy="32" r="20" className="fill-violet-50/50" />
          <circle cx="32" cy="32" r="11" />
          <circle cx="32" cy="32" r="3" className="fill-violet-600 stroke-none animate-ping opacity-60" />
          <circle cx="32" cy="32" r="2" className="fill-violet-600 stroke-none" />

          {/* Ejes de mira telescópica */}
          <line x1="32" y1="6" x2="32" y2="58" strokeDasharray="3 3" />
          <line x1="6" y1="32" x2="58" y2="32" strokeDasharray="3 3" />

          {/* Radar que barre el cuadrante en rotación continua */}
          <g className="animate-[spin_4s_linear_infinite] origin-center">
            <line x1="32" y1="32" x2="46" y2="18" strokeWidth="2" className="stroke-violet-600" />
          </g>

          {/* Breakpoint de depuración */}
          <circle
            cx="44"
            cy="20"
            r="2.5"
            className="fill-rose-500 stroke-none animate-pulse"
          />
        </svg>
      );

    default:
      return null;
  }
};
