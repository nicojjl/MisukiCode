import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Obtenemos el usuario de forma segura. Si el token expiró, Supabase lo refresca aquí.
  const { data: { user } } = await supabase.auth.getUser()

  // Escudo de seguridad: Si intenta acceder a /inicio (o subrutas) sin estar logueado
  if (request.nextUrl.pathname.startsWith('/inicio') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/registro'
    return NextResponse.redirect(url)
  }

  // Redirección inversa: Si ya está logueado e intenta ir al registro/landing
  if (request.nextUrl.pathname === '/registro' && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/inicio'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
