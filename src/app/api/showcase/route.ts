import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const GITHUB_REPO = process.env.GITHUB_REPO || "";

const CATEGORIES = ["sports", "vehicles", "personal", "lifestyle", "events"];

interface GHFile {
  name: string;
  download_url: string;
  type: string;
}

async function listFolder(folder: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/public/showcase/${folder}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 30 }, // cache for 30 seconds
      }
    );

    if (res.status === 404) return [];
    if (!res.ok) return [];

    const files: GHFile[] = await res.json();

    return files
      .filter((f) => f.type === "file" && /\.(png|jpg|jpeg|webp|gif)$/i.test(f.name))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((f) => `/showcase/${folder}/${f.name}`);
  } catch {
    return [];
  }
}

export async function GET() {
  const results: Record<string, string[]> = {};

  await Promise.all(
    CATEGORIES.map(async (cat) => {
      results[cat] = await listFolder(cat);
    })
  );

  return NextResponse.json(results);
}
