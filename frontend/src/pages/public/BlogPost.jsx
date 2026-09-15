import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/apiClient";
import { blogPosts as fallbackPosts } from "../../data/content";
import { PhotoPlaceholder } from "../../components/ui";

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fallback = fallbackPosts.find((p) => String(p.id) === String(id) || p.slug === id);
    if (fallback) setPost(fallback);
    api.get(`/blog/${id}/`)
      .then((res) => { if (active) setPost(res); })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading && !post) {
    return <div className="container-page py-20 text-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo border-t-transparent mx-auto" /></div>;
  }

  if (!post) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-madder hover:underline">Back to blog</Link>
      </div>
    );
  }

  return (
    <article>
      <section className="bg-ink text-ivory py-16">
        <div className="container-page max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-marigold">{post.category ?? "Story"}</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{post.title}</h1>
          <p className="mt-3 text-sm text-ivory/60">{post.date ? new Date(post.date).toLocaleDateString() : (post.created_at ? new Date(post.created_at).toLocaleDateString() : "")}</p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto max-w-3xl">
          <div className="aspect-[16/9] overflow-hidden rounded-lg bg-ink/5">
            <PhotoPlaceholder label={post.title} />
          </div>
          <div className="mt-8 leading-relaxed text-ink/80">
            {post.content ? <div dangerouslySetInnerHTML={{ __html: post.content }} /> : post.excerpt}
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-ink/10 pt-6">
            <Link to="/blog" className="text-sm text-madder hover:underline">Back to blog</Link>
            <a href="/donate" className="text-sm font-medium text-ink hover:text-madder">Support our work</a>
          </div>
        </div>
      </section>
    </article>
  );
}