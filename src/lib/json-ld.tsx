import type { Thing } from "schema-dts";

/** Renders typed JSON-LD structured data with the schema.org context. */
export function JsonLd<T extends Thing>({ data }: { data: T }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", ...(data as object) }),
      }}
    />
  );
}
