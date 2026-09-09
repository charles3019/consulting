import PageClient from "./PageClient";
import { getStaticPageMetadata } from "@/lib/seo";

export const metadata = getStaticPageMetadata("testimonials");

export default function Page() {
  return <PageClient  />;
}
