import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://emacs.piston.rs/api/v2/execute', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'MizukiCode-Sandbox/1.0',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body),
      cache: 'no-store' // Evita que Next.js cachee la petición fallida
    });

    if (!response.ok) {
      throw new Error(`Piston API rechazó la petición con estado: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    // Node.js 18+ esconde el error real de red dentro de 'error.cause'
    const reason = error.cause ? error.cause.message : error.message;
    console.error("Error en Proxy Piston:", reason); // Log visible en la terminal del dev
    return NextResponse.json({ error: 'Fallo de red en el compilador: ' + reason }, { status: 500 });
  }
}
