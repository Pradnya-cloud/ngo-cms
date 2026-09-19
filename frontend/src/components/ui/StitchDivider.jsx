// Running-stitch divider — the site's signature motif, echoing the
// kantha embroidery used by women in the Livelihood Centre.
export default function StitchDivider({ color = "text-marigold", className = "" }) {
  return (
    <svg
      viewBox="0 0 400 12"
      preserveAspectRatio="none"
      className={`w-full h-3 ${color} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 6 Q 20 -2, 40 6 T 80 6 T 120 6 T 160 6 T 200 6 T 240 6 T 280 6 T 320 6 T 360 6 T 400 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="6 7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
