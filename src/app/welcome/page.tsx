'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const levels = [
  { id: 'principiante', title: 'Principiante', filledStars: 0 },
  { id: 'basico', title: 'Básico', filledStars: 1 },
  { id: 'mediano', title: 'Mediano', filledStars: 2 },
  { id: 'avanzado', title: 'Avanzado', filledStars: 3 },
];

export default function WelcomePage() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedLevel(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-slate-800">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Encabezado */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight text-center mb-3">
          ¡Bienvenido Usuario!
        </h1>
        <p className="text-slate-500 font-semibold text-base sm:text-lg text-center mb-10">
          Elige tu nivel de conocimiento
        </p>

        {/* Tarjetas de Nivel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {levels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => handleSelect(level.id)}
              className={`group flex flex-col items-center justify-between p-6 bg-white rounded-3xl border-4 transition-all duration-200 cursor-pointer min-h-[160px] ${
                selectedLevel === level.id
                  ? 'border-purple-500 shadow-[0_8px_0_0_#a855f7] -translate-y-2'
                  : 'border-slate-200 shadow-[0_8px_0_0_#e2e8f0] hover:border-slate-300 hover:-translate-y-1 hover:shadow-[0_12px_0_0_#cbd5e1]'
              }`}
            >
              <span className="text-lg sm:text-xl font-black text-slate-800 mb-6 group-hover:text-purple-600 transition-colors">
                {level.title}
              </span>

              {/* Estrellas moradas (SVG) */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((starIndex) => (
                  <svg
                    key={starIndex}
                    className={`w-7 h-7 transition-colors ${
                      starIndex <= level.filledStars
                        ? 'fill-purple-500 text-purple-500'
                        : 'fill-slate-200 text-slate-200'
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

        {/* Botón Continuar */}
        <div className="mt-12 w-full max-w-xs">
          <button
            type="button"
            disabled={!selectedLevel}
            onClick={() => selectedLevel && router.push(`/inicio?nivel=${selectedLevel}`)}
            className={`w-full py-4 px-6 rounded-2xl font-black uppercase tracking-wider text-sm transition-all duration-200 ${
              selectedLevel
                ? 'bg-purple-600 text-white shadow-[0_4px_0_0_#7e22ce] hover:bg-purple-500 active:translate-y-1 active:shadow-none cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-[0_4px_0_0_#cbd5e1]'
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

