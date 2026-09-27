import { MOCK_EXERCISES } from "../data/mockExercises";
import { EvaluationResult } from "../types/exercise";

/**
 * Capa 3: Motor de Evaluación (El Sandbox).
 * Evalúa de forma aislada y pura la respuesta enviada por el usuario contra la solución esperada.
 *
 * @param exerciseId Identificador del ejercicio a evaluar.
 * @param userInput Cadena de texto ingresada por el usuario en el campo en blanco.
 * @returns Promesa con el veredicto estructurado (isCorrect, feedback).
 */
export async function evaluateAnswer(
  exerciseId: string,
  userInput: string
): Promise<EvaluationResult> {
  // Simulación de latencia de red / llamada asíncrona a un compilador (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const exercise = MOCK_EXERCISES.find((ex) => ex.id === exerciseId);

  if (!exercise) {
    return {
      isCorrect: false,
      feedback: "Error: No se encontró el ejercicio solicitado.",
    };
  }

  // Sanitización básica: eliminamos espacios en blanco redundantes en los extremos
  const sanitizedInput = userInput.trim();
  const expected = exercise.expectedSolution.trim();

  const isCorrect = sanitizedInput === expected;

  return {
    isCorrect,
    feedback: isCorrect
      ? "¡Excelente! Has completado la expresión correctamente."
      : "Respuesta incorrecta. Revisa la sintaxis e inténtalo de nuevo.",
  };
}

