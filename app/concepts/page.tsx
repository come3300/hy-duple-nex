import Link from "next/link";
import { concepts } from "./concept-data";

export default function ConceptsIndexPage() {
  return (
    <main className="conceptIndex">
      <header>
        <p>H&Y duple / design proposals</p>
        <h1>Reference driven concepts</h1>
        <span>添付画像2点と参考サイト4点を、それぞれ別の完成ページ案に展開しています。</span>
      </header>
      <section>
        {concepts.map((concept) => (
          <Link href={`/concepts/${concept.slug}`} key={concept.slug}>
            <small>{concept.label}</small>
            <strong>{concept.title}</strong>
            <span>{concept.source}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
