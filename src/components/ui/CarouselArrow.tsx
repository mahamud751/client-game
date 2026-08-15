type Variant = "hero" | "brand";

export function CarouselArrow({
  direction,
  onClick,
  label,
  variant = "hero",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  variant?: Variant;
}) {
  const isPrev = direction === "prev";
  const chevron = (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={variant === "hero" ? "h-8 w-8" : "h-7 w-7"}
      fill="none"
      stroke="currentColor"
      strokeWidth={variant === "hero" ? 1.6 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {isPrev ? <path d="M15 5 8 12l7 7" /> : <path d="m9 5 7 7-7 7" />}
    </svg>
  );

  if (variant === "brand") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="brand-arrow"
      >
        {chevron}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`hero-arrow ${isPrev ? "left-0" : "right-0"}`}
    >
      {chevron}
    </button>
  );
}
