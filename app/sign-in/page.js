"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Enter a valid email");
    if (!password) return toast.error("Password is required");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "Invalid email or password");

    toast.success("Signed in successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-2xl font-bold">Welcome back</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" className="w-full rounded border p-2" />
        <input name="password" type="password" placeholder="Password" className="w-full rounded border p-2" />

        <button disabled={loading} className="w-full rounded bg-black p-2 text-white disabled:opacity-60">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        New here? <Link href="/sign-up" className="underline">Create an account</Link>
      </p>
    </main>
  );
}