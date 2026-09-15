import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../utils/apiClient";
import { blogPosts as fallbackPosts } from "../../data/content";
import { PhotoPlaceholder } from "../../components/ui";

function extractList(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.results)) return res.results;
  if (Array.isArray(res?.data)) return res.data;
  return [];
}

export default function Blog() {
  const [posts, setPosts] = useState(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.get("/blog/")
      .then((res) => {
        if (!active) return;
        const list = extractList(res).filter((p) => p.status === "published");
        if (list.length) setPosts(list);
      })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <div>
      <section className="bg-ink text-ivory py-16">
        <div className="container-page max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-marigold">Stories</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Our blog</h1>
          <p className="mt-5 text-lg text-ivory/75">News, stories, and updates from our work on the ground.</p>
        </div>
      </section>

      <section className="container-page py-12">
        {loading && posts.length === 0 ? (
          <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo border-t-transparent" /></div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Link key={post.id ?? i} to={`/blog/${post.id ?? post.slug ?? i}`} className="group overflow-hidden rounded-lg border border-ink/10 bg-ivory transition-shadow hover:shadow-md">
                <div className="aspect-[16/9] bg-ink/5">
                  <PhotoPlaceholder label={post.title} />
                </div>
                <div className="p-5">
                  <span className="font-mono text-xs uppercase tracking-wider text-indigo">{post.category ?? "Update"}</span>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink group-hover:text-madder">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink/70">{post.excerpt ?? post.content?.slice(0, 120) ?? ""}</p>
                  <p className="mt-3 text-xs text-ink/50">{post.date ? new Date(post.date).toLocaleDateString() : (post.created_at ? new Date(post.created_at).toLocaleDateString() : "")}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}