import { originalCompanyRows, originalHistoryRows } from "../concepts/original-site-content";
import { RootPageFooter, RootPageNav } from "../root-page-shell";

export default function CompanyPage() {
  return (
    <main className="site patternA rootSubPage">
      <RootPageNav />
      <section className="rootPageHero">
        <p className="kicker">Company</p>
        <h1>会社概要</h1>
      </section>

      <section className="section rootCompanySection" aria-label="会社概要">
        <div className="companyList rootCompanyList">
          {originalCompanyRows.map(([label, value]) => (
            <div className="companyRow rootCompanyRow" key={label}>
              <p>{label}</p>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="history" className="section historySection rootHistorySection">
        <div className="historyLead">
          <p className="kicker">History</p>
          <h2>沿革</h2>
        </div>
        <div className="timeline rootTimeline">
          {originalHistoryRows.map((row) => {
            const [date, ...text] = row.split(" ");

            return (
              <article key={row}>
                <span>{date}</span>
                <p>{text.join(" ")}</p>
              </article>
            );
          })}
        </div>
      </section>

      <RootPageFooter />
    </main>
  );
}
