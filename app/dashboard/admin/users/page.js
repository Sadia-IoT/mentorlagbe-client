"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Search, ShieldCheck, Users } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import { apiFetch } from "@/lib/api";
import { TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Badge, { RoleBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Avatar from "@/components/layout/Avatar";
import { Input, Select } from "@/components/ui/Field";
import { cn, formatDate, titleCase } from "@/lib/utils";

const ROLES = ["student", "tutor", "admin"];
const LIMIT = 10;

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState(null);

  const params = new URLSearchParams();
  if (query) params.set("search", query);
  if (role) params.set("role", role);
  params.set("page", String(page));
  params.set("limit", String(LIMIT));

  const { data, loading, error, reload } = useApi(`/users?${params.toString()}`);
  const users = data?.users || [];
  const totalPages = data?.totalPages || 0;

  useEffect(() => {
    setPage(1);
  }, [query, role]);

  function handleSearch(event) {
    event.preventDefault();
    setQuery(search.trim());
  }

  async function changeRole(user, nextRole) {
    setBusyId(user._id);
    try {
      await apiFetch(`/users/${user._id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: nextRole }),
      });
      toast.success(`${user.name} is now a ${nextRole}`);
      await reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="User management"
        title="Everyone on MentorLagbe"
        description="Search accounts, inspect plans and change roles when someone needs a different workspace."
      />

      <ErrorNote error={error} onRetry={reload} />

      <form
        onSubmit={handleSearch}
        className="mb-5 grid gap-3 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-[1fr_180px_auto]"
      >
        <label className="relative">
          <span className="sr-only">Search users</span>
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email…"
            className="pl-10"
          />
        </label>
        <label>
          <span className="sr-only">Role</span>
          <Select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="">All roles</option>
            {ROLES.map((item) => (
              <option key={item} value={item}>
                {titleCase(item)}
              </option>
            ))}
          </Select>
        </label>
        <Button type="submit">Search</Button>
      </form>

      {loading ? (
        <TableSkeleton rows={6} />
      ) : users.length ? (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-2 text-[10px] uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Account</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Plan</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Joined</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Change role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t border-line">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar user={user} size={34} />
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{user.name}</p>
                          <p className="truncate text-xs text-muted">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={user.plan === "pro" ? "warning" : "neutral"}>
                        {user.plan === "pro" ? "Pro" : "Free"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {user.phone || "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        {ROLES.filter((item) => item !== user.role).map((item) => (
                          <Button
                            key={item}
                            size="sm"
                            variant="outline"
                            onClick={() => changeRole(user, item)}
                            disabled={busyId === user._id}
                            className="px-2.5 text-[11px]"
                          >
                            {titleCase(item)}
                          </Button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 lg:hidden">
            {users.map((user) => (
              <article
                key={user._id}
                className="rounded-2xl border border-line bg-surface p-4"
              >
                <div className="flex items-start gap-3">
                  <Avatar user={user} size={40} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <RoleBadge role={user.role} />
                      <Badge tone={user.plan === "pro" ? "warning" : "neutral"}>
                        {user.plan === "pro" ? "Pro" : "Free"}
                      </Badge>
                      <span className="text-[11px] text-muted">
                        Joined {formatDate(user.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-dashed border-line pt-3">
                  {ROLES.filter((item) => item !== user.role).map((item) => (
                    <Button
                      key={item}
                      size="sm"
                      variant="outline"
                      onClick={() => changeRole(user, item)}
                      disabled={busyId === user._id}
                      className="text-[11px]"
                    >
                      Make {titleCase(item)}
                    </Button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={Users}
          title="No accounts match"
          description="Try a different search term or clear the role filter."
        />
      )}

      {totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-3 text-xs text-muted">
          <span>
            Page {page} of {totalPages} · {data?.total || 0} accounts
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage((value) => Math.max(value - 1, 1))}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage((value) => Math.min(value + 1, totalPages))}
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <p className="mt-6 flex items-center gap-1.5 text-xs text-muted">
          <ShieldCheck className="h-3.5 w-3.5" />
          {data?.total || 0} account{data?.total === 1 ? "" : "s"} found
        </p>
      )}
    </div>
  );
}
