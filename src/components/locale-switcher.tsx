import { Check, Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALE_META, LOCALES } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/i18n-provider";

export function LocaleSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size="icon" aria-label={t("nav.language")} />}>
        <Languages />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {LOCALES.map((item) => (
          <DropdownMenuItem
            key={item}
            className="justify-between"
            onClick={() => {
              setLocale(item);
            }}
          >
            {LOCALE_META[item].nativeLabel}
            {locale === item ? <Check className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
