import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { apiLogin, apiLogout, apiRefreshToken } from "../utils/authApi";

const AuthContext = createContext(null);

const STORAGE_KEY = "ngo_cms_auth"; // { access, refresh, user }
const INACTIVITY_LIMIT_MS = 15 * 60 * 1000; // auto-logout after 15 minutes idle

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth); // { access, refresh, user } | null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inactivityTimer = useRef(null);

  const persist = useCallback((next) => {
    setAuth(next);
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const logout = useCallback(async () => {
    try {
      if (auth) await apiLogout({ access: auth.access, refresh: auth.refresh });
    } finally {
      persist(null);
    }
  }, [persist, auth]);

  // Inactivity auto-logout: any user interaction resets the timer.
  useEffect(() => {
    if (!auth) return undefined;

    function resetTimer() {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        logout();
      }, INACTIVITY_LIMIT_MS);
    }

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [auth, logout]);

  // Periodically refresh the access token while a session is active.
  useEffect(() => {
    if (!auth) return undefined;
    const interval = setInterval(async () => {
      try {
        const { access } = await apiRefreshToken({ refresh: auth.refresh });
        persist({ ...auth, access });
      } catch {
        logout();
      }
    }, 10 * 60 * 1000); // refresh every 10 minutes
    return () => clearInterval(interval);
  }, [auth, persist, logout]);

  const login = useCallback(
    async ({ email, password }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiLogin({ email, password });
        persist({ access: result.access, refresh: result.refresh, user: result.user });
        return result.user;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [persist]
  );

  const value = useMemo(
    () => ({
      user: auth?.user ?? null,
      isAuthenticated: Boolean(auth?.user),
      role: auth?.user?.role ?? null,
      accessToken: auth?.access ?? null,
      loading,
      error,
      login,
      logout,
      clearError: () => setError(null),
    }),
    [auth, loading, error, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
