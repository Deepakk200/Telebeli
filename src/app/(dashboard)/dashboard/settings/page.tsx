import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsForm } from "@/components/dashboard/settings-form";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Agent settings"
        description="Tune how your voice agent greets, speaks, and hands off to a human."
      />
      <SettingsForm />
    </div>
  );
}
