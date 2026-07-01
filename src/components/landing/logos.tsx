import { FadeIn } from "@/components/motion";

const companies = ["Northwind", "Acme Health", "Vantage", "Loop", "Meridian", "Calder & Co"];

export function Logos() {
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Powering voice for teams handling millions of calls
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {companies.map((name) => (
              <span
                key={name}
                className="text-lg font-semibold tracking-tight text-foreground/70 transition-colors hover:text-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
