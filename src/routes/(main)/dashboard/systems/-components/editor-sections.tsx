import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { StudioGif } from "@/components/studio-gif";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { TranslateFn } from "@/lib/i18n/translate";
import { moveItem } from "@/lib/templates/order";
import { cn } from "@/lib/utils";
import {
  useCreateSectionMutation,
  useDeleteSectionMutation,
  useReorderSectionsMutation,
  useUpdateSectionMutation,
} from "@/query/templates";
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

type SectionFormValues = z.infer<ReturnType<typeof createFormSchema>>;

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const createSection = useCreateSectionMutation(templateId);
  const updateSection = useUpdateSectionMutation(templateId);
  const deleteSection = useDeleteSectionMutation(templateId);
  const reorderSections = useReorderSectionsMutation(templateId);
  const formSchema = useMemo(() => createFormSchema(t), [t]);
  const form = useForm<SectionFormValues>({
    resolver: (values, context, options) => zodResolver(formSchema)(values, context, options),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const busy =
    createSection.isPending || updateSection.isPending || deleteSection.isPending || reorderSections.isPending;
  const pendingDelete = sections.find((section) => section.id === deleteId) ?? null;

  const resetForm = () => {
    form.reset({ title: "", description: "" });
  };

  const onSubmit = async (data: SectionFormValues) => {
    try {
      if (editingId) {
        await updateSection.mutateAsync({
          sectionId: editingId,
          input: { title: data.title, description: data.description },
        });
        setEditingId(null);
      } else {
        await createSection.mutateAsync(data);
        setIsAdding(false);
      }
      resetForm();
    } catch (error) {
      toast.add({
        title: editingId ? t("sections.editError") : t("sections.addError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  const onStartEdit = (section: TemplateSection) => {
    setIsAdding(false);
    setEditingId(section.id);
    form.reset({ title: section.title, description: section.description });
  };

  const onCancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  const onReorder = async (index: number, direction: -1 | 1) => {
    const next = moveItem(sections, index, direction);
    if (next === sections) {
      return;
    }

    try {
      await reorderSections.mutateAsync({ sectionIds: next.map((section) => section.id) });
    } catch (error) {
      toast.add({
        title: t("sections.reorderError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  const onConfirmDelete = async () => {
    if (!deleteId) {
      return;
    }

    try {
      await deleteSection.mutateAsync(deleteId);
      if (editingId === deleteId) {
        onCancelForm();
      }
      setDeleteId(null);
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
          <Button
            size="sm"
            variant="outline"
            disabled={busy}
            onClick={() => {
              if (isAdding) {
                onCancelForm();
                return;
              }
              setEditingId(null);
              resetForm();
              setIsAdding(true);
            }}
            aria-expanded={isAdding}
          >
            <Plus data-icon="inline-start" />
            {isAdding ? t("common.cancel") : t("common.add")}
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {canEdit && isAdding ? (
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border bg-muted/30 p-3">
            <SectionFields form={form} t={t} pending={createSection.isPending} submitLabel={t("sections.add")} />
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
          {sections.map((section, index) => {
            const count = tasks.filter((task) => task.sectionId === section.id).length;
            const isSelected = selectedSectionId === section.id;
            const isEditing = editingId === section.id;

            return (
              <li key={section.id}>
                {isEditing ? (
                  <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border bg-muted/30 p-3">
                    <SectionFields
                      form={form}
                      t={t}
                      pending={updateSection.isPending}
                      submitLabel={updateSection.isPending ? t("sections.saving") : t("common.saveChanges")}
                      onCancel={onCancelForm}
                    />
                  </form>
                ) : (
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
                      <div className="mt-1 flex shrink-0 flex-col">
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          disabled={busy || index === 0}
                          aria-label={t("common.moveUp")}
                          onClick={() => {
                            void onReorder(index, -1);
                          }}
                        >
                          <ChevronUp />
                        </Button>
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          disabled={busy || index === sections.length - 1}
                          aria-label={t("common.moveDown")}
                          onClick={() => {
                            void onReorder(index, 1);
                          }}
                        >
                          <ChevronDown />
                        </Button>
                      </div>
                    ) : null}
                    {canEdit ? (
                      <div className="mt-1 flex shrink-0">
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          disabled={busy}
                          aria-label={t("sections.editAria", { title: section.title })}
                          onClick={() => onStartEdit(section)}
                        >
                          <Pencil />
                        </Button>
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          disabled={busy}
                          aria-label={t("sections.deleteAria", { title: section.title })}
                          onClick={() => setDeleteId(section.id)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>

      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("sections.deleteConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("sections.deleteConfirmBody", { title: pendingDelete?.title ?? "" })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteSection.isPending}>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleteSection.isPending}
              onClick={() => {
                void onConfirmDelete();
              }}
            >
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

function SectionFields({
  form,
  t,
  pending,
  submitLabel,
  onCancel,
}: {
  form: ReturnType<typeof useForm<SectionFormValues>>;
  t: TranslateFn;
  pending: boolean;
  submitLabel: string;
  onCancel?: () => void;
}) {
  return (
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
      <div className="flex justify-end gap-2">
        {onCancel ? (
          <Button type="button" size="sm" variant="ghost" onClick={onCancel} disabled={pending}>
            {t("common.cancel")}
          </Button>
        ) : null}
        <Button type="submit" size="sm" disabled={pending}>
          {pending && !onCancel ? t("sections.adding") : submitLabel}
        </Button>
      </div>
    </FieldGroup>
  );
}
