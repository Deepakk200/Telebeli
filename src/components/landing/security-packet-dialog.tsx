"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";

/**
 * P08 — "Request the security packet" capture (client island; the Dialog
 * primitive supplies the focus trap + Esc-restore). No backend exists yet, so
 * the request is an honest mailto capture rather than a fake success state.
 */
export function SecurityPacketDialog() {
  const [email, setEmail] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = `Please send the Telebeli security packet to ${email || "this address"}.`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      "Security packet request",
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Request the security packet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request the security packet</DialogTitle>
          <DialogDescription>
            We&apos;ll email the packet — current SOC 2 status, subprocessors, DPA, and the security
            overview.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="security-packet-email">Work email</Label>
            <Input
              id="security-packet-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Send me the packet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
