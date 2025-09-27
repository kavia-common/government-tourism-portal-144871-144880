import React from "react";

/**
 * Ocean Professional Button component with variants and sizes using Tailwind.
 * Variants: primary, secondary, outline, ghost, danger
 * Sizes: sm, md, lg
 */
// PUBLIC_INTERFACE
export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as = "button",
  ...props
}) {
  /** This is a public function component. */
  const Comp = as;
  const base =
    "inline-flex items-center justify-center font-semibold rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shadow-soft";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };
  const variants = {
    primary:
      "bg-ocean-primary text-white hover:opacity-95 focus-visible:ring-blue-500 focus-visible:ring-offset-white",
    secondary:
      "bg-amber-400 text-gray-900 hover:opacity-95 focus-visible:ring-amber-500 focus-visible:ring-offset-white",
    outline:
      "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus-visible:ring-blue-500",
    ghost:
      "text-gray-700 hover:bg-gray-100 focus-visible:ring-blue-500",
    danger:
      "bg-red-500 text-white hover:opacity-95 focus-visible:ring-red-500",
  };

  const cls = [base, sizes[size], variants[variant], className].join(" ");
  return (
    <Comp className={cls} {...props}>
      {children}
    </Comp>
  );
}
