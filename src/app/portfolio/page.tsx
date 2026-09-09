import PageClient from "./PageClient";
import siteData from "@/data/db_fallback.json";
import { getStaticPageMetadata } from "@/lib/seo";

export const metadata = getStaticPageMetadata("portfolio");

export default function Page() {
  return <PageClient page_content_json={{ page_content_portfolio: siteData.page_content_portfolio }} />;
}
