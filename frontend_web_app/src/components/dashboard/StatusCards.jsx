import React from "react";
import Card, { CardContent } from "../ui/Card";
import Badge from "../ui/Badge";

/**
 * Dashboard StatusCards: quick glance KPIs.
 */
// PUBLIC_INTERFACE
export default function StatusCards() {
  /** This is a public function component. */
  const items = [
    { label: "Open Incidents", value: "5", badge: { text: "Today +2", variant: "warning" } },
    { label: "Registrations", value: "12", badge: { text: "Today", variant: "info" } },
    { label: "Renewals", value: "8", badge: { text: "Today", variant: "success" } },
  ];
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((it) => (
        <Card key={it.label}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{it.label}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{it.value}</p>
              </div>
              <Badge variant={it.badge.variant}>{it.badge.text}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
