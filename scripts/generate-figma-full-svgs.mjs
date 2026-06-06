import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const imageDir = path.join(root, "public/images");
const outDir = path.join(root, "designs/figma-full-svgs");

fs.mkdirSync(outDir, { recursive: true });

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function mimeFromBuffer(buffer) {
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e) {
    return "image/png";
  }
  return "image/jpeg";
}

function dataUri(fileName) {
  const buffer = fs.readFileSync(path.join(imageDir, fileName));
  return `data:${mimeFromBuffer(buffer)};base64,${buffer.toString("base64")}`;
}

const images = {
  logo: dataUri("logo.png"),
  mark: dataUri("footer-logo.png"),
  sign: dataUri("hero-sign.jpeg"),
  estate: dataUri("real-estate.jpg"),
  food: dataUri("food-business.jpeg"),
  laundry: dataUri("laundry.jpeg"),
  hakko: dataUri("hakkouya.png")
};

const brand = {
  black: "#111512",
  ink: "#232722",
  muted: "#70766c",
  line: "#d9ddd5",
  paper: "#fbfbf8",
  green: "#31543e",
  pale: "#eef3ea",
  cream: "#f7f6f0"
};

function svg({ title, width, height, background = brand.paper, body }) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <title>${escapeXml(title)}</title>
  <rect width="${width}" height="${height}" fill="${background}"/>
${body}
</svg>
`;
}

function text(value, x, y, size, attrs = {}) {
  const {
    fill = brand.black,
    weight = 400,
    family = "Times New Roman, Yu Mincho, serif",
    anchor = "start",
    spacing = 0,
    transform = "",
    style = ""
  } = attrs;
  const extra = transform ? ` transform="${transform}"` : "";
  const styleAttr = style ? ` style="${style}"` : "";
  return `  <text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${spacing}"${extra}${styleAttr}>${escapeXml(value)}</text>`;
}

function multiText(lines, x, y, size, lineHeight, attrs = {}) {
  return lines
    .map((line, index) => text(line, x, y + index * lineHeight, size, attrs))
    .join("\n");
}

function rect(x, y, width, height, fill, attrs = "") {
  return `  <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}"${attrs}/>`;
}

function line(x1, y1, x2, y2, stroke = brand.line, width = 1) {
  return `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}"/>`;
}

function image(id, href, x, y, width, height, mode = "xMidYMid slice", opacity = 1) {
  return `  <defs>
    <clipPath id="${id}">
      <rect x="${x}" y="${y}" width="${width}" height="${height}"/>
    </clipPath>
  </defs>
  <image x="${x}" y="${y}" width="${width}" height="${height}" href="${href}" preserveAspectRatio="${mode}" clip-path="url(#${id})" opacity="${opacity}"/>`;
}

function write(name, markup) {
  fs.writeFileSync(path.join(outDir, `${name}.svg`), markup);
}

