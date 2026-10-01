import { useEffect } from 'react';

/** Ventana modal accesible: se cierra con Escape o clic fuera. */
export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4" onMouseDown={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title}
        className="mt-10 w-full max-w-xl rounded-lg border border-carbon-700 bg-carbon-900 p-6"
        onMouseDown={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="title-display text-2xl">{title}</h2>
          <button onClick={onClose} aria-label="Cerrar" className="text-2xl leading-none text-zinc-400 hover:text-white">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
