const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

/**
 * Server-side fetch helper for public pages.
 * Never throws: a cold/offline API renders an empty state instead of a 500 page.
 */
export async function getJson(path, fallback = null) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return fallback;
    return await response.json();
  } catch {
    return fallback;
  }
}

export { API_URL };
