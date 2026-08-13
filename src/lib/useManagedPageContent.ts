'use client'

import { useEffect, useState } from "react";
import type { PageContent } from "./contentDefaults";

export function useManagedPageContent(
  pageKey: string,
  fallback: PageContent,
) {
  const [content, setContent] = useState<PageContent>(fallback);

  useEffect(() => {
    let active = true;

    async function run() {
      try {
        const response = await fetch(`/api/page-content/${pageKey}`, {
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = (await response.json()) as PageContent;
        if (active) {
          setContent(data);
          document.title = data.title;
        }
      } catch (error) {
        console.error(`Failed to load managed page content for ${pageKey}:`, error);
      }
    }

    void run();

    return () => {
      active = false;
    };
  }, [pageKey]);

  return content;
}
