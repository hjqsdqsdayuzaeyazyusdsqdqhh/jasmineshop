import { ImageResponse } from "next/og";

export const alt = "JasmineShop — Tout pour votre maison";
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
          padding: "70px 78px",
          background:
            "radial-gradient(900px 600px at 88% 10%, #7B1734 0%, #521025 45%, #350A18 100%)",
          color: "#FFFDF8",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div
              style={{
                width: 66,
                height: 66,
                borderRadius: 18,
                background: "#fffdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7b1734",
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              J
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 42,
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              Jasmine<span style={{ color: "#c6a15b" }}>Shop</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 17,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c6a15b",
            }}
          >
            Casablanca · Maroc
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 3,
              background: "#c6a15b",
              marginBottom: 26,
            }}
          />
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontSize: 82,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.025em",
            }}
          >
            Tout pour votre maison.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 23,
              color: "rgba(255,253,248,0.7)",
            }}
          >
            Maison & lifestyle — Casablanca
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,253,248,0.16)",
            paddingTop: 22,
            fontSize: 19,
            color: "rgba(255,253,248,0.55)",
          }}
        >
          <div style={{ display: "flex" }}>jasmineshop.ma</div>
          <div style={{ display: "flex", color: "#c6a15b" }}>
            L’art de vivre à la marocaine
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
