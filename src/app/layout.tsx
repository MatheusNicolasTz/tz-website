import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matthew | Thumbnails & Development",
  description:
    "Explore Matthew's desktop. YouTube thumbnails with 500M+ views, custom websites, web apps and mobile development. Design and code, all in one place.",
  keywords: [
    "Matthew",
    // The legal name stays in the keywords only, so anyone searching it still
    // lands here without it appearing anywhere on the page.
    "Matheus Nicolas",
    "YouTube thumbnail designer",
    "thumbnail design",
    "thumbnail strategy",
    "Like Nastya thumbnails",
    "YouTube CTR",
    "web development",
    "app development",
    "Next.js developer",
  ],
  authors: [{ name: "Matthew" }],
  creator: "Matthew",
  openGraph: {
    title: "Matthew | Thumbnails & Development",
    description:
      "A little design. A little code. Explore my thumbnails, websites and apps in an interactive desktop portfolio.",
    type: "website",
    locale: "en_US",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matthew | Thumbnails & Development",
    description: "YouTube thumbnails, websites and apps. Welcome to my desktop.",
    images: ["/logo.png"],
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
      className="antialiased"
    >
      <body className="flex min-h-screen flex-col bg-(--color-bg) text-(--color-fg) font-sans selection:bg-(--color-fg) selection:text-(--color-bg)">
        {children}
      </body>
    </html>
  );
}
