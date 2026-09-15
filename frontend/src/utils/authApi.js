import { api } from "./apiClient";

export async function apiLogin({ email, password }) {
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

export async function apiRegister({ name, email, password, role }) {
  return api.post("/auth/register/", { full_name: name, email, password, role });
}

export async function apiForgotPassword({ email }) {
  return api.post("/auth/forgot-password/", { email });
}

export async function apiResetPassword({ token, password }) {
  return api.post(`/auth/reset-password/${token}/`, { password });
}

export async function apiRefreshToken({ refresh }) {
  return api.post("/auth/refresh/", { refresh });
}

export async function apiLogout({ access, refresh }) {
  return api.post("/auth/logout/", { refresh }, { accessToken: access });
}