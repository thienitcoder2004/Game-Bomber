import { GAME_CONFIG } from "../config/gameConfig";
import { clearAuthStorage, getStoredToken } from "../utils/storage";

const API_BASE = GAME_CONFIG.network.apiBaseUrl;

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  useAuth: boolean = false,
): Promise<T> {
  const headers = new Headers(options?.headers ?? {});
  headers.set("Content-Type", "application/json");

  const isNgrok = API_BASE.includes("ngrok");
  if (isNgrok && GAME_CONFIG.network.ngrokSkipBrowserWarningHeaderValue) {
    headers.set(
      "ngrok-skip-browser-warning",
      GAME_CONFIG.network.ngrokSkipBrowserWarningHeaderValue,
    );
  }

  if (useAuth) {
    const token = getStoredToken();

    if (!token) {
      throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
    }

    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      clearAuthStorage();
    }

    throw new Error(data?.message ?? "Có lỗi xảy ra");
  }

  return data as T;
}