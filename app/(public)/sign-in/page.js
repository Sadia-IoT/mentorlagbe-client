import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";

export const metadata = { title: "Sign In" };

function safeRedirect(value) {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/dashboard";
}

export default async function SignInPage({ searchParams }) {
  const sp = (await searchParams) || {};

  return (
    <AuthShell>
      <SignInForm redirect={safeRedirect(sp.redirect)} />
    </AuthShell>
  );
}
