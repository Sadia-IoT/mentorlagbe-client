"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowUpRight,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { dashboardNav } from "@/lib/dashboard-nav";
import Logo from "@/components/layout/Logo";
import Avatar from "@/components/layout/Avatar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { RoleBadge } from "@/components/ui/Badge";
import { cn, titleCase } from "@/lib/utils";

function NavList({ items, pathname, collapsed = false }) {
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto p-3">
      {!collapsed ? (
        <p className="px-3 pb-1 pt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-muted/70">
          Workspace
        </p>
      ) : null}
      {items.map((item, index) => {
        const active =
          pathname === item.href ||
          (item.href !== items[0].href && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
              active
                ? "bg-brand-soft font-semibold text-brand"
                : "text-muted hover:bg-surface-2 hover:text-fg",
              collapsed && "justify-center px-0"
            )}
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            {!collapsed ? (
              <>
                <span className="flex-1">{item.label}</span>
                <span
                  className={cn(
                    "text-[10px] font-semibold tabular-nums",
                    active ? "text-brand/60" : "text-muted/50"
                  )}
                >
                  0{index + 1}
                </span>
              </>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function UserCard({ user }) {
  return (
    <div className="rounded-xl border border-line bg-surface-2 p-3">
      <div className="flex items-center gap-2.5">
        <Avatar user={user} size={34} />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold">{user.name}</p>
          <RoleBadge role={user.role} />
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            user.plan === "pro"
              ? "border-accent/40 bg-accent-soft text-[#8a5a09] dark:text-accent"
              : "border-line bg-surface text-muted"
          )}
        >
          {user.plan === "pro" ? "Pro" : "Free"} plan
        </span>
        {user.plan !== "pro" ? (
          <Link
            href="/pricing"
            className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-brand hover:underline"
          >
            <Sparkles className="h-3 w-3" />
            Upgrade
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default function DashboardShell({ user, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = dashboardNav[user.role] || dashboardNav.student;
  const activeItem =
    items.find((item) => pathname === item.href) ||
    items.find((item) => item.href !== items[0].href && pathname.startsWith(item.href)) ||
    items[0];

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("ml-sidebar") === "collapsed");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function toggleCollapse() {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem("ml-sidebar", next ? "collapsed" : "open");
    } catch {
      /* ignore */
    }
  }

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("Signed out");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-line bg-surface transition-[width] duration-200 lg:flex",
          collapsed ? "w-[76px]" : "w-[264px]"
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center border-b border-line",
            collapsed ? "justify-center px-2" : "justify-between px-4"
          )}
        >
          {collapsed ? (
            <Link href="/" aria-label="MentorLagbe home" className="grid h-9 w-9 place-items-center rounded-[11px] bg-brand text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M2.8 8.4 12 3.8l9.2 4.6L12 13 2.8 8.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M6.6 10.6v5.2c0 1.5 2.4 2.7 5.4 2.7s5.4-1.2 5.4-2.7v-5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Link>
          ) : (
            <Logo />
          )}
          {!collapsed ? (
            <button
              type="button"
              onClick={toggleCollapse}
              className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-fg"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <NavList items={items} pathname={pathname} collapsed={collapsed} />

        <div className="border-t border-line p-3">
          {collapsed ? (
            <button
              type="button"
              onClick={toggleCollapse}
              className="mb-2 grid h-9 w-full place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-fg"
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>
          ) : (
            <div className="mb-2">
              <UserCard user={user} />
            </div>
          )}

          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-muted transition hover:bg-surface-2 hover:text-fg",
              collapsed && "justify-center px-0"
            )}
          >
            <ArrowUpRight className="h-4 w-4" />
            {!collapsed ? "Back to site" : null}
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className={cn(
              "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-danger transition hover:bg-danger-soft",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed ? "Sign out" : null}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[86%] max-w-[300px] flex-col bg-surface shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted"
                aria-label="Close dashboard menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <NavList items={items} pathname={pathname} />
            <div className="border-t border-line p-3">
              <UserCard user={user} />
              <div className="mt-2 flex items-center justify-between">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 rounded-xl px-2 py-2 text-xs font-medium text-muted"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Back to site
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 rounded-xl px-2 py-2 text-xs font-medium text-danger"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      {/* Content */}
      <div
        className={cn(
          "flex min-h-screen flex-col transition-[padding] duration-200",
          collapsed ? "lg:pl-[76px]" : "lg:pl-[264px]"
        )}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-bg/85 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-fg lg:hidden"
              aria-label="Open dashboard menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                {titleCase(user.role)} workspace
              </p>
              <h1 className="font-display text-[17px] leading-tight">
                {activeItem?.label || "Overview"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/tuitions"
              className="hidden items-center gap-1 text-xs font-semibold text-muted transition hover:text-brand sm:inline-flex"
            >
              View site
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <ThemeToggle />
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-2.5 transition hover:border-brand/40"
            >
              <Avatar user={user} size={30} />
              <span className="hidden max-w-[110px] truncate text-[12px] font-semibold sm:block">
                {user.name}
              </span>
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>

        <footer className="border-t border-line px-4 py-4 text-center text-[11px] text-muted lg:px-8">
          MentorLagbe · {titleCase(user.role)} workspace · All changes save instantly
        </footer>
      </div>
    </div>
  );
}
