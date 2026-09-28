"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

/**
 * 5 Frases motivacionales para el encabezado del formulario de registro.
 */
const MOTIVATIONAL_PHRASES: string[] = [
  "El primer paso para dominar C.",
  "Estructuras de datos, sin perder la cabeza.",
  "De la teoría a la memoria real.",
  "Aprende bajo nivel jugando paso a paso.",
  "Tu camino hacia la excelencia en software.",
];

/**
 * Definición geométrica de los 7 nodos del Árbol Binario:
 * Raíz = 4; Hijos = 2, 6; Hojas = 1, 3, 5, 7.
 */
const TREE_NODES = [
  { id: 4, cx: 300, cy: 45, r: 24, fontSize: 16 },
  { id: 2, cx: 160, cy: 125, r: 22, fontSize: 15 },
  { id: 6, cx: 440, cy: 125, r: 22, fontSize: 15 },
  { id: 1, cx: 80, cy: 220, r: 20, fontSize: 14 },
  { id: 3, cx: 240, cy: 220, r: 20, fontSize: 14 },
  { id: 5, cx: 360, cy: 220, r: 20, fontSize: 14 },
  { id: 7, cx: 520, cy: 220, r: 20, fontSize: 14 },
];

/**
 * Diccionario de 10 algoritmos dinámicos sobre el árbol binario.
 */
interface TreeAlgorithm {
  title: string;
  filename: string;
  sequence: number[];
  code: string;
}

const TREE_ALGORITHMS: TreeAlgorithm[] = [
  {
    title: "RECORRIDO IN-ORDER (IZQ → RAÍZ → DER)",
    filename: "in_order.c",
    sequence: [1, 2, 3, 4, 5, 6, 7],
    code: "void inOrder(Nodo* raiz) {\n    if (raiz == NULL) return;\n    inOrder(raiz->izq);\n    printf(\"%d \", raiz->valor);\n    inOrder(raiz->der);\n}"
  },
  {
    title: "RECORRIDO PRE-ORDER (RAÍZ → IZQ → DER)",
    filename: "pre_order.c",
    sequence: [4, 2, 1, 3, 6, 5, 7],
    code: "void preOrder(Nodo* raiz) {\n    if (raiz == NULL) return;\n    printf(\"%d \", raiz->valor);\n    preOrder(raiz->izq);\n    preOrder(raiz->der);\n}"
  },
  {
    title: "RECORRIDO POST-ORDER (IZQ → DER → RAÍZ)",
    filename: "post_order.c",
    sequence: [1, 3, 2, 5, 7, 6, 4],
    code: "void postOrder(Nodo* raiz) {\n    if (raiz == NULL) return;\n    postOrder(raiz->izq);\n    postOrder(raiz->der);\n    printf(\"%d \", raiz->valor);\n}"
  },
  {
    title: "BÚSQUEDA EN AMPLITUD (BFS / NIVEL)",
    filename: "bfs.c",
    sequence: [4, 2, 6, 1, 3, 5, 7],
    code: "void bfs(Nodo* raiz) {\n    Cola* c = crearCola();\n    encolar(c, raiz);\n    while (!colaVacia(c)) {\n        Nodo* act = desencolar(c);\n        printf(\"%d \", act->valor);\n        if (act->izq) encolar(c, act->izq);\n        if (act->der) encolar(c, act->der);\n    }\n}"
  },
  {
    title: "BÚSQUEDA BINARIA (BST) - BUSCANDO EL 7",
    filename: "bst_search.c",
    sequence: [4, 6, 7],
    code: "Nodo* buscar(Nodo* raiz, int target) {\n    if (raiz == NULL || raiz->valor == target)\n        return raiz;\n    if (target < raiz->valor)\n        return buscar(raiz->izq, target);\n    return buscar(raiz->der, target);\n}"
  },
  {
    title: "BÚSQUEDA BINARIA (BST) - BUSCANDO EL 1",
    filename: "bst_search_min.c",
    sequence: [4, 2, 1],
    code: "Nodo* buscar(Nodo* raiz, int target) {\n    if (raiz == NULL || raiz->valor == target)\n        return raiz;\n    if (target < raiz->valor)\n        return buscar(raiz->izq, target);\n    return buscar(raiz->der, target);\n}"
  },
  {
    title: "ENCONTRAR MÍNIMO (LEFTMOST)",
    filename: "find_min.c",
    sequence: [4, 2, 1],
    code: "Nodo* encontrarMinimo(Nodo* raiz) {\n    if (raiz == NULL) return NULL;\n    while (raiz->izq != NULL) {\n        raiz = raiz->izq;\n    }\n    return raiz;\n}"
  },
  {
    title: "ENCONTRAR MÁXIMO (RIGHTMOST)",
    filename: "find_max.c",
    sequence: [4, 6, 7],
    code: "Nodo* encontrarMaximo(Nodo* raiz) {\n    if (raiz == NULL) return NULL;\n    while (raiz->der != NULL) {\n        raiz = raiz->der;\n    }\n    return raiz;\n}"
  },
  {
    title: "IN-ORDER INVERSO (DER → RAÍZ → IZQ)",
    filename: "reverse_inorder.c",
    sequence: [7, 6, 5, 4, 3, 2, 1],
    code: "void reverseInOrder(Nodo* raiz) {\n    if (raiz == NULL) return;\n    reverseInOrder(raiz->der);\n    printf(\"%d \", raiz->valor);\n    reverseInOrder(raiz->izq);\n}"
  },
  {
    title: "CONTEO DE NODOS",
    filename: "count_nodes.c",
    sequence: [1, 3, 2, 5, 7, 6, 4],
    code: "int contarNodos(Nodo* raiz) {\n    if (raiz == NULL) return 0;\n    return 1 + contarNodos(raiz->izq) + contarNodos(raiz->der);\n}"
  }
];

