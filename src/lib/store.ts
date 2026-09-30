/**
 * Contrato de datos local para MizukiCode.
 * Toda la persistencia de progreso y estado de aprendizaje vive en el navegador bajo 'mz_progress'.
 */

export interface ModuleProgress {
  visto: boolean;       // Marcado manualmente por el usuario
  completado: boolean;  // Validado por el motor de desafíos
  ultima_interaccion: string; // ISO date string
}

export type MizukiProgress = Record<string, ModuleProgress>;

export const MZ_PROGRESS_KEY = "mz_progress";
export const MZ_LEVEL_KEY = "mz_level";
export const MZ_USER_NAME_KEY = "mz_user_name";
export const MZ_SANDBOX_CODE_KEY = "mz_sandbox_code";
export const MZ_SANDBOX_PROJECT_KEY = "mz_sandbox_project";
