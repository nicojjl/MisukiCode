"use client";

import React, { useState, useEffect } from "react";

interface HeroHeadlineProps {
  phrases: string[];
  fallback?: string;
}

export function HeroHeadline({
  phrases,
  fallback = "Domina los punteros sin perder la cabeza.",
}: HeroHeadlineProps) {
  const [currentPhrase, setCurrentPhrase] = useState<string>("");

  useEffect(() => {
    if (phrases.length > 0) {
      const randomIndex = Math.floor(Math.random() * phrases.length);
      setCurrentPhrase(phrases[randomIndex]);
    }
  }, [phrases]);

  return (
    <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
      {currentPhrase || (
        <span className="opacity-0 select-none">
          {fallback}
        </span>
      )}
    </h1>
  );
}
