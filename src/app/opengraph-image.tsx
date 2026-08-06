import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>OPMX</div>
      <div style={{ fontSize: 32, color: "#d4d4d4", marginTop: 24, maxWidth: 900 }}>
        Opinión pública, con datos que pueden ser auditados
      </div>
    </div>,
    { ...size },
  );
}
