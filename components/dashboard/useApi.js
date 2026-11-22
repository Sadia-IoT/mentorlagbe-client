"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

/**
 * Small data hook for dashboard pages.
 * `path` may be null to skip loading (e.g. waiting for a role).
 */
export function useApi(path, { enabled = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(path) && enabled);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!path || !enabled) return;
    setLoading(true);
    try {
      const result = await apiFetch(path);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [path, enabled]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load, setData };
}