write(
  "editorial-monochrome",
  svg({
    title: "editorial monochrome",
    width: 1440,
    height: 2200,
    background: "#2d2d2b",
    body: `
${rect(160, 120, 1120, 620, "#ffffff")}
${image("em-hero", images.sign, 160, 220, 720, 360, "xMidYMid slice", 0.86)}
${rect(160, 220, 720, 360, "#dfe3dc", ' opacity="0.28"')}
${text("ABOUT.", 790, 215, 78, { weight: 400 })}
${text("BRAND", 1184, 160, 16, { family: "Arial, sans-serif", weight: 700 })}
${text("01.", 914, 390, 34)}
${multiText(["Inspired by quiet local operations,", "H&Y duple connects estate,", "food and everyday facilities", "with long-term care."], 914, 430, 14, 20, { family: "Arial, sans-serif", fill: brand.ink })}
${multiText(["地域に根ざす複数事業を、", "余白と写真で静かに伝える", "ブランドブック型トップページ。"], 1092, 430, 14, 20, { family: "Arial, sans-serif", fill: brand.ink })}
${text("Page 03", 200, 690, 12, { family: "Arial, sans-serif" })}
${text("H&Y duple / Brand Design", 610, 690, 12, { family: "Arial, sans-serif" })}
${text("Page 03", 1180, 690, 12, { family: "Arial, sans-serif" })}

${rect(160, 770, 540, 280, "#ffffff")}
${text("ABOUT.", 196, 905, 24)}
${multiText(["不動産賃貸、発酵料理、", "ランドリーと洗車場。", "暮らしの基盤を整える", "運営会社です。"], 196, 940, 12, 18, { family: "Arial, sans-serif" })}
${image("em-estate", images.estate, 360, 815, 292, 170, "xMidYMid slice", 0.9)}
${rect(740, 770, 540, 280, "#ffffff")}
${image("em-food-a", images.food, 780, 805, 170, 115, "xMidYMid slice", 0.88)}
${image("em-food-b", images.laundry, 780, 940, 170, 70, "xMidYMid slice", 0.88)}
${text("ART", 1018, 880, 24)}
${multiText(["堺を中心に、食と暮らしの", "小さな接点を積み重ねる。"], 1018, 914, 12, 18, { family: "Arial, sans-serif" })}

${rect(160, 1090, 540, 320, "#ffffff")}
${image("em-wide-a", images.laundry, 195, 1135, 315, 170, "xMidYMid slice", 0.9)}
${text("OPERATION", 540, 1190, 23)}
${multiText(["施設の清潔感、事業の継続性、", "地域に開いた使いやすさ。"], 540, 1225, 12, 18, { family: "Arial, sans-serif" })}
${rect(740, 1090, 540, 320, "#ffffff")}
${image("em-wide-b", images.sign, 780, 1145, 440, 175, "xMidYMid slice", 0.88)}
${multiText(["1970", "2021", "Future"], 796, 1355, 12, 24, { family: "Arial, sans-serif" })}
${multiText(["創業から社名変更へ。", "これまでの事業を継ぎながら", "次の地域運営へ進む。"], 910, 1360, 12, 18, { family: "Arial, sans-serif" })}

${rect(160, 1450, 540, 420, "#ffffff")}
${image("em-tall", images.estate, 160, 1450, 240, 420, "xMidYMid slice", 0.92)}
${text("TEIXEIRA.", 490, 1615, 42)}
${multiText(["H&Y duple", "Corporate design proposal", "Next.js + microCMS + Cloudflare Pages"], 490, 1660, 12, 19, { family: "Arial, sans-serif" })}
${rect(740, 1450, 540, 420, "#ffffff")}
${text("CONCISE", 805, 1630, 20)}
${text("THESIS", 805, 1653, 20)}
${multiText(["余白を主役にして、", "会社の輪郭を強く見せる。", "白、黒、緑だけで成立する", "落ち着いたモダンデザイン。"], 805, 1695, 12, 18, { family: "Arial, sans-serif" })}
${image("em-small", images.hakko, 1045, 1525, 150, 150, "xMidYMid slice", 0.9)}
`
  })
);

write(
  "vertical-gallery",
  svg({
    title: "vertical gallery",
    width: 993,
    height: 2400,
    background: "#ececea",
    body: `
${rect(120, 90, 700, 2220, "#ffffff")}
${rect(730, 90, 150, 2220, "#f5f5f2")}
${image("vg-strip", images.estate, 730, 90, 150, 860, "xMidYMid slice", 0.78)}
${image("vg-hero", images.sign, 205, 640, 455, 255, "xMidYMid slice", 0.82)}
${image("vg-feature", images.hakko, 205, 1180, 455, 285, "xMidYMid slice", 0.84)}
${image("vg-book", images.logo, 782, 1695, 60, 60, "xMidYMid meet", 1)}
${text("H&Y duple", 165, 160, 10, { family: "Arial, sans-serif", spacing: 4, weight: 700 })}
${text("Yamasuso", 260, 405, 32)}
${text("2026-2031", 415, 405, 10, { family: "Arial, sans-serif", fill: brand.muted })}
${text("Local operation", 165, 405, 10, { family: "Arial, sans-serif", fill: brand.muted, transform: "rotate(-90 165 405)" })}
${multiText(["7:00-24:00", "Sakai / Osaka", "Food, Estate, Laundry"], 205, 545, 12, 28, { family: "Arial, sans-serif" })}
${multiText(["A quiet corporate expression, built for a company", "that operates everyday facilities with long-term care.", "The layout keeps calm space and lets real images breathe."], 460, 545, 12, 20, { family: "Arial, sans-serif", fill: brand.ink })}
${multiText(["暮らしの近くで続く事業を、展示図録のような", "余白と縦長の写真で構成。頻繁に更新しなくても", "古く見えにくい、静かなコーポレートデザイン。"], 510, 1035, 12, 21, { family: "Arial, sans-serif", fill: brand.ink })}
${line(205, 1640, 660, 1640)}
${multiText(["Credits", "Company", "Business", "News"], 205, 1730, 11, 75, { family: "Arial, sans-serif", fill: brand.muted })}
${multiText(["株式会社H&Y duple", "大阪府堺市奥本町2丁目4番地1F号", "不動産賃貸業 / 飲食店経営 / ランドリー", "microCMS Hobby / Cloudflare Pages"], 355, 1730, 11, 75, { family: "Arial, sans-serif", fill: brand.ink })}
${text("H&Y mark", 805, 1585, 9, { family: "Arial, sans-serif", anchor: "middle", fill: brand.muted })}
${text("Kawas", 812, 1875, 12, { family: "Arial, sans-serif", anchor: "middle" })}
${text("View", 812, 1905, 10, { family: "Arial, sans-serif", anchor: "middle", fill: brand.muted })}
`
  })
);

