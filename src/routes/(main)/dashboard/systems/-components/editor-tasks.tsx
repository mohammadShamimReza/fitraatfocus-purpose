import { useState } from "react";

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
import { getPriorityLabel, TASK_PRIORITY_ITEMS } from "@/lib/templates/options";
import { useCreateTaskMutation, useDeleteTaskMutation } from "@/query/templates";
import type { TaskPriority, TemplateSection, TemplateTask } from "@/types/template";

const formSchema = z.object({
  title: z.string().trim().min(2, { message: "Name the task." }),
  notes: z.string().trim(),
  priority: z.enum(["low", "medium", "high"]),
  tags: z.string().trim(),
  estimatedMinutes: z.string().trim(),
});

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
}: {
  templateId: string;
  section: TemplateSection | null;
  tasks: TemplateTask[];
}) {
  const [isAdding, setIsAdding] = useState(false);
  const createTask = useCreateTaskMutation(templateId);
  const deleteTask = useDeleteTaskMutation(templateId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
        title: "Could not add task",
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  const onDelete = async (taskId: string) => {
    try {
      await deleteTask.mutateAsync(taskId);
    } catch (error) {
      toast.add({
        title: "Could not delete task",
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>{section ? section.title : "Tasks"}</CardTitle>
        <Button
          size="sm"
          variant="outline"
          disabled={!section}
          onClick={() => setIsAdding((open) => !open)}
          aria-expanded={isAdding}
        >
          <Plus data-icon="inline-start" />
          {isAdding ? "Cancel" : "Add task"}
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {!section ? (
          <Empty className="min-h-56">
            <EmptyHeader>
              <EmptyTitle>Select a section</EmptyTitle>
              <EmptyDescription>Tasks live inside a section of the library.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        {section && isAdding ? (
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border bg-muted/30 p-3">
            <FieldGroup className="gap-3">
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="task-title">Task</FieldLabel>
                    <Input {...field} id="task-title" placeholder="Complete one timed mock paper" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="notes"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="task-notes">How to do it</FieldLabel>
                    <Textarea {...field} id="task-notes" placeholder="The method, not just the title." />
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
                      <FieldLabel htmlFor="task-priority">Priority</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value as TaskPriority)}
                        items={[...TASK_PRIORITY_ITEMS]}
                      >
                        <SelectTrigger id="task-priority" className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {TASK_PRIORITY_ITEMS.map((item) => (
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
                      <FieldLabel htmlFor="task-tags">Tags</FieldLabel>
                      <Input {...field} id="task-tags" placeholder="math, mock" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="estimatedMinutes"
                  render={({ field, fieldState }) => (
                    <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="task-minutes">Minutes</FieldLabel>
                      <Input {...field} id="task-minutes" inputMode="numeric" placeholder="90" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" size="sm" disabled={createTask.isPending}>
                  {createTask.isPending ? "Adding…" : "Add to library"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        ) : null}

        {section && tasks.length === 0 && !isAdding ? (
          <Empty className="min-h-56">
            <EmptyHeader>
              <EmptyTitle>No tasks in this section</EmptyTitle>
              <EmptyDescription>Add the work someone would pick into a day.</EmptyDescription>
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
                    <Badge variant={getPriorityVariant(task.priority)}>{getPriorityLabel(task.priority)}</Badge>
                    {task.estimatedMinutes ? (
                      <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                        <Clock className="size-3" />
                        {task.estimatedMinutes} min
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
                <Button
                  size="icon-xs"
                  variant="ghost"
                  disabled={deleteTask.isPending}
                  aria-label={`Delete ${task.title}`}
                  onClick={() => {
                    void onDelete(task.id);
                  }}
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}
