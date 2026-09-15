import { forwardRef, useMemo } from "react";

const SectionHeading = forwardRef((
  {
    tag = "h2",
    eyebrow,
    children,
    subtext,
    align = "center",
    className = "",
    ...props
  },
  ref
) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const Tag = useMemo(() => {
    const allowed = ["h1", "h2", "h3", "h4", "p", "span"];
    return allowed.includes(tag) ? tag : "h2";
  }, [tag]);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${alignClasses[align]} gap-3 ${className}`}
      {...props}
    >
      {eyebrow && (
        <span className="eyebrow uppercase tracking-wider text-sm font-medium">
          {eyebrow}
        </span>
      )}
      {Tag === "h1" && <h1 className="section-title font-heading text-3xl md:text-4xl lg:text-5xl leading-tight">{children}</h1>}
      {Tag === "h2" && <h2 className="section-title font-heading text-3xl md:text-4xl lg:text-5xl leading-tight">{children}</h2>}
      {Tag === "h3" && <h3 className="section-title font-heading text-3xl md:text-4xl lg:text-5xl leading-tight">{children}</h3>}
      {Tag === "h4" && <h4 className="section-title font-heading text-3xl md:text-4xl lg:text-5xl leading-tight">{children}</h4>}
      {Tag === "p" && <p className="section-title font-heading text-3xl md:text-4xl lg:text-5xl leading-tight">{children}</p>}
      {Tag === "span" && <span className="section-title font-heading text-3xl md:text-4xl lg:text-5xl leading-tight">{children}</span>}
      {subtext && (
        <p className="text-ink/70 max-w-2xl text-lg leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
});

SectionHeading.displayName = "SectionHeading";
export default SectionHeading;