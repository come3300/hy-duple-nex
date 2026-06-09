import { RootPageFooter, RootPageNav } from "../root-page-shell";

const originalBusinessGroups = [
  {
    id: "laundry",
    items: ["ランドリー&\n洗車の複合施設の運営"],
    image: "/images/laundry.jpeg"
  },
  {
    id: "food",
    items: ["料理教室", "発酵料理の飲食店", "フードトラック運営", "レシピ本制作"],
    image: "/images/food-business.jpeg"
  },
  {
    id: "estate",
    items: ["不動産賃貸業"],
    image: "/images/real-estate.jpg"
  }
];

export default function BusinessPage() {
  return (
    <main className="site patternA rootSubPage">
      <RootPageNav />
      <section className="rootPageHero">
        <p className="kicker">Business</p>
        <h1>事業内容</h1>
      </section>

      <section className="section rootBusinessSection" aria-label="事業内容">
        <div className="rootBusinessGrid">
          {originalBusinessGroups.map((business, index) => (
            <article className="rootBusinessCard" key={business.id}>
              <div className="rootBusinessImage">
                <img src={business.image} alt="" />
              </div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <ul className="rootBusinessItems">
                {business.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <RootPageFooter />
    </main>
  );
}
