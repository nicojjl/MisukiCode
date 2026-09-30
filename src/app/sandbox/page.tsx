import React from "react";
import Link from "next/link";

/**
 * Laboratorio / Compilador Libre (/sandbox).
 * Placeholder informativo para el entorno de ejecución C en navegador.
 */
export default function SandboxPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      {/* Barra de navegación */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-12 py-4 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/inicio" className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-lg shadow-sm">
              C
            </span>
            <span className="text-xl font-black tracking-tight text-slate-900">
              MizukiCode
            </span>
          </Link>
          <Link
            href="/inicio"
            className="text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
          >
            ← Volver al Cuartel General
          </Link>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-2xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-3xl font-mono font-black mb-6 shadow-md border border-slate-800">
          &gt;_
        </div>

        <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-4">
          Próximamente
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Compilador Libre C
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
          Un entorno WebAssembly con GCC aislado para compilar código C puro,
          depurar fugas de memoria con Valgrind e inspeccionar la pila y el heap en tiempo real.
        </p>

        {/* Consola decorativa */}
        <div className="w-full max-w-md bg-slate-900 text-left rounded-2xl p-4 font-mono text-xs text-slate-300 shadow-xl border border-slate-800 mb-8">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="text-slate-500 text-[10px] ml-2">sandbox.c</span>
          </div>
          <p className="text-slate-400">#include &lt;stdio.h&gt;</p>
          <p className="text-slate-400">int main() &#123;</p>
          <p className="text-emerald-400 pl-4">printf(&quot;MizukiCode Sandbox listo.\\n&quot;);</p>
          <p className="text-purple-400 pl-4">return 0;</p>
          <p className="text-slate-400">&#125;</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link
            href="/desafios/primer-reto"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-[0_4px_0_0_#0f172a] hover:bg-slate-800 active:translate-y-1 active:shadow-none transition-all"
          >
            Probar Ejercicio Interactivo
          </Link>
          <Link
            href="/inicio"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-black text-sm shadow-[0_4px_0_0_#e2e8f0] hover:border-slate-300 active:translate-y-1 active:shadow-none transition-all"
          >
            Volver a Inicio
          </Link>
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-slate-400 font-semibold border-t border-slate-200/60 bg-white/40">
        MizukiCode — Plataforma Interactiva de Aprendizaje en C
      </footer>
    </div>
  );
}
