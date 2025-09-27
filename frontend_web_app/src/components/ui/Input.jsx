import React from "react";

/**
 * Ocean Professional Input with label and error message.
 * Supports type, placeholder, value, onChange and error props.
 */
// PUBLIC_INTERFACE
export default function Input({
  label,
  id,
  helperText,
  error,
  className = "",
  ...props
}) {
  /** This is a public function component. */
  const inputCls = [
    "w-full rounded-md border px-3 py-2 text-sm transition",
    error
      ? "border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
      : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-ocean-primary",
    "bg-white text-gray-900 placeholder:text-gray-400",
    className,
  ].join(" ");

  const labelCls = "block text-sm font-medium text-gray-700 mb-1";
  const hintCls = error ? "text-xs text-red-600 mt-1" : "text-xs text-gray-500 mt-1";

  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelCls}>
          {label}
        </label>
      )}
      <input id={id} className={inputCls} {...props} />
      {(helperText || error) && (
        <p className={hintCls}>{error ? error : helperText}</p>
      )}
    </div>
  );
}
