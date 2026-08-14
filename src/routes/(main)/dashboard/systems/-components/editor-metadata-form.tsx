import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/lib/auth/auth-provider";
import {
  assertCoverFile,
  coverExtension,
  deleteStorageFile,
  templateCoverPath,
  uploadTemplateCover,
} from "@/lib/firebase/storage";
import { getFunctionsErrorMessage } from "@/lib/functions/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categoryLabel, categorySelectItems } from "@/lib/i18n/labels";
import type { TranslateFn } from "@/lib/i18n/translate";
import { useUpdateTemplateMutation } from "@/query/templates";
import type { PurposeTemplate } from "@/types/template";

import { SystemCoverField } from "./system-cover-field";

function createFormSchema(t: TranslateFn) {
  return z.object({
    title: z
      .string()
      .trim()
      .min(2, { message: t("newSystem.titleError") }),
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
    category: z.string().min(1, { message: t("newSystem.categoryError") }),
  });
}

export function EditorMetadataForm({ template, canEdit }: { template: PurposeTemplate; canEdit: boolean }) {
  const { user } = useAuth();
  const { t } = useI18n();
  const updateTemplate = useUpdateTemplateMutation(template.id);
  const [coverBusy, setCoverBusy] = useState(false);
  const formSchema = useMemo(() => createFormSchema(t), [t]);
  const categoryItems = categorySelectItems(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: (values, context, options) => zodResolver(formSchema)(values, context, options),
    values: {
      title: template.title,
      purpose: template.purpose,
      story: template.story,
      description: template.description,
      category: template.category || "exam",
    },
  });

  const onPickCover = async (file: File) => {
    if (!user?.uid) {
      return;
    }

    try {
      assertCoverFile(file, { type: t("cover.typeError"), size: t("cover.sizeError") });
      setCoverBusy(true);
      const path = templateCoverPath(user.uid, template.id, coverExtension(file));
      const imageUrl = await uploadTemplateCover(path, file);
      const previousPath = template.storagePath;
      await updateTemplate.mutateAsync({ imageUrl, storagePath: path });
      if (previousPath && previousPath !== path) {
        await deleteStorageFile(previousPath);
      }
    } catch (error) {
      toast.add({
        title: t("cover.uploadError"),
        description: getFunctionsErrorMessage(error),
      });
    } finally {
      setCoverBusy(false);
    }
  };

  const onRemoveCover = async () => {
    try {
      setCoverBusy(true);
      const previousPath = template.storagePath;
      await updateTemplate.mutateAsync({ imageUrl: "", storagePath: "" });
      if (previousPath) {
        await deleteStorageFile(previousPath);
      }
    } catch (error) {
      toast.add({
        title: t("cover.removeError"),
        description: getFunctionsErrorMessage(error),
      });
    } finally {
      setCoverBusy(false);
    }
  };

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
          <SystemCoverField imageUrl={template.imageUrl} canEdit={false} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <h2 className="font-medium text-sm">{t("newSystem.titleLabel")}</h2>
              <p className="text-sm leading-relaxed">{template.title || t("systems.untitled")}</p>
            </div>
            <div className="space-y-1.5">
              <h2 className="font-medium text-sm">{t("newSystem.category")}</h2>
              <p className="text-sm leading-relaxed">{categoryLabel(t, template.category)}</p>
            </div>
          </div>
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
            <SystemCoverField
              imageUrl={template.imageUrl}
              canEdit
              busy={coverBusy || updateTemplate.isPending}
              onPick={(file) => {
                void onPickCover(file);
              }}
              onRemove={template.imageUrl ? () => void onRemoveCover() : undefined}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="editor-title">{t("newSystem.titleLabel")}</FieldLabel>
                    <Input {...field} id="editor-title" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="category"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="editor-category">{t("newSystem.category")}</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange} items={categoryItems}>
                      <SelectTrigger id="editor-category" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categoryItems.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
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
