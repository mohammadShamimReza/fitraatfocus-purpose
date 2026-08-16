import { type ErrorComponentProps, Link } from "@tanstack/react-router";

import { FitraatMark } from "@/components/brand/fitraat-mark";
import { Button } from "@/components/ui/button";

export function RootError({ error, reset }: ErrorComponentProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <FitraatMark className="size-8 text-foreground" />
      <div className="flex max-w-md flex-col gap-2">
        <h1 className="font-semibold text-2xl">Something went wrong</h1>
        <p className="text-muted-foreground">Try again, or go home.</p>
        {import.meta.env.DEV ? <p className="text-destructive text-sm">{error.message}</p> : null}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={reset}>Try again</Button>
        <Button nativeButton={false} variant="outline" render={<Link to="/" replace />}>
          Go home
        </Button>
      </div>
    </main>
  );
}
