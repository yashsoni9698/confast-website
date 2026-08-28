import { ImageResponse } from "next/og";

/* The metadata previously pointed at /og-image.jpg, which does not exist —
   every shared link rendered a broken card. This generates the card at build
   time from the brand palette instead, so there is nothing to keep in sync. */

export const alt = "CONFAST Chemicals — Premium Construction Chemicals";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101010",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <svg width="64" height="50" viewBox="0 0 72 56" fill="none">
            <path d="M36 2 L70 44 L55.5 44 L36 20 L16.5 44 L2 44 Z" fill="#F39100" />
            <path d="M36 30 L47 44 L36 44 L25 44 Z" fill="#F39100" opacity="0.55" />
          </svg>
          <span
            style={{
              color: "#ffffff",
              fontSize: 44,
              fontWeight: 500,
              letterSpacing: "0.22em",
            }}
          >
            CONFAST
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#F39100",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Construction Chemicals · India
          </span>
          <span
            style={{
              marginTop: 24,
              color: "#ffffff",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 940,
            }}
          >
            Engineered to hold everything together.
          </span>
        </div>

        <span style={{ color: "#A3A29E", fontSize: 26 }}>
          Tile adhesives · Epoxy grouts · Block-fix mortars · SBR polymers
        </span>
      </div>
    ),
    size
  );
}
