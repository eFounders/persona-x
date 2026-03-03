"use client";

import {
  useState,
  useRef,
  useCallback,
  DragEvent,
  ChangeEvent,
} from "react";
import { Upload, FileText, X } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

interface InputPanelProps {
  onSubmit: (files: File[]) => void;
  isLoading: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
}

export default function InputPanel({ onSubmit, isLoading }: InputPanelProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    setSizeError(null);

    const pdfs = Array.from(incoming).filter(
      (f) => f.type === "application/pdf" || f.name.endsWith(".pdf")
    );

    const oversized = pdfs.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      setSizeError(
        `Fichier(s) trop volumineux (max 10 Mo) : ${oversized.map((f) => f.name).join(", ")}`
      );
      return;
    }

    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name));
      const fresh = pdfs.filter((f) => !existing.has(f.name));
      return [...prev, ...fresh];
    });
  }, []);

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    addFiles(e.target.files);
    e.target.value = "";
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
    setSizeError(null);
  }

  const canSubmit = files.length > 0 && !isLoading;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="mb-3 text-6xl font-black tracking-tight"
          style={{ color: "var(--fg-default)", fontFamily: "var(--font-pt-serif), Georgia, serif" }}
        >
          PersonaX
        </h1>
        <p className="text-lg" style={{ color: "var(--fg-tertiary)" }}>
          Upload tes transcripts d&apos;interviews en PDF. Obtiens des Empathy
          Maps, Personas et Jobs To Be Done en quelques secondes.
        </p>
      </div>

      <div className="card p-6" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Drop zone */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Zone de dépôt de fichiers PDF"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg py-12 transition-colors"
          style={{
            border: `2px dashed ${isDragging ? "var(--border-accent)" : "var(--border-default)"}`,
            background: isDragging ? "var(--bg-subtle)" : "var(--bg-secondary)",
          }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: isDragging ? "var(--bg-subtle)" : "var(--bg-strong)" }}
          >
            <Upload
              size={22}
              style={{
                color: isDragging ? "var(--fg-accent-02)" : "var(--fg-secondary)",
              }}
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium" style={{ color: "var(--fg-default)" }}>
              Glisse tes PDFs ici ou{" "}
              <span style={{ color: "var(--fg-accent-02)" }}>parcourir</span>
            </p>
            <p className="mt-1 text-xs" style={{ color: "var(--fg-tertiary)" }}>
              Plusieurs fichiers acceptés · PDF uniquement · 10 Mo max par fichier
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            multiple
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>

        {/* Size error */}
        {sizeError && (
          <p className="text-xs font-medium" style={{ color: "var(--fg-error)" }}>
            {sizeError}
          </p>
        )}

        {/* File chips */}
        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                style={{
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <FileText
                  size={15}
                  strokeWidth={2}
                  style={{ color: "var(--fg-accent-02)", flexShrink: 0 }}
                />
                <span
                  className="flex-1 truncate text-sm font-medium"
                  style={{ color: "var(--fg-default)" }}
                  title={file.name}
                >
                  {file.name}
                </span>
                <span
                  className="shrink-0 text-xs tabular-nums"
                  style={{ color: "var(--fg-tertiary)" }}
                >
                  {formatSize(file.size)}
                </span>
                <button
                  onClick={() => removeFile(file.name)}
                  className="ml-1 shrink-0 rounded-full p-0.5 transition-opacity hover:opacity-60"
                  style={{ color: "var(--fg-tertiary)" }}
                  aria-label={`Supprimer ${file.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          className="flex items-center justify-between border-t pt-4"
          style={{ borderColor: "var(--border-default)" }}
        >
          <span className="text-xs" style={{ color: "var(--fg-tertiary)" }}>
            {files.length === 0
              ? "Aucun fichier sélectionné"
              : `${files.length} fichier${files.length > 1 ? "s" : ""} sélectionné${files.length > 1 ? "s" : ""}`}
          </span>

          <button
            onClick={() => onSubmit(files)}
            disabled={!canSubmit}
            className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size={16} />
                Analyse en cours…
              </>
            ) : (
              "Analyser"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
