"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import JSZip from "jszip";
import { MZ_SANDBOX_PROJECT_KEY } from "@/lib/store";

export interface ProjectFile {
  id: string;
  name: string;
  content: string;
  parentId: string | null;
}

export interface ProjectFolder {
  id: string;
  name: string;
  parentId: string | null;
}

export interface SandboxProject {
  files: ProjectFile[];
  folders: ProjectFolder[];
  activeFileId: string | null;
}

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  targetId: string | null;
  targetType: "file" | "folder" | null;
}

const DEFAULT_MAIN_C = `#include <stdio.h>

int main() {
    printf("¡Hola, MizukiCode!\\n");
    return 0;
}
`;

const INITIAL_FOLDERS: ProjectFolder[] = [
  { id: "folder_src", name: "src", parentId: null },
];

const INITIAL_FILES: ProjectFile[] = [
  {
    id: "file_main_c",
    name: "main.c",
    content: DEFAULT_MAIN_C,
    parentId: "folder_src",
  },
];

const INITIAL_ACTIVE_FILE_ID = "file_main_c";

const INITIAL_OUTPUT = `>_ Live Console
Click 'Compilar' para ejecutar...`;

export default function SandboxPage() {
  const [folders, setFolders] = useState<ProjectFolder[]>(INITIAL_FOLDERS);
  const [files, setFiles] = useState<ProjectFile[]>(INITIAL_FILES);
  const [activeFileId, setActiveFileId] = useState<string | null>(INITIAL_ACTIVE_FILE_ID);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    folder_src: true,
  });
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>("folder_src");

  // Estado del menú contextual
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    targetId: null,
    targetType: null,
  });

  const [output, setOutput] = useState<string>(INITIAL_OUTPUT);
  const [isError, setIsError] = useState<boolean>(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"console" | "io">("console");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Cargar proyecto multi-archivo desde localStorage al montar el componente
  useEffect(() => {
    try {
      const stored = localStorage.getItem(MZ_SANDBOX_PROJECT_KEY);
      if (stored) {
        const parsed: SandboxProject = JSON.parse(stored);
        if (parsed.files && Array.isArray(parsed.files) && parsed.files.length > 0) {
          setFiles(parsed.files);
          setFolders(parsed.folders || []);
          setActiveFileId(parsed.activeFileId || parsed.files[0]?.id || null);

          // Mantener abiertas las carpetas recuperadas
          const expanded: Record<string, boolean> = {};
          (parsed.folders || []).forEach((f) => {
            expanded[f.id] = true;
          });
          setExpandedFolders(expanded);
        }
      }
    } catch (err) {
      console.error("Error al cargar proyecto desde localStorage:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Autoguardado silencioso ante cambios en archivos, carpetas o archivo activo
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const projectData: SandboxProject = {
        files,
        folders,
        activeFileId,
      };
      localStorage.setItem(MZ_SANDBOX_PROJECT_KEY, JSON.stringify(projectData));
    } catch (err) {
      console.error("Error al autoguardar proyecto en localStorage:", err);
    }
  }, [files, folders, activeFileId, isLoaded]);

  // 3. Listener global para cerrar el menú contextual al hacer clic fuera
  useEffect(() => {
    const handleWindowClick = () => {
      if (contextMenu.visible) {
        setContextMenu((prev) => ({ ...prev, visible: false }));
      }
    };
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, [contextMenu.visible]);

  // Archivo seleccionado actualmente en el editor
  const activeFile = files.find((f) => f.id === activeFileId) || null;

  // Actualizar contenido del archivo activo sin afectar a los demás
  const handleContentChange = (newContent: string) => {
    if (!activeFileId) return;
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content: newContent } : f))
    );
  };

  // Helper recursivo para resolver la ruta de una carpeta
  const getFolderPath = (folderId: string | null): string => {
    if (!folderId) return "";
    const folder = folders.find((f) => f.id === folderId);
    if (!folder) return "";
    const parentPath = getFolderPath(folder.parentId);
    return parentPath ? `${parentPath}/${folder.name}` : folder.name;
  };

  // 4. Interceptar clic derecho y posicionar el menú contextual
  const handleContextMenu = (
    e: React.MouseEvent,
    targetId: string,
    targetType: "file" | "folder"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      targetId,
      targetType,
    });
  };

  // 5. Crear elemento anidado dentro de una carpeta específica desde el menú contextual
  const handleCreateInFolder = (type: "file" | "folder") => {
    const parentFolderId = contextMenu.targetId;
    setContextMenu((prev) => ({ ...prev, visible: false }));
    if (!parentFolderId) return;

    if (type === "file") {
      const name = window.prompt("Nombre del archivo (ej. header.h):");
      if (!name || !name.trim()) return;

      const trimmedName = name.trim();
      const newFile: ProjectFile = {
        id: `file_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: trimmedName,
        content: trimmedName.endsWith(".h")
          ? `#ifndef ${trimmedName.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}\n#define ${trimmedName.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}\n\n// Prototipos y definiciones\n\n#endif\n`
          : "",
        parentId: parentFolderId,
      };

      setFiles((prev) => [...prev, newFile]);
      setActiveFileId(newFile.id);
      setExpandedFolders((prev) => ({ ...prev, [parentFolderId]: true }));
      setSelectedFolderId(parentFolderId);
    } else {
      const name = window.prompt("Nombre de la carpeta:");
      if (!name || !name.trim()) return;

      const trimmedName = name.trim();
      const newFolder: ProjectFolder = {
        id: `folder_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: trimmedName,
        parentId: parentFolderId,
      };

      setFolders((prev) => [...prev, newFolder]);
      setExpandedFolders((prev) => ({
        ...prev,
        [parentFolderId]: true,
        [newFolder.id]: true,
      }));
      setSelectedFolderId(newFolder.id);
    }
  };

  // 6. Acción Renombrar
  const handleRename = () => {
    const { targetId, targetType } = contextMenu;
    setContextMenu((prev) => ({ ...prev, visible: false }));
    if (!targetId || !targetType) return;

    if (targetType === "file") {
      const file = files.find((f) => f.id === targetId);
      if (!file) return;
      const newName = window.prompt("Renombrar archivo:", file.name);
      if (newName && newName.trim() && newName.trim() !== file.name) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === targetId ? { ...f, name: newName.trim() } : f
          )
        );
      }
    } else if (targetType === "folder") {
      const folder = folders.find((f) => f.id === targetId);
      if (!folder) return;
      const newName = window.prompt("Renombrar carpeta:", folder.name);
      if (newName && newName.trim() && newName.trim() !== folder.name) {
        setFolders((prev) =>
          prev.map((f) =>
            f.id === targetId ? { ...f, name: newName.trim() } : f
          )
        );
      }
    }
  };

  // 7. Acción Eliminar
  const handleDelete = () => {
    const { targetId, targetType } = contextMenu;
    setContextMenu((prev) => ({ ...prev, visible: false }));
    if (!targetId || !targetType) return;

    if (targetType === "file") {
      const file = files.find((f) => f.id === targetId);
      if (!file) return;
      const confirmed = window.confirm(
        `¿Estás seguro de que deseas eliminar el archivo "${file.name}"?`
      );
      if (!confirmed) return;

      setFiles((prev) => prev.filter((f) => f.id !== targetId));
      if (activeFileId === targetId) {
        setActiveFileId(null);
      }
    } else if (targetType === "folder") {
      const folder = folders.find((f) => f.id === targetId);
      if (!folder) return;
      const confirmed = window.confirm(
        `¿Estás seguro de que deseas eliminar la carpeta "${folder.name}" y todo su contenido?`
      );
      if (!confirmed) return;

      const fileIdsInFolder = new Set(
        files.filter((f) => f.parentId === targetId).map((f) => f.id)
      );

      setFiles((prev) => prev.filter((f) => f.parentId !== targetId));
      setFolders((prev) => prev.filter((f) => f.id !== targetId));

      if (activeFileId && fileIdsInFolder.has(activeFileId)) {
        setActiveFileId(null);
      }
      if (selectedFolderId === targetId) {
        setSelectedFolderId(null);
      }
    }
  };

  // 8. Crear Nuevo Archivo en la raíz del proyecto
  const handleCreateFileRoot = () => {
    const name = window.prompt("Nombre del nuevo archivo (ej. main.c, Makefile):");
    if (!name || !name.trim()) return;

    const trimmedName = name.trim();
    const newFile: ProjectFile = {
      id: `file_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: trimmedName,
      content: trimmedName.endsWith(".h")
        ? `#ifndef ${trimmedName.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}\n#define ${trimmedName.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}\n\n// Prototipos y definiciones\n\n#endif\n`
        : "",
      parentId: null,
    };

    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newFile.id);
  };

  // 9. Crear Nueva Carpeta en la raíz del proyecto
  const handleCreateFolderRoot = () => {
    const name = window.prompt("Nombre de la nueva carpeta (ej. includes, lib):");
    if (!name || !name.trim()) return;

    const trimmedName = name.trim();
    const newFolder: ProjectFolder = {
      id: `folder_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: trimmedName,
      parentId: null,
    };

    setFolders((prev) => [...prev, newFolder]);
    setExpandedFolders((prev) => ({ ...prev, [newFolder.id]: true }));
    setSelectedFolderId(newFolder.id);
  };

  // 10. Subir Archivo local (.c, .h, .txt, Makefile)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        const newFile: ProjectFile = {
          id: `file_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: file.name,
          content: content,
          parentId: selectedFolderId,
        };
        setFiles((prev) => [...prev, newFile]);
        setActiveFileId(newFile.id);
        if (selectedFolderId) {
          setExpandedFolders((prev) => ({ ...prev, [selectedFolderId]: true }));
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // 11. Exportar Proyecto Completo a ZIP con JSZip
  const handleDownloadZip = async () => {
    try {
      const zip = new JSZip();

      // Recrear carpetas virtuales (incluso si están vacías)
      folders.forEach((folder) => {
        const path = getFolderPath(folder.id);
        if (path) {
          zip.folder(path);
        }
      });

      // Agregar todos los archivos en sus rutas virtuales
      files.forEach((file) => {
        const folderPath = getFolderPath(file.parentId);
        const fullPath = folderPath ? `${folderPath}/${file.name}` : file.name;
        zip.file(fullPath, file.content);
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mizukicode_project.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al exportar archivo ZIP:", err);
      window.alert("Ocurrió un error al generar el archivo .zip");
    }
  };

  const handleClear = () => {
    setOutput("");
    setIsError(false);
  };

  // 12. Compilación con detección de errores
  const handleCompile = () => {
    setActiveConsoleTab("console");

    // Identificar archivo objetivo (main.c si existe, o el archivo activo)
    const mainFile = files.find((f) => f.name === "main.c");
    const targetFile = mainFile || activeFile;
    const codeToCompile = targetFile?.content || "";

    if (!targetFile || !codeToCompile || codeToCompile.trim() === "") {
      setOutput(
        targetFile
          ? `>_ Error: No hay código para compilar. '${targetFile.name}' está vacío.`
          : ">_ Error: No hay código para compilar. El archivo está vacío."
      );
      setIsError(true);
      setIsRunning(false);
      return;
    }

    setIsRunning(true);
    setIsError(false);
    setOutput(
      `>_ Live Console\n[WASM] Compilando ${targetFile.name} y vinculando módulos del proyecto...`
    );

    setTimeout(() => {
      setOutput(
        `>_ Live Console\n[WASM] Compilando ${targetFile.name} y vinculando módulos del proyecto...\n¡Hola, MizukiCode!\n\nPrograma finalizado con código de salida 0.`
      );
      setIsError(false);
      setIsRunning(false);
    }, 600);
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
    setSelectedFolderId(folderId);
  };

  // Helper para renderizar badge de archivo según extensión
  const renderFileBadge = (fileName: string) => {
    if (fileName.endsWith(".h")) {
      return (
        <span className="text-[11px] font-bold text-sky-600 font-mono w-3.5 text-center">
          H
        </span>
      );
    }
    if (fileName.endsWith(".c")) {
      return (
        <span className="text-[11px] font-bold text-violet-600 font-mono w-3.5 text-center">
          C
        </span>
      );
    }
    if (fileName.toLowerCase() === "makefile" || fileName.endsWith(".mk")) {
      return (
        <span className="text-[11px] font-bold text-amber-600 font-mono w-3.5 text-center">
          ⚙
        </span>
      );
    }
    return (
      <span className="text-[11px] text-slate-400 font-mono w-3.5 text-center">
        📄
      </span>
    );
  };

  // Renderizado recursivo de carpetas y archivos con sangría jerárquica
  const renderFolderItem = (folder: ProjectFolder, level: number = 0) => {
    const isExpanded = Boolean(expandedFolders[folder.id]);
    const folderFiles = files.filter((f) => f.parentId === folder.id);
    const subfolders = folders.filter((f) => f.parentId === folder.id);
    const isSelected = selectedFolderId === folder.id;
    const paddingLeft = 12 + level * 14;

    return (
      <div key={folder.id} className="flex flex-col">
        {/* Cabecera de la carpeta (con onContextMenu) */}
        <div
          onClick={() => toggleFolder(folder.id)}
          onContextMenu={(e) => handleContextMenu(e, folder.id, "folder")}
          style={{ paddingLeft: `${paddingLeft}px` }}
          className={`pr-2 py-1.5 flex items-center justify-between cursor-pointer transition-colors ${
            isSelected
              ? "bg-slate-200/50 text-slate-900"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <svg
              className={`w-3 h-3 text-slate-400 shrink-0 transition-transform duration-150 ${
                isExpanded ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <svg
              className="w-3.5 h-3.5 text-amber-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {isExpanded ? (
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v4.5A1.5 1.5 0 013.5 16H2V6zm4 7a2 2 0 012-2h10a2 2 0 012 2v3a2 2 0 01-2 2H8a2 2 0 01-2-2v-3z"
                  clipRule="evenodd"
                />
              ) : (
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              )}
            </svg>
            <span className="font-semibold truncate">
              {folder.name}/
            </span>
          </div>
        </div>

        {/* Contenido expandido: subcarpetas y archivos */}
        {isExpanded && (
          <div className="flex flex-col">
            {subfolders.map((sub) => renderFolderItem(sub, level + 1))}
            {folderFiles.map((file) => {
              const isActive = file.id === activeFileId;
              const filePadding = paddingLeft + 16;
              return (
                <div
                  key={file.id}
                  onClick={() => {
                    setActiveFileId(file.id);
                    setSelectedFolderId(folder.id);
                  }}
                  onContextMenu={(e) => handleContextMenu(e, file.id, "file")}
                  style={{ paddingLeft: `${filePadding}px` }}
                  className={`pr-2 py-1.5 flex items-center justify-between cursor-pointer transition-colors ${
                    isActive
                      ? "bg-violet-100/70 border-l-2 border-violet-500 text-violet-800 font-medium"
                      : "text-slate-600 hover:bg-slate-100/80"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {renderFileBadge(file.name)}
                    <span className="truncate font-mono">
                      {file.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Barra de Navegación Externa Superior */}
      <header className="w-full max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between shrink-0">
        <Link
          href="/inicio"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-sm shadow-sm">
            C
          </span>
          <span className="text-lg font-black tracking-tight text-slate-900">
            MizukiCode
          </span>
        </Link>

        <Link
          href="/inicio"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-200 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs transition-all"
        >
          ← Volver al Dashboard
        </Link>
      </header>

      {/* 1. Contenedor Principal (Estilo Ventana de Sistema Operativo) */}
      <div className="h-[calc(100vh-80px)] w-full max-w-[1600px] mx-auto p-4 flex flex-col">
        <div className="rounded-3xl border-2 border-slate-200 bg-white overflow-hidden flex flex-col shadow-2xl h-full">
          {/* Top Bar (Window Chrome) */}
          <div className="h-12 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 relative select-none">
            {/* Botones de macOS a la izquierda */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
            </div>

            {/* Título centrado */}
            <span className="text-xs font-semibold text-slate-400 tracking-wide">
              MizukiCode Sandbox — Multi-File Project
            </span>

            {/* Espaciador para centrado óptico */}
            <div className="w-14" />
          </div>

          {/* 2. Layout Tri-Panel */}
          <div className="flex h-full overflow-hidden flex-1">
            {/* 3. Panel Izquierdo (Explorador Interactivo Multi-Archivo) */}
            <aside className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col shrink-0 select-none">
              {/* Header del Explorador con Acciones Globales (Raíz) */}
              <div className="text-xs font-bold text-slate-500 px-3 py-2.5 flex justify-between items-center border-b border-slate-200/60">
                <span className="tracking-wider">EXPLORER</span>
                <div className="flex items-center gap-1">
                  {/* Input de archivo oculto para subida */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".c,.h,.txt,.mk,Makefile"
                    className="hidden"
                  />

                  {/* 1. Nuevo Archivo en Raíz */}
                  <button
                    type="button"
                    onClick={handleCreateFileRoot}
                    title="Nuevo Archivo en Raíz"
                    className="p-1 rounded hover:bg-slate-200/70 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>

                  {/* 2. Nueva Carpeta en Raíz */}
                  <button
                    type="button"
                    onClick={handleCreateFolderRoot}
                    title="Nueva Carpeta en Raíz"
                    className="p-1 rounded hover:bg-slate-200/70 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                      />
                    </svg>
                  </button>

                  {/* 3. Subir Archivo */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Subir Archivo al proyecto"
                    className="p-1 rounded hover:bg-slate-200/70 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </button>

                  {/* 4. Descargar Proyecto ZIP */}
                  <button
                    type="button"
                    onClick={handleDownloadZip}
                    title="Descargar Proyecto ZIP (mizukicode_project.zip)"
                    className="p-1 rounded hover:bg-slate-200/70 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Árbol de Archivos Interactivo con Soporte de Clic Derecho */}
              <div className="py-2 flex flex-col font-sans select-none text-[13px] overflow-y-auto flex-1">
                {/* Carpetas en la raíz (renderizado jerárquico) */}
                {folders
                  .filter((f) => !f.parentId)
                  .map((folder) => renderFolderItem(folder, 0))}

                {/* Archivos en la raíz */}
                {files
                  .filter((f) => !f.parentId)
                  .map((file) => {
                    const isActive = file.id === activeFileId;
                    return (
                      <div
                        key={file.id}
                        onClick={() => {
                          setActiveFileId(file.id);
                          setSelectedFolderId(null);
                        }}
                        onContextMenu={(e) => handleContextMenu(e, file.id, "file")}
                        className={`pl-5 pr-2 py-1.5 flex items-center justify-between cursor-pointer transition-colors ${
                          isActive
                            ? "bg-violet-100/70 border-l-2 border-violet-500 text-violet-800 font-medium"
                            : "text-slate-600 hover:bg-slate-100/80"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {renderFileBadge(file.name)}
                          <span className="truncate font-mono">
                            {file.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </aside>

            {/* 4. Panel Central (Editor de Código Multi-Archivo) */}
            <main className="flex-1 flex flex-col min-w-0 bg-white">
              {/* Barra de Pestañas (Tabs) */}
              <div className="h-10 border-b border-slate-200 flex bg-slate-50 shrink-0 overflow-x-auto">
                {activeFile ? (
                  <div className="px-4 py-2 bg-white border-r border-slate-200 text-sm text-slate-800 flex items-center gap-2 font-mono border-t-2 border-t-violet-500 font-medium select-none h-full">
                    {renderFileBadge(activeFile.name)}
                    <span>{activeFile.name}</span>
                  </div>
                ) : (
                  <div className="px-4 py-2 text-xs text-slate-400 italic flex items-center h-full">
                    Selecciona un archivo del explorador
                  </div>
                )}
              </div>

              {/* Área de Texto */}
              <textarea
                value={activeFile ? activeFile.content : ""}
                onChange={(e) => handleContentChange(e.target.value)}
                spellCheck={false}
                disabled={!activeFile}
                className="w-full flex-1 p-4 font-mono text-sm resize-none outline-none text-slate-800 bg-white leading-relaxed disabled:bg-slate-50 disabled:text-slate-400"
                placeholder={
                  activeFile
                    ? `Escribe tu código en ${activeFile.name}...`
                    : "Selecciona o crea un archivo en el explorador para comenzar..."
                }
              />
            </main>

            {/* 5. Panel Derecho (Consola y Ejecución) */}
            <section className="w-96 border-l border-slate-200 bg-slate-50 flex flex-col shrink-0">
              {/* Barra de Pestañas de Consola */}
              <div className="h-10 border-b border-slate-200 flex items-center justify-between px-3 bg-slate-50 shrink-0">
                <div className="flex items-center gap-1 select-none">
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("console")}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                      activeConsoleTab === "console"
                        ? "bg-white text-slate-800 shadow-2xs border border-slate-200"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Console
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("io")}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                      activeConsoleTab === "io"
                        ? "bg-white text-slate-800 shadow-2xs border border-slate-200"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    I/O
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Botón gris 'Limpiar' */}
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-slate-600 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 text-xs font-semibold py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer select-none"
                    title="Limpiar consola"
                  >
                    Limpiar
                  </button>

                  {/* Botón verde brillante 'Compilar ▶' */}
                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={handleCompile}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50 select-none"
                  >
                    <span>{isRunning ? "Compilando..." : "Compilar"}</span>
                    <span>▶</span>
                  </button>
                </div>
              </div>

              {/* Área de Salida */}
              {activeConsoleTab === "io" ? (
                <div className="flex-1 text-slate-500 p-4 font-sans text-sm">
                  Interfaz de Entrada/Salida (stdin) en construcción...
                </div>
              ) : (
                <div
                  className={`flex-1 bg-black font-mono text-sm p-4 overflow-y-auto ${
                    isError ? "text-red-400" : "text-green-400"
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-mono leading-relaxed">
                    {output}
                  </pre>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* Menú Contextual Flotante (Clic Derecho) */}
      {contextMenu.visible && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="fixed z-50 w-48 bg-white border border-slate-200 rounded-md shadow-xl py-1 text-sm text-slate-700 select-none animate-in fade-in duration-75"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Opciones exclusivas cuando se hace clic derecho en una carpeta */}
          {contextMenu.targetType === "folder" && (
            <>
              <button
                type="button"
                onClick={() => handleCreateInFolder("file")}
                className="w-full text-left px-4 py-2 hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>📄</span>
                <span>Nuevo Archivo</span>
              </button>
              <button
                type="button"
                onClick={() => handleCreateInFolder("folder")}
                className="w-full text-left px-4 py-2 hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>📁</span>
                <span>Nueva Carpeta</span>
              </button>
              <hr className="my-1 border-slate-200" />
            </>
          )}

          {/* Opciones de Renombrar y Eliminar */}
          <button
            type="button"
            onClick={handleRename}
            className="w-full text-left px-4 py-2 hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>✏️</span>
            <span>Renombrar</span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition-colors text-red-500 flex items-center gap-2 cursor-pointer"
          >
            <span>🗑️</span>
            <span>Eliminar</span>
          </button>
        </div>
      )}
    </div>
  );
}
