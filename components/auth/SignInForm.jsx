"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";

const demoAccounts = [
  { label: "Admin", email: "admin@mentorlagbe.com", password: "Admin@1234" },
  { label: "Tutor", email: "tutor1@mentorlagbe.dev", password: "Tutor@1234" },
  { label: "Student", email: "student1@mentorlagbe.dev", password: "Student@1234" },
];

export default function SignInForm({ redirect = "/dashboard" }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Enter a valid email address");
    if (!password) return toast.error("Password is required");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "Invalid email or password");

    toast.success("Signed in successfully");
    router.push(redirect);
    router.refresh();
  }

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
        Welcome back
      </p>
      <h1 className="mt-3 text-[32px] leading-tight">Sign in to your desk</h1>
      <p className="mt-2 text-sm text-muted">
        New to MentorLagbe?{" "}
        <Link href="/sign-up" className="font-semibold text-brand hover:underline">
          Create an account
        </Link>
      </p>

      {session?.user ? (
        <div className="mt-5 rounded-2xl border border-brand/25 bg-brand-soft p-4 text-sm">
          <p className="font-semibold text-brand">
            You are already signed in as {session.user.name}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/dashboard" className="text-xs font-semibold text-brand underline">
              Continue to dashboard
            </Link>
            <button
              type="button"
              onClick={async () => {
                await authClient.signOut();
                toast.success("Signed out");
                router.refresh();
              }}
              className="text-xs font-semibold text-muted underline"
            >
              Use another account
            </button>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <Field label="Email" required htmlFor="email">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </Field>

        <Field label="Password" required htmlFor="password">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </Field>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          <LogIn className="h-4 w-4" />
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface-2 p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          Demo accounts
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {demoAccounts.map((account) => (
            <button
              key={account.label}
              type="button"
              onClick={() => {
                setEmail(account.email);
                setPassword(account.password);
                toast.success(`${account.label} credentials filled`);
              }}
              className="rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-semibold text-fg transition hover:border-brand/40 hover:text-brand"
            >
              {account.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-muted">
          Click a role to fill its credentials, then press Sign in.
        </p>
      </div>
    </div>
  );
}
