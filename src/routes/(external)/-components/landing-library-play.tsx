import { useEffect, useState } from "react";

import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";
import type { TranslateFn } from "@/lib/i18n/translate";
import { cn } from "@/lib/utils";

type Pane = "purpose" | "story" | "sections" | "tasks";
export type UseStage = "open" | "copy" | "plan" | "run";

const PANES: { id: Pane; title: MessageKey }[] = [
  { id: "purpose", title: "landing.system.1.title" },
  { id: "story", title: "landing.system.2.title" },
  { id: "sections", title: "landing.system.3.title" },
  { id: "tasks", title: "landing.system.4.title" },
];

const SECTIONS: MessageKey[] = ["landing.demo.section.1", "landing.demo.section.2", "landing.demo.section.3"];

const TASKS: { id: string; title: MessageKey; minutes: number; priority: MessageKey }[] = [
  { id: "map", title: "landing.demo.task.1", minutes: 45, priority: "landing.play.high" },
  { id: "drop", title: "landing.demo.task.2", minutes: 20, priority: "landing.play.medium" },
  { id: "paper", title: "landing.demo.task.3", minutes: 90, priority: "landing.play.high" },
];

const SESSION_STEPS: {
  title: MessageKey;
  body: MessageKey;
  hint: MessageKey;
}[] = [
  { title: "landing.loop.prepare", body: "landing.loop.prepareBody", hint: "landing.loop.prepareHint" },
  { title: "landing.loop.activate", body: "landing.loop.activateBody", hint: "landing.loop.activateHint" },
  { title: "landing.loop.focus", body: "landing.loop.focusBody", hint: "landing.loop.focusHint" },
  { title: "landing.loop.close", body: "landing.loop.closeBody", hint: "landing.loop.closeHint" },
  { title: "landing.loop.reflect", body: "landing.loop.reflectBody", hint: "landing.loop.reflectHint" },
];

export const USE_STAGES: { id: UseStage; title: MessageKey; body: MessageKey }[] = [
  { id: "open", title: "landing.use.1.title", body: "landing.use.1.body" },
  { id: "copy", title: "landing.use.2.title", body: "landing.use.2.body" },
  { id: "plan", title: "landing.use.3.title", body: "landing.use.3.body" },
  { id: "run", title: "landing.use.4.title", body: "landing.use.4.body" },
];

