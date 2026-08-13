import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";

export function LandingProblem() {
  const { t } = useI18n();

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 sm:px-6">
      <div className="max-w-2xl space-y-1.5">
        <p className="font-medium text-muted-foreground text-sm">{t("landing.problem.kicker")}</p>
        <h2 className="text-2xl tracking-tight sm:text-3xl">
          {t("landing.problem.title")}
          <span className="block text-muted-foreground">{t("landing.problem.titleAccent")}</span>
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">{t("landing.problem.body")}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PROBLEMS.map((item, index) => (
          <Card key={item.title} className="shadow-xs">
            <CardHeader className="gap-2">
              <p className="text-muted-foreground text-xs">{String(index + 1).padStart(2, "0")}</p>
              <CardTitle className="text-base">{t(item.title)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(item.body)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

const PROBLEMS: { title: MessageKey; body: MessageKey }[] = [
  { title: "landing.problem.1.title", body: "landing.problem.1.body" },
  { title: "landing.problem.2.title", body: "landing.problem.2.body" },
  { title: "landing.problem.3.title", body: "landing.problem.3.body" },
  { title: "landing.problem.4.title", body: "landing.problem.4.body" },
];
