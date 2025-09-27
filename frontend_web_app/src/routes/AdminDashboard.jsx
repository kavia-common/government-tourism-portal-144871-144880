import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";
import MapView from "../components/dashboard/MapView";
import StatusCards from "../components/dashboard/StatusCards";
import IncidentList from "../components/dashboard/IncidentList";
import AlertPanel from "../components/dashboard/AlertPanel";

// PUBLIC_INTERFACE
export default function AdminDashboard() {
  /** Admin dashboard with sidebar filters, KPI cards, map, alerts, and incident list. */
  return (
    <div className="grid lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader title="Status" />
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Incidents: 5 open</li>
              <li>Today registrations: 12</li>
              <li>System health: OK</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Filters" />
          <CardContent>
            <div className="space-y-3">
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>All regions</option>
                <option>North</option>
                <option>South</option>
                <option>Coastal</option>
              </select>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Status: All</option>
                <option>Open</option>
                <option>Closed</option>
              </select>
              <Button className="w-full">Apply</Button>
            </div>
          </CardContent>
        </Card>

        <AlertPanel />
      </aside>

      <section className="lg:col-span-3 space-y-6">
        <MapView />
        <StatusCards />
        <IncidentList />
      </section>
    </div>
  );
}
