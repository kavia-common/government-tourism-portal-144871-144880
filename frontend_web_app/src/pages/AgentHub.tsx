import Card from '../components/ui/Card'
import { Link } from 'react-router-dom'

export default function AgentHub() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <Card>
        <h2 className="text-2xl font-semibold">Agent Actions</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Link to="/register" className="card p-4 hover:shadow-lg transition-shadow">
            <div className="text-lg font-medium">New Registration</div>
            <div className="text-sm text-gray-600 mt-1">Create a new tourist record</div>
          </Link>
          <Link to="/renew" className="card p-4 hover:shadow-lg transition-shadow">
            <div className="text-lg font-medium">Renewal</div>
            <div className="text-sm text-gray-600 mt-1">Extend validity for existing tourist</div>
          </Link>
        </div>
      </Card>
    </section>
  )
}
