import { Waveform } from "@/components/common/waveform";
import { cn } from "@/lib/utils";
import { surface } from "@/lib/surface";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={cn(surface({ tone: "dashed", elevation: "flat" }), "flex flex-col items-center justify-center px-6 py-16 text-center")}>
      <div className="h-12 w-40 opacity-40">
        <Waveform bars={28} animated={false} barClassName="bg-muted-foreground/40" />
      </div>
      <p className="mt-6 text-base font-medium">{title}</p>
      {description ? (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
