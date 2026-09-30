"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { LessonContainer } from "@/components/layout/LessonContainer";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SaveProgressModal } from "@/components/ui/SaveProgressModal";
import { MOCK_EXERCISES } from "@/data/mockExercises";
import { useLesson } from "@/hooks/useLesson";

function LessonContent() {
  const searchParams = useSearchParams();
  const nivel = searchParams.get("nivel");
  const [showSaveModal, setShowSaveModal] = useState(false);

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

  // Cálculo del porcentaje de progreso visual estilo Duolingo
  const progress = isCompleted
    ? 100
    : totalExercises > 0
    ? Math.round((currentIndex / totalExercises) * 100)
    : 0;

  const isInputEmpty = userInput.trim().length === 0;

  console.log("Nivel recibido:", nivel);

  return (
    <div className="h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-50 relative">
      {/* Botón temporal de prueba para simular ejercicio completado */}
      <div className="fixed top-3 right-16 sm:right-20 z-40">
        <button
          type="button"
          onClick={() => setShowSaveModal(true)}
          className="text-xs font-bold text-amber-900 bg-amber-200 hover:bg-amber-300 border border-amber-400 py-1.5 px-3 rounded-full shadow-sm transition-all cursor-pointer"
        >
          TEST: Simular Ejercicio Completado
        </button>
      </div>

      {/* Modal Guarda tu Progreso */}
      <SaveProgressModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        nivel={nivel}
      />
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
            </p>
            <Button
              variant="primary"
              disabled={false}
              onClick={() => window.location.reload()}
              className="px-10"
            >
              Repetir Lección
            </Button>
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
 * Cuartel General de la Lección Interactiva (/inicio).
 * Envuelve el contenido en Suspense para manejar de forma segura useSearchParams en Next.js App Router.
 */
export default function InicioPage() {
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

