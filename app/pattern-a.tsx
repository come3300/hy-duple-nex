import { businesses, company, history, navItems } from "@/lib/site-data";

export function PatternA() {
  return (
    <main className="site patternA">
      <header className="aHero">
        <nav className="nav">
          <a className="brand" href="#">
            <img src="/images/logo.png" alt="H&Y duple" />
          </a>
          <div className="navLinks">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <section className="aHeroGrid">
          <div className="aHeroText">
            <p className="kicker">Osaka / Since 1970 / H&Y duple</p>
            <h1>地域の余白まで、静かに整える。</h1>
            <p>
              不動産、ランドリーと洗車の複合施設、食の事業。
              H&Y dupleは、暮らしの近くにある事業を丁寧に運営し、街の時間を少しずつ良くしていきます。
            </p>
            <div className="heroMeta">
              <span>Real estate</span>
              <span>Laundry & car care</span>
              <span>Food business</span>
            </div>
          </div>
          <div className="aHeroImage">
            <img src="/images/hero-sign.jpeg" alt="H&Y duple sign" />
          </div>
        </section>
      </header>

      <section id="business" className="section">
        <div className="sectionHead">
          <p>Business</p>
          <h2>事業内容</h2>
        </div>
        <div className="businessGrid">
          {businesses.map((business, index) => (
            <article className="businessCard" key={business.id}>
              <div className="cardImage">
                <img src={business.image} alt={business.label} />
              </div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{business.title}</h3>
              <p className="businessLabel">{business.label}</p>
              <p>{business.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="company" className="section companySection">
        <div className="sectionHead">
          <p>Company</p>
          <h2>会社概要</h2>
        </div>
        <div className="companyList">
          {company.map(([label, value]) => (
            <div className="companyRow" key={label}>
              <p>{label}</p>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="history" className="section historySection">
        <div className="historyLead">
          <p className="kicker">History</p>
          <h2>石油、店舗、不動産、そしてH&Y dupleへ。</h2>
        </div>
        <div className="timeline">
          {history.map(([year, text]) => (
            <article key={`${year}-${text}`}>
              <span>{year}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer footerA">
        <img src="/images/footer-logo.png" alt="H&Y duple" />
        <p>copyright H&Y duple All Rights Reserved.</p>
      </footer>
    </main>
  );
}
