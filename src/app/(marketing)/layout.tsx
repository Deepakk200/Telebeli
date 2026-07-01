import { ScrollProgressProvider } from "@/providers/scroll-progress";
import { ScrollProgress } from "@/components/common/scroll-progress";
import { BackToTop } from "@/components/common/back-to-top";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollProgressProvider>
      <ScrollProgress />
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
      <BackToTop />
    </ScrollProgressProvider>
  );
}
