/**
 * Capa 2, 3 & 4: Modelo de Datos, Currículo, Evaluador y Orquestador de Lección.
 * Tipos e interfaces de dominio para los ejercicios de programación en C.
 */

export type ExerciseType = "fill-in-the-blank";

/**
 * Estados finitos posibles para el flujo de la lección interactiva.
 */
export type LessonStatus = "idle" | "checking" | "success" | "error" | "completed";

/**
 * Token delimitador reservado utilizado en `codeTemplate`.
 * Identifica la posición exacta donde se incrustará el control de entrada (input) del usuario.
 */
export const BLANK_TOKEN = "___";

export interface Exercise {
  /** Identificador único del ejercicio */
  id: string;

  /** Formato de la interacción */
  type: ExerciseType;

  /** Título conciso del concepto (ej. "Declaración de Punteros") */
  title: string;

  /** Instrucción breve al estilo Duolingo */
  description: string;

  /**
   * Bloque de código C que contiene el delimitador BLANK_TOKEN ('___')
   * indicando la posición exacta donde debe ubicarse el campo de texto.
   */
  codeTemplate: string;

  /**
   * Fragmento o valor esperado que completa correctamente la expresión en C.
   */
  expectedSolution: string;
}

/**
 * Capa 3: Estructura del resultado emitido por el motor de evaluación.
 */
export interface EvaluationResult {
  /** Indica si la respuesta del usuario satisface la solución del ejercicio */
  isCorrect: boolean;

  /** Mensaje amigable con feedback contextual para la experiencia de aprendizaje */
  feedback: string;
}
