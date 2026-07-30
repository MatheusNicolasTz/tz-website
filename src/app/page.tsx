import Background from "./components/Background";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Projects from "./components/Projects";
import AdventureBrand from "./components/AdventureBrand";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Background />
      <Nav />
      <main id="top" className="relative flex-1">
        <Hero mode="dev" />
        <Services index="01" />
        <Projects index="02" />
        <AdventureBrand index="03" />
        <About index="04" />
        <Marquee mode="dev" />
        <Contact index="05" />
      </main>
      <Footer />
    </>
  );
}
