import React, { useState } from "react";
import Card, { CardContent, CardHeader } from "../ui/Card";
import Button from "../ui/Button";

/**
 * AlertPanel with dummy high-priority alerts.
 */
// PUBLIC_INTERFACE
export default function AlertPanel() {
  /** This is a public function component. */
  const [alerts, setAlerts] = useState([
    { id: 1, text: "Severe weather alert in North region", level: "danger" },
    { id: 2, text: "Maintenance window at 23:00", level: "warning" },
  ]);

  const dismiss = (id) => setAlerts((a) => a.filter((x) => x.id !== id));

  const style = (lvl) =>
    lvl === "danger"
      ? "bg-red-50 text-red-800 border-red-200"
      : "bg-amber-50 text-amber-900 border-amber-200";

  return (
    <Card>
      <CardHeader title="Alerts" subtitle="System notices and advisories" />
      <CardContent>
        <div className="space-y-2">
          {alerts.map((a) => (
            <div key={a.id} className={`border rounded-md px-3 py-2 flex items-start justify-between ${style(a.level)}`}>
              <p className="text-sm">{a.text}</p>
              <Button variant="ghost" size="sm" onClick={() => dismiss(a.id)}>Dismiss</Button>
            </div>
          ))}
          {alerts.length === 0 && <p className="text-sm text-gray-500">No active alerts.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
