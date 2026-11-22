"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { PUBLIC_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Avatar from "./Avatar";
import { buttonClasses } from "@/components/ui/Button";
import { RoleBadge } from "@/components/ui/Badge";

const roleHome = {
  student: "/dashboard/student",
  tutor: "/dashboard/tutor",
  admin: "/dashboard/admin",
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  const user = session?.user;

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("Signed out");
    setMenuOpen(false);
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="container-ml flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {PUBLIC_NAV.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:text-fg",
                  active && "bg-surface-2 text-fg"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:grid" />

          {isPending ? (
            <div className="h-9 w-28 animate-pulse rounded-full bg-surface-2" />
          ) : user ? (
            <>
              <Link
                href={roleHome[user.role] || "/dashboard"}
                className={buttonClasses({
                  variant: "outline",
                  size: "sm",
                  className: "hidden md:inline-flex",
                })}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-2.5 transition hover:border-brand/40"
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                >
                  <Avatar user={user} size={32} />
                  <span className="hidden text-left leading-tight sm:block">
                    <span className="block max-w-[110px] truncate text-[13px] font-semibold">
                      {user.name}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1">
                      <RoleBadge role={user.role} />
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-muted transition",
                      menuOpen && "rotate-180"
                    )}
                  />
                </button>

                {menuOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-line bg-surface shadow-xl"
                  >
                    <div className="border-b border-line px-4 py-3">
                      <p className="truncate text-sm font-semibold">{user.name}</p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <RoleBadge role={user.role} />
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                            user.plan === "pro"
                              ? "border-accent/40 bg-accent-soft text-[#8a5a09] dark:text-accent"
                              : "border-line bg-surface-2 text-muted"
                          )}
                        >
                          {user.plan === "pro" ? "Pro" : "Free"} plan
                        </span>
                      </div>
                    </div>

                    <div className="p-1.5">
                      <Link
                        href={roleHome[user.role] || "/dashboard"}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-surface-2"
                      >
                        <LayoutDashboard className="h-4 w-4 text-muted" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-surface-2"
                      >
                        <Settings className="h-4 w-4 text-muted" />
                        Update profile
                      </Link>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-danger transition hover:bg-danger-soft"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={buttonClasses({ variant: "ghost", size: "sm" })}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className={buttonClasses({ variant: "primary", size: "sm" })}
              >
                Sign Up
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-fg lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[84%] max-w-sm flex-col bg-surface p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <Logo onClick={() => setMobileOpen(false)} />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              {PUBLIC_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-2.5 font-display text-xl text-fg transition hover:bg-surface-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-2 border-t border-line pt-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Theme
                </span>
                <ThemeToggle />
              </div>

              {user ? (
                <>
                  <div className="mb-3 flex items-center gap-3 rounded-xl bg-surface-2 p-3">
                    <Avatar user={user} size={40} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{user.name}</p>
                      <RoleBadge role={user.role} />
                    </div>
                  </div>
                  <Link
                    href={roleHome[user.role] || "/dashboard"}
                    className={buttonClasses({ variant: "primary", className: "w-full" })}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className={buttonClasses({ variant: "outline", className: "w-full" })}
                  >
                    Update profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className={buttonClasses({
                      variant: "ghost",
                      className: "w-full text-danger",
                    })}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className={buttonClasses({ variant: "outline", className: "w-full" })}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className={buttonClasses({ variant: "primary", className: "w-full" })}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
