import { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp, Clock, Pencil, Plus, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { getFunctionsErrorMessage } from "@/lib/functions/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { priorityLabel, prioritySelectItems } from "@/lib/i18n/labels";
import type { TranslateFn } from "@/lib/i18n/translate";
import { moveItem } from "@/lib/templates/order";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useReorderTasksMutation,
  useUpdateTaskMutation,
} from "@/query/templates";
import type { TaskPriority, TemplateSection, TemplateTask } from "@/types/template";

function createFormSchema(t: TranslateFn) {
  return z.object({
    title: z
      .string()
      .trim()
      .min(2, { message: t("tasks.nameError") }),
    notes: z.string().trim(),
    priority: z.enum(["low", "medium", "high"]),
    tags: z.string().trim(),
    estimatedMinutes: z.string().trim(),
    sectionId: z.string().trim().min(1),
  });
}

type TaskFormValues = z.infer<ReturnType<typeof createFormSchema>>;

function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parseMinutes(value: string): number | undefined {
  if (!value) {
    return undefined;
  }

  const minutes = Number(value);
  return Number.isFinite(minutes) && minutes > 0 ? minutes : undefined;
}

function getPriorityVariant(priority: TaskPriority): "outline" | "secondary" | "destructive" {
  if (priority === "high") {
    return "destructive";
  }

  if (priority === "low") {
    return "secondary";
  }

  return "outline";
}

function emptyForm(sectionId: string): TaskFormValues {
  return {
    title: "",
    notes: "",
    priority: "medium",
    tags: "",
    estimatedMinutes: "",
    sectionId,
  };
}