/**
 * Resaltador de sintaxis para código C en la consola simulada.
 */
function highlightCCode(code: string) {
  return code.split("\n").map((line, lineIndex) => {
    const tokenRegex = /("(?:[^"\\]|\\.)*")|\b(void|int|if|while|return|NULL)\b|\b(Nodo|Cola)\b|\b(inOrder|preOrder|postOrder|bfs|crearCola|encolar|desencolar|colaVacia|buscar|encontrarMinimo|encontrarMaximo|reverseInOrder|contarNodos|printf)\b|(\d+)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      const [, str, keyword, type, fn, num] = match;
      if (str) {
        parts.push(<span key={match.index} className="text-emerald-300">{str}</span>);
      } else if (keyword) {
        parts.push(<span key={match.index} className="text-pink-400 font-bold">{keyword}</span>);
      } else if (type) {
        parts.push(<span key={match.index} className="text-cyan-300 font-semibold">{type}</span>);
      } else if (fn) {
        parts.push(<span key={match.index} className="text-yellow-200 font-semibold">{fn}</span>);
      } else if (num) {
        parts.push(<span key={match.index} className="text-orange-300">{num}</span>);
      }
      lastIndex = tokenRegex.lastIndex;
    }
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }

    return (
      <div key={lineIndex}>
        {parts.length > 0 ? parts : "\u00A0"}
      </div>
    );
  });
}

/**
 * Pantalla de Registro / Inicio de Sesión (Split Screen).
 * - Mitad Izquierda: Formulario de autenticación social y correo.
 * - Mitad Derecha: Demostración visual de valor con 10 algoritmos de árbol binario en C.
 */
