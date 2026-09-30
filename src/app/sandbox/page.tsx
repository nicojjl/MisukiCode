"use client";

import React, { useState } from "react";
import Link from "next/link";

const INITIAL_CODE = `#include <stdio.h>

int main() {
    printf("¡Hola, MizukiCode!\\n");
    return 0;
}
`;

export default function SandboxPage() {
  const [code, setCode] = useState<string>(INITIAL_CODE);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleCompileAndRun = () => {
    setIsRunning(true);
    setOutput("[WASM] Compilando...");

    // Simulación de compilación y ejecución
    setTimeout(() => {
      setOutput("[WASM] Compilando...\n¡Hola, MizukiCode!");
      setIsRunning(false);
    }, 600);
  };

  const handleClearConsole = () => {
    setOutput("");
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-slate-100">
      {/* 1. Barra de Navegación y Controles (Top Bar) */}
      <header className="flex justify-between items-center p-4 bg-slate-800 border-b border-slate-700">
        {/* Izquierda: Enlace discreto al dashboard */}
        <Link
          href="/inicio"
          className="text-slate-400 hover:text-slate-200 text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          ← Volver al Dashboard
        </Link>

        {/* Derecha: Botones de control */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleClearConsole}
            className="text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 font-medium py-2 px-4 rounded text-sm transition-colors"
          >
            Limpiar Consola
          </button>

          <button
            type="button"
            disabled={isRunning}
            onClick={handleCompileAndRun}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isRunning ? "Compilando..." : "Compilar y Ejecutar"}
          </button>
        </div>
      </header>

      {/* 2. Zona de Trabajo (Split Screen) */}
      <main className="grid grid-cols-1 lg:grid-cols-2 flex-grow overflow-hidden">
        {/* Panel Izquierdo: Editor de código */}
        <section className="h-full w-full">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-full resize-none bg-slate-900 text-slate-200 p-6 font-mono outline-none"
            placeholder="Escribe tu código C aquí..."
          />
        </section>

        {/* Panel Derecho: Consola de ejecución */}
        <section className="w-full h-full bg-black border-l border-slate-800 p-6 overflow-y-auto">
          <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
            {output || "// Salida de consola..."}
          </pre>
        </section>
      </main>
    </div>
  );
}
