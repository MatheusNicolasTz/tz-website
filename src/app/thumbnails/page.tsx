import type { Metadata } from "next";
import Desktop from "../components/Desktop";

export const metadata: Metadata = {
  title: "Matthew | YouTube Thumbnail Designer",
  description: "YouTube thumbnails by Matthew. 500M+ views driven for Like Nastya, Khalid Al Ameri, Corey Funk and 100+ creators.",
};

export default function ThumbnailsPage() {
  return <Desktop initialView="thumbnails" />;
}
