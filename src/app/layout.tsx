import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TzDev — Matheus Nicolas | YouTube Thumbnails, Logos & Landing Pages",
  description:
    "Matheus Nicolas (TzDev) — designer and developer. 500M+ YouTube views driven through thumbnails for Like Nastya, Khalid Al Ameri, Corey Funk, Koreannosh, Hudson Matter and more. Building Adventure AI and other products.",
  keywords: [
    "TzDev",
    "Matheus Nicolas",
    "YouTube thumbnail designer",
    "thumbnail design",
    "Adventure AI",
    "Like Nastya thumbnails",
    "vibe coding",
    "landing page",
    "logo design",
  ],
  authors: [{ name: "Matheus Nicolas" }],
  creator: "Matheus Nicolas",
  openGraph: {
    title: "TzDev — Matheus Nicolas",
    description:
      "500M+ YouTube views driven. Thumbnails, logos, landing pages, and Adventure AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TzDev — Matheus Nicolas",
    description: "500M+ YouTube views driven. Designer & developer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[--color-bg] text-[--color-fg] font-sans selection:bg-[--color-fg] selection:text-[--color-bg]">
        {children}
      </body>
    </html>
  );
}
