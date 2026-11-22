"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import Button, { buttonClasses } from "@/components/ui/Button";

export default function SubscribeButton({ role, price }) {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  if (isPending) {
    return <div className="h-12 w-full animate-pulse rounded-full bg-white/15" />;
  }

  const user = session?.user;

  if (!user) {
    return (
      <Link
        href="/sign-in?redirect=/pricing"
        className={buttonClasses({ variant: "accent", className: "w-full" })}
      >
        Sign in to upgrade
      </Link>
    );
  }

  if (user.role === "admin") {
    return (
      <Button disabled variant="outline" className="w-full">
        Admins do not need Pro
      </Button>
    );
  }

  if (user.role !== role) {
    return (
      <Button disabled variant="outline" className="w-full">
        Only for {role}s
      </Button>
    );
  }

  if (user.plan === "pro") {
    return (
      <Button disabled variant="subtle" className="w-full">
        <Sparkles className="h-4 w-4" />
        You are on Pro
      </Button>
    );
  }

  async function handleCheckout() {
    setLoading(true);
    try {
      const result = await apiFetch("/payments/checkout", { method: "POST" });
      if (result?.url) {
        window.location.href = result.url;
        return;
      }
      toast.error("Stripe did not return a checkout URL");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="accent"
      className="w-full"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Opening Stripe…" : `Upgrade for $${price}`}
    </Button>
  );
}
