import PageClient from "./PageClient";
import OrganizationSchema from "@/components/OrganizationSchema";
import siteData from "@/data/db_fallback.json";
import { loadPageData } from "@/lib/pageLoader";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata() {
  const content = await loadPageData("home");
  return createPageMetadata("/", content.title, content.meta_description);
}

export default async function Page() {
  const pageContent = await loadPageData("home");
  return <><OrganizationSchema /><PageClient pageContent={pageContent} page_content_json={{ page_content_home: siteData.page_content_home, services_catalog: siteData.services_catalog, valueProps: siteData.valueProps }} /></>;
}
