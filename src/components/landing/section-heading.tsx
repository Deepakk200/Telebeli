import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion";
import { TextReveal } from "@/components/motion/text-reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
};

export function SectionHeading({ eyebrow, title, description, className, align = "center" }: Props) {
  return (
    <FadeIn
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? <p className="mb-3 text-sm font-medium text-brand">{eyebrow}</p> : null}
      <TextReveal as="h2" className="text-balance text-h2 font-semibold tracking-tight">
        {title}
      </TextReveal>
      {description ? (
        <p className="mt-4 text-pretty text-lead text-muted-foreground">{description}</p>
      ) : null}
    </FadeIn>
  );
}
