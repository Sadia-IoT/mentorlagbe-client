"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

/**
 * Small data hook for dashboard pages.
 * `path` may be null to skip loading (e.g. waiting for a role).
 *
 * Loading is derived from the last resolved path, so switching filters shows
 * the skeleton immediately without calling setState synchronously in an effect.
 */
export function useApi(path, { enabled = true } = {}) {
  const [state, setState] = useState({ path: null, data: null, error: null });

  useEffect(() => {
    if (!path || !enabled) return undefined;
    let active = true;

    apiFetch(path)
      .then((result) => {
        if (active) setState({ path, data: result, error: null });
      })
      .catch((err) => {
        if (active) setState({ path, data: null, error: err });
      });

    return () => {
      active = false;
    };
  }, [path, enabled]);

  const reload = useCallback(async () => {
    if (!path || !enabled) return null;
    try {
      const result = await apiFetch(path);
      setState({ path, data: result, error: null });
      return result;
    } catch (err) {
      setState({ path, data: null, error: err });
      return null;
    }
  }, [path, enabled]);

  const ready = state.path === path;

  return {
    data: ready ? state.data : null,
    loading: Boolean(path) && enabled && !ready,
    error: ready ? state.error : null,
    reload,
  };
}
