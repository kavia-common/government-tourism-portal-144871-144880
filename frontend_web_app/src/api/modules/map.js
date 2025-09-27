import { get } from "../client";

// PUBLIC_INTERFACE
export async function getRegions() {
  /** Retrieve regions data for map. */
  return await get("/map/regions", { auth: false });
}

// PUBLIC_INTERFACE
export async function getIncidentAggregations() {
  /** Retrieve aggregated incident counts for regions. */
  return await get("/map/incidents", { auth: false });
}
