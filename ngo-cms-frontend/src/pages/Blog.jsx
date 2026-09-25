import SectionHeading from "../components/ui/SectionHeading";
import BlogCard from "../components/cards/BlogCard";
import { blogPosts } from "../data/content";

export default function Blog() {
  return (
    <>
      <section className="bg-indigo-deep text-ivory">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow !text-marigold-light mb-3">Blog</p>
          <h1 className="text-4xl font-display font-semibold max-w-2xl text-ivory">Stories, updates, and reflections from the field.</h1>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="Latest posts" title="From the field" />
        <div className="mt-6 max-w-3xl">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
