// Thin fetch wrapper shared by every real API call in the app.
// Base URL comes from VITE_API_BASE_URL (see .env.example) so it's easy
// to point at a deployed backend later without touching any call site.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request(path, { method = "GET", body, accessToken } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    // DRF error shapes vary: {detail: "..."} or {field: ["msg"]} — flatten
    // into one readable string for the UI to show directly.
    const message =
      data?.detail ||
      (data && typeof data === "object" ? Object.values(data).flat().join(" ") : null) ||
      `Request failed (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  patch: (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};

export { ApiError };
