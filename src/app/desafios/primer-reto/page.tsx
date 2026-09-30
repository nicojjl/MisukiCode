"use client";

import React, { Suspense, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { LessonContainer } from "@/components/layout/LessonContainer";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MOCK_EXERCISES } from "@/data/mockExercises";
import { useLesson } from "@/hooks/useLesson";
import { useProgress } from "@/hooks/useProgress";
import { getModuleProgressKey } from "@/lib/curriculum";

function LessonContent() {
  const { markAsCompleted } = useProgress();

  const {
    currentExercise,
    currentIndex,
    totalExercises,
    userInput,
    setUserInput,
    status,
    feedback,
    checkAnswer,
    nextExercise,
  } = useLesson(MOCK_EXERCISES);

  const isCompleted = status === "completed";

  // Al completar la lección, guardamos automáticamente en localStorage
  useEffect(() => {
    if (isCompleted) {
      markAsCompleted(getModuleProgressKey(5));
    }
  }, [isCompleted, markAsCompleted]);

  // Cálculo del porcentaje de progreso visual estilo Duolingo
  const progress = isCompleted
    ? 100
    : totalExercises > 0
    ? Math.round((currentIndex / totalExercises) * 100)
    : 0;

  const isInputEmpty = userInput.trim().length === 0;

  return (
    <div className="h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-50 relative">
      {/* 1. Barra Superior con Progreso Reactivo, botón de salida y Avatar de usuario */}
      <Header progress={progress} />

      {/* 2. Área Central con Tarjeta de Ejercicio o Felicitación */}
      <LessonContainer>
        {isCompleted ? (
          <Card className="text-center">
            <div className="w-20 h-20 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto shadow-sm">
              🏆
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
              ¡Lección Completada!
            </h2>
            <p className="text-slate-500 text-lg max-w-md mx-auto mb-8">
              Has dominado los fundamentos de memoria dinámica y aritmética de punteros en C.
              El módulo ha sido guardado como completado en tu progreso local.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                disabled={false}
                onClick={() => window.location.reload()}
                className="px-8 w-full sm:w-auto"
              >
                Repetir Lección
              </Button>
              <Link
                href="/inicio"
                className="px-8 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 font-black text-sm uppercase tracking-wider transition-all w-full sm:w-auto text-center"
              >
                Volver al Dashboard
              </Link>
            </div>
          </Card>
        ) : (
          <Card
            exercise={currentExercise}
            userInput={userInput}
            setUserInput={setUserInput}
            status={status}
          />
        )}
      </LessonContainer>

      {/* 3. Barra Inferior Fija de Acción (Oculta al completar la lección) */}
      {!isCompleted && (
        <Footer
          status={status}
          feedback={feedback}
          isInputEmpty={isInputEmpty}
          onCheck={checkAnswer}
          onNext={nextExercise}
        />
      )}
    </div>
  );
}

/**
 * Simulador de Desafíos: Primer Reto (/desafios/primer-reto).
 * Orquestador interactivo conectado al almacenamiento local sin backend externo.
 */
export default function PrimerRetoPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-slate-500 font-semibold">
          Cargando...
        </div>
      }
    >
      <LessonContent />
    </Suspense>
  );
}
