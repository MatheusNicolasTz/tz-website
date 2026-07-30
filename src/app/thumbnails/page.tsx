import type { Metadata } from "next";
import Background from "../components/Background";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Strategy from "../components/Strategy";
import Thumbnails from "../components/Thumbnails";
import BeforeAfter from "../components/BeforeAfter";
import Teardown from "../components/Teardown";
import Clients from "../components/Clients";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import SmoothScroll from "../components/SmoothScroll";

export const metadata: Metadata = {
  title: "TzDev — YouTube Thumbnails | Strategy, Design & CTR",
  description:
    "Matheus Nicolas (TzDev) — YouTube thumbnail designer and strategist. 500M+ views driven for Like Nastya, Khalid Al Ameri, Corey Funk, Koreannosh, Hudson Matter and 100+ other creators.",
};

export default function ThumbnailsPage() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Background />
      <Nav />
      <main id="top" className="relative flex-1">
        <Hero mode="thumbnails" />
        <Strategy index="01" />
        <Thumbnails index="02" />
        <BeforeAfter index="03" />
        <Teardown index="04" />
        <Clients index="05" />
        <Marquee mode="thumbnails" />
        <Contact index="06" />
      </main>
      <Footer />
    </>
  );
}
