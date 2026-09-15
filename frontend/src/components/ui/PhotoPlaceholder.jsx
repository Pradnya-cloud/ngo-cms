import { forwardRef } from "react";

const PhotoPlaceholder = forwardRef(({
  className = "",
  aspectRatio = "4/3",
  showIcon = true,
  iconSize = "w-12 h-12",
  label = "",
  ...props
}, ref) => {
  const aspectClasses = {
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "3/4": "aspect-[3/4]",
    "2/1": "aspect-[2/1]",
  };

  return (
    <div
      ref={ref}
      className={`
        relative bg-gradient-to-br from-sage/10 to-indigo/10
        rounded-xl overflow-hidden border border-sage/20
        flex items-center justify-center
        ${aspectClasses[aspectRatio] || aspectClasses["4/3"]}
        ${className}
      `}
      {...props}
      role="img"
      aria-label={label || "Placeholder image"}
    >
      {showIcon && (
        <svg
          className={`${iconSize} text-sage/50 mx-auto`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )}
      {label && (
        <span className="absolute bottom-3 left-3 font-mono text-xs uppercase tracking-wider text-ink/50 bg-ivory/80 px-2 py-1 rounded">
          {label}
        </span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </div>
  );
});

PhotoPlaceholder.displayName = "PhotoPlaceholder";
export default PhotoPlaceholder;