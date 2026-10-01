import JSCPP from 'jscpp';

self.addEventListener('message', (e: MessageEvent) => {
  const { files, activeFileId } = e.data;

  // 1. Identificar el código principal (asumimos que el usuario compila el archivo activo o busca main.c)
  const mainFile = files.find((f: any) => f.name === 'main.c') || files.find((f: any) => f.id === activeFileId);
  if (!mainFile) {
    self.postMessage({ type: 'error', output: 'Error: No se encontró main.c ni un archivo activo para compilar.' });
    return;
  }

  // 2. Mapear el sistema de archivos virtual para las directivas #include
  const includesMap: Record<string, string> = {};
  files.forEach((f: any) => {
    if (f.id !== mainFile.id) {
      // jscpp busca los includes por nombre de archivo
      includesMap[f.name] = f.content;
    }
  });

  let outputBuffer = '';

  // 3. Configurar el entorno de C
  const config = {
    stdio: {
      write: (str: string) => { outputBuffer += str; }
    },
    includes: includesMap,
    maxTimeout: 2800 // Evita que un while(1) congele el worker eternamente
  };

  try {
    // 4. Ejecutar el código C
    JSCPP.run(mainFile.content, '', config);
    self.postMessage({ 
      type: 'success', 
      output: outputBuffer || '\n(Programa finalizado exitosamente sin salida de consola)' 
    });
  } catch (err: any) {
    // 5. Capturar errores reales de sintaxis (ej. falta de punto y coma, variables no declaradas)
    self.postMessage({ 
      type: 'error', 
      output: outputBuffer + '\n\n[ERROR DE COMPILACIÓN]:\n' + (err?.message || String(err))
    });
  }
});

