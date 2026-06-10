import Background from "./components/Background";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Thumbnails from "./components/Thumbnails";
import AdventureBrand from "./components/AdventureBrand";
import Clients from "./components/Clients";
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
        <Hero />
        <Services />
        <Thumbnails />
        <AdventureBrand />
        <Clients />
        <Projects />
        <About />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
