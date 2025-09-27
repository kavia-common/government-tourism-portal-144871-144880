import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export default function Input({ label, error, className, ...rest }: Props) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <input className={clsx("input", error && "border-error focus:ring-red-300", className)} {...rest} />
      {error && <span className="text-xs text-error">{error}</span>}
    </label>
  )
}
