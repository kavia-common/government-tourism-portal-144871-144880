import React from "react";

/**
 * Ocean Professional Card component: container with padding and header/footer slots.
 */
// PUBLIC_INTERFACE
export default function Card({ children, className = "", ...props }) {
  /** This is a public function component. */
  const cls =
    "bg-white rounded-xl shadow-soft border border-gray-100 " + className;
  return (
    <div className={cls} {...props}>
      {children}
    </div>
  );
}

// PUBLIC_INTERFACE
export function CardHeader({ title, subtitle, actions, className = "" }) {
  /** Header for Card with title/subtitle/action area. */
  return (
    <div className={"px-4 py-3 border-b border-gray-100 flex items-start justify-between " + className}>
      <div>
        {title && <h3 className="text-sm font-semibold text-gray-900">{title}</h3>}
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
export function CardContent({ children, className = "" }) {
  /** Content area for Card. */
  return <div className={"px-4 py-4 " + className}>{children}</div>;
}

// PUBLIC_INTERFACE
export function CardFooter({ children, className = "" }) {
  /** Footer area for Card. */
  return <div className={"px-4 py-3 border-t border-gray-100 " + className}>{children}</div>;
}
