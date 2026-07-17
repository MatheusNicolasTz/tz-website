import Background from "./components/Background";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Projects from "./components/Projects";
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
        <Services mode="dev" index="01" />
        <Projects index="02" />
        <About index="03" />
        <Marquee />
        <Contact index="04" />
      </main>
      <Footer />
    </>
  );
}
