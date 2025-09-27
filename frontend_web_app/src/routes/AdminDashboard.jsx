// PUBLIC_INTERFACE
export default function AdminDashboard() {
  /** Admin dashboard placeholder: side summary + main content sections */
  return (
    <div className="grid lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 space-y-4">
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-900">Status</h3>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>Incidents: 5 open</li>
            <li>Today registrations: 12</li>
            <li>System health: OK</li>
          </ul>
        </div>
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          <div className="mt-3 space-y-2">
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>All regions</option>
              <option>North</option>
              <option>South</option>
            </select>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>Status: All</option>
              <option>Open</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
      </aside>

      <section className="lg:col-span-3 space-y-6">
        <div className="p-4 card h-64 flex items-center justify-center">
          <p className="text-gray-500">[Map placeholder]</p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="p-4 card">
            <h4 className="font-semibold text-gray-900">Open Incidents</h4>
            <p className="text-gray-600">5</p>
          </div>
          <div className="p-4 card">
            <h4 className="font-semibold text-gray-900">Registrations</h4>
            <p className="text-gray-600">12 today</p>
          </div>
          <div className="p-4 card">
            <h4 className="font-semibold text-gray-900">Renewals</h4>
            <p className="text-gray-600">8 today</p>
          </div>
        </div>

        <div className="p-4 card">
          <h4 className="font-semibold text-gray-900">Recent Incidents</h4>
          <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Power outage reported in North Region</li>
            <li>Roadblock near coastal highway</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