write(
  "columbia-corporate",
  svg({
    title: "columbia corporate",
    width: 1440,
    height: 2100,
    background: "#ffffff",
    body: `
${rect(0, 0, 1440, 88, "#ffffff")}
${image("cc-logo", images.logo, 70, 26, 145, 42, "xMidYMid meet", 1)}
${text("BUSINESS", 760, 55, 13, { family: "Arial, sans-serif", fill: brand.ink })}
${text("COMPANY", 875, 55, 13, { family: "Arial, sans-serif", fill: brand.ink })}
${text("HISTORY", 990, 55, 13, { family: "Arial, sans-serif", fill: brand.ink })}
${text("NEWS", 1100, 55, 13, { family: "Arial, sans-serif", fill: brand.ink })}
${text("CONTACT", 1280, 55, 13, { family: "Arial, sans-serif", weight: 700, fill: brand.green })}
${image("cc-hero", images.estate, 0, 88, 1440, 690, "xMidYMid slice", 0.9)}
${rect(0, 88, 1440, 690, "#0c150f", ' opacity="0.38"')}
${text("人が輝く舞台を、", 115, 360, 56, { fill: "#ffffff", weight: 600 })}
${text("地域につくる", 115, 438, 56, { fill: "#ffffff", weight: 600 })}
${multiText(["不動産、食、ランドリー。", "暮らしに必要な場所を長く整え、", "地域の日常を支える会社です。"], 118, 520, 18, 32, { family: "Arial, sans-serif", fill: "#ffffff" })}
${rect(1040, 605, 300, 96, brand.green)}
${text("ABOUT H&Y", 1190, 665, 17, { family: "Arial, sans-serif", anchor: "middle", fill: "#ffffff", weight: 700 })}

${text("OUR BUSINESS", 86, 900, 16, { family: "Arial, sans-serif", spacing: 3, weight: 700, fill: brand.green })}
${text("事業を知る", 86, 965, 42, { weight: 600 })}
${multiText(["複数の事業を、同じ思想で運営する。", "派手さよりも清潔さ、継続性、地域との接点を大切にしています。"], 86, 1025, 16, 28, { family: "Arial, sans-serif", fill: brand.muted })}
${image("cc-card-1", images.estate, 86, 1130, 380, 245, "xMidYMid slice", 0.92)}
${image("cc-card-2", images.food, 530, 1130, 380, 245, "xMidYMid slice", 0.92)}
${image("cc-card-3", images.laundry, 974, 1130, 380, 245, "xMidYMid slice", 0.92)}
${text("Real Estate", 86, 1438, 28)}
${text("Food & Fermentation", 530, 1438, 28)}
${text("Laundry & Car Care", 974, 1438, 28)}
${multiText(["収益物件を長期視点で運営。", "堺、尼崎、東京へ展開。"], 86, 1480, 15, 25, { family: "Arial, sans-serif", fill: brand.muted })}
${multiText(["発酵料理、料理教室、", "フードトラックの食事業。"], 530, 1480, 15, 25, { family: "Arial, sans-serif", fill: brand.muted })}
${multiText(["ランドリーと洗車場の", "複合施設を地域で運営。"], 974, 1480, 15, 25, { family: "Arial, sans-serif", fill: brand.muted })}

${rect(0, 1640, 1440, 460, brand.pale)}
${text("NEWS", 88, 1750, 16, { family: "Arial, sans-serif", spacing: 4, weight: 700, fill: brand.green })}
${text("お知らせ", 88, 1810, 42, { weight: 600 })}
${line(470, 1745, 1330, 1745, "#cbd4c7")}
${multiText(["2022.01.20  Food", "発酵料理をメインとした飲食店をオープン"], 500, 1810, 17, 40, { family: "Arial, sans-serif", fill: brand.ink })}
${line(470, 1875, 1330, 1875, "#cbd4c7")}
${multiText(["2021.10.01  Company", "株式会社H&Y dupleとして社名変更"], 500, 1940, 17, 40, { family: "Arial, sans-serif", fill: brand.ink })}
${line(470, 2005, 1330, 2005, "#cbd4c7")}
`
  })
);

