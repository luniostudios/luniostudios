import type { Metadata } from "next";
import { Fredoka, Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from '@next/third-parties/google';
import { GoogleTagManager } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const custom = Fredoka({
  variable: "--font-gluten",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUNIO Studios - Web Design & Development Agency",
  description: "LUNIO Studios is a cutting-edge design and development agency specializing in creating stunning websites, innovative applications, and immersive digital experiences. Our team of experts combines creativity and technology to bring your vision to life.",
  keywords: [
    "LUNIO Studios",
    "Website Development",
    "Website Design",
    "Website Design and Development Agency",
    "Design and Development Agency",
    "Design",
    "Development",
  ],
  alternates: {
    canonical: "https://www.luniostudios.com/",
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="/images/og.png" />
        <meta property="og:image:alt" content="LUNIO Studios" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:image" content="/images/og.png" />
        <meta property="twitter:image:alt" content="LUNIO Studios" />
        <meta property="twitter:image:type" content="image/png" />
        <meta property="twitter:image:width" content="1200" />
        <meta property="twitter:image:height" content="630" />
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${custom.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
        <GoogleTagManager gtmId="GTM-W8T8ZTKS" />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.$crisp=[];window.CRISP_WEBSITE_ID="f49a14fc-d01b-432a-a6b5-2b9d5c0ae78f";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,}}
        />
      </body>
    </html>
  );
}
