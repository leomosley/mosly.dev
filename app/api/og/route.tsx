import { ImageResponse } from "next/og";
import { env } from "@/lib/env";

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      tw="bg-neutral-900 text-gray-200"
    >
      <div tw="flex flex-col items-center" style={{ gap: "1.25rem" }}>
        <span
          style={{
            fontWeight: "bold",
            fontSize: "160px",
            marginTop: "50px",
          }}
        >
          {env.DOMAIN}
        </span>
        <span
          style={{
            fontWeight: "800",
            fontSize: "80px",
          }}
          tw="text-gray-500"
        >
          portfolio
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
