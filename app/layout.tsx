/* eslint-disable @next/next/no-page-custom-font */
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { getClientConfig } from "./config/client";
import { type Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "ChatGPT Next Web",
  description: "Your personal ChatGPT Chat Bot.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  appleWebApp: {
    title: "ChatGPT Next Web",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersInstance = headers();
  const host = headersInstance.get("host");
  const gTag = (() => {
    if (host === "chat.vesoft-inc.com") {
      return "G-1RM5M6WEGE";
    } else if (host === "chatbot.vesoft-inc.com") {
      return "G-3YKSQ9EXB9";
    }
    return "G-K2M2Y7RSCK";
  })();
  return (
    <html lang="en">
      <head>
        <meta name="config" content={JSON.stringify(getClientConfig())} />
        <link rel="manifest" href="/site.webmanifest"></link>
        <script src="/serviceWorkerRegister.js" defer></script>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gTag}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${gTag}');`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
