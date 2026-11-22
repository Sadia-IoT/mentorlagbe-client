import { TriangleAlert } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ErrorNote({ error, onRetry }) {
  if (!error) return null;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-danger/25 bg-danger-soft p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-start gap-2 text-sm text-danger">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
        {error.message || "Something went wrong while loading this data."}
      </p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
