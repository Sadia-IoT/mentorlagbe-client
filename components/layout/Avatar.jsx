import Photo from "@/components/ui/Photo";
import { cn, initials } from "@/lib/utils";

export default function Avatar({ user, size = 36, className }) {
  const style = { width: size, height: size };

  if (user?.image) {
    return (
      <span
        className={cn(
          "inline-block shrink-0 overflow-hidden rounded-full border border-line bg-surface-2",
          className
        )}
        style={style}
      >
        <Photo src={user.image} alt={user.name || "Profile photo"} />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full border border-brand/20 bg-brand-soft font-semibold text-brand",
        className
      )}
      style={{ ...style, fontSize: Math.max(11, size * 0.34) }}
      aria-hidden="true"
    >
      {initials(user?.name || "ML")}
    </span>
  );
}
