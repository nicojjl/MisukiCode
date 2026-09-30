import { redirect } from "next/navigation";

/**
 * Hub de Desafíos (/desafios).
 * Redirige automáticamente al primer reto disponible para evitar rutas vacías.
 */
export default function DesafiosPage() {
  redirect("/desafios/primer-reto");
}
