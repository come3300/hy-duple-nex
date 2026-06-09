import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts, getConcept } from "../../../concept-data";
import { originalNewsParagraphs, originalNewsTitle } from "../../../original-site-content";

export function generateStaticParams() {
  return concepts.map((concept) => ({ slug: concept.slug }));
}

export default async function ConceptNewsDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConcept(slug);

  if (!concept) {
    notFound();
  }

  return (
    <main className={`conceptPage conceptSubPage conceptNewsDetailPage ${concept.className}`}>
      <nav className="conceptNav">
        <Link href={`/concepts/${concept.slug}`}>Top</Link>
        <span>H&Y duple</span>
        <Link href={`/concepts/${concept.slug}/business`}>Company</Link>
      </nav>

      <article className="conceptOriginalPost">
        <header>
          <p>NEWS</p>
          <h1>{originalNewsTitle}</h1>
        </header>

        <figure>
          <img src="/images/wabisabi_insta-1-1024x1024.jpg" alt="" />
        </figure>

        <div>
          {originalNewsParagraphs.map((paragraph, index) => (
            <p key={`${paragraph}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>

      <footer className="conceptFooter">
        <img src="/images/footer-logo.png" alt="H&Y duple" />
        <Link href={`/concepts/${concept.slug}`}>Back to top</Link>
      </footer>
    </main>
  );
}
