import type { Metadata } from "next";
import { Fredoka, Fuzzy_Bubbles, Geist, Geist_Mono, Roboto } from "next/font/google";

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

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "LUNIO Studios - Web Design & Development Agency",
  description: "LUNIO Studios is a cutting-edge design and development agency specializing in creating stunning websites, innovative applications, and immersive digital experiences. Our team of experts combines creativity and technology to bring your vision to life.",
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
      </body>
    </html>
  );
}
