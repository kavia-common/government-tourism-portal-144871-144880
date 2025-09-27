import React, { useEffect } from "react";

/**
 * Ocean Professional Modal component with overlay.
 * Props: open (bool), onClose (fn), title (string)
 */
// PUBLIC_INTERFACE
export default function Modal({ open, onClose, title, children }) {
  /** This is a public function component. */
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title || "Dialog"}>
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-soft w-full max-w-lg">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <button className="p-1 rounded hover:bg-gray-100" onClick={onClose} aria-label="Close dialog">✕</button>
        </div>
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
}
