import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const TEMPLATE_CARD_SLOTS = ["one", "two", "three", "four", "five", "six"] as const;
const SECTION_SLOTS = ["one", "two", "three", "four"] as const;
const TASK_SLOTS = ["one", "two", "three", "four", "five"] as const;
const SIDEBAR_NAV_SLOTS = ["one", "two", "three", "four"] as const;
const EXPERTISE_SLOTS = ["one", "two", "three", "four", "five"] as const;

function ScreenReaderStatus({ label }: { label: string }) {
  return <span className="sr-only">{label}</span>;
}

export function TemplateCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden pt-0 shadow-none">
      <Skeleton className="aspect-[16/9] w-full rounded-none rounded-t-xl" />
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Skeleton className="h-3 w-40" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-full" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TemplateCardGridSkeleton({
  count = 6,
  columns = "catalog",
  className,
}: {
  count?: number;
  columns?: "catalog" | "creator";
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", columns === "catalog" ? "xl:grid-cols-3" : null, className)}>
      {TEMPLATE_CARD_SLOTS.slice(0, count).map((slot) => (
        <TemplateCardSkeleton key={slot} />
      ))}
    </div>
  );
}

function CreatorHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
      <Skeleton className="size-16 shrink-0 rounded-full" />
      <div className="w-full max-w-2xl space-y-3">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-4 w-72 max-w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CreatorPageSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-8" aria-busy="true" aria-live="polite">
      <ScreenReaderStatus label={label} />
      <CreatorHeaderSkeleton />
      <div className="space-y-4">
        <Skeleton className="h-7 w-48" />
        <TemplateCardGridSkeleton count={4} columns="creator" />
      </div>
    </div>
  );
}

export function CreatorSystemsSkeleton({ label }: { label: string }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <ScreenReaderStatus label={label} />
      <TemplateCardGridSkeleton count={4} columns="creator" />
    </div>
  );
}

export function CatalogGridSkeleton({ label }: { label: string }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <ScreenReaderStatus label={label} />
      <TemplateCardGridSkeleton />
    </div>
  );
}

export function TemplatePageSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-8" aria-busy="true" aria-live="polite">
      <ScreenReaderStatus label={label} />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <Skeleton className="aspect-[16/9] w-full max-w-xl rounded-xl" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-9 w-3/4 max-w-xl" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-2/3 max-w-xl" />
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <div className="flex w-full max-w-xs flex-col gap-3">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      </div>
      <Card>
        <CardHeader className="gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="flex items-start gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]">
        <Card className="gap-3 p-4">
          <Skeleton className="h-5 w-24" />
          {SECTION_SLOTS.map((slot) => (
            <Skeleton key={slot} className="h-12 w-full" />
          ))}
        </Card>
        <Card className="gap-3 p-4">
          <Skeleton className="h-5 w-28" />
          {TASK_SLOTS.map((slot) => (
            <Skeleton key={slot} className="h-14 w-full" />
          ))}
        </Card>
      </div>
    </div>
  );
}

export function SystemsListSkeleton({ label }: { label: string }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <ScreenReaderStatus label={label} />
      <TemplateCardGridSkeleton />
    </div>
  );
}

export function EditorSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-5" aria-busy="true" aria-live="polite">
      <ScreenReaderStatus label={label} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="h-8 w-72 max-w-full" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="flex gap-1 border-b">
        <Skeleton className="h-9 w-20 rounded-none" />
        <Skeleton className="h-9 w-20 rounded-none" />
        <Skeleton className="h-9 w-24 rounded-none" />
      </div>
      <Skeleton className="h-4 w-80 max-w-full" />
      <div className="grid gap-4 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]">
        <Card className="gap-3 p-4">
          {SECTION_SLOTS.map((slot) => (
            <Skeleton key={slot} className="h-12 w-full" />
          ))}
        </Card>
        <Card className="gap-3 p-4">
          {TASK_SLOTS.map((slot) => (
            <Skeleton key={slot} className="h-14 w-full" />
          ))}
        </Card>
      </div>
    </div>
  );
}

export function ProfileFormSkeleton({ label }: { label: string }) {
  return (
    <Card aria-busy="true" aria-live="polite">
      <ScreenReaderStatus label={label} />
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex flex-wrap gap-2">
            {EXPERTISE_SLOTS.map((slot) => (
              <Skeleton key={slot} className="h-8 w-24 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
        <Skeleton className="ml-auto h-9 w-32" />
      </CardContent>
    </Card>
  );
}

export function SessionSkeleton({ label }: { label: string }) {
  return (
    <div className="flex h-dvh" aria-busy="true" aria-live="polite">
      <ScreenReaderStatus label={label} />
      <div className="hidden bg-muted lg:block lg:w-1/3" />
      <div className="flex w-full items-center justify-center p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-3 text-center">
            <Skeleton className="mx-auto h-6 w-28" />
            <Skeleton className="mx-auto h-4 w-full max-w-sm" />
            <Skeleton className="mx-auto h-4 w-2/3" />
          </div>
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSessionSkeleton({ label }: { label: string }) {
  return (
    <div className="flex min-h-svh" aria-busy="true" aria-live="polite">
      <ScreenReaderStatus label={label} />
      <div className="hidden w-[calc(var(--spacing)*68)] shrink-0 border-r bg-sidebar p-4 md:flex md:flex-col md:gap-6">
        <div className="flex items-center gap-2 px-2">
          <Skeleton className="size-8 rounded-[22%]" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex flex-col gap-2">
          {SIDEBAR_NAV_SLOTS.map((slot) => (
            <Skeleton key={slot} className="h-8 w-full" />
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 px-2">
          <Skeleton className="size-8 rounded-full" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 items-center justify-between border-b px-4 lg:px-6">
          <Skeleton className="h-8 w-40" />
          <div className="flex gap-2">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="size-8 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col gap-6 p-4 md:p-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
          <TemplateCardGridSkeleton />
        </div>
      </div>
    </div>
  );
}
