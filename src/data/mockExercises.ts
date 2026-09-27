import { Exercise, BLANK_TOKEN } from "../types/exercise";

/**
 * Capa 2: Modelo de Datos y Currículo.
 * Mocks tipados de ejercicios para inicializar el currículo de lenguaje C.
 */
export const MOCK_EXERCISES: Exercise[] = [
  {
    id: "c-pointers-basic",
    type: "fill-in-the-blank",
    title: "Punteros y Direcciones",
    description: "Asigna la dirección de memoria de la variable 'numero' al puntero.",
    codeTemplate: `int numero = 42;
int *ptr = ${BLANK_TOKEN};`,
    expectedSolution: "&numero",
  },
  {
    id: "c-malloc-struct",
    type: "fill-in-the-blank",
    title: "Memoria Dinámica",
    description: "Calcula el tamaño en bytes necesario para reservar la estructura 'Punto'.",
    codeTemplate: `typedef struct {
    int x;
    int y;
} Punto;

Punto *p = (Punto *)malloc(${BLANK_TOKEN});`,
    expectedSolution: "sizeof(Punto)",
  },
];

