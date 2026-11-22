"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    const role = String(form.get("role"));

    if (!name) return toast.error("Full name is required");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Enter a valid email");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password, role });
    setLoading(false);

    if (error) return toast.error(error.message || "Sign up failed");

    toast.success("Account created");
    router.push("/");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-2xl font-bold">Create your account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full name" className="w-full rounded border p-2" />
        <input name="email" type="email" placeholder="Email" className="w-full rounded border p-2" />
        <input name="password" type="password" placeholder="Password (min 6 characters)" className="w-full rounded border p-2" />

        <select name="role" defaultValue="student" className="w-full rounded border p-2">
          <option value="student">I am a Student</option>
          <option value="tutor">I am a Tutor</option>
        </select>

        <button disabled={loading} className="w-full rounded bg-black p-2 text-white disabled:opacity-60">
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account? <Link href="/sign-in" className="underline">Sign In</Link>
      </p>
    </main>
  );
}