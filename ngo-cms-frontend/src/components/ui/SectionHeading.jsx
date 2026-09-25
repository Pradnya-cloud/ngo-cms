import StitchDivider from "./StitchDivider";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-indigo-deep">{title}</h2>
      <div className={`mt-4 w-24 ${isCenter ? "mx-auto" : ""}`}>
        <StitchDivider />
      </div>
      {description && <p className="mt-4 text-ink/70 leading-relaxed">{description}</p>}
    </div>
  );
}
