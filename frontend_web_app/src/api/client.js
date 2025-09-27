//
// Lightweight fetch client with auth, refresh, and JSON handling
//

/**
 * Token storage with in-memory cache and localStorage persistence.
 */
const TOKEN_STORAGE_KEY = "gtp_tokens_v1";

// Simple in-memory cache to reduce localStorage reads
let memoryTokens = null;

// PUBLIC_INTERFACE
export function getTokens() {
  /** Retrieve current tokens from memory or localStorage. */
  if (memoryTokens) return memoryTokens;
  try {
    const raw = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!raw) return null;
    memoryTokens = JSON.parse(raw);
    return memoryTokens;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function setTokens(tokens) {
  /** Persist tokens to memory and localStorage. */
  memoryTokens = tokens;
  if (!tokens) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    return;
  }
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
}

// PUBLIC_INTERFACE
export function clearTokens() {
  /** Clear all tokens (logout). */
  memoryTokens = null;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

/**
 * Base URL from environment
 * IMPORTANT: Ensure REACT_APP_API_BASE_URL is set in the environment (.env)
 */
const API_BASE = process.env.REACT_APP_API_BASE_URL || "";

/**
 * Internal: builds headers with Authorization if access token exists.
 */
function buildHeaders(extra = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...extra,
  };
  const tokens = getTokens();
  if (tokens?.accessToken) {
    headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return headers;
}

/**
 * Internal: Attempt token refresh using refresh token.
 */
async function tryRefreshToken() {
  const tokens = getTokens();
  if (!tokens?.refreshToken) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: tokens.refreshToken }),
    });
    if (!res.ok) return false;
    const data = await safeJson(res);
    // Expecting { accessToken, refreshToken? }
    if (data?.accessToken) {
      setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken || tokens.refreshToken,
      });
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Safe JSON parse from Response.
 */
async function safeJson(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Core request function with automatic refresh retry on 401.
 * - Automatically stringifies JSON body and parses JSON response
 * - Returns { ok, status, data } or throws when network error occurs
 */
// PUBLIC_INTERFACE
export async function apiFetch(path, { method = "GET", headers = {}, body = undefined, auth = true } = {}) {
  /** Perform a fetch to the backend with optional auth and retry on 401 via refresh. */
  const url = `${API_BASE}${path}`;
  const init = {
    method,
    headers: auth ? buildHeaders(headers) : { "Content-Type": "application/json", ...headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };

  let res = await fetch(url, init);

  // If unauthorized and we have refresh token, try to refresh and retry once
  if (res.status === 401 && auth) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      const retryInit = {
        ...init,
        headers: buildHeaders(headers),
      };
      res = await fetch(url, retryInit);
    } else {
      // If refresh failed, clear tokens
      clearTokens();
    }
  }

  const data = await safeJson(res);
  return { ok: res.ok, status: res.status, data };
}

// Convenience helpers
// PUBLIC_INTERFACE
export function get(path, options = {}) {
  /** GET request helper. */
  return apiFetch(path, { ...options, method: "GET" });
}

// PUBLIC_INTERFACE
export function post(path, body, options = {}) {
  /** POST request helper. */
  return apiFetch(path, { ...options, method: "POST", body });
}

// PUBLIC_INTERFACE
export function put(path, body, options = {}) {
  /** PUT request helper. */
  return apiFetch(path, { ...options, method: "PUT", body });
}

// PUBLIC_INTERFACE
export function del(path, options = {}) {
  /** DELETE request helper. */
  return apiFetch(path, { ...options, method: "DELETE" });
}
