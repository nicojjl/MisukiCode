"use client";

import { useState, useEffect, useCallback } from "react";
import type { MizukiProgress } from "@/lib/store";
import { MZ_PROGRESS_KEY } from "@/lib/store";

export function useProgress() {
  const [progress, setProgress] = useState<MizukiProgress>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Carga inicial del progreso desde localStorage
  useEffect(() => {
    try {
      const local = localStorage.getItem(MZ_PROGRESS_KEY);
      if (local) {
        setProgress(JSON.parse(local));
      }
    } catch (err) {
      console.error("Error al leer progreso local:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Marcar módulo como visto manualmente por el usuario
  const markAsViewed = useCallback((moduleId: string) => {
    setProgress((prev) => {
      const current = prev[moduleId] || {
        visto: false,
        completado: false,
        ultima_interaccion: "",
      };
      const updated: MizukiProgress = {
        ...prev,
        [moduleId]: {
          ...current,
          visto: true,
          ultima_interaccion: new Date().toISOString(),
        },
      };
      try {
        localStorage.setItem(MZ_PROGRESS_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Error al guardar progreso:", err);
      }
      return updated;
    });
  }, []);

  // Marcar módulo como completado por el motor de desafíos
  const markAsCompleted = useCallback((moduleId: string) => {
    setProgress((prev) => {
      const current = prev[moduleId] || {
        visto: true,
        completado: false,
        ultima_interaccion: "",
      };
      const updated: MizukiProgress = {
        ...prev,
        [moduleId]: {
          ...current,
          visto: true,
          completado: true,
          ultima_interaccion: new Date().toISOString(),
        },
      };
      try {
        localStorage.setItem(MZ_PROGRESS_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Error al guardar progreso:", err);
      }
      return updated;
    });
  }, []);

  return { progress, isLoaded, markAsViewed, markAsCompleted };
}
