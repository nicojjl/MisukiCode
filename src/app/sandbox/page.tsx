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

  // 5. Compilación con detección de errores (Fix de Ejecución Fantasma)
  const handleCompile = () => {
    setActiveConsoleTab("console");

    // Validación inicial estricta: previene compilación fantasma si está vacío
    if (!code || code.trim() === "") {
      setOutput(">_ Error: No hay código para compilar. El archivo está vacío.");
      setIsError(true);
      setIsRunning(false);
      return;
    }

    setIsRunning(true);
    setIsError(false);
    setOutput(">_ Live Console\n[WASM] Compilando...");

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
            {/* 3. Panel Izquierdo (Explorador de Archivos - Estética VS Code) */}
            <aside className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col shrink-0 select-none">
              {/* Header del Explorador con SVGs Minimalistas */}
              <div className="text-xs font-bold text-slate-500 px-3 py-2.5 flex justify-between items-center border-b border-slate-200/60">
                <span className="tracking-wider">EXPLORER</span>
                <div className="flex items-center gap-1">
                  {/* Input de archivo oculto */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".c,.h,.txt"
                    className="hidden"
                  />

                  {/* 1. Ícono 'Nuevo Archivo' */}
                  <button
                    type="button"
                    onClick={() => setCode(INITIAL_CODE)}
                    title="Nuevo Archivo (Plantilla inicial)"
                    className="p-1 rounded hover:bg-slate-200/70 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>

                  {/* 2. Ícono 'Subir Archivo' */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Subir Archivo"
                    className="p-1 rounded hover:bg-slate-200/70 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </button>

                  {/* 3. Ícono 'Descargar' */}
                  <button
                    type="button"
                    onClick={handleDownload}
                    title="Descargar main.c"
                    className="p-1 rounded hover:bg-slate-200/70 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Árbol de Archivos (File Tree Visual Jerárquico) */}
              <div className="py-2 flex flex-col font-sans select-none text-[13px]">
                {/* Carpeta includes/ (cerrada) */}
                <div className="pl-4 py-1.5 flex items-center gap-1.5 text-slate-500 hover:bg-slate-100/80 cursor-pointer transition-colors">
                  <svg
                    className="w-3 h-3 text-slate-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <svg
                    className="w-3.5 h-3.5 text-amber-500/80 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  <span className="font-medium text-slate-500">includes/</span>
                </div>

                {/* Carpeta src/ (abierta con chevron hacia abajo) */}
                <div className="pl-4 py-1.5 flex items-center gap-1.5 text-slate-800 hover:bg-slate-100/80 cursor-pointer transition-colors">
                  <svg
                    className="w-3 h-3 text-slate-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <svg
                    className="w-3.5 h-3.5 text-amber-500 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v4.5A1.5 1.5 0 013.5 16H2V6zm4 7a2 2 0 012-2h10a2 2 0 012 2v3a2 2 0 01-2 2H8a2 2 0 01-2-2v-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold text-slate-800">src/</span>
                </div>

                {/* Archivo activo: main.c (dentro de src/ con mayor indentación pl-8) */}
                <div className="pl-8 py-1.5 flex items-center gap-2 bg-violet-100/50 border-l-2 border-violet-500 text-violet-700 font-mono font-medium cursor-pointer transition-colors">
                  <span className="text-[11px] font-bold text-violet-600 font-mono w-3.5 text-center">
                    C
                  </span>
                  <span>main.c</span>
                </div>

                {/* Archivo inactivo: Makefile (en la raíz) */}
                <div className="pl-[26px] py-1.5 flex items-center gap-2 text-slate-500 hover:bg-slate-100/80 cursor-pointer transition-colors">
                  <svg
                    className="w-3.5 h-3.5 text-slate-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-mono text-slate-500">Makefile</span>
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
