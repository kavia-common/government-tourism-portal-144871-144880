import { useEffect, useRef } from 'react'

type Props = {
  length?: number
  onComplete: (code: string) => void
}

export default function OTPInput({ length = 6, onComplete }: Props) {
  const inputs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    inputs.current[0]?.focus()
  }, [])

  const handleChange = (idx: number, value: string) => {
    const trimmed = value.replace(/\D/g, '').slice(0,1)
    const input = inputs.current[idx]
    if (input) input.value = trimmed
    if (trimmed && idx < length - 1) {
      inputs.current[idx + 1]?.focus()
    }
    const code = inputs.current.map(i => i?.value || '').join('')
    if (code.length === length) {
      onComplete(code)
    }
  }

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !inputs.current[idx]?.value && idx > 0) {
      inputs.current[idx - 1]?.focus()
    }
  }

  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={el => inputs.current[i] = el}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-10 h-12 text-center text-lg font-semibold rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      ))}
    </div>
  )
}
