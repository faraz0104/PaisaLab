import { ImageResponse } from "next/og";
import { ALL_CALCULATORS, CALC_META } from "@/lib/seo";

export const runtime = "edge";

type CalcEntry = (typeof ALL_CALCULATORS)[number];
const CALC_MAP = new Map<string, { label: string; icon: string }>(
  (ALL_CALCULATORS as readonly CalcEntry[]).map((c) => [c.slug, { label: c.label, icon: c.icon }])
);

function getInfo(rawSlug: string): { title: string; icon: string } {
  const slug = rawSlug.replace(/\.png$/i, "");
  if (slug === "home") return { title: "Free Finance Calculators", icon: "🧮" };
  const meta = CALC_META[slug];
  const calc = CALC_MAP.get(slug);
  const title = meta ? meta.h1.split("—")[0].trim() : (calc?.label ?? "Finance Calculator");
  return { title, icon: calc?.icon ?? "🧮" };
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const { title, icon } = getInfo(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "60px 70px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Brand bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52, height: 52, borderRadius: 14,
              background: "#10b981",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, color: "white", fontWeight: 800,
            }}
          >
            ₹
          </div>
          <span style={{ color: "#e2e8f0", fontSize: 26, fontWeight: 700 }}>RupeesCalc</span>
          <span
            style={{
              marginLeft: 8,
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#10b981",
              padding: "4px 16px",
              borderRadius: 100,
              fontSize: 16,
            }}
          >
            Free Calculator
          </span>
        </div>

        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 88, lineHeight: 1 }}>{icon}</div>
          <h1
            style={{
              color: "white",
              fontSize: title.length > 36 ? 50 : 64,
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            {title}
          </h1>
          <p style={{ color: "#10b981", fontSize: 28, margin: 0, fontWeight: 600 }}>
            Free · Instant · No Signup Required
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 22,
          }}
        >
          <span style={{ color: "#64748b", fontSize: 20 }}>rupeescalc.in</span>
          <div
            style={{
              background: "#10b981",
              color: "white",
              padding: "10px 28px",
              borderRadius: 100,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Calculate Now →
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
