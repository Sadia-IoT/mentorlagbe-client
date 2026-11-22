import {
  Bookmark,
  LayoutDashboard,
  ListChecks,
  PenLine,
  Receipt,
  Send,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

export const dashboardNav = {
  student: [
    { href: "/dashboard/student", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/student/my-applications", label: "My Applications", icon: Send },
    { href: "/dashboard/student/saved", label: "Saved Tuitions", icon: Bookmark },
    { href: "/dashboard/profile", label: "Update Profile", icon: UserRound },
  ],
  tutor: [
    { href: "/dashboard/tutor", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/tutor/post-tuition", label: "Post a Tuition", icon: PenLine },
    { href: "/dashboard/tutor/my-tuitions", label: "My Tuitions", icon: ListChecks },
    { href: "/dashboard/tutor/applicants", label: "Applicants", icon: Users },
    { href: "/dashboard/profile", label: "Update Profile", icon: UserRound },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "User Management", icon: Users },
    { href: "/dashboard/admin/tuitions", label: "Tuition Approval", icon: ShieldCheck },
    { href: "/dashboard/admin/transactions", label: "Transactions", icon: Receipt },
    { href: "/dashboard/profile", label: "Update Profile", icon: UserRound },
  ],
};

export const roleHome = {
  student: "/dashboard/student",
  tutor: "/dashboard/tutor",
  admin: "/dashboard/admin",
};
