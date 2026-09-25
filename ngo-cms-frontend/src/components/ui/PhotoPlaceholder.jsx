// Real photo tile used wherever the CMS media library will eventually
// supply an actual uploaded photo. Uses Lorem Picsum's seeded endpoint —
// a free, purpose-built placeholder-photo service (no copyright risk,
// stable URLs) — so the same "seed" (derived from the caption) always
// returns the same photo across reloads.
const tints = {
  indigo: "from-indigo-deep/50 via-indigo-deep/10 to-transparent",
  marigold: "from-marigold-dark/45 via-marigold-dark/10 to-transparent",
  sage: "from-sage-dark/45 via-sage-dark/10 to-transparent",
  madder: "from-madder-dark/45 via-madder-dark/10 to-transparent",
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function PhotoPlaceholder({ label, palette = "indigo", ratio = "aspect-[4/3]", className = "" }) {
  const tint = tints[palette] || tints.indigo;
  const seed = slugify(label || "umang-foundation");
  const src = `https://picsum.photos/seed/${seed}/800/600`;

  return (
    <div className={`relative ${ratio} rounded-sm overflow-hidden border border-ink/10 flex items-end p-3 ${className}`}>
      <img
        src={src}
        alt={label || "Umang Foundation"}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${tint}`} aria-hidden="true" />
      {label && (
        <span className="relative font-mono text-[11px] uppercase tracking-wide bg-ivory/85 px-2 py-1 rounded-sm">
          {label}
        </span>
      )}
    </div>
  );
}
