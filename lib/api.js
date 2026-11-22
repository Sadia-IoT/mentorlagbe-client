import { authClient } from "@/lib/auth-client";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

/**
 * Call the Express backend from a client component.
 * Adds the Better Auth JWT as "Authorization: Bearer <token>" when logged in.
 */
export async function apiFetch(path, options = {}) {
  let token;
  try {
    const { data } = await authClient.token();
    token = data?.token;
  } catch {
    token = undefined;
  }

  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      body.message || `Request failed with status ${response.status}`
    );
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return body;
}

export { API_URL };
