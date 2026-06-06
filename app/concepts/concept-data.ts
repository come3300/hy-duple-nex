import { businesses, company, fallbackNews, history } from "@/lib/site-data";

export type Concept = {
  slug: string;
  label: string;
  source: string;
  title: string;
  lead: string;
  description: string;
  className: string;
  heroImage: string;
  featureImage: string;
  accentImage: string;
};

export const concepts: Concept[] = [
  {
    slug: "editorial-monochrome",
    label: "Image 01",
    source: "添付画像 #1",
    title: "ABOUT. in quiet contrast",
    lead: "白い紙面、余白、モノクロ写真、極細のページ番号。",
    description:
      "ブランドブックの見開きのように、H&Y dupleの事業と沿革を静かに配置する案です。",
    className: "conceptEditorial",
    heroImage: "/images/hero-sign.jpeg",
    featureImage: "/images/real-estate.jpg",
    accentImage: "/images/laundry.jpeg"
  },
  {
    slug: "vertical-gallery",
    label: "Image 02",
    source: "添付画像 #2",
    title: "Yamasuso inspired archive",
    lead: "縦長のサイドビジュアル、細い本文、展示図録のような密度。",
    description:
      "長い1枚紙のように、会社概要と事業の断片を縦に読ませるギャラリー案です。",
    className: "conceptVertical",
    heroImage: "/images/real-estate.jpg",
    featureImage: "/images/hero-sign.jpeg",
    accentImage: "/images/food-business.jpeg"
  },
  {
    slug: "columbia-corporate",
    label: "Reference 01",
    source: "columbiaworks.jp",
    title: "人が輝く舞台を、地域につくる",
    lead: "大きな理念コピー、事業導線、ニュースを持つコーポレート構成。",
    description:
      "不動産・施設運営の会社として、理念、事業、実績、ニュースを強く見せる案です。",
    className: "conceptColumbia",
    heroImage: "/images/real-estate.jpg",
    featureImage: "/images/hero-sign.jpeg",
    accentImage: "/images/laundry.jpeg"
  },
  {
    slug: "unibio-culture",
    label: "Reference 02",
    source: "store.unibio.jp",
    title: "ともに、にぎやかな地域文化を。",
    lead: "縦書きに近い余白、商品カテゴリ、読みもののあるEC風トップ。",
    description:
      "食の事業を前面に出しつつ、会社全体の事業をカテゴリ化して見せる案です。",
    className: "conceptUnibio",
    heroImage: "/images/food-business.jpeg",
    featureImage: "/images/hakkouya.png",
    accentImage: "/images/laundry.jpeg"
  },
  {
    slug: "gyubee-premium",
    label: "Reference 03",
    source: "gyu-bee.com",
    title: "匠の運営を、街にも家庭にも。",
    lead: "強い黒背景、力のある見出し、迫力ある写真分割。",
    description:
      "レストランサイトの勢いを、H&Y dupleの複数事業に翻訳した力強い案です。",
    className: "conceptGyubee",
    heroImage: "/images/food-business.jpeg",
    featureImage: "/images/hero-sign.jpeg",
    accentImage: "/images/real-estate.jpg"
  },
  {
    slug: "roasters-local",
    label: "Reference 04",
    source: "theroasters.jp",
    title: "Cup of local craft",
    lead: "小さな集落の店のような親密さ、ストーリー、プロダクトカード。",
    description:
      "地域に根ざす事業者として、店舗情報と物語をやわらかく見せる案です。",
    className: "conceptRoasters",
    heroImage: "/images/laundry.jpeg",
    featureImage: "/images/hero-sign.jpeg",
    accentImage: "/images/food-business.jpeg"
  }
];

export function getConcept(slug: string) {
  return concepts.find((concept) => concept.slug === slug);
}

export const shared = {
  businesses,
  company,
  history,
  news: fallbackNews
};
