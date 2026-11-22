export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatBDT(amount) {
  const value = Number(amount) || 0;
  return `৳${value.toLocaleString("en-US")}`;
}

export function formatUSD(amount) {
  const value = Number(amount) || 0;
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

export function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export function statusTone(status) {
  switch (status) {
    case "approved":
    case "accepted":
    case "paid":
      return "success";
    case "pending":
      return "warning";
    case "rejected":
    case "cancelled":
      return "danger";
    default:
      return "neutral";
  }
}

export function titleCase(value = "") {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
