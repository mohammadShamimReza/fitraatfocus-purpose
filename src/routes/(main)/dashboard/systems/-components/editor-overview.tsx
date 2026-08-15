import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-provider";
import {
  assertCoverFile,
  coverExtension,
  deleteStorageFile,
  templateCoverPath,
  uploadTemplateCover,
} from "@/lib/firebase/storage";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categoryLabel, categorySelectItems, visibilitySelectItems } from "@/lib/i18n/labels";
import type { TranslateFn } from "@/lib/i18n/translate";
import { useUpdateTemplateMutation } from "@/query/templates";
import type { PurposeTemplateDetail, TemplateVisibility } from "@/types/template";

import { OwnerInsights } from "./owner-insights";
import { SystemCoverField } from "./system-cover-field";

function createFormSchema(t: TranslateFn) {
  return z.object({
    title: z
      .string()
      .trim()
      .min(2, { message: t("newSystem.titleError") }),
    category: z.string().min(1, { message: t("newSystem.categoryError") }),
  });
}

export function EditorOverview({ template, canEdit }: { template: PurposeTemplateDetail; canEdit: boolean }) {
  const { user } = useAuth();
  const { t } = useI18n();
  const updateTemplate = useUpdateTemplateMutation(template.id);
  const [coverBusy, setCoverBusy] = useState(false);
  const formSchema = useMemo(() => createFormSchema(t), [t]);
  const categoryItems = categorySelectItems(t);
  const visibilityItems = visibilitySelectItems(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: (values, context, options) => zodResolver(formSchema)(values, context, options),
    values: {
      title: template.title,
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
        description: t("editor.savedOverviewBody"),
      });
    } catch (error) {
      toast.add({
        title: t("editor.saveError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  const onVisibilityChange = async (visibility: TemplateVisibility) => {
    try {
      await updateTemplate.mutateAsync({ visibility });
      toast.add({
        title: t("visibility.saved"),
        description: visibility === "public" ? t("visibility.savedPublic") : t("visibility.savedPrivate"),
      });
    } catch (error) {
      toast.add({
        title: t("visibility.error"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {canEdit ? <OwnerInsights template={template} /> : null}

      {canEdit ? (
        <Card>
          <CardHeader>
            <CardTitle>{t("editor.identity")}</CardTitle>
            <CardDescription>{t("editor.identityHelp")}</CardDescription>
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
                        <FieldLabel htmlFor="overview-title">{t("newSystem.titleLabel")}</FieldLabel>
                        <Input {...field} id="overview-title" />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="category"
                    render={({ field, fieldState }) => (
                      <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="overview-category">{t("newSystem.category")}</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange} items={categoryItems}>
                          <SelectTrigger id="overview-category" className="w-full">
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
              </FieldGroup>
              <div className="flex justify-end">
                <Button type="submit" disabled={updateTemplate.isPending || coverBusy}>
                  {updateTemplate.isPending ? t("common.save") : t("editor.saveOverview")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t("editor.identity")}</CardTitle>
            <CardDescription>{t("editor.identityHelp")}</CardDescription>
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
          </CardContent>
        </Card>
      )}

      {canEdit ? (
        <Card>
          <CardHeader>
            <CardTitle>{t("editor.visibility")}</CardTitle>
            <CardDescription>{t("visibility.help")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={template.visibility === "public" ? "public" : "private"}
              onValueChange={(value) => {
                void onVisibilityChange(value === "public" ? "public" : "private");
              }}
              items={visibilityItems}
              disabled={updateTemplate.isPending}
            >
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {visibilityItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
