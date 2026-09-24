import type { Metadata } from "next";
import Desktop from "../components/Desktop";

export const metadata: Metadata = {
  title: "Matthew | Web & App Development",
  description: "Websites, web apps and mobile apps by Matthew. Explore Adventure AI, Motoriza and custom portfolios, from interface to launch.",
};

export default function DevPage() {
  return <Desktop initialView="dev" />;
}