write(
  "unibio-culture",
  svg({
    title: "unibio culture",
    width: 1440,
    height: 2300,
    background: "#fbfaf5",
    body: `
${rect(0, 0, 1440, 100, "#fbfaf5")}
${image("uc-logo", images.logo, 74, 30, 160, 45, "xMidYMid meet", 1)}
${text("ONLINE STORE", 1080, 60, 13, { family: "Arial, sans-serif", weight: 700, fill: brand.green })}
${text("JOURNAL", 1230, 60, 13, { family: "Arial, sans-serif", weight: 700, fill: brand.ink })}
${image("uc-hero", images.food, 720, 110, 630, 660, "xMidYMid slice", 0.9)}
${rect(76, 160, 570, 530, "#fbfaf5")}
${text("ともに、", 112, 285, 54, { weight: 600 })}
${text("にぎやかな", 112, 360, 54, { weight: 600 })}
${text("地域文化を。", 112, 435, 54, { weight: 600 })}
${multiText(["発酵料理、暮らしの施設、不動産運営。", "毎日の中にある小さな良さを、", "事業として丁寧に続けていく。"], 116, 525, 17, 32, { family: "Arial, sans-serif", fill: brand.ink })}
${rect(116, 625, 186, 54, brand.green)}
${text("VIEW BUSINESS", 209, 660, 13, { family: "Arial, sans-serif", fill: "#ffffff", anchor: "middle", weight: 700 })}

${text("CATEGORY", 78, 910, 15, { family: "Arial, sans-serif", spacing: 4, weight: 700, fill: brand.green })}
${image("uc-cat-1", images.hakko, 78, 965, 385, 360, "xMidYMid slice", 0.95)}
${image("uc-cat-2", images.laundry, 528, 965, 385, 360, "xMidYMid slice", 0.95)}
${image("uc-cat-3", images.estate, 978, 965, 385, 360, "xMidYMid slice", 0.95)}
${text("Food & Fermentation", 78, 1385, 28)}
${text("Laundry", 528, 1385, 28)}
${text("Estate", 978, 1385, 28)}
${multiText(["発酵料理、料理教室、レシピ制作。"], 78, 1425, 15, 24, { family: "Arial, sans-serif", fill: brand.muted })}
${multiText(["待ち時間まで気持ちよく整える。"], 528, 1425, 15, 24, { family: "Arial, sans-serif", fill: brand.muted })}
${multiText(["暮らしの基盤を長期視点で運営。"], 978, 1425, 15, 24, { family: "Arial, sans-serif", fill: brand.muted })}

${rect(0, 1600, 1440, 520, "#ffffff")}
${text("JOURNAL", 78, 1720, 15, { family: "Arial, sans-serif", spacing: 4, weight: 700, fill: brand.green })}
${text("読みもの", 78, 1785, 42, { weight: 600 })}
${image("uc-journal-a", images.sign, 425, 1685, 320, 210, "xMidYMid slice", 0.87)}
${image("uc-journal-b", images.food, 790, 1685, 250, 210, "xMidYMid slice", 0.87)}
${image("uc-journal-c", images.laundry, 1080, 1685, 250, 210, "xMidYMid slice", 0.87)}
${text("1970年から続く地域運営", 425, 1955, 21)}
${text("食の事業がつくる接点", 790, 1955, 21)}
${text("清潔な日常の場所", 1080, 1955, 21)}
${multiText(["microCMSでニュースだけ更新できる、", "放置に強い静的サイト構成。"], 78, 1885, 15, 27, { family: "Arial, sans-serif", fill: brand.muted })}
`
  })
);

fs.writeFileSync(
  path.join(outDir, "README.md"),
  `# Figma full SVG exports

These SVG files are rebuilt as vector layouts with embedded Base64 image data.
Drag and drop the SVG files into Figma. Images should appear without local file links.

- editorial-monochrome.svg
- vertical-gallery.svg
- columbia-corporate.svg
- unibio-culture.svg
`
);

console.log(`Generated Figma SVGs in ${outDir}`);
