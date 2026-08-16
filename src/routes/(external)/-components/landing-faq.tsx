import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";

import { LandingKicker, LandingReveal } from "./landing-reveal";
import { UseInAppNote } from "./use-in-app-note";

export function LandingFaq() {
  const { t } = useI18n();

  return (
    <section
      id="faq"
      className="mx-auto flex w-full max-w-6xl scroll-mt-20 flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20"
    >
      <LandingReveal className="max-w-2xl space-y-3">
        <LandingKicker>{t("landing.faq.kicker")}</LandingKicker>
        <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">{t("landing.faq.title")}</h2>
        <UseInAppNote />
      </LandingReveal>
      <LandingReveal>
        <Accordion className="max-w-3xl rounded-xl border bg-card px-4">
          {FAQS.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{t(item.question)}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{t(item.answer)}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </LandingReveal>
    </section>
  );
}

const FAQS: { question: MessageKey; answer: MessageKey }[] = [
  { question: "landing.faq.q1", answer: "landing.faq.a1" },
  { question: "landing.faq.q2", answer: "landing.faq.a2" },
  { question: "landing.faq.q3", answer: "landing.faq.a3" },
  { question: "landing.faq.q4", answer: "landing.faq.a4" },
  { question: "landing.faq.q5", answer: "landing.faq.a5" },
  { question: "landing.faq.q6", answer: "landing.faq.a6" },
];
