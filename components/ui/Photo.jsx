/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

export default function Photo({
  src,
  alt = "",
  className,
  fallback = "/placeholder-tuition.svg",
  ...props
}) {
  return (
    <img
      src={src || fallback}
      alt={alt}
      loading="lazy"
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  );
}
