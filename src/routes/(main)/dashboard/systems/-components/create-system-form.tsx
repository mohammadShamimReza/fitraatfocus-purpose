import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "@tanstack/react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { updateTemplate } from "@/lib/api/templates";
import { useAuth } from "@/lib/auth/auth-provider";
import { assertCoverFile, coverExtension, templateCoverPath, uploadTemplateCover } from "@/lib/firebase/storage";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categorySelectItems } from "@/lib/i18n/labels";
import type { TranslateFn } from "@/lib/i18n/translate";
import { useCreateTemplateMutation } from "@/query/templates";

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
    description: z
      .string()
      .trim()
      .min(8, { message: t("newSystem.insideError") }),
    category: z.string().min(1, { message: t("newSystem.categoryError") }),
  });
}

export function CreateSystemForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useI18n();
  const createTemplate = useCreateTemplateMutation();
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverBusy, setCoverBusy] = useState(false);
  const coverPreview = useMemo(() => (coverFile ? URL.createObjectURL(coverFile) : ""), [coverFile]);
  const formSchema = useMemo(() => createFormSchema(t), [t]);
  const categoryItems = categorySelectItems(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: (values, context, options) => zodResolver(formSchema)(values, context, options),
    defaultValues: {
      title: "",
      purpose: "",
      description: "",
      category: "exam",
    },
  });

  useEffect(() => {
    return () => {
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const created = await createTemplate.mutateAsync(data);

      if (!created?.id) {
        throw new Error(t("newSystem.createMissing"));
      }

      if (coverFile && user?.uid) {
        setCoverBusy(true);
        try {
          assertCoverFile(coverFile, { type: t("cover.typeError"), size: t("cover.sizeError") });
          const path = templateCoverPath(user.uid, created.id, coverExtension(coverFile));
          const imageUrl = await uploadTemplateCover(path, coverFile);
          await updateTemplate(created.id, { imageUrl, storagePath: path });
        } catch (error) {
          toast.add({
            title: t("cover.uploadError"),
            description: getFunctionsErrorMessage(error),
          });
        } finally {
          setCoverBusy(false);
        }
      }

      toast.add({
        title: t("newSystem.created"),
        description: t("newSystem.createdHint"),
      });
      await navigate({ to: "/dashboard/systems/$templateId", params: { templateId: created.id } });
    } catch (error) {
      toast.add({
        title: t("newSystem.createError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  return (
    <Card>
      <CardContent>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FieldGroup>
            <SystemCoverField
              imageUrl={coverPreview}
              canEdit
              busy={coverBusy || createTemplate.isPending}
              onPick={(file) => {
                try {
                  assertCoverFile(file, { type: t("cover.typeError"), size: t("cover.sizeError") });
                  setCoverFile(file);
                } catch (error) {
                  toast.add({
                    title: t("cover.uploadError"),
                    description: error instanceof Error ? error.message : t("cover.typeError"),
                  });
                }
              }}
              onRemove={coverFile ? () => setCoverFile(null) : undefined}
            />
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="system-title">{t("newSystem.titleLabel")}</FieldLabel>
                  <Input {...field} id="system-title" placeholder={t("newSystem.titlePlaceholder")} />
                  <FieldDescription>{t("newSystem.titleHelp")}</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="system-category">{t("newSystem.category")}</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange} items={categoryItems}>
                    <SelectTrigger id="system-category" className="w-full">
                      <SelectValue placeholder={t("newSystem.categoryPlaceholder")} />
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
            <Controller
              control={form.control}
              name="purpose"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="system-purpose">{t("newSystem.purpose")}</FieldLabel>
                  <Textarea {...field} id="system-purpose" placeholder={t("newSystem.purposePlaceholder")} />
                  <FieldDescription>{t("newSystem.purposeHelp")}</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="system-description">{t("newSystem.inside")}</FieldLabel>
                  <Textarea {...field} id="system-description" placeholder={t("newSystem.insidePlaceholder")} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex items-center justify-end gap-2 border-t pt-4">
            <Button type="submit" disabled={createTemplate.isPending || coverBusy}>
              {createTemplate.isPending || coverBusy ? t("newSystem.creating") : t("newSystem.continue")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
