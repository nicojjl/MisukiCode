export interface Lesson {
  id: string;
  title: string;
  isOptional: boolean;
}

export interface CurriculumModule {
  id: number;
  title: string;
  requiredLevel: number; // 0=principiante, 1=basico, 2=intermedio, 3=avanzado
  lessons: Lesson[];
}

export const MODULES: CurriculumModule[] = [
  {
    id: 1,
    title: "Módulo 1: Fundamentos (Variables, IO)",
    requiredLevel: 0,
    lessons: [
      { id: "m1_l1", title: "Estructura de un archivo .c y función main()", isOptional: false },
      { id: "m1_l2", title: "Variables, tipos primitivos y modificadores", isOptional: false },
      { id: "m1_l3", title: "Entrada y salida formateada con printf() y scanf()", isOptional: false },
      { id: "m1_l4", title: "Operadores a nivel de bits y máscaras binarias", isOptional: true },
    ],
  },
  {
    id: 2,
    title: "Módulo 2: Control de Flujo (If, Switch, Loops)",
    requiredLevel: 0,
    lessons: [
      { id: "m2_l1", title: "Condicionales if, else if y operadores lógicos", isOptional: false },
      { id: "m2_l2", title: "Sentencias de selección múltiple con switch y case", isOptional: false },
      { id: "m2_l3", title: "Estructuras iterativas: while, do-while y for", isOptional: false },
      { id: "m2_l4", title: "Instrucciones de salto: break, continue y goto", isOptional: true },
    ],
  },
  {
    id: 3,
    title: "Módulo 3: Funciones y Ámbito",
    requiredLevel: 1,
    lessons: [
      { id: "m3_l1", title: "Prototipos, declaración y firma de funciones", isOptional: false },
      { id: "m3_l2", title: "Paso de parámetros por valor y Stack frame", isOptional: false },
      { id: "m3_l3", title: "Recursividad y condiciones de parada", isOptional: false },
      { id: "m3_l4", title: "Clases de almacenamiento: static, extern y auto", isOptional: true },
    ],
  },
  {
    id: 4,
    title: "Módulo 4: Arreglos y Strings",
    requiredLevel: 1,
    lessons: [
      { id: "m4_l1", title: "Arreglos unidimensionales e indexación contigua", isOptional: false },
      { id: "m4_l2", title: "Arreglos multidimensionales y matrices", isOptional: false },
      { id: "m4_l3", title: "Cadenas de caracteres y el terminador nulo '\\0'", isOptional: false },
      { id: "m4_l4", title: "Operaciones seguras con la biblioteca string.h", isOptional: true },
    ],
  },
  {
    id: 5,
    title: "Módulo 5: Punteros Básicos",
    requiredLevel: 2,
    lessons: [
      { id: "m5_l1", title: "Direcciones de memoria y el operador &", isOptional: false },
      { id: "m5_l2", title: "Declaración y desreferenciación con *", isOptional: false },
      { id: "m5_l3", title: "Aritmética de punteros y navegación de memoria", isOptional: false },
      { id: "m5_l4", title: "Punteros dobles y paso por referencia simulado", isOptional: true },
    ],
  },
  {
    id: 6,
    title: "Módulo 6: Estructuras y Uniones",
    requiredLevel: 2,
    lessons: [
      { id: "m6_l1", title: "Definición y acceso a campos en struct", isOptional: false },
      { id: "m6_l2", title: "Alineación en memoria y padding de structs", isOptional: false },
      { id: "m6_l3", title: "Uniones (union) y compartición de espacio de memoria", isOptional: false },
      { id: "m6_l4", title: "Definición de alias con typedef y enumeraciones enum", isOptional: true },
    ],
  },
  {
    id: 7,
    title: "Módulo 7: Gestión Dinámica (malloc, free)",
    requiredLevel: 3,
    lessons: [
      { id: "m7_l1", title: "El Heap vs el Stack: ciclo de vida de memoria", isOptional: false },
      { id: "m7_l2", title: "Asignación dinámica con malloc() y calloc()", isOptional: false },
      { id: "m7_l3", title: "Liberación con free() y prevención de fugas (leaks)", isOptional: false },
      { id: "m7_l4", title: "Redimensión dinámica de bloques con realloc()", isOptional: true },
    ],
  },
  {
    id: 8,
    title: "Módulo 8: Estructuras Dinámicas (Listas enlazadas)",
    requiredLevel: 3,
    lessons: [
      { id: "m8_l1", title: "Nodos auto-referenciados y punteros al siguiente", isOptional: false },
      { id: "m8_l2", title: "Inserción al inicio y al final en listas simples", isOptional: false },
      { id: "m8_l3", title: "Búsqueda, eliminación y liberación en cascada", isOptional: false },
      { id: "m8_l4", title: "Implementación de Pilas (Stack LIFO) con nodos", isOptional: true },
    ],
  },
  {
    id: 9,
    title: "Módulo 9: Manejo de Archivos",
    requiredLevel: 3,
    lessons: [
      { id: "m9_l1", title: "Punteros FILE* y modos de apertura con fopen()", isOptional: false },
      { id: "m9_l2", title: "Lectura y escritura en archivos de texto (fprintf, fgets)", isOptional: false },
      { id: "m9_l3", title: "Lectura y escritura de bloques binarios (fread, fwrite)", isOptional: false },
      { id: "m9_l4", title: "Posicionamiento del cursor con fseek() y ftell()", isOptional: true },
    ],
  },
  {
    id: 10,
    title: "Módulo 10: Herramientas (Makefiles, GDB)",
    requiredLevel: 3,
    lessons: [
      { id: "m10_l1", title: "Compilación modular automatizada con Makefiles", isOptional: false },
      { id: "m10_l2", title: "Depuración interactiva con breakpoints en GDB", isOptional: false },
      { id: "m10_l3", title: "Detección de accesos inválidos y fugas con Valgrind", isOptional: false },
      { id: "m10_l4", title: "Punteros a funciones y callbacks en tiempo de ejecución", isOptional: true },
    ],
  },
];
