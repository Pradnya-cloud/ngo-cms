import { forwardRef } from 'react';

const StatStrip = forwardRef(({ 
  stats = [],
  className = '',
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 ${className}`}
      {...props}
      role="list"
      aria-label="Statistics"
    >
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="text-center p-4 md:p-6"
          role="listitem"
        >
          <div className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-indigo mb-2">
            {stat.value}
          </div>
          <div className="text-ink/70 font-medium text-sm md:text-base leading-relaxed">
            {stat.label}
          </div>
          {stat.subtext && (
            <div className="text-madder text-xs mt-1 font-medium">
              {stat.subtext}
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

StatStrip.displayName = 'StatStrip';

export default StatStrip;