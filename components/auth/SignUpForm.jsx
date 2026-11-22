"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { GraduationCap, Presentation } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

const roles = [
  {
    value: "student",
    title: "I am a student",
    description: "Find batches and apply for guidance.",
    icon: GraduationCap,
  },
  {
    value: "tutor",
    title: "I am a tutor",
    description: "Publish tuitions and manage applicants.",
    icon: Presentation,
  },
];

export default function SignUpForm({ defaultRole = "student", redirect = "/dashboard" }) {
  const router = useRouter();
  const [role, setRole] = useState(defaultRole === "tutor" ? "tutor" : "student");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (name.length < 2) return toast.error("Please enter your full name");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Enter a valid email address");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords do not match");

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
    });
    setLoading(false);

    if (error) return toast.error(error.message || "Sign up failed");

    toast.success("Account created — welcome to MentorLagbe!");
    router.push(redirect);
    router.refresh();
  }

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
        Create account
      </p>
      <h1 className="mt-3 text-[32px] leading-tight">Start with the right role</h1>
      <p className="mt-2 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-brand hover:underline">
          Sign in
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {roles.map((item) => (
            <label
              key={item.value}
              className={cn(
                "cursor-pointer rounded-2xl border p-4 transition",
                role === item.value
                  ? "border-brand bg-brand-soft ring-2 ring-brand/20"
                  : "border-line bg-surface hover:border-brand/40"
              )}
            >
              <input
                type="radio"
                name="role"
                value={item.value}
                checked={role === item.value}
                onChange={() => setRole(item.value)}
                className="sr-only"
              />
              <item.icon
                className={cn(
                  "h-5 w-5",
                  role === item.value ? "text-brand" : "text-muted"
                )}
              />
              <p className="mt-2 text-sm font-semibold">{item.title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted">
                {item.description}
              </p>
            </label>
          ))}
        </div>

        <Field label="Full name" required htmlFor="name">
          <Input id="name" name="name" placeholder="e.g. Ayesha Siddiqua" autoComplete="name" required />
        </Field>

        <Field label="Email" required htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Password" required htmlFor="password" hint="At least 6 characters">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </Field>
          <Field label="Confirm password" required htmlFor="confirm">
            <Input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </Field>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Creating account…" : `Sign up as a ${role}`}
        </Button>

        <p className="text-center text-[11px] leading-relaxed text-muted">
          New accounts start on the free plan. You can upgrade to Pro later from
          your dashboard.
        </p>
      </form>
    </div>
  );
}
