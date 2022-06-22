import React from "react";
import ReactDOMServer from "react-dom/server";
import * as playwright from "playwright-aws-lambda";
import { NextApiRequest, NextApiResponse } from "next";
import OgTemplate from "../../components/OgTemplate";

const isDev = process.env.NODE_ENV !== "production";

async function getLaunchOptions() {
  if (isDev) {
    return {
      args: [],
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true,
    };
  } else {
    return {};
  }
}

function getHtml({ title }: { title: string }): string {
  const element = React.createElement(OgTemplate, { title });
  const markup = ReactDOMServer.renderToStaticMarkup(element);

  return `<!doctype html>${markup}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // サイズ設定
  const viewport = { width: 1200, height: 630 };

  // ブラウザインスタンスの生成
  const launchOptions = await getLaunchOptions();

  const browser = await playwright.launchChromium();

  const page = await browser.newPage({ viewport });

  // HTMLの生成
  const html = getHtml({
    title: `WordPress の REST API から記事を全件取得する`,
  });

  // HTMLをセットして、ページの読み込み完了を待つ
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  // スクリーンショットを取得する
  const image = await page.screenshot({ type: "png" });
  await browser.close();

  // Vercel Edge Networkのキャッシュを利用するための設定
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");

  // Content Type を設定
  res.setHeader("Content-Type", "image/png");

  // レスポンスを返す
  res.end(image);
}
