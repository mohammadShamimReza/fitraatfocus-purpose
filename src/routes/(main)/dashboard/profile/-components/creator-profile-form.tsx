import { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { expertiseItems } from "@/lib/i18n/labels";
import type { TranslateFn } from "@/lib/i18n/translate";
import { cn } from "@/lib/utils";
import { useUpdateMyProfileMutation } from "@/query/profiles";
import type { CreatorProfile } from "@/types/profile";

function createFormSchema(t: TranslateFn) {
  return z.object({
    displayName: z
      .string()
      .trim()
      .min(2, { message: t("profile.nameError") }),
    headline: z
      .string()
      .trim()
      .min(8, { message: t("profile.headlineError") }),
    bio: z
      .string()
      .trim()
      .min(12, { message: t("profile.bioError") }),
    proof: z
      .string()
      .trim()
      .min(8, { message: t("profile.proofError") }),
    expertise: z.array(z.string()).min(1, { message: t("profile.expertiseError") }),
    location: z.string().trim(),
    website: z.string().trim(),
    avatarUrl: z.string().trim(),
  });
}

function normalizeWebsite(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function CreatorProfileForm({ profile }: { profile: CreatorProfile }) {
  const { t } = useI18n();
  const updateProfile = useUpdateMyProfileMutation();
  const formSchema = useMemo(() => createFormSchema(t), [t]);
  const expertiseOptions = expertiseItems(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: (values, context, options) => zodResolver(formSchema)(values, context, options),
    values: {
      displayName: profile.displayName,
      headline: profile.headline,
      bio: profile.bio,
      proof: profile.proof,
      expertise: profile.expertise,
      location: profile.location,
      website: profile.website,
      avatarUrl: profile.avatarUrl,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateProfile.mutateAsync({
        ...data,
        website: normalizeWebsite(data.website),
      });
      toast.add({
        title: t("profile.saved"),
        description: t("profile.savedBody"),
      });
    } catch (error) {
      toast.add({
        title: t("profile.saveError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("profile.credibility")}</CardTitle>
        <CardDescription>{t("profile.credibilityHelp")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FieldGroup>
            <Controller
              control={form.control}
              name="displayName"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="profile-name">{t("profile.name")}</FieldLabel>
                  <Input {...field} id="profile-name" placeholder={t("profile.namePlaceholder")} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="headline"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="profile-headline">{t("profile.headline")}</FieldLabel>
                  <Input {...field} id="profile-headline" placeholder={t("profile.headlinePlaceholder")} />
                  <FieldDescription>{t("profile.headlineHelp")}</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="expertise"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel>{t("profile.expertise")}</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {expertiseOptions.map((item) => {
                      const selected = field.value.includes(item.value);

                      return (
                        <Button
                          key={item.value}
                          type="button"
                          size="sm"
                          variant={selected ? "default" : "outline"}
                          className={cn(!selected && "text-muted-foreground")}
                          aria-pressed={selected}
                          onClick={() => {
                            const next = selected
                              ? field.value.filter((value) => value !== item.value)
                              : [...field.value, item.value];
                            field.onChange(next);
                          }}
                        >
                          {item.label}
                        </Button>
                      );
                    })}
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="bio"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="profile-bio">{t("profile.bio")}</FieldLabel>
                  <Textarea {...field} id="profile-bio" placeholder={t("profile.bioPlaceholder")} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="proof"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="profile-proof">{t("profile.proof")}</FieldLabel>
                  <Textarea {...field} id="profile-proof" placeholder={t("profile.proofPlaceholder")} />
                  <FieldDescription>{t("profile.proofHelp")}</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Controller
                control={form.control}
                name="location"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-location">{t("profile.location")}</FieldLabel>
                    <Input {...field} id="profile-location" placeholder="Dhaka" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="website"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-website">{t("profile.website")}</FieldLabel>
                    <Input {...field} id="profile-website" placeholder="https://" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
          <div className="flex justify-end">
            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? t("profile.saving") : t("profile.save")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
