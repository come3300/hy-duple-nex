import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts, getConcept } from "../../concept-data";
import { originalCompanyRows, originalHistoryRows } from "../../original-site-content";

export function generateStaticParams() {
  return concepts.map((concept) => ({ slug: concept.slug }));
}

export default async function ConceptBusinessPage({
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
    <main className={`conceptPage conceptSubPage conceptBusinessPage ${concept.className}`}>
      <nav className="conceptNav">
        <Link href={`/concepts/${concept.slug}`}>Top</Link>
        <span>H&Y duple</span>
        <Link href={`/concepts/${concept.slug}/news/wabi-sabi-open`}>News</Link>
      </nav>

      <section className="conceptSubHero">
        <p>{concept.source}</p>
        <h1>会社概要</h1>
        <span>既存サイトの企業情報ページを、各デザイン案の下層ページとして再現。</span>
      </section>

      <section className="conceptOriginalCompany">
        {originalCompanyRows.map(([label, value]) => (
          <article key={label}>
            <h2>{label}</h2>
            <p>
              {value.split("\n").map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </article>
        ))}
      </section>

      <section className="conceptOriginalHistory">
        <h2>沿革</h2>
        <ol>
          {originalHistoryRows.map((row) => (
            <li key={row}>{row}</li>
          ))}
        </ol>
      </section>

      <footer className="conceptFooter">
        <img src="/images/footer-logo.png" alt="H&Y duple" />
        <Link href={`/concepts/${concept.slug}`}>Back to top</Link>
      </footer>
    </main>
  );
}
