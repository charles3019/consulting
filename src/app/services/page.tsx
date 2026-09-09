import PageClient from "./PageClient";
import siteData from "@/data/db_fallback.json";
import { loadPageData } from "@/lib/pageLoader";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata() {
  const content = await loadPageData("services");
  return createPageMetadata("/services", content.title, content.meta_description);
}

export default async function Page() {
  const pageContent = await loadPageData("services");
  return <PageClient pageContent={pageContent} page_content_json={{ page_content_service: siteData.page_content_service }} />;
}
