"use client";

import { DragEvent, useRef } from 'react';

type UploadDropzoneProps = {
  onFileSelected: (file: File) => void;
  selectedFileName?: string;
};

export function UploadDropzone({ onFileSelected, selectedFileName }: UploadDropzoneProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <label
      className="surface-muted flex cursor-pointer flex-col items-center justify-center gap-2 border-dashed p-8 text-center"
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
      onClick={() => fileRef.current?.click()}
      htmlFor="meal-upload"
      aria-label="Upload meal image"
    >
      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Drag & drop meal image</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">or click to browse JPG/PNG</p>
      {selectedFileName ? <p className="text-xs text-emerald">Selected: {selectedFileName}</p> : null}
      <input
        id="meal-upload"
        aria-label="Meal image file"
        title="Upload meal image"
        ref={fileRef}
        className="hidden"
        type="file"
        accept="image/png,image/jpeg"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFileSelected(file);
        }}
      />
    </label>
  );
}
