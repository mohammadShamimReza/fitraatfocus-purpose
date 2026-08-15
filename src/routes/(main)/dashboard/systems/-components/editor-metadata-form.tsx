import { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { TranslateFn } from "@/lib/i18n/translate";
import { useUpdateTemplateMutation } from "@/query/templates";
import type { PurposeTemplate } from "@/types/template";

function createFormSchema(t: TranslateFn) {
  return z.object({
    purpose: z
      .string()
      .trim()
      .min(8, { message: t("newSystem.purposeError") }),
    story: z
      .string()
      .trim()
      .min(8, { message: t("newSystem.storyError") }),
    description: z
      .string()
      .trim()
      .min(8, { message: t("newSystem.insideError") }),
  });
}

export function EditorMetadataForm({ template, canEdit }: { template: PurposeTemplate; canEdit: boolean }) {
  const { t } = useI18n();
  const updateTemplate = useUpdateTemplateMutation(template.id);
  const formSchema = useMemo(() => createFormSchema(t), [t]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: (values, context, options) => zodResolver(formSchema)(values, context, options),
    values: {
      purpose: template.purpose,
      story: template.story,
      description: template.description,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateTemplate.mutateAsync(data);
      toast.add({
        title: t("editor.saved"),
        description: t("editor.savedBody"),
      });
    } catch (error) {
      toast.add({
        title: t("editor.saveError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  if (!canEdit) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("editor.purposeStory")}</CardTitle>
          <CardDescription>{t("editor.purposeStoryHelp")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <h2 className="font-medium text-sm">{t("newSystem.purpose")}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {template.purpose || t("systems.noPurpose")}
            </p>
          </div>
          <div className="space-y-1.5">
            <h2 className="font-medium text-sm">{t("newSystem.story")}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{template.story || t("editor.noStory")}</p>
          </div>
          <div className="space-y-1.5">
            <h2 className="font-medium text-sm">{t("newSystem.inside")}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {template.description || t("editor.noDescription")}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("editor.purposeStory")}</CardTitle>
        <CardDescription>{t("editor.purposeStoryHelp")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FieldGroup>
            <Controller
              control={form.control}
              name="purpose"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="editor-purpose">{t("newSystem.purpose")}</FieldLabel>
                  <Textarea {...field} id="editor-purpose" />
                  <FieldDescription>{t("editor.outcomeHelp")}</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="story"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="editor-story">{t("newSystem.story")}</FieldLabel>
                  <Textarea {...field} id="editor-story" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="editor-description">{t("newSystem.inside")}</FieldLabel>
                  <Textarea {...field} id="editor-description" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex justify-end">
            <Button type="submit" disabled={updateTemplate.isPending}>
              {updateTemplate.isPending ? t("common.save") : t("editor.saveDetails")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