export default function RegistroPage() {
  const [headline, setHeadline] = useState<string>("");
  const [algoIndex, setAlgoIndex] = useState<number>(0);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Selección aleatoria al montar en cliente para evitar Hydration Mismatch
  useEffect(() => {
    const randomPhraseIndex = Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length);
    setHeadline(MOTIVATIONAL_PHRASES[randomPhraseIndex]);

    const randomAlgo = Math.floor(Math.random() * TREE_ALGORITHMS.length);
    setAlgoIndex(randomAlgo);
  }, []);

  // Animación del recorrido según el algoritmo seleccionado
  useEffect(() => {
    const currentAlgo = TREE_ALGORITHMS[algoIndex];
    if (!currentAlgo) return;

    const sequence = currentAlgo.sequence;
    let currentIndex = 0;
    setActiveNode(sequence[0]);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sequence.length;
      setActiveNode(sequence[currentIndex]);
    }, 900);

    return () => clearInterval(interval);
  }, [algoIndex]);

  const currentAlgo = TREE_ALGORITHMS[algoIndex] || TREE_ALGORITHMS[0];

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/welcome`,
      },
    });
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex items-center justify-center p-4 sm:p-8 font-sans text-slate-800">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col lg:flex-row my-auto">
        
        {/* ================= MITAD IZQUIERDA: FORMULARIO DE AUTH (bg-white) ================= */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-between p-6 sm:p-8 xl:p-10">
          {/* Cabecera / Logo */}
          <div className="flex items-center justify-between w-full max-w-sm mx-auto">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform">
                C
              </span>
              <span className="text-xl font-black tracking-tight text-slate-900">
                MizukiCode
              </span>
            </Link>
            <Link
              href="/"
              className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-wider"
            >
              ✕ Cerrar
            </Link>
          </div>

          {/* Contenedor Central del Formulario */}
          <div className="w-full max-w-sm mx-auto my-auto py-4">
            {/* Frase motivacional dinámica */}
            <div className="min-h-[56px] flex items-center mb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {headline || (
                  <span className="opacity-0 select-none">
                    El primer paso para dominar C.
                  </span>
                )}
              </h1>
            </div>

            {/* Stack de Botones Sociales */}
            <div className="flex flex-col gap-2.5">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 rounded-2xl font-bold text-slate-700 bg-white border-2 border-slate-200 shadow-[0_3px_0_0_#e2e8f0] hover:bg-slate-50 hover:border-slate-300 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-3 text-sm cursor-pointer"
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

              {/* Apple */}
              <button
                type="button"
                className="w-full py-3 px-4 rounded-2xl font-bold text-white bg-black hover:bg-slate-900 shadow-[0_3px_0_0_#1e293b] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-3 text-sm cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.85-.9.04-2 .6-2.65 1.34-.58.65-.99 1.72-.92 2.76.99.08 1.94-.5 2.56-1.25Z" />
                </svg>
                <span>Continuar con Apple</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                className="w-full py-3 px-4 rounded-2xl font-bold text-white bg-[#1877F2] hover:bg-[#166fe5] shadow-[0_3px_0_0_#0c5bc6] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-3 text-sm cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Continuar con Facebook</span>
              </button>
            </div>

            {/* Divisor 'o' */}
            <div className="relative my-4 w-full flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-xs font-bold uppercase text-slate-400 absolute">
                o
              </span>
            </div>

            {/* Input Correo */}
            <div className="flex flex-col gap-2.5">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Introduce tu correo"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:outline-none focus:border-emerald-500 text-sm font-medium text-slate-900 placeholder-slate-400 transition-colors"
                />
              </div>

              <Link
                href="/welcome"
                className="w-full py-3 px-6 rounded-2xl font-bold text-center text-white bg-emerald-500 shadow-[0_4px_0_0_#059669] hover:bg-emerald-400 active:translate-y-1 active:shadow-none transition-all uppercase tracking-wider text-sm block"
              >
                Continuar con correo
              </Link>
            </div>

            {/* Términos y Políticas */}
            <p className="text-xs text-slate-400 text-center mt-4 leading-relaxed">
              Al registrarte en MizukiCode, aceptas nuestros{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Términos
              </a>{" "}
              y{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Política de privacidad
              </a>
              .
            </p>
          </div>

          {/* Footer simple izquierdo */}
          <div className="w-full max-w-sm mx-auto text-center text-xs text-slate-400 py-1">
            ¿Ya tienes cuenta?{" "}
            <Link href="/welcome" className="text-emerald-600 font-bold hover:underline">
              Inicia sesión
            </Link>
          </div>
        </div>

        {/* ================= MITAD DERECHA: DEMOSTRACIÓN VISUAL (bg-slate-50) ================= */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-50 flex-col justify-center items-center p-6 xl:p-8 border-l border-slate-200/80">
          <div className="w-full max-w-xl xl:max-w-2xl flex flex-col items-center my-auto">
            
            {/* Título Imponente con degradado Premium */}
            <h2 className="text-3xl xl:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-tight mb-3 xl:mb-4 text-center">
              BIENVENIDO A{" "}
              <span className="bg-gradient-to-r from-black via-slate-900 to-emerald-500 bg-clip-text text-transparent">
                MIZUKICODE
              </span>
            </h2>

            {/* Árbol Binario Dinámico (SVG) */}
            <div className="w-full h-56 xl:h-64 bg-white rounded-2xl xl:rounded-3xl p-3.5 xl:p-4 border-2 border-slate-200 shadow-sm mb-4 flex flex-col items-center justify-between">
              <div className="w-full flex items-center justify-between px-2">
                <span className="text-[11px] xl:text-xs font-bold uppercase tracking-wider text-slate-500 truncate mr-2">
                  {currentAlgo.title}
                </span>
                <span className="text-[11px] xl:text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  Nodo activo: {activeNode ?? currentAlgo.sequence[0]}
                </span>
              </div>

              <svg viewBox="0 0 600 270" className="w-full h-full max-h-40 xl:max-h-48 overflow-visible">
                {/* Conexiones en gris claro estático */}
                <line x1="300" y1="45" x2="160" y2="125" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                <line x1="300" y1="45" x2="440" y2="125" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                <line x1="160" y1="125" x2="80" y2="220" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                <line x1="160" y1="125" x2="240" y2="220" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                <line x1="440" y1="125" x2="360" y2="220" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                <line x1="440" y1="125" x2="520" y2="220" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />

                {/* Nodos (Círculos y Textos reactivos al estado activeNode) */}
                {TREE_NODES.map((node) => {
                  const isActive = activeNode === node.id;
                  return (
                    <g key={node.id}>
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        style={{
                          transformOrigin: `${node.cx}px ${node.cy}px`,
                        }}
                        className={`transition-all duration-300 ${
                          isActive
                            ? "fill-emerald-500 scale-125 stroke-emerald-300 stroke-4 stroke-[4px] filter drop-shadow-lg"
                            : "fill-white stroke-emerald-300 stroke-2 stroke-[2px]"
                        }`}
                      />
                      <text
                        x={node.cx}
                        y={node.cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={node.fontSize}
                        className={`select-none pointer-events-none transition-all duration-300 ${
                          isActive ? "fill-white font-black" : "fill-emerald-800 font-bold"
                        }`}
                      >
                        {node.id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Consola de Código C Dinámica */}
            <div className="w-full bg-slate-900 rounded-2xl xl:rounded-3xl shadow-xl border border-slate-800 overflow-hidden">
              {/* Barra superior estilo macOS */}
              <div className="bg-slate-800 px-4 py-2 flex items-center relative border-b border-slate-700/60 select-none">
                <div className="flex items-center gap-1.5 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                </div>
                <span className="font-mono text-xs font-semibold text-slate-400 tracking-wider absolute left-1/2 -translate-x-1/2">
                  {currentAlgo.filename}
                </span>
              </div>

              {/* Código C con Syntax Highlighting Dinámico sin altura máxima restrictiva */}
              <div className="p-4 xl:p-5 font-mono text-xs xl:text-sm leading-relaxed text-slate-200 overflow-x-auto whitespace-pre">
                {highlightCCode(currentAlgo.code)}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
