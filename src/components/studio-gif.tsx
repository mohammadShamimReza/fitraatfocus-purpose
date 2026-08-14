import { cn } from "@/lib/utils";

export type StudioGifId = "purpose-library" | "purpose-plan" | "purpose-complete";

export function StudioGif({
  id,
  alt,
  size = 160,
  className,
}: {
  id: StudioGifId;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex shrink-0 overflow-hidden", className)}
      style={{ width: size, height: size }}
    >
      <img
        src={`/gifs/${id}-light.gif`}
        alt={alt}
        width={size}
        height={size}
        className="size-full object-contain dark:hidden"
      />
      <img
        src={`/gifs/${id}-dark.gif`}
        alt=""
        width={size}
        height={size}
        className="hidden size-full object-contain dark:block"
        aria-hidden="true"
      />
    </span>
  );
}
