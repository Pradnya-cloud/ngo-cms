import { Link } from "react-router-dom";

export default function Button({ to, href, onClick, variant = "primary", type = "button", children, className = "" }) {
  const cls = variant === "primary" ? "btn-primary" : variant === "secondary" ? "btn-secondary" : "btn-ghost";
  if (to) {
    return (
      <Link to={to} className={`${cls} ${className}`}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={`${cls} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={`${cls} ${className}`}>
      {children}
    </button>
  );
}
