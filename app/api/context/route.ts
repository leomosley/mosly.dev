import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const contextPath = path.join(process.cwd(), "CONTEXT.md");
    const content = fs.readFileSync(contextPath, "utf8");

    return new Response(content, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Error reading CONTEXT.md:", error);
    return new Response("Context file not found", { status: 404 });
  }
}
