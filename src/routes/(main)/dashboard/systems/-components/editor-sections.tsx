import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { StudioGif } from "@/components/studio-gif";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { getFunctionsErrorMessage } from "@/lib/functions/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { TranslateFn } from "@/lib/i18n/translate";
import { cn } from "@/lib/utils";
import { useCreateSectionMutation, useDeleteSectionMutation } from "@/query/templates";
import type { TemplateSection, TemplateTask } from "@/types/template";

function createFormSchema(t: TranslateFn) {
  return z.object({
    title: z
      .string()
      .trim()
      .min(2, { message: t("sections.nameError") }),
    description: z.string().trim(),
  });
}

export function EditorSections({
  templateId,
  sections,
  tasks,
  selectedSectionId,
  onSelectSection,
  canEdit,
}: {
  templateId: string;
  sections: TemplateSection[];
  tasks: TemplateTask[];
  selectedSectionId: string | null;
  onSelectSection: (sectionId: string) => void;
  canEdit: boolean;
}) {
  const { t } = useI18n();
  const [isAdding, setIsAdding] = useState(false);
  const createSection = useCreateSectionMutation(templateId);
  const deleteSection = useDeleteSectionMutation(templateId);
  const formSchema = useMemo(() => createFormSchema(t), [t]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: (values, context, options) => zodResolver(formSchema)(values, context, options),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createSection.mutateAsync(data);
      form.reset();
      setIsAdding(false);
    } catch (error) {
      toast.add({
        title: t("sections.addError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  const onDelete = async (sectionId: string) => {
    try {
      await deleteSection.mutateAsync(sectionId);
    } catch (error) {
      toast.add({
        title: t("sections.deleteError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>{t("sections.title")}</CardTitle>
        {canEdit ? (
          <Button size="sm" variant="outline" onClick={() => setIsAdding((open) => !open)} aria-expanded={isAdding}>
            <Plus data-icon="inline-start" />
            {isAdding ? t("common.cancel") : t("common.add")}
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {canEdit && isAdding ? (
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border bg-muted/30 p-3">
            <FieldGroup className="gap-3">
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="section-title">{t("sections.sectionTitle")}</FieldLabel>
                    <Input {...field} id="section-title" placeholder={t("sections.placeholder")} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="section-description">{t("sections.description")}</FieldLabel>
                    <Textarea {...field} id="section-description" placeholder={t("sections.optional")} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Button type="submit" size="sm" disabled={createSection.isPending}>
                {createSection.isPending ? t("sections.adding") : t("sections.add")}
              </Button>
            </FieldGroup>
          </form>
        ) : null}

        {sections.length === 0 && !isAdding ? (
          <Empty className="py-8">
            <EmptyHeader>
              <EmptyMedia>
                <StudioGif id="purpose-library" alt={t("gif.library")} size={120} />
              </EmptyMedia>
              <EmptyTitle>{t("sections.emptyTitle")}</EmptyTitle>
              <EmptyDescription>{canEdit ? t("sections.emptyEdit") : t("sections.emptyView")}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        <ul className="flex flex-col gap-1">
          {sections.map((section) => {
            const count = tasks.filter((task) => task.sectionId === section.id).length;
            const isSelected = selectedSectionId === section.id;

            return (
              <li key={section.id}>
                <div
                  className={cn(
                    "flex items-start gap-1 rounded-lg border px-1 py-1",
                    isSelected ? "border-primary bg-muted/60" : "border-transparent hover:bg-muted/40",
                  )}
                >
                  <button
                    type="button"
                    className="min-w-0 flex-1 rounded-md px-2 py-1.5 text-left"
                    onClick={() => onSelectSection(section.id)}
                    aria-current={isSelected ? "true" : undefined}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium text-sm">{section.title}</span>
                      <span className="shrink-0 text-muted-foreground text-xs">{count}</span>
                    </div>
                    {section.description ? (
                      <div className="mt-0.5 line-clamp-2 text-muted-foreground text-xs">{section.description}</div>
                    ) : null}
                  </button>
                  {canEdit ? (
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      className="mt-1"
                      disabled={deleteSection.isPending}
                      aria-label={t("sections.deleteAria", { title: section.title })}
                      onClick={() => {
                        void onDelete(section.id);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
