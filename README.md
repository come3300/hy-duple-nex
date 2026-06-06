# hy-duple-next

Next.js + microCMS Hobby + Cloudflare Pages を想定した H&Y duple の静的サイトです。

## Local

```bash
npm install
npm run dev
```

## microCMS

`.env.local` に以下を設定すると `news` API からニュースを取得します。

```bash
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

未設定時は `lib/site-data.ts` の仮データを表示します。

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `out`
- Node.js version: 20.9 以上

## Figma

`designs/pattern-a.svg` と `designs/pattern-b.svg` はFigmaへドラッグ&ドロップで取り込めます。