export function EditorTasks({
  templateId,
  section,
  sections,
  tasks,
  canEdit,
  onSelectSection,
}: {
  templateId: string;
  section: TemplateSection | null;
  sections: TemplateSection[];
  tasks: TemplateTask[];
  canEdit: boolean;
  onSelectSection: (sectionId: string) => void;
}) {
  const { t } = useI18n();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const createTask = useCreateTaskMutation(templateId);
  const updateTask = useUpdateTaskMutation(templateId);
  const deleteTask = useDeleteTaskMutation(templateId);
  const reorderTasks = useReorderTasksMutation(templateId);
  const formSchema = useMemo(() => createFormSchema(t), [t]);
  const priorityItems = prioritySelectItems(t);
  const sectionItems = sections.map((item) => ({ value: item.id, label: item.title }));
  const form = useForm<TaskFormValues>({
    resolver: (values, context, options) => zodResolver(formSchema)(values, context, options),
    defaultValues: emptyForm(section?.id ?? ""),
  });
  const busy = createTask.isPending || updateTask.isPending || deleteTask.isPending || reorderTasks.isPending;
  const pendingDelete = tasks.find((task) => task.id === deleteId) ?? null;

  useEffect(() => {
    setIsAdding(false);
    setEditingId(null);
    form.reset(emptyForm(section?.id ?? ""));
  }, [form, section?.id]);

  const onCancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
    form.reset(emptyForm(section?.id ?? ""));
  };

  const onSubmit = async (data: TaskFormValues) => {
    const payload = {
      title: data.title,
      notes: data.notes,
      priority: data.priority,
      tags: parseTags(data.tags),
      sectionId: data.sectionId,
      estimatedMinutes: parseMinutes(data.estimatedMinutes),
    };

    try {
      if (editingId) {
        await updateTask.mutateAsync({ taskId: editingId, input: payload });
        if (data.sectionId !== section?.id) {
          onSelectSection(data.sectionId);
        }
        setEditingId(null);
      } else {
        if (!section) {
          return;
        }
        await createTask.mutateAsync({ ...payload, sectionId: section.id });
        setIsAdding(false);
      }
      form.reset(emptyForm(section?.id ?? ""));
    } catch (error) {
      toast.add({
        title: editingId ? t("tasks.editError") : t("tasks.addError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  const onStartEdit = (task: TemplateTask) => {
    setIsAdding(false);
    setEditingId(task.id);
    form.reset({
      title: task.title,
      notes: task.notes,
      priority: task.priority,
      tags: task.tags.join(", "),
      estimatedMinutes: task.estimatedMinutes ? String(task.estimatedMinutes) : "",
      sectionId: task.sectionId,
    });
  };

  const onReorder = async (index: number, direction: -1 | 1) => {
    if (!section) {
      return;
    }

    const next = moveItem(tasks, index, direction);
    if (next === tasks) {
      return;
    }

    try {
      await reorderTasks.mutateAsync({
        sectionId: section.id,
        taskIds: next.map((task) => task.id),
      });
    } catch (error) {
      toast.add({
        title: t("tasks.reorderError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  const onConfirmDelete = async () => {
    if (!deleteId) {
      return;
    }

    try {
      await deleteTask.mutateAsync(deleteId);
      if (editingId === deleteId) {
        onCancelForm();
      }
      setDeleteId(null);
    } catch (error) {
      toast.add({
        title: t("tasks.deleteError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>{section ? section.title : t("tasks.title")}</CardTitle>
        {canEdit ? (
          <Button
            size="sm"
            variant="outline"
            disabled={!section || busy}
            onClick={() => {
              if (isAdding) {
                onCancelForm();
                return;
              }
              setEditingId(null);
              form.reset(emptyForm(section?.id ?? ""));
              setIsAdding(true);
            }}
            aria-expanded={isAdding}
          >
            <Plus data-icon="inline-start" />
            {isAdding ? t("common.cancel") : t("tasks.add")}
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {!section ? (
          <Empty className="min-h-56">
            <EmptyHeader>
              <EmptyTitle>{t("tasks.selectTitle")}</EmptyTitle>
              <EmptyDescription>{t("tasks.selectBody")}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        {section && canEdit && isAdding ? (
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border bg-muted/30 p-3">
            <TaskFields
              form={form}
              t={t}
              pending={createTask.isPending}
              submitLabel={createTask.isPending ? t("tasks.adding") : t("tasks.addLibrary")}
              showSection={false}
              priorityItems={priorityItems}
              sectionItems={sectionItems}
            />
          </form>
        ) : null}

        {section && tasks.length === 0 && !isAdding ? (
          <Empty className="min-h-56">
            <EmptyHeader>
              <EmptyMedia>
                <StudioGif id="purpose-plan" alt={t("gif.plan")} size={120} />
              </EmptyMedia>
              <EmptyTitle>{t("tasks.emptyTitle")}</EmptyTitle>
              <EmptyDescription>{canEdit ? t("tasks.emptyEdit") : t("tasks.emptyView")}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        {section && tasks.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {tasks.map((task, index) => (
              <li key={task.id}>
                {editingId === task.id ? (
                  <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border bg-muted/30 p-3">
                    <TaskFields
                      form={form}
                      t={t}
                      pending={updateTask.isPending}
                      submitLabel={updateTask.isPending ? t("tasks.saving") : t("common.saveChanges")}
                      showSection={sections.length > 1}
                      priorityItems={priorityItems}
                      sectionItems={sectionItems}
                      onCancel={onCancelForm}
                    />
                  </form>
                ) : (
                  <div className="flex items-start gap-2 rounded-lg border px-3 py-3">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-sm">{task.title}</span>
                        <Badge variant={getPriorityVariant(task.priority)}>{priorityLabel(t, task.priority)}</Badge>
                        {task.estimatedMinutes ? (
                          <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                            <Clock className="size-3" />
                            {t("tasks.minutesValue", { count: task.estimatedMinutes })}
                          </span>
                        ) : null}
                      </div>
                      {task.notes ? (
                        <p className="text-muted-foreground text-sm leading-relaxed">{task.notes}</p>
                      ) : null}
                      {task.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    {canEdit ? (
                      <div className="flex shrink-0 flex-col">
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
                          disabled={busy || index === tasks.length - 1}
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
                      <div className="flex shrink-0">
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          disabled={busy}
                          aria-label={t("tasks.editAria", { title: task.title })}
                          onClick={() => onStartEdit(task)}
                        >
                          <Pencil />
                        </Button>
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          disabled={busy}
                          aria-label={t("tasks.deleteAria", { title: task.title })}
                          onClick={() => setDeleteId(task.id)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : null}
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
            <AlertDialogTitle>{t("tasks.deleteConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("tasks.deleteConfirmBody", { title: pendingDelete?.title ?? "" })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteTask.isPending}>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleteTask.isPending}
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

function TaskFields({
  form,
  t,
  pending,
  submitLabel,
  showSection,
  priorityItems,
  sectionItems,
  onCancel,
}: {
  form: ReturnType<typeof useForm<TaskFormValues>>;
  t: TranslateFn;
  pending: boolean;
  submitLabel: string;
  showSection: boolean;
  priorityItems: { value: string; label: string }[];
  sectionItems: { value: string; label: string }[];
  onCancel?: () => void;
}) {
  return (
    <FieldGroup className="gap-3">
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="task-title">{t("tasks.task")}</FieldLabel>
            <Input {...field} id="task-title" placeholder={t("tasks.taskPlaceholder")} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="notes"
        render={({ field, fieldState }) => (
          <Field className="gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="task-notes">{t("tasks.how")}</FieldLabel>
            <Textarea {...field} id="task-notes" placeholder={t("tasks.howPlaceholder")} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {showSection ? (
        <Controller
          control={form.control}
          name="sectionId"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="task-section">{t("tasks.section")}</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange} items={sectionItems}>
                <SelectTrigger id="task-section" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sectionItems.map((item) => (
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
      ) : null}
      <div className="grid gap-3 sm:grid-cols-3">
        <Controller
          control={form.control}
          name="priority"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="task-priority">{t("tasks.priority")}</FieldLabel>
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value as TaskPriority)}
                items={priorityItems}
              >
                <SelectTrigger id="task-priority" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {priorityItems.map((item) => (
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
          name="tags"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="task-tags">{t("tasks.tags")}</FieldLabel>
              <Input {...field} id="task-tags" placeholder={t("tasks.tagsPlaceholder")} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="estimatedMinutes"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="task-minutes">{t("tasks.minutes")}</FieldLabel>
              <Input {...field} id="task-minutes" inputMode="numeric" placeholder="90" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel ? (
          <Button type="button" size="sm" variant="ghost" onClick={onCancel} disabled={pending}>
            {t("common.cancel")}
          </Button>
        ) : null}
        <Button type="submit" size="sm" disabled={pending}>
          {submitLabel}
        </Button>
      </div>
    </FieldGroup>
  );
}
