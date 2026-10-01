// Web Worker para compilación y ejecución aislada de código C
self.addEventListener("message", (e: MessageEvent) => {
  const { files, mainFileId } = e.data;

  // Simulación de trabajo pesado (en el futuro se integrará el motor WASM de C)
  setTimeout(() => {
    self.postMessage({
      type: "success",
      output:
        "Ejecución exitosa desde el Web Worker aislado.\nProyecto multi-archivo procesado.",
    });
  }, 1000);
});
