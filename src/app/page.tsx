import Desktop from "./components/Desktop";
import MobileLanding from "./components/MobileLanding";

export default function Home() {
  return (
    <>
      <div className="home-desktop">
        <Desktop initialView="thumbnails" />
      </div>
      <MobileLanding />
    </>
  );
}
