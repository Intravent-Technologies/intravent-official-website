import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readData } from "@/lib/data";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

function renderContent(text: string) {
  return text.split("\n\n").map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl md:text-2xl font-bold text-brand-navy mt-10 mb-4">
          {trimmed.replace("## ", "")}
        </h2>
      );
    }
    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      return (
        <p key={i} className="text-lg font-semibold text-brand-navy mb-3">{trimmed.replace(/^\*\*|\*\*$/g, "")}</p>
      );
    }
    if (trimmed.startsWith("- ")) {
      return (
        <ul key={i} className="space-y-2 my-4">
          {trimmed.split("\n").map((line, j) => (
            <li key={j} className="flex items-start gap-3 text-text-secondary leading-relaxed pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-2 shrink-0" />
              <span>
                {line.replace(/^-\s*\*\*/, "").replace(/\*\* —/, " — ").replace(/\*\*$/, "")}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    if (trimmed.startsWith("**")) {
      const parts = trimmed.match(/^\*\*(.+?)\*\*\s*[—–-]?\s*([\s\S]+)/);
      if (parts) {
        return (
          <p key={i} className="text-text-secondary leading-relaxed mb-4">
            <strong className="text-brand-navy">{parts[1]}</strong> — {parts[2]}
          </p>
        );
      }
    }
    if (trimmed.match(/^\d\.\s/)) {
      return (
        <ol key={i} className="space-y-2 my-4 list-decimal pl-5 text-text-secondary leading-relaxed">
          {trimmed.split("\n").map((line, j) => (
            <li key={j}>{line.replace(/^\d+\.\s/, "").replace(/^\*\*|\*\*$/g, "")}</li>
          ))}
        </ol>
      );
    }
    return (
      <p key={i} className="text-text-secondary leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  });
}

export async function generateStaticParams() {
  const posts = readData<Post>("blog.json");
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const posts = readData<Post>("blog.json");
  const post = posts.find((p) => p.id === id);
  if (!post) return {};
  return {
    title: `${post.title} | Intravent Technologies Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { id } = await params;
  const posts = readData<Post>("blog.json");
  const post = posts.find((p) => p.id === id);
  if (!post) notFound();
  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-soft-grid opacity-[0.04]" />
        <div className="absolute top-16 right-[-5rem] w-72 h-72 border border-brand-purple/10 rounded-full animate-float-slow" />
        <div className="absolute bottom-16 left-[-3rem] w-48 h-48 border border-brand-purple/10 rounded-full animate-float" />
        <div className="absolute top-1/3 right-[25%] w-40 h-40 border border-brand-navy/5 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 right-[10%] w-72 h-72 bg-glow-purple opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-[5%] w-64 h-64 bg-glow-navy opacity-15 rounded-full blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative pt-32 md:pt-40 pb-0">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-purple mb-6 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Insights
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-purple/10 text-brand-purple">
              {post.category}
            </span>
            <span className="text-xs text-text-tertiary">{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight leading-tight mb-4 max-w-4xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 pb-8 border-b border-border-light">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-purple to-accent-blue flex items-center justify-center text-white text-xs font-bold">
              {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-navy">{post.author}</p>
              <p className="text-xs text-text-tertiary">{post.date}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative -mt-16 z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="aspect-[2/1] md:aspect-[3/1] rounded-2xl overflow-hidden shadow-xl shadow-brand-navy/10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-brand-navy font-medium leading-relaxed mb-8 border-l-4 border-brand-purple pl-5 italic">
            {post.excerpt}
          </p>

          <div className="prose-custom">
            {renderContent(post.content)}
          </div>

          <div className="mt-12 pt-8 border-t border-border-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-bg-secondary rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-accent-blue flex items-center justify-center text-white text-sm font-bold shrink-0">
                {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-navy">{post.author}</p>
                <p className="text-xs text-text-tertiary">Technology Insights Team</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-border-light pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-purple hover:text-brand-purple-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all articles
            </Link>
            <button className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-navy transition-colors">
              Share
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section variant="secondary">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-brand-navy">Related Articles</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-brand-purple hover:text-brand-purple-600 transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link key={item.id} href={`/blog/${item.id}`} className="group">
                <article className="bg-white rounded-xl border border-border-light overflow-hidden card-hover">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-brand-purple bg-brand-purple/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                      {item.category}
                    </span>
                    <h3 className="text-base font-semibold text-brand-navy mb-2 leading-snug group-hover:text-brand-purple transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-text-tertiary">
                      <span>{item.date}</span>
                      <span className="w-1 h-1 rounded-full bg-border-medium" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTASection
        title="Want to Learn More?"
        description="Get in touch with our team to discuss how these insights apply to your business."
      />
    </>
  );
}
