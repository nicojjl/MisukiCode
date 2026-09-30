"use client";

import React, { useState } from "react";
import Link from "next/link";

const INITIAL_CODE = `#include <stdio.h>

int main() {
    printf("¡Hola, MizukiCode!\\n");
    return 0;
}
`;

const INITIAL_OUTPUT = `>_ Live Console
Click 'Compilar' para ejecutar...`;

export default function SandboxPage() {
  const [code, setCode] = useState<string>(INITIAL_CODE);
  const [output, setOutput] = useState<string>(INITIAL_OUTPUT);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"console" | "io">("console");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleCompile = () => {
    setIsRunning(true);
    setOutput(">_ Live Console\n[WASM] Compilando...");

    setTimeout(() => {
      setOutput(
        ">_ Live Console\n[WASM] Compilando...\n¡Hola, MizukiCode!\n\nPrograma finalizado con código de salida 0."
      );
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Barra de Navegación Externa Superior */}
      <header className="w-full max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between shrink-0">
        <Link
          href="/inicio"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-sm shadow-sm">
            C
          </span>
          <span className="text-lg font-black tracking-tight text-slate-900">
            MizukiCode
          </span>
        </Link>

        <Link
          href="/inicio"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-200 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs transition-all"
        >
          ← Volver al Dashboard
        </Link>
      </header>

      {/* 1. Contenedor Principal (Estilo Ventana de Sistema Operativo) */}
      <div className="h-[calc(100vh-80px)] w-full max-w-[1600px] mx-auto p-4 flex flex-col">
        <div className="rounded-3xl border-2 border-slate-200 bg-white overflow-hidden flex flex-col shadow-2xl h-full">
          {/* Top Bar (Window Chrome) */}
          <div className="h-12 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 relative select-none">
            {/* Botones de macOS a la izquierda */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
            </div>

            {/* Título centrado */}
            <span className="text-xs font-semibold text-slate-400 tracking-wide">
              MizukiCode Sandbox
            </span>

            {/* Espaciador para centrado óptico */}
            <div className="w-14" />
          </div>

          {/* 2. Layout Tri-Panel */}
          <div className="flex h-full overflow-hidden flex-1">
            {/* 3. Panel Izquierdo (Explorador de Archivos - 20% ancho) */}
            <aside className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col shrink-0 select-none">
              {/* Header del Explorador */}
              <div className="text-xs font-bold text-slate-500 p-3 flex justify-between items-center border-b border-slate-200/60">
                <span className="tracking-wider">EXPLORER</span>
                <div className="flex items-center gap-2 text-slate-400">
                  {/* Ícono Nuevo Archivo */}
                  <button
                    type="button"
                    title="Nuevo Archivo"
                    className="hover:text-slate-700 transition-colors p-0.5 rounded cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                  {/* Ícono Nueva Carpeta */}
                  <button
                    type="button"
                    title="Nueva Carpeta"
                    className="hover:text-slate-700 transition-colors p-0.5 rounded cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Lista de Archivos */}
              <div className="py-2 flex flex-col">
                {/* Archivo Seleccionado: main.c */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-100 text-violet-700 text-sm cursor-pointer border-l-2 border-violet-500 font-mono font-medium">
                  <span className="text-xs font-black text-violet-600">C</span>
                  <span>main.c</span>
                </div>

                {/* Archivo Inactivo: utils.h */}
                <div className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm cursor-pointer border-l-2 border-transparent font-mono transition-colors">
                  <span className="text-xs font-black text-slate-400">H</span>
                  <span>utils.h</span>
                </div>

                {/* Archivo Inactivo: Makefile */}
                <div className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm cursor-pointer border-l-2 border-transparent font-mono transition-colors">
                  <span className="text-xs font-black text-slate-400">⚙</span>
                  <span>Makefile</span>
                </div>
              </div>
            </aside>

            {/* 4. Panel Central (Editor de Código - Ancho flexible) */}
            <main className="flex-1 flex flex-col min-w-0 bg-white">
              {/* Barra de Pestañas (Tabs) */}
              <div className="h-10 border-b border-slate-200 flex bg-slate-50 shrink-0">
                <div className="px-4 py-2 bg-white border-r border-slate-200 text-sm text-slate-700 flex items-center gap-2 font-mono border-t-2 border-t-violet-500 font-medium select-none h-full">
                  <span className="text-xs font-black text-violet-600">C</span>
                  <span>main.c</span>
                  <span className="text-slate-400 hover:text-slate-600 text-xs ml-1 cursor-pointer">
                    ×
                  </span>
                </div>
              </div>

              {/* Área de Texto */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full flex-1 p-4 font-mono text-sm resize-none outline-none text-slate-800 bg-white leading-relaxed"
                placeholder="Escribe tu código C aquí..."
              />
            </main>

            {/* 5. Panel Derecho (Consola y Ejecución - 30% ancho) */}
            <section className="w-96 border-l border-slate-200 bg-slate-50 flex flex-col shrink-0">
              {/* Barra de Pestañas de Consola */}
              <div className="h-10 border-b border-slate-200 flex items-center justify-between px-3 bg-slate-50 shrink-0">
                <div className="flex items-center gap-1 select-none">
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("console")}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                      activeConsoleTab === "console"
                        ? "bg-white text-slate-800 shadow-2xs border border-slate-200"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Console
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("io")}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                      activeConsoleTab === "io"
                        ? "bg-white text-slate-800 shadow-2xs border border-slate-200"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    I/O
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Botón gris 'Limpiar' */}
                  <button
                    type="button"
                    onClick={() => setOutput("")}
                    className="text-slate-600 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 text-xs font-semibold py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer select-none"
                    title="Limpiar consola"
                  >
                    Limpiar
                  </button>

                  {/* Botón verde brillante 'Compilar ▶' */}
                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={handleCompile}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isRunning ? "Compilando..." : "Compilar"}</span>
                    <span>▶</span>
                  </button>
                </div>
              </div>

              {/* Área de Salida */}
              {activeConsoleTab === "io" ? (
                <div className="flex-1 text-slate-500 p-4 font-sans text-sm">
                  Interfaz de Entrada/Salida (stdin) en construcción...
                </div>
              ) : (
                <div className="flex-1 bg-black text-green-400 font-mono text-sm p-4 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-mono leading-relaxed">
                    {output}
                  </pre>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
