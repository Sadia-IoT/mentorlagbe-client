export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1.5 text-[26px] leading-tight sm:text-[30px]">{title}</h2>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
