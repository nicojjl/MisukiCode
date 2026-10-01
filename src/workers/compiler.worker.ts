self.addEventListener('message', async (e: any) => {
  const { files, activeFileId } = e.data;

  const mainFile = files.find((f: any) => f.name === 'main.c' || f.id === activeFileId);
  if (!mainFile) {
    self.postMessage({ type: 'error', output: 'Error: No se encontró main.c' });
    return;
  }

  // Formateamos los archivos virtuales para la API de Piston
  const pistonFiles = files.map((f: any) => ({
    name: f.name,
    content: f.content
  }));

  // NOTA: Para el desafío del laberinto, simulamos los argumentos de terminal.
  // En el futuro, esto debería venir de un input en la UI.
  const runArgs = ['-f', 'laberinto.txt', '-mode', 'path', '-sx', '0', '-sy', '0', '-tx', '3', '-ty', '3'];

  try {
    const response = await fetch('https://emacs.piston.rs/api/v2/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'c',
        version: '10.2.0',
        files: pistonFiles,
        args: runArgs
      })
    });

    const result = await response.json();

    if (result.compile && result.compile.code !== 0) {
      self.postMessage({ type: 'error', output: '[ERROR DE COMPILACIÓN]\n' + result.compile.output });
    } else if (result.run && result.run.code !== 0) {
      self.postMessage({ type: 'error', output: '[ERROR DE EJECUCIÓN (Runtime)]\n' + result.run.output });
    } else {
      self.postMessage({ type: 'success', output: result.run.output || '\n(Programa finalizado sin salida)' });
    }
  } catch (error: any) {
    self.postMessage({ type: 'error', output: 'Error de red al contactar al compilador: ' + error.message });
  }
});
