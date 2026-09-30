"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MZ_SANDBOX_CODE_KEY } from "@/lib/store";

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
  const [isError, setIsError] = useState<boolean>(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"console" | "io">("console");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Cargar código persistido desde localStorage al montar el componente
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MZ_SANDBOX_CODE_KEY);
      if (saved !== null) {
        setCode(saved);
      }
    } catch {
      // Ignorar errores de acceso a almacenamiento en SSR/privacidad
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Autoguardado silencioso al detectar cambios en el código
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(MZ_SANDBOX_CODE_KEY, code);
    } catch (err) {
      console.error("Error al autoguardar código en localStorage:", err);
    }
  }, [code, isLoaded]);

  // 3. Descargar archivo main.c localmente
  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "main.c";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 4. Subir y leer archivo local (.c, .h, .txt)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        setCode(content);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClear = () => {
    setOutput("");
    setIsError(false);
  };

  // 5. Compilación con detección de errores (código vacío)
  const handleCompile = () => {
    setIsRunning(true);
    setActiveConsoleTab("console");

    // Error simulado si el código fuente está vacío o en blanco
    if (!code.trim()) {
      setTimeout(() => {
        setOutput(
          ">_ Live Console\n[Error de compilación en main.c]:\nEl archivo de código está vacío.\nSe requiere una función principal 'int main()' para compilar el programa."
        );
        setIsError(true);
        setIsRunning(false);
      }, 300);
      return;
    }

    setOutput(">_ Live Console\n[WASM] Compilando...");
    setIsError(false);

    setTimeout(() => {
      setOutput(
        ">_ Live Console\n[WASM] Compilando...\n¡Hola, MizukiCode!\n\nPrograma finalizado con código de salida 0."
      );
      setIsError(false);
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
            {/* 3. Panel Izquierdo (Explorador de Archivos - Single-file mode) */}
            <aside className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col shrink-0 select-none">
              {/* Header del Explorador */}
              <div className="text-xs font-bold text-slate-500 p-3 flex justify-between items-center border-b border-slate-200/60">
                <span className="tracking-wider">EXPLORER</span>
                <div className="flex items-center gap-1.5">
                  {/* Input de archivo oculto */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".c,.h,.txt"
                    className="hidden"
                  />
                  {/* Botón Subir */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Subir archivo .c local"
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-200/80 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors text-[11px] font-semibold cursor-pointer"
                  >
                    <span>⬆️</span>
                    <span>.c</span>
                  </button>
                  {/* Botón Descargar */}
                  <button
                    type="button"
                    onClick={handleDownload}
                    title="Descargar main.c"
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-200/80 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors text-[11px] font-semibold cursor-pointer"
                  >
                    <span>⬇️</span>
                    <span>.c</span>
                  </button>
                </div>
              </div>

              {/* Lista de Archivos (Único elemento fijo main.c) */}
              <div className="py-2 flex flex-col">
                <div className="flex items-center justify-between px-3 py-1.5 bg-violet-100 text-violet-700 text-sm border-l-2 border-violet-500 font-mono font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-violet-600">C</span>
                    <span>main.c</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-violet-600 bg-violet-200/60 px-1.5 py-0.5 rounded">
                    Activo
                  </span>
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
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
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
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
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
                    onClick={handleClear}
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
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50 select-none"
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
                <div
                  className={`flex-1 bg-black font-mono text-sm p-4 overflow-y-auto ${
                    isError ? "text-red-400" : "text-green-400"
                  }`}
                >
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
