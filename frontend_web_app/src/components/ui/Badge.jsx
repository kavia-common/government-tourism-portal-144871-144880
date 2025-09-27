import React from "react";

/**
 * Ocean Professional Badge for small status pills.
 * Variants: default, success, warning, danger, info
 */
// PUBLIC_INTERFACE
export default function Badge({ children, variant = "default", className = "", ...props }) {
  /** This is a public function component. */
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-800",
  };
  const cls = [
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
    variants[variant],
    className,
  ].join(" ");
  return (
    <span className={cls} {...props}>
      {children}
    </span>
  );
}
