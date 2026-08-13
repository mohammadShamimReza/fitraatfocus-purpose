import type { SVGProps } from "react";

import { APP_CONFIG } from "@/config/app-config";
import { cn } from "@/lib/utils";

export function FitraatMark({ className, title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4 shrink-0", className)}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      <title>{title ?? APP_CONFIG.name}</title>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 1.6C7.05 7.45 5.1 11.7 5.1 15.2a6.9 6.9 0 1 0 13.8 0c0-3.5-1.95-7.75-6.9-13.6Zm0 8.55a4.95 4.95 0 1 0 0 9.9 4.95 4.95 0 0 0 0-9.9Z"
      />
      <path
        d="M9.55 15.35 11.4 17.2l3.55-3.7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FitraatBrand({
  className,
  markClassName,
  nameClassName,
}: {
  className?: string;
  markClassName?: string;
  nameClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <FitraatMark className={cn("size-5", markClassName)} />
      <span className={cn("font-semibold tracking-tight", nameClassName)}>{APP_CONFIG.name}</span>
    </span>
  );
}

export function FitraatAppIcon({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-[22%] bg-background text-foreground shadow-sm ring-1 ring-foreground/10",
        className,
      )}
    >
      <FitraatMark className={cn("size-[68%]", markClassName)} />
    </span>
  );
}
