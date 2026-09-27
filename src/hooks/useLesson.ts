import { useState, useCallback } from "react";
import { Exercise, LessonStatus } from "../types/exercise";
import { evaluateAnswer } from "../lib/evaluator";

/**
 * Capa 4: Orquestador del Flujo de la Lección.
 * Custom hook puro que encapsula la máquina de estados y las transiciones
 * de una lección interactiva sin acoplamiento a elementos de UI.
 */
export function useLesson(exercises: Exercise[] = []) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [status, setStatus] = useState<LessonStatus>("idle");
  const [feedback, setFeedback] = useState<string>("");

  const currentExercise = exercises?.[currentIndex] || null;
  const totalExercises = exercises?.length || 0;

  /**
   * Ejecuta la evaluación de la respuesta actual.
   * Cuenta con un guardián de concurrencia para evitar condiciones de carrera.
   */
  const checkAnswer = useCallback(async () => {
    // Guardián contra condiciones de carrera y ausencia de ejercicio
    if (status === "checking" || !currentExercise || status === "completed") {
      return;
    }

    setStatus("checking");

    try {
      const result = await evaluateAnswer(currentExercise.id, userInput);
      setStatus(result.isCorrect ? "success" : "error");
      setFeedback(result.feedback);
    } catch {
      setStatus("error");
      setFeedback("Ocurrió un error inesperado al procesar la solución.");
    }
  }, [status, currentExercise, userInput]);

  /**
   * Avanza al siguiente ejercicio del currículo o finaliza la lección.
   */
  const nextExercise = useCallback(() => {
    if (currentIndex + 1 < (exercises?.length || 0)) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput("");
      setFeedback("");
      setStatus("idle");
    } else {
      setStatus("completed");
    }
  }, [currentIndex, exercises]);

  return {
    currentExercise,
    currentIndex,
    totalExercises,
    userInput,
    setUserInput,
    status,
    feedback,
    checkAnswer,
    nextExercise,
  };
}
