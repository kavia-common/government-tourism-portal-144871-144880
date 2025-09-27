import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

/**
 * Toast provider and hook for transient notifications.
 * Variants: success, info, warning, danger
 */
// PUBLIC_INTERFACE
export function ToastProvider({ children }) {
  /** This is a public function component. */
  const [toasts, setToasts] = useState([]);
  const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const add = useCallback((msg, variant = "info", timeout = 3000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, variant }]);
    setTimeout(() => remove(id), timeout);
  }, [remove]);

  const api = useMemo(() => ({ add, remove }), [add, remove]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} variant={t.variant} onClose={() => remove(t.id)}>
            {t.msg}
          </ToastItem>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const ToastContext = createContext(null);

// PUBLIC_INTERFACE
export function useToast() {
  /** Hook to trigger toasts. */
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

function ToastItem({ children, variant, onClose }) {
  const styles = {
    success: "bg-green-600 text-white",
    info: "bg-blue-600 text-white",
    warning: "bg-amber-500 text-gray-900",
    danger: "bg-red-600 text-white",
  }[variant || "info"];

  return (
    <div className={`min-w-[240px] max-w-sm rounded-md shadow-soft px-3 py-2 flex items-start gap-2 ${styles}`}>
      <div className="text-sm">{children}</div>
      <button className="ml-auto text-sm opacity-90 hover:opacity-100" onClick={onClose} aria-label="Dismiss">✕</button>
    </div>
  );
}
