type Props = {
  title: string
  value: string | number
  trend?: string
  color?: 'primary' | 'secondary' | 'error'
  icon?: React.ReactNode
}

export default function StatusCard({ title, value, trend, color = 'primary', icon }: Props) {
  const colorMap = {
    primary: 'text-blue-700 bg-blue-50',
    secondary: 'text-amber-700 bg-amber-50',
    error: 'text-red-700 bg-red-50'
  } as const

  return (
    <div className="card p-4 flex items-center gap-4">
      <div className={`h-10 w-10 rounded-lg grid place-items-center ${colorMap[color]}`}>
        {icon || <span className="font-bold">i</span>}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      {trend && <div className="text-sm text-gray-500">{trend}</div>}
    </div>
  )
}
