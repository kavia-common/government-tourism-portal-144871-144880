import { get, post, put, del } from "../client";

// PUBLIC_INTERFACE
export async function listIncidents({ region, status } = {}) {
  /** List incidents, optionally filtered by region and status. */
  const qs = new URLSearchParams();
  if (region) qs.set("region", region);
  if (status) qs.set("status", status);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return await get(`/incidents${suffix}`);
}

// PUBLIC_INTERFACE
export async function createIncident(payload) {
  /** Create incident record. */
  return await post("/incidents", payload);
}

// PUBLIC_INTERFACE
export async function getIncident(id) {
  /** Get incident by id. */
  return await get(`/incidents/${encodeURIComponent(id)}`);
}

// PUBLIC_INTERFACE
export async function updateIncident(id, payload) {
  /** Update incident by id. */
  return await put(`/incidents/${encodeURIComponent(id)}`, payload);
}

// PUBLIC_INTERFACE
export async function deleteIncident(id) {
  /** Delete incident by id. */
  return await del(`/incidents/${encodeURIComponent(id)}`);
}
