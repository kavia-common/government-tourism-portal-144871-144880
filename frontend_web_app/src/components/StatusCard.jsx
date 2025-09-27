import React from 'react'
import clsx from 'clsx'

/**
 * PUBLIC_INTERFACE
 * StatusCard shows a metric with icon and trend.
 */
export default function StatusCard({ title, value, delta, icon, tone = 'primary' }) {
  const toneClass = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    error: 'text-error',
    success: 'text-green-600'
  }[tone] || 'text-primary'

  const deltaColor = delta >= 0 ? 'text-green-600' : 'text-error'
  const deltaPrefix = delta >= 0 ? '+' : ''

  return (
    <div className="card p-4 flex items-center gap-4">
      <div className={clsx('w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center', toneClass)}>
        {icon || <span>ⓘ</span>}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <div className={clsx('text-sm font-medium', deltaColor)}>
        {deltaPrefix}{delta}%
      </div>
    </div>
  )
}
