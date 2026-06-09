import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts, getConcept, shared } from "../concept-data";

export function generateStaticParams() {
  return concepts.map((concept) => ({ slug: concept.slug }));
}

function ConceptTitle({ slug, title }: { slug: string; title: string }) {
  if (slug === "editorial-monochrome") {
    return (
      <>
        ABOUT. IN
        <br />
        QUIET
        <br />
        CONTRAST
      </>
    );
  }

  if (slug === "vertical-gallery") {
    return (
      <>
        Yamasuso inspired
        <br />
        archive
      </>
    );
  }

  if (slug === "columbia-corporate") {
    return (
      <>
        人が輝く舞台を、
        <br />
        地域につくる
      </>
    );
  }

  if (slug === "unibio-culture") {
    return (
      <>
        ともに、
        <br />
        にぎやかな
        <br />
        地域文化を。
      </>
    );
  }

  return title;
}

export default async function ConceptPage({
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
    <main className={`conceptPage ${concept.className}`}>
      <nav className="conceptNav">
        <Link href="/concepts">All Concepts</Link>
        <span>H&Y duple</span>
        <Link href={`/concepts/${concept.slug}/business`}>Company</Link>
      </nav>

      <section className="conceptHero">
        <div className="conceptHeroImage">
          <img src={concept.heroImage} alt="" />
        </div>
        <div className="conceptHeroCopy">
          <p>{concept.label}</p>
          <h1>
            <ConceptTitle slug={concept.slug} title={concept.title} />
          </h1>
          <strong>{concept.lead}</strong>
          <span>{concept.description}</span>
        </div>
      </section>

      <section className="conceptAbout">
        <div>
          <p>ABOUT.</p>
          <h2>地域の暮らしを支える、複数の事業運営。</h2>
        </div>
        <p>
          H&Y dupleは、不動産賃貸、ランドリーと洗車の複合施設、飲食店経営を通じて、
          街の基盤となる日常の機能を長く丁寧に運営しています。
        </p>
      </section>

      <section className="conceptBusiness">
        {shared.businesses.map((business) => (
          <article key={business.id}>
            <img src={business.image} alt={business.label} />
            <div>
              <small>{business.title}</small>
              <h3>{business.label}</h3>
              <p>{business.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="conceptSplit">
        <img src={concept.featureImage} alt="" />
        <div>
          <p>COMPANY</p>
          <h2>株式会社H&Y duple</h2>
          <dl>
            {shared.company.slice(1, 5).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="conceptArchive">
        <div>
          <p>HISTORY</p>
          <h2>1970から続く事業の記録。</h2>
        </div>
        <div className="conceptTimeline">
          {shared.history.map(([year, text]) => (
            <article key={`${year}-${text}`}>
              <span>{year}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="conceptNews">
        <div>
          <p>NEWS</p>
          <h2>お知らせ</h2>
        </div>
        <div>
          {shared.news.map((item) => (
            <Link href={`/concepts/${concept.slug}/news/wabi-sabi-open`} key={item.id}>
              <article>
                <time>{item.date}</time>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <footer className="conceptFooter">
        <img src="/images/footer-logo.png" alt="H&Y duple" />
        <Link href="/concepts">Back to concepts</Link>
      </footer>
    </main>
  );
}
