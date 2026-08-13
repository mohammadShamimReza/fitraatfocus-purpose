import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { MessageKey } from "@/lib/i18n/messages/en";

export function LandingFaq() {
  const { t } = useI18n();

  return (
    <section id="faq" className="mx-auto flex w-full max-w-6xl scroll-mt-20 flex-col gap-6 px-4 py-16 sm:px-6">
      <div className="max-w-2xl space-y-1.5">
        <p className="font-medium text-muted-foreground text-sm">{t("landing.faq.kicker")}</p>
        <h2 className="text-2xl tracking-tight sm:text-3xl">{t("landing.faq.title")}</h2>
      </div>
      <Accordion className="max-w-3xl">
        {FAQS.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{t(item.question)}</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{t(item.answer)}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
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
