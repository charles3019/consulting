import { NextResponse } from "next/server";
import { loadPageData } from "@/lib/pageLoader";

export async function GET(
  _request: Request,
  context: { params: Promise<{ pageKey: string }> },
) {
  const { pageKey } = await context.params;
  const content = await loadPageData(pageKey);
  return NextResponse.json(content);
}
