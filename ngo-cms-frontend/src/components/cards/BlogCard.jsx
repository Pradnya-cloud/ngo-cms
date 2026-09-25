import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  const date = new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  return (
    <Link to={`/blog/${post.id}`} className="group block py-6 border-b border-ink/10 last:border-none">
      <div className="flex items-center gap-3 text-xs">
        <span className="font-mono uppercase tracking-wide text-madder">{post.category}</span>
        <span className="text-ink/40">·</span>
        <span className="font-mono text-ink/50">{date}</span>
      </div>
      <h3 className="mt-2 font-display text-xl font-semibold text-indigo-deep group-hover:text-madder transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 text-ink/70 leading-relaxed">{post.excerpt}</p>
    </Link>
  );
}
