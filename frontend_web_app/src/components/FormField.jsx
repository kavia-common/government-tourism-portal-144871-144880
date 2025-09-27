import React from 'react'

/**
 * PUBLIC_INTERFACE
 * FormField renders a label and input/select/textarea with consistent styling.
 */
export default function FormField({ label, children, required }) {
  return (
    <label className="block">
      <span className="label">{label}{required && <span className="text-error">*</span>}</span>
      {children}
    </label>
  )
}
