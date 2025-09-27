import { get, post } from "../client";

// PUBLIC_INTERFACE
export async function listTourists() {
  /** List all tourists (auth required). */
  return await get("/tourists");
}

// PUBLIC_INTERFACE
export async function createTourist(payload) {
  /** Create a new tourist (auth required). */
  return await post("/tourists", payload);
}

// PUBLIC_INTERFACE
export async function getTourist(id) {
  /** Get a tourist by ID (auth required). */
  return await get(`/tourists/${encodeURIComponent(id)}`);
}

// PUBLIC_INTERFACE
export async function renewTourist(id, extraDays) {
  /** Renew tourist validity (auth required). */
  const body = typeof extraDays === "number" ? { extraDays } : {};
  return await post(`/tourists/${encodeURIComponent(id)}/renew`, body);
}
