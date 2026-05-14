import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "TzDev — Matheus Nicolas. 500M+ YouTube views driven.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ece7db",
          color: "#35311f",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={64} height={64} alt="" style={{ objectFit: "contain" }} />
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6f6a55",
              fontWeight: 600,
            }}
          >
            TzDev · Portfolio
          </div>
        </div>

        {/* spacer */}
        <div style={{ flex: 1 }} />

        {/* title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 110,
            lineHeight: 1,
            letterSpacing: -2,
            fontWeight: 500,
          }}
        >
          <span>Matheus</span>
          <span style={{ fontStyle: "italic", color: "#4a4530" }}>Nicolas</span>
        </div>

        {/* subtitle */}
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            lineHeight: 1.3,
            color: "#4a4530",
            maxWidth: 900,
            display: "flex",
          }}
        >
          Thumbnails, logos &amp; products — 500M+ YouTube views for top creators.
        </div>

        {/* bottom row */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: "1px solid #c9c0aa",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#6f6a55",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex" }}>Available · 2026</div>
          <div style={{ display: "flex" }}>Adventure AI · Vibe Coding</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
