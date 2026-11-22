import { authClient } from "@/lib/auth-client";

/**
 * Call the Express backend from a client component.
 * Adds the Better Auth JWT as "Authorization: Bearer <token>" when logged in.
 */
export async function apiFetch(path, options = {}) {
  const { data } = await authClient.token();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(data?.token ? { Authorization: `Bearer ${data.token}` } : {}),
      ...options.headers,
    },
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || "Request failed");
  return body;
}