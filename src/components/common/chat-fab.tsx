import Link from "next/link";

import { bookDemoHref } from "@/config/site";

function WhatsAppMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M16.04 3.2c-7.06 0-12.8 5.66-12.8 12.63 0 2.25.61 4.44 1.76 6.35L3.12 29l7.03-1.82a12.9 12.9 0 0 0 5.89 1.42c7.06 0 12.8-5.66 12.8-12.63S23.1 3.2 16.04 3.2Zm0 23.25c-1.9 0-3.76-.5-5.39-1.45l-.39-.23-4.17 1.08 1.11-4.01-.26-.41a10.36 10.36 0 0 1-1.6-5.6c0-5.78 4.76-10.48 10.6-10.48s10.6 4.7 10.6 10.48-4.75 10.62-10.5 10.62Zm5.82-7.83c-.32-.16-1.88-.92-2.17-1.03-.29-.1-.5-.16-.72.16-.21.32-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.58-1.86-1.76-2.18-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.72-1.72-.98-2.36-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.07 1.3 3.28c.16.21 2.25 3.39 5.45 4.75.76.33 1.36.52 1.82.67.76.24 1.46.21 2.01.13.61-.09 1.88-.76 2.14-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z"
      />
    </svg>
  );
}

export function ChatFAB() {
  return (
    <Link
      href={bookDemoHref}
      aria-label="Contact Telebeli"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-floating transition-transform hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
    >
      <WhatsAppMark className="size-7" />
    </Link>
  );
}