export function InteractiveLibrary({
  compact = false,
  stage: stageProp,
  onStage,
}: {
  compact?: boolean;
  stage?: UseStage;
  onStage?: (stage: UseStage) => void;
}) {
  const { t } = useI18n();
  const [internalStage, setInternalStage] = useState<UseStage>("open");
  const [pane, setPane] = useState<Pane>("purpose");
  const [copied, setCopied] = useState(false);
  const [today, setToday] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [session, setSession] = useState(2);
  const stage = stageProp ?? internalStage;

  useEffect(() => {
    if (stage !== "run" || today.length > 0) {
      return;
    }
    const first = TASKS[0];
    if (!first) {
      return;
    }
    setToday([first.id]);
    setCopied(true);
  }, [stage, today.length]);

  const systemTitle = t("landing.sample.1.title");

  const takeCopy = () => {
    setCopied(true);
    onStage?.("plan");
    if (stageProp === undefined) {
      setInternalStage("plan");
    }
  };

  const toggleToday = (id: string) => {
    setCopied(true);
    setToday((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleDone = (id: string) => {
    setDone((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const beginSession = () => {
    if (today.length === 0) {
      const first = TASKS[0];
      if (first) {
        setToday([first.id]);
      }
    }
    setCopied(true);
    onStage?.("run");
    if (stageProp === undefined) {
      setInternalStage("run");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-sm">{systemTitle}</p>
          <p className="text-muted-foreground text-xs">
            {t("landing.sample.1.creator")} · {t("landing.sample.1.role")}
          </p>
        </div>
        <p className="shrink-0 font-medium text-muted-foreground text-xs">
          {copied ? t("landing.play.copiedShort") : t("landing.preview.live")}
        </p>
      </div>

      {compact && stageProp === undefined ? (
        <div className="flex flex-wrap gap-1 border-b p-2">
          {USE_STAGES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setInternalStage(item.id)}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-xs transition-colors",
                stage === item.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {t(item.title)}
            </button>
          ))}
        </div>
      ) : null}

      {stage === "open" ? (
        <div className="flex flex-wrap gap-1 border-b p-2">
          {PANES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPane(item.id)}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-xs transition-colors",
                pane === item.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {t(item.title)}
            </button>
          ))}
        </div>
      ) : null}

      <div className={cn("p-4", compact ? "min-h-[240px]" : "min-h-[280px]")}>
        {stage === "open" && pane === "purpose" ? (
          <PaneBlock title={t("landing.system.1.title")} body={t("landing.sample.1.purpose")} />
        ) : null}
        {stage === "open" && pane === "story" ? (
          <PaneBlock title={t("landing.system.2.title")} body={t("landing.demo.story")} />
        ) : null}
        {stage === "open" && pane === "sections" ? (
          <ol className="space-y-2">
            {SECTIONS.map((section, index) => (
              <li key={section} className="flex gap-3 rounded-lg border px-3 py-2">
                <span className="font-medium text-muted-foreground text-xs tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm">{t(section)}</span>
              </li>
            ))}
          </ol>
        ) : null}
        {stage === "open" && pane === "tasks" ? (
          <TaskList t={t} systemTitle={systemTitle} today={today} done={done} mode="browse" />
        ) : null}

        {stage === "copy" ? (
          <div className="flex flex-col gap-4">
            <PaneBlock title={t("landing.use.2.title")} body={t("landing.use.2.body")} />
            <Button className="w-fit" variant={copied ? "secondary" : "default"} onClick={takeCopy}>
              {copied ? <Check /> : <Copy />}
              {copied ? t("landing.play.copied") : t("landing.play.takeCopy")}
            </Button>
          </div>
        ) : null}

        {stage === "plan" ? (
          <div className="space-y-4">
            {compact ? null : (
              <TodayBoard t={t} systemTitle={systemTitle} today={today} done={done} onToggleDone={toggleDone} />
            )}
            <div className="space-y-2">
              {compact ? null : <p className="font-medium text-xs">{t("landing.play.libraryTasks")}</p>}
              <TaskList
                t={t}
                systemTitle={systemTitle}
                today={today}
                done={done}
                mode="plan"
                onToggleToday={toggleToday}
              />
            </div>
            {today.length > 0 ? (
              <Button size="sm" variant="outline" className="w-fit" onClick={beginSession}>
                {t("landing.play.begin")}
              </Button>
            ) : null}
          </div>
        ) : null}

        {stage === "run" ? (
          <div className="space-y-4">
            <SessionHint compact={compact} session={session} onSession={setSession} t={t} />
            <TodayBoard t={t} systemTitle={systemTitle} today={today} done={done} onToggleDone={toggleDone} markable />
          </div>
        ) : null}

        {stage === "open" && compact ? (
          <div className="mt-4">
            <Button size="sm" variant={copied ? "secondary" : "outline"} onClick={takeCopy}>
              {copied ? <Check /> : <Copy />}
              {copied ? t("landing.play.copied") : t("landing.play.takeCopy")}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TaskList({
  t,
  systemTitle,
  today,
  done,
  mode,
  onToggleToday,
}: {
  t: TranslateFn;
  systemTitle: string;
  today: string[];
  done: string[];
  mode: "browse" | "plan";
  onToggleToday?: (id: string) => void;
}) {
  return (
    <ul className="space-y-2">
      {TASKS.map((task) => {
        const onToday = today.includes(task.id);
        const isDone = done.includes(task.id);
        return (
          <li key={task.id} className="flex items-start justify-between gap-3 rounded-lg border px-3 py-2">
            <div className="min-w-0">
              <p className={cn("text-sm", isDone && "text-muted-foreground line-through")}>{t(task.title)}</p>
              <p className="mt-0.5 text-muted-foreground text-xs">
                {t(task.priority)} · {t("landing.play.minutes", { count: task.minutes })}
                {onToday ? ` · ${t("landing.play.from", { system: systemTitle })}` : null}
              </p>
            </div>
            {mode === "plan" && onToggleToday ? (
              <Button size="xs" variant={onToday ? "secondary" : "outline"} onClick={() => onToggleToday(task.id)}>
                {onToday ? t("landing.play.onToday") : t("landing.play.addToday")}
              </Button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function TodayBoard({
  t,
  systemTitle,
  today,
  done,
  onToggleDone,
  markable = false,
}: {
  t: TranslateFn;
  systemTitle: string;
  today: string[];
  done: string[];
  onToggleDone: (id: string) => void;
  markable?: boolean;
}) {
  const items = TASKS.filter((task) => today.includes(task.id));

  return (
    <div className="space-y-2">
      <p className="font-medium text-xs">
        {t("landing.play.todayList")}
        {items.length > 0 ? ` · ${items.length}` : null}
      </p>
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed px-3 py-3 text-muted-foreground text-xs leading-relaxed">
          {t("landing.play.todayEmpty")}
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((task) => {
            const isDone = done.includes(task.id);
            return (
              <li
                key={task.id}
                className="flex items-start justify-between gap-3 rounded-lg border bg-muted/30 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground">{t("landing.play.from", { system: systemTitle })}</p>
                  <p className={cn("text-sm", isDone && "text-muted-foreground line-through")}>{t(task.title)}</p>
                  <p className="mt-0.5 text-muted-foreground text-xs">
                    {t(task.priority)} · {t("landing.play.minutes", { count: task.minutes })}
                  </p>
                </div>
                {markable ? (
                  <Button size="xs" variant={isDone ? "secondary" : "outline"} onClick={() => onToggleDone(task.id)}>
                    {isDone ? <Check /> : null}
                    {isDone ? t("landing.play.done") : t("landing.play.markDone")}
                  </Button>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function PaneBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">{title}</p>
      <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function SessionHint({
  compact = false,
  session,
  onSession,
  t,
}: {
  compact?: boolean;
  session: number;
  onSession: (index: number) => void;
  t: TranslateFn;
}) {
  const current = SESSION_STEPS[session] ?? SESSION_STEPS[0];
  if (!current) {
    return null;
  }

  return (
    <div className="space-y-3">
      <p className="font-medium text-xs">{t("landing.play.session")}</p>
      <div className="flex flex-wrap gap-1">
        {SESSION_STEPS.map((step, index) => (
          <button
            key={step.title}
            type="button"
            onClick={() => onSession(index)}
            className={cn(
              "rounded-md px-2 py-1 text-xs transition-colors",
              session === index
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {String(index + 1).padStart(2, "0")} {t(step.title)}
          </button>
        ))}
      </div>
      <p className="font-medium text-sm">{t(current.title)}</p>
      {compact ? null : <p className="text-muted-foreground text-xs leading-relaxed">{t(current.body)}</p>}
      <p className="rounded-lg bg-muted/60 px-3 py-2 text-xs leading-relaxed">{t(current.hint)}</p>
    </div>
  );
}
