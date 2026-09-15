import { forwardRef } from 'react';

const StitchDivider = forwardRef(({ 
  className = '',
  variant = 'default',
  ...props 
}, ref) => {
  const variants = {
    default: 'stitch-rule',
    short: 'stitch-rule max-w-xs',
    long: 'stitch-rule max-w-2xl',
    vertical: 'stitch-rule-vertical',
  };
  
  if (variant === 'vertical') {
    return (
      <div 
        ref={ref}
        className={`${variants[variant]} ${className}`}
        {...props}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }
  
  return (
    <hr 
      ref={ref}
      className={`${variants[variant]} ${className}`}
      {...props}
      role="separator"
      aria-orientation="horizontal"
    />
  );
});

StitchDivider.displayName = 'StitchDivider';

export default StitchDivider;