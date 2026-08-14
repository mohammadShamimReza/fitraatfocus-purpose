import { Layers } from "lucide-react";

import { cn } from "@/lib/utils";

export function SystemCover({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (src) {
    return <img src={src} alt={alt} className={cn("aspect-[16/9] w-full object-cover", className)} />;
  }

  return (
    <div
      className={cn(
        "flex aspect-[16/9] w-full items-center justify-center bg-muted/40",
        className,
      )}
      aria-hidden={alt ? undefined : true}
    >
      <Layers className="size-8 text-muted-foreground" aria-hidden="true" />
      {alt ? <span className="sr-only">{alt}</span> : null}
    </div>
  );
}
