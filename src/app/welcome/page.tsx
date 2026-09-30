'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LEVELS } from '@/lib/levels';
import { createClient } from '@/lib/supabase/client';

export default function WelcomePage() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedLevel(id);
  };

  const handleContinue = async () => {
    if (!selectedLevel || loading) return;

    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Usuario autenticado: persistir en base de datos
        await supabase
          .from('perfiles')
          .update({ nivel: selectedLevel })
          .eq('id', user.id);

        // Fail-safe de respaldo: pasamos el nivel en la URL para que el Server Component
        // de /inicio pueda auto-sanar si el update falló silenciosamente (p. ej. RLS)
        router.push(`/inicio?nivel=${selectedLevel}`);
      } else {
        // Flujo invitado: viajamos directo al primer reto con el nivel en la query
        // Sin contaminar localStorage con claves muertas redundantes
        router.push(`/desafios/primer-reto?nivel=${selectedLevel}`);
      }
    } catch (err) {
      console.error('Error al procesar selección de nivel:', err);
      // Fallback seguro de navegación
      router.push(`/desafios/primer-reto?nivel=${selectedLevel}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 sm:p-10 font-sans text-slate-800">
      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* Encabezado */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight text-center mb-3">
          ¡Bienvenido Usuario!
        </h1>
        <p className="text-slate-500 font-semibold text-base sm:text-lg text-center mb-10">
          Elige tu nivel de conocimiento
        </p>

        {/* Tarjetas de Nivel con data-[selected] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {LEVELS.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => handleSelect(level.id)}
              data-selected={selectedLevel === level.id}
              className="group rounded-2xl border-2 border-zinc-200 bg-white p-6 text-left transition hover:border-violet-300 hover:shadow-lg data-[selected=true]:border-violet-500 data-[selected=true]:bg-violet-50 data-[selected=true]:shadow-md data-[selected=true]:shadow-violet-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-violet-600 transition-colors">
                    {level.label}
                  </h3>
                  <span className="text-xs font-bold text-violet-700 bg-violet-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {level.modules}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                  {level.summary}
                </p>
              </div>

              {/* Componente de Estrellas */}
              <div className="flex items-center gap-1.5 pt-2">
                {[1, 2, 3].map((starIndex) => (
                  <svg
                    key={starIndex}
                    className={`w-6 h-6 transition-colors ${
                      starIndex <= level.stars
                        ? 'fill-violet-500 text-violet-500'
                        : 'fill-zinc-200 text-zinc-200'
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Botón Continuar (Dual Flow) */}
        <div className="mt-12 w-full max-w-xs">
          <button
            type="button"
            disabled={!selectedLevel || loading}
            onClick={handleContinue}
            className={`w-full py-4 px-6 rounded-2xl font-black uppercase tracking-wider text-sm transition-all duration-200 ${
              selectedLevel && !loading
                ? 'bg-violet-600 text-white shadow-[0_4px_0_0_#6d28d9] hover:bg-violet-500 active:translate-y-1 active:shadow-none cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-[0_4px_0_0_#cbd5e1]'
            }`}
          >
            {loading ? 'Guardando...' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  );
}
