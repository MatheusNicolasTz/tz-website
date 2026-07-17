import type { Metadata } from "next";
import Background from "../components/Background";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Services from "../components/Services";
import Thumbnails from "../components/Thumbnails";
import AdventureBrand from "../components/AdventureBrand";
import Clients from "../components/Clients";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import SmoothScroll from "../components/SmoothScroll";

export const metadata: Metadata = {
  title: "TzDev — Design | YouTube Thumbnails, Logos & Branding",
  description:
    "Matheus Nicolas (TzDev) — thumbnail and brand designer. 500M+ YouTube views driven through thumbnails for Like Nastya, Khalid Al Ameri, Corey Funk, Koreannosh, Hudson Matter and more.",
};

export default function DesignPage() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Background />
      <Nav />
      <main id="top" className="relative flex-1">
        <Hero mode="design" />
        <Services mode="designer" index="01" />
        <Thumbnails index="02" />
        <AdventureBrand index="03" />
        <Clients index="04" />
        <Marquee />
        <Contact index="05" />
      </main>
      <Footer />
    </>
  );
}
