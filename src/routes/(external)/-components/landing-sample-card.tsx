import { useState } from "react";

import { Link } from "@tanstack/react-router";

import { Layers } from "lucide-react";

import { StudioGif, type StudioGifId } from "@/components/studio-gif";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { categoryLabel } from "@/lib/i18n/labels";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getInitials } from "@/lib/utils";

import { landingCardClass } from "./landing-reveal";

type LandingSample = {
  id: string;
  category: string;
  gif: StudioGifId;
  gifAlt: MessageKey;
  title: MessageKey;
  purpose: MessageKey;
  creator: MessageKey;
  role: MessageKey;
  sections: number;
  tasks: number;
  peek: MessageKey[];
};

const SAMPLES: LandingSample[] = [
  {
    id: "exam",
    category: "exam",
    gif: "purpose-library",
    gifAlt: "gif.library",
    title: "landing.sample.1.title",
    purpose: "landing.sample.1.purpose",
    creator: "landing.sample.1.creator",
    role: "landing.sample.1.role",
    sections: 6,
    tasks: 42,
    peek: ["landing.demo.section.1", "landing.demo.section.2", "landing.demo.section.3"],
  },
  {
    id: "career",
    category: "career",
    gif: "purpose-plan",
    gifAlt: "gif.plan",
    title: "landing.sample.2.title",
    purpose: "landing.sample.2.purpose",
    creator: "landing.sample.2.creator",
    role: "landing.sample.2.role",
    sections: 5,
    tasks: 31,
    peek: ["landing.sample.2.peek.1", "landing.sample.2.peek.2", "landing.sample.2.peek.3"],
  },
  {
    id: "study",
    category: "study",
    gif: "purpose-complete",
    gifAlt: "gif.complete",
    title: "landing.sample.3.title",
    purpose: "landing.sample.3.purpose",
    creator: "landing.sample.3.creator",
    role: "landing.sample.3.role",
    sections: 4,
    tasks: 24,
    peek: ["landing.sample.3.peek.1", "landing.sample.3.peek.2", "landing.sample.3.peek.3"],
  },
];

export function LandingSampleCard({ sample }: { sample: LandingSample }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const creator = t(sample.creator);

  return (
    <Card className={`h-full overflow-hidden shadow-none ${landingCardClass}`}>
      <button
        type="button"
        className="flex aspect-[16/9] w-full items-center justify-center bg-muted/40"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <StudioGif id={sample.gif} alt={t(sample.gifAlt)} size={148} />
      </button>
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline">{categoryLabel(t, sample.category)}</Badge>
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-lg">{t(sample.title)}</CardTitle>
          <CardDescription className="line-clamp-2">{t(sample.purpose)}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground text-xs">
          <Layers className="size-3.5" />
          {t("systems.libraryMeta", { sections: sample.sections, tasks: sample.tasks })}
        </span>
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-muted font-medium text-[10px]">
            {getInitials(creator)}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-medium text-foreground text-sm">{creator}</span>
            <span className="block truncate text-muted-foreground text-xs">{t(sample.role)}</span>
          </span>
        </div>

        {open ? (
          <ol className="space-y-1.5 rounded-lg border bg-muted/30 p-3">
            {sample.peek.map((section, index) => (
              <li key={section} className="flex gap-2 text-xs leading-relaxed">
                <span className="text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span>{t(section)}</span>
              </li>
            ))}
          </ol>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
            {t("landing.play.try")}
          </Button>
          <Button size="sm" nativeButton={false} render={<Link to="/systems" />}>
            {t("landing.play.live")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { SAMPLES as LANDING_SAMPLES };
