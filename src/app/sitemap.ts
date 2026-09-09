import type { MetadataRoute } from "next";
import { publicPages, SITE_URL } from "@/lib/seo";
import { caseStudiesData } from "@/lib/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...Object.values(publicPages)
      .filter((page) => !("index" in page) || page.index)
      .map((page) => page.path),
    ...Object.keys(caseStudiesData).map((key) => `/case-studies?project=${key}`),
  ];
  // Only publish last-modified dates when tracked by the CMS.
  return paths.map((path) => ({ url: new URL(path, SITE_URL).href }));
}
