import { getBlog } from "@/lib/blog";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { env } from "@/lib/env";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ slug: string }> },
) {
  const params = await props.params;
  const blog = await getBlog(params.slug + ".md");

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
            fontWeight: "800",
            fontSize: "100px",
            marginTop: "50px",
          }}
        >
          {blog ? blog.data.title : "404"}
        </span>
        <span style={{}} tw="text-3xl tracking-tight text-gray-500">
          {env.NEXT_PUBLIC_DOMAIN} | blog
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
