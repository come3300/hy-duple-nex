import { businesses, company, getNews, history, navItems } from "@/lib/site-data";

export async function PatternB() {
  const news = await getNews();

  return (
    <main className="site patternB">
      <header className="bHero">
        <nav className="nav navDark">
          <a className="brand brandInvert" href="#">
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
        <section className="bHeroStage">
          <div className="bHeroPhoto">
            <img src="/images/hero-sign.jpeg" alt="H&Y duple sign" />
          </div>
          <div className="bHeroCopy">
            <p className="kicker">H&Y duple</p>
            <h1>Operate the ordinary, beautifully.</h1>
            <p>
              日々の暮らしを支える事業を、長く、静かに、誠実に。
              地域に必要な機能を磨き続ける会社です。
            </p>
          </div>
        </section>
      </header>

      <section id="business" className="bBusiness">
        {businesses.map((business) => (
          <article key={business.id}>
            <img src={business.image} alt={business.label} />
            <div>
              <span>{business.title}</span>
              <h2>{business.label}</h2>
              <p>{business.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section id="company" className="section bCompany">
        <div>
          <p className="kicker">Company</p>
          <h2>会社概要</h2>
        </div>
        <div className="bCompanyList">
          {company.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="history" className="bHistory">
        <div className="bHistoryTitle">
          <p className="kicker">History</p>
          <h2>1970から続く、地域事業の系譜。</h2>
        </div>
        <div className="bTimeline">
          {history.map(([year, text]) => (
            <article key={`${year}-${text}`}>
              <span>{year}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="news" className="section bNews">
        <div className="sectionHead darkHead">
          <p>News</p>
          <h2>ニュース</h2>
        </div>
        <div className="bNewsGrid">
          {news.map((item) => (
            <article key={item.id}>
              <time>{item.date}</time>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer footerB">
        <img src="/images/footer-logo.png" alt="H&Y duple" />
        <p>copyright H&Y duple All Rights Reserved.</p>
      </footer>
    </main>
  );
}
