import { useParams, Link, Navigate } from "react-router-dom";
import { blogPosts } from "../data/content";
import PhotoPlaceholder from "../components/ui/PhotoPlaceholder";
import StitchDivider from "../components/ui/StitchDivider";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) return <Navigate to="/blog" replace />;

  const date = new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article>
      <section className="bg-indigo-deep text-ivory">
        <div className="container-page py-14 sm:py-16">
          <Link to="/blog" className="text-sm text-ivory/70 hover:text-marigold-light">← All posts</Link>
          <p className="eyebrow !text-marigold-light mt-4 mb-3">{post.category} · {date}</p>
          <h1 className="text-4xl font-display font-semibold max-w-2xl text-ivory">{post.title}</h1>
        </div>
      </section>

      <div className="container-page py-16 max-w-3xl">
        <PhotoPlaceholder label={post.title} palette="marigold" ratio="aspect-[16/9]" />
        <div className="mt-6 w-24"><StitchDivider /></div>
        <p className="mt-6 text-lg text-ink/75 leading-relaxed">{post.excerpt}</p>
        <p className="mt-4 text-ink/70 leading-relaxed">
          This story continues to unfold as our team documents progress on the ground. Full field notes,
          photographs, and updated figures are published here as each program reaches its next milestone.
        </p>
      </div>
    </article>
  );
}
