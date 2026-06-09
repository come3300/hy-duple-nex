export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

export type BusinessItem = {
  id: string;
  title: string;
  label: string;
  description: string;
  image: string;
};

export const navItems = [
  { label: "Business", href: "/business" },
  { label: "Company", href: "/company" },
  { label: "History", href: "/company#history" }
];

export const businesses: BusinessItem[] = [
  {
    id: "laundry",
    title: "Laundry & Car Care",
    label: "ランドリー・洗車複合施設",
    description: "暮らしの中にある待ち時間まで心地よく整える、地域密着型の複合施設を運営。",
    image: "/images/laundry.jpeg"
  },
  {
    id: "food",
    title: "Food & Fermentation",
    label: "飲食店経営",
    description: "発酵料理の飲食店、料理教室、フードトラック、レシピ制作を通じた食の事業。",
    image: "/images/food-business.jpeg"
  },
  {
    id: "real-estate",
    title: "Real Estate",
    label: "不動産賃貸業",
    description: "堺、中百舌鳥、尼崎、東京など、暮らしの基盤となる収益物件を長期視点で運営。",
    image: "/images/real-estate.jpg"
  }
];

export const company = [
  ["会社名", "株式会社H&Y duple"],
  ["事業所所在地", "大阪府堺市奥本町2丁目4番地1F号"],
  ["創業", "1970年5月"],
  ["代表者", "花澤良隆"],
  ["資本金", "1,000万円"],
  ["取引銀行", "大阪信用金庫、池田泉州銀行"],
  ["事業内容", "不動産賃貸業、飲食店経営、コインランドリーと洗車場の複合施設の経営"]
];

export const history = [
  ["1970", "花澤満寿夫が花沢石油株式会社を設立"],
  ["1973", "隣接地にドライブイン風喫茶店を開業"],
  ["2009", "不動産賃貸業を開始"],
  ["2010", "エッソエクスプレス ニュー金岡SSを開所"],
  ["2016", "尼崎市にてワンルームマンション建築"],
  ["2019", "創業50周年を迎える"],
  ["2020", "東京にて収益物件の運営開始"],
  ["2021", "株式会社H&Y dupleとして社名変更"]
];

export const fallbackNews: NewsItem[] = [
  {
    id: "wabisabi-open",
    title: "発酵料理をメインとした飲食店をオープン",
    excerpt: "大阪府堺市浜寺昭和町にて、発酵料理と珈琲の店舗を開業しました。",
    date: "2022.01.20",
    category: "Food"
  },
  {
    id: "company-renamed",
    title: "株式会社H&Y dupleとして社名変更",
    excerpt: "これまでの事業を受け継ぎながら、新たな会社名で地域に根ざした運営を進めます。",
    date: "2021.10.01",
    category: "Company"
  },
  {
    id: "real-estate",
    title: "収益物件の運営を拡大",
    excerpt: "堺・中百舌鳥、尼崎、東京を中心に不動産賃貸事業を展開しています。",
    date: "2021.02.01",
    category: "Estate"
  }
];

export async function getNews(): Promise<NewsItem[]> {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!domain || !apiKey) {
    return fallbackNews;
  }

  try {
    const res = await fetch(`https://${domain}.microcms.io/api/v1/news`, {
      headers: {
        "X-MICROCMS-API-KEY": apiKey
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      return fallbackNews;
    }

    const data = (await res.json()) as {
      contents?: Array<{
        id: string;
        title?: string;
        excerpt?: string;
        publishedAt?: string;
        category?: string;
      }>;
    };

    return (data.contents ?? []).map((item) => ({
      id: item.id,
      title: item.title ?? "Untitled",
      excerpt: item.excerpt ?? "",
      date: item.publishedAt
        ? new Intl.DateTimeFormat("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })
            .format(new Date(item.publishedAt))
            .replaceAll("/", ".")
        : "",
      category: item.category ?? "News"
    }));
  } catch {
    return fallbackNews;
  }
}
