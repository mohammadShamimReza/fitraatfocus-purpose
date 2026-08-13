import { useMemo } from "react";

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
import { getFunctionsErrorMessage } from "@/lib/functions/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categorySelectItems } from "@/lib/i18n/labels";
import type { TranslateFn } from "@/lib/i18n/translate";
import { useCreateTemplateMutation } from "@/query/templates";

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

export function CreateSystemForm() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const createTemplate = useCreateTemplateMutation();
  const formSchema = useMemo(() => createFormSchema(t), [t]);
  const categoryItems = categorySelectItems(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: (values, context, options) => zodResolver(formSchema)(values, context, options),
    defaultValues: {
      title: "",
      purpose: "",
      story: "",
      description: "",
      category: "exam",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const created = await createTemplate.mutateAsync(data);

      if (!created?.id) {
        throw new Error(t("newSystem.createMissing"));
      }

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
              name="story"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="system-story">{t("newSystem.story")}</FieldLabel>
                  <Textarea {...field} id="system-story" placeholder={t("newSystem.storyPlaceholder")} />
                  <FieldDescription>{t("newSystem.storyHelp")}</FieldDescription>
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
            <Button type="submit" disabled={createTemplate.isPending}>
              {createTemplate.isPending ? t("newSystem.creating") : t("newSystem.continue")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
