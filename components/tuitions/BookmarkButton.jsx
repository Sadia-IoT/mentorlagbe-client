"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import Button from "@/components/ui/Button";

export default function BookmarkButton({ tuitionId }) {
  const { data: session } = authClient.useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const user = session?.user;

  useEffect(() => {
    let active = true;

    async function check() {
      if (!user || user.role !== "student") {
        setReady(true);
        return;
      }
      try {
        const items = await apiFetch("/users/me/bookmarks");
        if (!active) return;
        setSaved(
          (items || []).some((item) => String(item._id) === String(tuitionId))
        );
      } catch {
        /* ignore — button still works */
      } finally {
        if (active) setReady(true);
      }
    }

    check();
    return () => {
      active = false;
    };
  }, [user?.email, user?.role, tuitionId]);

  if (!user || user.role !== "student") return null;

  async function toggle() {
    setLoading(true);
    try {
      const result = await apiFetch(`/users/me/bookmarks/${tuitionId}`, {
        method: "POST",
      });
      setSaved(result.saved);
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={toggle}
      disabled={loading || !ready}
      aria-pressed={saved}
    >
      {saved ? (
        <>
          <BookmarkCheck className="h-4 w-4 text-brand" />
          Saved to your list
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" />
          Save for later
        </>
      )}
    </Button>
  );
}
