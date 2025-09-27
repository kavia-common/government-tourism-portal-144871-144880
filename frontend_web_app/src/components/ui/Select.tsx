import { SelectHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
}

export default function Select({ label, error, className, children, ...rest }: Props) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <select className={clsx("input", error && "border-error focus:ring-red-300", className)} {...rest}>
        {children}
      </select>
      {error && <span className="text-xs text-error">{error}</span>}
    </label>
  )
}
