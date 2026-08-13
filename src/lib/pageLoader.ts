import { getPageContent } from "./db";
import {
  getDefaultPageContent,
  type PageContent,
} from "./contentDefaults";

export type { PageContent } from "./contentDefaults";

export async function loadPageData(pageKey: string): Promise<PageContent> {
  try {
    const data = await getPageContent(pageKey);
    if (data) {
      return {
        page_key: data.page_key || pageKey,
        title: data.title || getDefaultPageContent(pageKey).title,
        meta_description: data.meta_description || getDefaultPageContent(pageKey).meta_description,
        keywords: data.keywords || getDefaultPageContent(pageKey).keywords,
        hero_title: data.hero_title || getDefaultPageContent(pageKey).hero_title,
        hero_subtitle: data.hero_subtitle || getDefaultPageContent(pageKey).hero_subtitle,
        body_text: data.body_text || getDefaultPageContent(pageKey).body_text,
      };
    }
  } catch (err) {
    console.error(`Error loading page content for ${pageKey}, returning static default:`, err);
  }
  return getDefaultPageContent(pageKey);
}
