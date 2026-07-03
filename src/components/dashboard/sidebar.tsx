import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { SidebarNav } from "./sidebar-nav";
import { Button } from "@/components/ui/button";
import { bookDemoHref } from "@/config/site";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Logo href="/dashboard" />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarNav />
      </div>
      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-brand/10 p-4">
          <p className="text-sm font-medium">Growth trial</p>
          <p className="mt-1 text-xs text-muted-foreground">184k of 250k minutes used</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full w-[74%] rounded-full bg-brand" />
          </div>
          <Button asChild size="sm" className="mt-3 w-full">
            <Link href={bookDemoHref}>Talk to our team</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
