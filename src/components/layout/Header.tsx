"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProgressBar } from "../ui/ProgressBar";
import { createClient } from "@/lib/supabase/client";

interface HeaderProps {
  progress?: number;
  className?: string;
}

/**
 * Encabezado delgado de la lección al estilo Duolingo.
 * Aloja el enlace 'X' para salir al Dashboard, la barra de progreso reactiva y el avatar de usuario.
 */
export const Header: React.FC<HeaderProps> = ({ progress = 0, className = "" }) => {
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const photo =
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null;
          setAvatarUrl(photo);

          const fullName: string =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email ||
            "";

          if (fullName) {
            const parts = fullName.trim().split(/\s+/);
            const calculatedInitials =
              parts.length > 1
                ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
                : parts[0].slice(0, 2).toUpperCase();
            setInitials(calculatedInitials);
          }
        }
      } catch (err) {
        console.error("Error obteniendo usuario en Header:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <header
      className={`w-full h-16 bg-transparent px-4 sm:px-8 flex items-center justify-between gap-4 sm:gap-8 ${className}`}
    >
      <div className="w-full max-w-4xl mx-auto flex items-center gap-4 sm:gap-6">
        {/* Enlace de salida 'X' hacia el Dashboard principal */}
        <Link
          href="/"
          aria-label="Volver al menú principal"
          className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-xl hover:bg-slate-100 flex items-center justify-center shrink-0 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-[2.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>

        {/* Barra de progreso central interactiva */}
        <div className="flex-1">
          <ProgressBar progress={progress} />
        </div>

        {/* Avatar de Usuario con 3 estados: loading, avatarUrl (éxito), fallback */}
        <div className="shrink-0 flex items-center justify-center">
          {loading ? (
            <div className="w-9 h-9 rounded-full bg-slate-200 animate-pulse shrink-0" />
          ) : avatarUrl && !imageError ? (
            <img
              src={avatarUrl}
              alt="Avatar de usuario"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200 shrink-0"
            />
          ) : initials ? (
            <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-purple-200 shrink-0 select-none">
              {initials}
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center ring-2 ring-slate-300/50 shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

