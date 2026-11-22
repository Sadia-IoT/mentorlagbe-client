import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DashboardIndexPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role;

  if (role === "admin") redirect("/dashboard/admin");
  if (role === "tutor") redirect("/dashboard/tutor");
  redirect("/dashboard/student");
}
