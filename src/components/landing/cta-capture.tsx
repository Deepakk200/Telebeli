"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { finalCta } from "@/constants/landing";
import { siteConfig } from "@/config/site";

/**
 * P13 — low-pressure capture (client island). No backend exists, so submitting
 * opens the visitor's email client (an honest capture, not a fabricated success)
 * and confirms with a plain, politely-announced toast. Input is preserved on the
 * native required-validation path.
 */
export function CtaCapture() {
  const [email, setEmail] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = `Please send me the recorded call at ${email}.`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      "Send me the recorded call",
    )}&body=${encodeURIComponent(body)}`;
    toast("Opening your email app to send the request.");
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <Label htmlFor="cta-capture-email" className="sr-only">
        {finalCta.capture.label}
      </Label>
      <Input
        id="cta-capture-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={finalCta.capture.placeholder}
        aria-label={finalCta.capture.label}
        className="flex-1"
      />
      <Button type="submit" variant="secondary" className="shrink-0">
        {finalCta.capture.button}
      </Button>
    </form>
  );
}
