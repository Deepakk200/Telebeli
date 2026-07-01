"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { surface } from "@/lib/surface";

const schema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters."),
  greeting: z.string().min(10, "Greeting should be at least 10 characters."),
  language: z.string().min(1, "Choose a default language."),
  escalationEmail: z.string().email("Enter a valid email address."),
  maxDuration: z
    .number()
    .int("Use a whole number of minutes.")
    .min(1, "At least 1 minute.")
    .max(60, "Keep it under 60 minutes."),
});

type Values = z.infer<typeof schema>;

const languages = ["English", "Spanish", "Mandarin", "Hindi", "Arabic", "German"];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

export function SettingsForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: "Reception",
      greeting: "Hi, thanks for calling Northwind — how can I help you today?",
      language: "English",
      escalationEmail: "ops@telebeli.com",
      maxDuration: 12,
    },
  });

  const onSubmit = async (values: Values) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Agent settings saved", {
      description: `${values.displayName} updated · escalates to ${values.escalationEmail}`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(surface(), "max-w-2xl space-y-6 p-6")}
    >
      <div className="space-y-2">
        <Label htmlFor="displayName">Agent name</Label>
        <Input id="displayName" {...register("displayName")} aria-invalid={!!errors.displayName} />
        <FieldError message={errors.displayName?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="greeting">Opening line</Label>
        <Textarea id="greeting" rows={3} {...register("greeting")} aria-invalid={!!errors.greeting} />
        <FieldError message={errors.greeting?.message} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="language">Default language</Label>
          <Controller
            control={control}
            name="language"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.language?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxDuration">Max call length (min)</Label>
          <Input
            id="maxDuration"
            type="number"
            {...register("maxDuration", { valueAsNumber: true })}
            aria-invalid={!!errors.maxDuration}
          />
          <FieldError message={errors.maxDuration?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="escalationEmail">Human handoff email</Label>
        <Input
          id="escalationEmail"
          type="email"
          {...register("escalationEmail")}
          aria-invalid={!!errors.escalationEmail}
        />
        <FieldError message={errors.escalationEmail?.message} />
      </div>

      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button type="button" variant="ghost">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
