export interface Level {
  id: string;
  label: string;
  modules: string;
  stars: number;
  summary: string;
}

export const LEVELS: Level[] = [
  {
    id: "principiante",
    label: "Principiante",
    modules: "Módulos 1–2",
    stars: 0,
    summary: "Nunca has programado en C o lo dejaste hace años. Empiezas desde cero: variables, printf/scanf, condicionales y bucles."
  },
  {
    id: "basico",
    label: "Básico",
    modules: "Módulos 3–4",
    stars: 1,
    summary: "Ya escribes programas simples. Aquí dominas funciones, recursividad, arreglos, strings y cómo viven en el stack."
  },
  {
    id: "intermedio",
    label: "Intermedio",
    modules: "Módulos 5–6",
    stars: 2,
    summary: "Estás listo para lo que define a C: punteros, desreferenciación, aritmética de punteros, structs, unions y typedef."
  },
  {
    id: "avanzado",
    label: "Avanzado",
    modules: "Módulos 7–10",
    stars: 3,
    summary: "Manejas punteros con confianza. Ahora: memoria dinámica, listas enlazadas, archivos, multihilo y herramientas de nivel laboral (GDB, Valgrind)."
  }
];
