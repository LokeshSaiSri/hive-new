import { JsonLd } from "@/components/seo/JsonLd";
import {
  homeFaqSchemaItems,
  homeFaqVideoSchemaItems,
} from "@/data/faq-seo";
import { getCoursePageConfig } from "@/data/coursePages/registry";
import type { ProgramSlug } from "@/data/programPages/types";
import {
  buildHubBreadcrumbs,
  buildProgramOverviewBreadcrumbs,
  buildProgramTabBreadcrumbs,
} from "@/lib/seo/breadcrumbs";
import {
  buildBreadcrumbSchema,
  buildCourseSchema,
  buildFaqSchema,
  buildVideoSchema,
  buildWebPageSchema,
  compactSchemas,
} from "@/lib/seo/schema";

function renderSchemas(schemas: Array<Record<string, unknown> | null | undefined>) {
  const data = compactSchemas(schemas);
  if (data.length === 0) return null;
  return <JsonLd data={data.length === 1 ? data[0] : data} />;
}

export function HomePageSchemas() {
  return renderSchemas([
    buildFaqSchema([...homeFaqSchemaItems]),
    ...homeFaqVideoSchemaItems.map((item) =>
      buildVideoSchema({
        name: item.question,
        description: item.description,
        videoId: item.videoId,
      }),
    ),
  ]);
}

export function CourseOverviewSchemas({ slug }: { slug: ProgramSlug }) {
  const config = getCoursePageConfig(slug);

  return renderSchemas([
    buildCourseSchema(slug),
    buildBreadcrumbSchema(buildProgramOverviewBreadcrumbs(slug)),
    buildFaqSchema(config.faqs.items),
  ]);
}

export function ProgramTabSchemas({
  slug,
  tab,
}: {
  slug: ProgramSlug;
  tab: "curriculum" | "placements" | "admissions";
}) {
  const config = getCoursePageConfig(slug);

  return renderSchemas([
    buildBreadcrumbSchema(buildProgramTabBreadcrumbs(slug, tab)),
    buildFaqSchema(config.faqs.items),
  ]);
}

export function HubPageSchemas({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return renderSchemas([
    buildWebPageSchema({ name, description, path }),
    buildBreadcrumbSchema(buildHubBreadcrumbs(name, path)),
  ]);
}
