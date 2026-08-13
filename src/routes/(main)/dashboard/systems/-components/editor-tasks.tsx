import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Plus, Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { getFunctionsErrorMessage } from "@/lib/functions/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { priorityLabel, prioritySelectItems } from "@/lib/i18n/labels";
import type { TranslateFn } from "@/lib/i18n/translate";
import { useCreateTaskMutation, useDeleteTaskMutation } from "@/query/templates";
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
  });
}

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

export function EditorTasks({
  templateId,
  section,
  tasks,
  canEdit,
}: {
  templateId: string;
  section: TemplateSection | null;
  tasks: TemplateTask[];
  canEdit: boolean;
}) {
  const { t } = useI18n();
  const [isAdding, setIsAdding] = useState(false);
  const createTask = useCreateTaskMutation(templateId);
  const deleteTask = useDeleteTaskMutation(templateId);
  const formSchema = useMemo(() => createFormSchema(t), [t]);
  const priorityItems = prioritySelectItems(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: (values, context, options) => zodResolver(formSchema)(values, context, options),
    defaultValues: {
      title: "",
      notes: "",
      priority: "medium",
      tags: "",
      estimatedMinutes: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!section) {
      return;
    }

    try {
      await createTask.mutateAsync({
        title: data.title,
        notes: data.notes,
        priority: data.priority,
        tags: parseTags(data.tags),
        sectionId: section.id,
        estimatedMinutes: parseMinutes(data.estimatedMinutes),
      });
      form.reset({
        title: "",
        notes: "",
        priority: "medium",
        tags: "",
        estimatedMinutes: "",
      });
      setIsAdding(false);
    } catch (error) {
      toast.add({
        title: t("tasks.addError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  const onDelete = async (taskId: string) => {
    try {
      await deleteTask.mutateAsync(taskId);
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
            disabled={!section}
            onClick={() => setIsAdding((open) => !open)}
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
              <div className="flex justify-end">
                <Button type="submit" size="sm" disabled={createTask.isPending}>
                  {createTask.isPending ? t("tasks.adding") : t("tasks.addLibrary")}
                </Button>
              </div>
            </FieldGroup>
          </form>
        ) : null}

        {section && tasks.length === 0 && !isAdding ? (
          <Empty className="min-h-56">
            <EmptyHeader>
              <EmptyTitle>{t("tasks.emptyTitle")}</EmptyTitle>
              <EmptyDescription>{canEdit ? t("tasks.emptyEdit") : t("tasks.emptyView")}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        {section && tasks.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-start gap-3 rounded-lg border px-3 py-3">
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
                  {task.notes ? <p className="text-muted-foreground text-sm leading-relaxed">{task.notes}</p> : null}
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
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    disabled={deleteTask.isPending}
                    aria-label={t("tasks.deleteAria", { title: task.title })}
                    onClick={() => {
                      void onDelete(task.id);
                    }}
                  >
                    <Trash2 />
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}
