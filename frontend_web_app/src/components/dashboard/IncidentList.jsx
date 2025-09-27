import React from "react";
import Card, { CardContent, CardHeader } from "../ui/Card";
import Badge from "../ui/Badge";

/**
 * IncidentList shows recent incidents.
 */
// PUBLIC_INTERFACE
export default function IncidentList() {
  /** This is a public function component. */
  const incidents = [
    { id: "INC-001", title: "Power outage", region: "North", severity: "high" },
    { id: "INC-002", title: "Roadblock", region: "Coastal", severity: "medium" },
    { id: "INC-003", title: "Network disruption", region: "South", severity: "low" },
  ];

  const sevBadge = (sev) =>
    sev === "high" ? "danger" : sev === "medium" ? "warning" : "info";

  return (
    <Card>
      <CardHeader title="Recent Incidents" subtitle="Last 24 hours" />
      <CardContent>
        <ul className="divide-y divide-gray-100">
          {incidents.map((i) => (
            <li key={i.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{i.title}</p>
                <p className="text-xs text-gray-500">{i.id} • {i.region}</p>
              </div>
              <Badge variant={sevBadge(i.severity)}>{i.severity}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
