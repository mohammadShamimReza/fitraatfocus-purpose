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
import { TEMPLATE_CATEGORY_ITEMS } from "@/lib/templates/options";
import { useCreateTemplateMutation } from "@/query/templates";

const formSchema = z.object({
  title: z.string().trim().min(2, { message: "Give the system a name." }),
  purpose: z.string().trim().min(8, { message: "Describe the purpose in a sentence or two." }),
  story: z.string().trim().min(8, { message: "Say why this system is credible." }),
  description: z.string().trim().min(8, { message: "Add a short description of the library." }),
  category: z.string().min(1, { message: "Choose a category." }),
});

export function CreateSystemForm() {
  const navigate = useNavigate();
  const createTemplate = useCreateTemplateMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
        throw new Error("The system could not be created.");
      }

      await navigate({ to: "/dashboard/systems/$templateId", params: { templateId: created.id } });
    } catch (error) {
      toast.add({
        title: "Could not create the system",
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
                  <FieldLabel htmlFor="system-title">Title</FieldLabel>
                  <Input {...field} id="system-title" placeholder="Gaokao first-place study system" />
                  <FieldDescription>The name people will see when they choose this library.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="system-category">Category</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange} items={[...TEMPLATE_CATEGORY_ITEMS]}>
                    <SelectTrigger id="system-category" className="w-full">
                      <SelectValue placeholder="Choose a category" />
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
            <Controller
              control={form.control}
              name="purpose"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="system-purpose">Purpose</FieldLabel>
                  <Textarea {...field} id="system-purpose" placeholder="What this system is for, in plain language." />
                  <FieldDescription>One clear outcome. Not a list of features.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="story"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="system-story">Story</FieldLabel>
                  <Textarea
                    {...field}
                    id="system-story"
                    placeholder="Why you are the person to write this. What you completed."
                  />
                  <FieldDescription>Credibility, not a biography.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="system-description">What is inside</FieldLabel>
                  <Textarea
                    {...field}
                    id="system-description"
                    placeholder="The shape of the library: phases, subjects, or kinds of work."
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex items-center justify-end gap-2 border-t pt-4">
            <Button type="submit" disabled={createTemplate.isPending}>
              {createTemplate.isPending ? "Creating…" : "Continue to library"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
