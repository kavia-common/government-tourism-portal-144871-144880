import React, { useEffect, useState } from 'react'

/**
 * PUBLIC_INTERFACE
 * OTPInput simulates sending and validating an OTP code.
 */
export default function OTPInput({ onVerified, channel = 'SMS', to = '' }) {
  const [sentCode, setSentCode] = useState('')
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle')
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let timer
    if (seconds > 0) timer = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds])

  const send = () => {
    const code = String(Math.floor(100000 + Math.random() * 900000))
    setSentCode(code)
    setSeconds(30)
    setStatus('sent')
  }

  const verify = () => {
    if (input === sentCode) {
      setStatus('verified')
      onVerified?.(true)
    } else {
      setStatus('error')
      onVerified?.(false)
    }
  }

  return (
    <div className="card p-4 space-y-3">
      <div className="text-sm text-gray-600">OTP via {channel} to {to || '(not set)'}</div>
      <div className="flex gap-2">
        <input className="input" placeholder="Enter 6-digit OTP" value={input} onChange={(e) => setInput(e.target.value)} maxLength={6}/>
        <button className="btn-secondary" onClick={send} disabled={seconds>0}>
          {seconds>0 ? `Resend in ${seconds}s` : 'Send OTP'}
        </button>
        <button className="btn-primary" onClick={verify}>Verify</button>
      </div>
      {status === 'sent' && <div className="text-xs text-gray-500">A test OTP was generated locally for demo: <span className="font-mono">{sentCode}</span></div>}
      {status === 'verified' && <div className="text-sm text-green-600">Verified successfully</div>}
      {status === 'error' && <div className="text-sm text-error">Invalid code. Try again.</div>}
    </div>
  )
}
