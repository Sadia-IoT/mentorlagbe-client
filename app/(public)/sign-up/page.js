import AuthShell from "@/components/auth/AuthShell";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata = { title: "Sign Up" };

function safeRedirect(value) {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/dashboard";
}

export default async function SignUpPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const role = sp.role === "tutor" ? "tutor" : "student";

  return (
    <AuthShell>
      <SignUpForm defaultRole={role} redirect={safeRedirect(sp.redirect)} />
    </AuthShell>
  );
}
