"use client";

import { useEffect, useState } from "react";
import { CreditCard, Receipt, Search, Wallet } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ErrorNote from "@/components/dashboard/ErrorNote";
import { useApi } from "@/components/dashboard/useApi";
import { TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { formatDate, formatUSD, titleCase } from "@/lib/utils";

const LIMIT = 10;

export default function AdminTransactionsPage() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const params = new URLSearchParams();
  if (query) params.set("search", query);
  params.set("page", String(page));
  params.set("limit", String(LIMIT));

  const { data, loading, error, reload } = useApi(
    `/admin/transactions?${params.toString()}`
  );

  const transactions = data?.transactions || [];
  const totalPages = data?.totalPages || 0;

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div>
      <PageHeader
        eyebrow="Revenue ledger"
        title="Pro transactions"
        description="Every Stripe Checkout session that upgraded a student or tutor to Pro."
      />

      <ErrorNote error={error} onRetry={reload} />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            <Wallet className="h-3.5 w-3.5" />
            Total revenue
          </p>
          <p className="mt-2 font-display text-3xl">
            {formatUSD(data?.revenue || 0)}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            <Receipt className="h-3.5 w-3.5" />
            Records
          </p>
          <p className="mt-2 font-display text-3xl">{data?.total || 0}</p>
        </div>
        <div className="rounded-2xl border border-brand/25 bg-brand-soft p-5">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
            <CreditCard className="h-3.5 w-3.5" />
            Gateway
          </p>
          <p className="mt-2 font-display text-3xl text-brand">Stripe</p>
          <p className="mt-1 text-[11px] text-brand/80">
            Test mode · USD checkout
          </p>
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setQuery(search.trim());
        }}
        className="mb-5 flex gap-2"
      >
        <label className="relative flex-1">
          <span className="sr-only">Search transactions</span>
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by user, email, plan or transaction id…"
            className="pl-10"
          />
        </label>
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      {loading ? (
        <TableSkeleton rows={6} />
      ) : transactions.length ? (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-2 text-[10px] uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold">Plan</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Transaction</th>
                  <th className="px-4 py-3 font-semibold">Paid</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item._id} className="border-t border-line">
                    <td className="px-4 py-3">
                      <p className="font-semibold">{item.userName}</p>
                      <p className="text-xs text-muted">{item.userEmail}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm">{item.planName}</p>
                      <p className="text-[11px] capitalize text-muted">
                        {titleCase(item.role || "")}
                      </p>
                    </td>
                    <td className="px-4 py-3 font-display text-base">
                      {formatUSD(item.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        tone={item.paymentStatus === "paid" ? "success" : "warning"}
                      >
                        {titleCase(item.paymentStatus || "pending")}
                      </Badge>
                    </td>
                    <td className="max-w-[220px] px-4 py-3">
                      <p className="truncate font-mono text-[11px] text-muted">
                        {item.transactionId || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {formatDate(item.paidAt || item.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 lg:hidden">
            {transactions.map((item) => (
              <article
                key={item._id}
                className="rounded-2xl border border-line bg-surface p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{item.userName}</p>
                    <p className="truncate text-xs text-muted">{item.userEmail}</p>
                  </div>
                  <p className="font-display text-lg">{formatUSD(item.amount)}</p>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <Badge tone="neutral">{item.planName}</Badge>
                  <Badge
                    tone={item.paymentStatus === "paid" ? "success" : "warning"}
                  >
                    {titleCase(item.paymentStatus || "pending")}
                  </Badge>
                  <span className="text-[11px] text-muted">
                    {formatDate(item.paidAt || item.createdAt)}
                  </span>
                </div>
                {item.transactionId ? (
                  <p className="mt-2 truncate font-mono text-[10px] text-muted">
                    {item.transactionId}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={Receipt}
          title="No transactions yet"
          description="When a student or tutor completes a Pro upgrade, the Stripe record appears here."
        />
      )}

      {totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-3 text-xs text-muted">
          <span>
            Page {page} of {totalPages} · {data?.total || 0} records
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
      ) : null}
    </div>
  );
}
