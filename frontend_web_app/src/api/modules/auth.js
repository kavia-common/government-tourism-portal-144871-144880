import { post, apiFetch, setTokens, clearTokens } from "../client";

// PUBLIC_INTERFACE
export async function loginAgent({ username, password }) {
  /** Login as Agent and store tokens. */
  const res = await post("/auth/agent/login", { username, password }, { auth: false });
  if (res.ok) {
    // Accept flexible token shapes; fallback to data.token
    const { accessToken, refreshToken, token } = res.data || {};
    if (accessToken || token) {
      setTokens({
        accessToken: accessToken || token,
        refreshToken: refreshToken || null,
      });
    }
  }
  return res;
}

// PUBLIC_INTERFACE
export async function loginAdmin({ username, password }) {
  /** Login as Admin and store tokens. */
  const res = await post("/auth/admin/login", { username, password }, { auth: false });
  if (res.ok) {
    const { accessToken, refreshToken, token } = res.data || {};
    if (accessToken || token) {
      setTokens({
        accessToken: accessToken || token,
        refreshToken: refreshToken || null,
      });
    }
  }
  return res;
}

// PUBLIC_INTERFACE
export async function refresh(refreshToken) {
  /** Manually refresh a token if needed. */
  return await post("/auth/refresh", { refreshToken }, { auth: false });
}

// PUBLIC_INTERFACE
export async function logout() {
  /** Logout the current user and clear tokens. */
  try {
    await apiFetch("/auth/logout", { method: "POST" });
  } finally {
    clearTokens();
  }
}
