import { notFound } from "next/navigation";
import PageClient from "./PageClient";
import { caseStudiesData } from "@/lib/caseStudies";
import { createPageMetadata } from "@/lib/seo";

type Props = { searchParams: Promise<{ project?: string | string[] }> };

async function getStudy(searchParams: Props["searchParams"]) {
  const { project } = await searchParams;
  const key = project === undefined ? "infra-auto" : project;
  if (typeof key !== "string" || !Object.hasOwn(caseStudiesData, key)) notFound();
  return { key, study: caseStudiesData[key] };
}

export async function generateMetadata({ searchParams }: Props) {
  const { key, study } = await getStudy(searchParams);
  return createPageMetadata(
    `/case-studies?project=${key}`,
    `${study.title} Case Study`,
    `Explore ConnectForge's ${study.title.toLowerCase()} project: the challenge, implementation, technologies and outcomes.`,
  );
}

export default async function Page({ searchParams }: Props) {
  const { key, study } = await getStudy(searchParams);
  return <PageClient study={study} projectKey={key} />;
}
