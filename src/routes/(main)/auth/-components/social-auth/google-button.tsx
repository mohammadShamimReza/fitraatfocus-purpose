import { siGoogle } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GoogleButton({ className, children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="secondary"
      className={cn(
        "group h-12 rounded-xl border border-border/70 bg-background px-4 text-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-accent/60 hover:shadow-md",
        className,
      )}
      {...props}
    >
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-white ring-1 ring-black/10">
        <SimpleIcon icon={siGoogle} className="size-4 fill-[#4285F4]" aria-label="Google" />
      </span>
      <span className="font-medium text-sm tracking-tight">{children ?? "Continue with Google"}</span>
    </Button>
  );
}
