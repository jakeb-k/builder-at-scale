import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at top left, rgba(36, 244, 208, 0.22), transparent 38%), radial-gradient(circle at bottom right, rgba(255, 84, 84, 0.2), transparent 34%), linear-gradient(135deg, #030706 0%, #061110 38%, #0b1116 100%)",
          color: "#f5f7f7",
          padding: "72px",
          position: "relative",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            opacity: 0.18,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: 28,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(214, 255, 249, 0.78)",
            }}
          >
            <span>Brisbane, Australia</span>
            <span style={{ color: "rgba(36, 244, 208, 0.9)" }}>•</span>
            <span>Software Engineer</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "860px",
            }}
          >
            <div
              style={{
                fontSize: 88,
                lineHeight: 0.94,
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              Jakeb Knowles
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.25,
                color: "rgba(237, 244, 243, 0.86)",
              }}
            >
              Product-focused builder of web, mobile, API, and AI-assisted software.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "18px",
              flexWrap: "wrap",
              fontSize: 26,
              color: "rgba(210, 222, 221, 0.82)",
            }}
          >
            <span>Code Wrangler @ Simpro</span>
            <span style={{ color: "rgba(255, 84, 84, 0.9)" }}>•</span>
            <span>Builder At Scale</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
