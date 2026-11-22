import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata = { title: "Dashboard" };

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/sign-in?redirect=/dashboard");
  }

  const cookieStore = await cookies();
  const initialCollapsed = cookieStore.get("ml-sidebar")?.value === "collapsed";

  return (
    <DashboardShell user={session.user} initialCollapsed={initialCollapsed}>
      {children}
    </DashboardShell>
  );
}
