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
import { getFunctionsErrorMessage } from "@/lib/functions/client";
import { TEMPLATE_CATEGORY_ITEMS } from "@/lib/templates/options";
import { useUpdateTemplateMutation } from "@/query/templates";
import type { PurposeTemplate } from "@/types/template";

const formSchema = z.object({
  title: z.string().trim().min(2, { message: "Give the system a name." }),
  purpose: z.string().trim().min(8, { message: "Describe the purpose in a sentence or two." }),
  story: z.string().trim().min(8, { message: "Say why this system is credible." }),
  description: z.string().trim().min(8, { message: "Add a short description of the library." }),
  category: z.string().min(1, { message: "Choose a category." }),
});

export function EditorMetadataForm({ template }: { template: PurposeTemplate }) {
  const updateTemplate = useUpdateTemplateMutation(template.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: template.title,
      purpose: template.purpose,
      story: template.story,
      description: template.description,
      category: template.category || "exam",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateTemplate.mutateAsync(data);
      toast.add({
        title: "Saved",
        description: "System details were updated.",
      });
    } catch (error) {
      toast.add({
        title: "Could not save",
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purpose and story</CardTitle>
        <CardDescription>This is what people read before they fork the library.</CardDescription>
      </CardHeader>
      <CardContent>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FieldGroup>
            <div className="grid gap-4 md:grid-cols-2">
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="editor-title">Title</FieldLabel>
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
                    <FieldLabel htmlFor="editor-category">Category</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange} items={[...TEMPLATE_CATEGORY_ITEMS]}>
                      <SelectTrigger id="editor-category" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {TEMPLATE_CATEGORY_ITEMS.map((item) => (
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
                  <FieldLabel htmlFor="editor-purpose">Purpose</FieldLabel>
                  <Textarea {...field} id="editor-purpose" />
                  <FieldDescription>The outcome this library is for.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="story"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="editor-story">Story</FieldLabel>
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
                  <FieldLabel htmlFor="editor-description">What is inside</FieldLabel>
                  <Textarea {...field} id="editor-description" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex justify-end">
            <Button type="submit" disabled={updateTemplate.isPending}>
              {updateTemplate.isPending ? "Saving…" : "Save details"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
