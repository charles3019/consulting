import LandingPageView from "@/components/LandingPageView";
import { landingPages } from "@/lib/landingPages";
import { createPageMetadata } from "@/lib/seo";

const page = landingPages.cabling;

export const metadata = createPageMetadata(page.path, page.title, page.description);

export default function Page() {
  return <LandingPageView page={page} />;
}
