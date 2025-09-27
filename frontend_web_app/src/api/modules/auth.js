import { post, apiFetch, setTokens, clearTokens } from "../client";

/** internal helper to persist tokens from response in a flexible format */
function persistTokensFromResponse(res) {
  const { accessToken, refreshToken, token } = res?.data || {};
  if (accessToken || token) {
    setTokens({
      accessToken: accessToken || token,
      refreshToken: refreshToken || null,
    });
  }
}

// PUBLIC_INTERFACE
export async function loginAgent({ username, password }) {
  /** Login as Agent and store tokens. */
  const res = await post("/auth/agent/login", { username, password }, { auth: false });
  if (res.ok) persistTokensFromResponse(res);
  return res;
}

// PUBLIC_INTERFACE
export async function loginAdmin({ username, password }) {
  /** Login as Admin and store tokens. */
  const res = await post("/auth/admin/login", { username, password }, { auth: false });
  if (res.ok) persistTokensFromResponse(res);
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
