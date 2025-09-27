import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";
import MapView from "../components/dashboard/MapView";
import StatusCards from "../components/dashboard/StatusCards";
import IncidentList from "../components/dashboard/IncidentList";
import AlertPanel from "../components/dashboard/AlertPanel";
import { useEffect, useState } from "react";
import { listIncidents } from "../api/modules/incidents";
import { useToast } from "../components/ui/Toast";
import { useAuth } from "../auth/AuthContext";

// PUBLIC_INTERFACE
export default function AdminDashboard() {
  /** Admin dashboard with data pulled from incidents endpoint. */
  const [region, setRegion] = useState("");
  const [status, setStatus] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { add: toast } = useToast();
  const { role } = useAuth();

  const loadIncidents = async () => {
    setLoading(true);
    try {
      const res = await listIncidents({
        region: region || undefined,
        status: status || undefined,
      });
      if (res.ok) {
        setIncidents(Array.isArray(res.data) ? res.data : res.data?.items || []);
      } else {
        toast("Failed to load incidents", "danger");
      }
    } catch {
      toast("Network error while loading incidents", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader title="Status" subtitle={role ? `Role: ${role}` : undefined} />
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Incidents: {incidents.length}</li>
              <li>System health: OK</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Filters" />
          <CardContent>
            <div className="space-y-3">
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">All regions</option>
                <option>North</option>
                <option>South</option>
                <option>Coastal</option>
              </select>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Status: All</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
              <Button className="w-full" onClick={loadIncidents} disabled={loading}>
                {loading ? (
                  <span className="inline-flex items-center">
                    <Spinner />
                    <span className="ml-2">Loading...</span>
                  </span>
                ) : "Apply"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <AlertPanel />
      </aside>

      <section className="lg:col-span-3 space-y-6">
        <MapView />
        <StatusCards />
        <Card>
          <CardHeader title="Incidents (Live)" subtitle="Loaded from API" />
          <CardContent>
            {loading ? (
              <div className="w-full py-6 flex items-center justify-center text-gray-600">
                <Spinner />
                <span className="ml-2 text-sm">Fetching incidents...</span>
              </div>
            ) : incidents.length === 0 ? (
              <p className="text-sm text-gray-500">No incidents found.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {incidents.map((i) => (
                  <li key={i.id || i._id || i.title} className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{i.title || "Untitled"}</p>
                        <p className="text-xs text-gray-500">
                          {(i.id || i._id || "N/A")} • {i.region || "Unknown"} • {i.status || "open"}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                        {i.severity || "low"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <IncidentList />
      </section>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 text-ocean-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 004 12z"/>
    </svg>
  );
}
