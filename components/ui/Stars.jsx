import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Stars({ rating = 0, size = 14, className }) {
  const value = Math.round(Number(rating) || 0);

  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          width={size}
          height={size}
          className={
            index < value
              ? "fill-accent text-accent"
              : "fill-transparent text-line"
          }
        />
      ))}
    </span>
  );
}
