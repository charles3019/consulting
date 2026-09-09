import PageClient from "./PageClient";
import { getStaticPageMetadata } from "@/lib/seo";
import { todayInLondon } from "@/lib/booking";

export const dynamic = "force-dynamic";

export const metadata = getStaticPageMetadata("book-consultation");

export default function Page() {
  return <PageClient today={todayInLondon()} />;
}
