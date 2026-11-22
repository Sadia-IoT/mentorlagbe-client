"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Theme is applied by an inline script in the root layout before hydration.
 * Rendering both icons and letting CSS choose one keeps the server and client
 * markup identical (no hydration mismatch, no state-sync effect).
 */
export default function ThemeToggle({ className }) {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("ml-theme", isDark ? "dark" : "light");
    } catch {
      /* storage may be blocked — the theme still applies for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle theme"
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition hover:border-brand/40 hover:text-fg",
        className
      )}
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="h-4 w-4 dark:hidden" />
    </button>
  );
}
