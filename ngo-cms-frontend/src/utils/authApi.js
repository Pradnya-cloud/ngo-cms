// Real calls to the Django backend's auth endpoints. Response shapes match
// what AuthContext.jsx expects, so that file didn't need to change.

import { api } from "./apiClient";

export async function apiLogin({ email, password }) {
  // POST /api/auth/login/  { email, password } -> { access, refresh, user }
  const result = await api.post("/auth/login/", { email, password });
  return {
    ...result,
    user: {
      id: result.user.id,
      name: result.user.full_name,
      email: result.user.email,
      role: result.user.role,
    },
  };
}

export async function apiRegister({ name, email, password }) {
  // POST /api/auth/register/  { full_name, email, password } -> { message }
  return api.post("/auth/register/", { full_name: name, email, password });
}

export async function apiForgotPassword({ email }) {
  // POST /api/auth/forgot-password/  { email } -> { message }
  return api.post("/auth/forgot-password/", { email });
}

export async function apiResetPassword({ token, password }) {
  // POST /api/auth/reset-password/<token>/  { password } -> { message }
  return api.post(`/auth/reset-password/${token}/`, { password });
}

export async function apiRefreshToken({ refresh }) {
  // POST /api/auth/refresh/  { refresh } -> { access }
  return api.post("/auth/refresh/", { refresh });
}

export async function apiLogout({ access, refresh }) {
  // POST /api/auth/logout/  { refresh } (Authorization: Bearer <access>) -> blacklists the token
  return api.post("/auth/logout/", { refresh }, { accessToken: access });
}
