import React from "react";

interface LessonContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Contenedor principal semántico (<main>) expansivo.
 * Centra la tarjeta de la lección en la pantalla tanto vertical como horizontalmente.
 */
export const LessonContainer: React.FC<LessonContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <main
      className={`flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-center ${className}`}
    >
      {children}
    </main>
  );
};
