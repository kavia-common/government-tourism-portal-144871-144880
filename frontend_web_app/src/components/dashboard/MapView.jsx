import React from "react";
import Card, { CardContent } from "../ui/Card";

/**
 * MapView placeholder centered pane.
 */
// PUBLIC_INTERFACE
export default function MapView() {
  /** This is a public function component. */
  return (
    <Card>
      <CardContent>
        <div className="h-64 w-full rounded-md gradient-ocean flex items-center justify-center text-gray-600">
          [Map placeholder]
        </div>
      </CardContent>
    </Card>
  );
}
