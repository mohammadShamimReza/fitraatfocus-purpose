import { Copy, MessageCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { APP_LINKS } from "@/config/app-config";
import { useI18n } from "@/lib/i18n/i18n-provider";

type TemplateShareActionsProps = {
  templateId: string;
  title: string;
  purpose?: string;
  compact?: boolean;
};

function getTemplateUrl(templateId: string): string {
  if (typeof window === "undefined") {
    return `${APP_LINKS.studio}/systems/${templateId}`;
  }
  return new URL(`/systems/${templateId}`, window.location.origin).toString();
}

function openShareWindow(url: string) {
  if (typeof window === "undefined") return;
  window.open(url, "_blank", "noopener,noreferrer");
}

async function copyText(text: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard unavailable");
  }

  const temp = document.createElement("textarea");
  temp.value = text;
  temp.setAttribute("readonly", "true");
  temp.style.position = "absolute";
  temp.style.opacity = "0";
  document.body.append(temp);
  temp.select();
  document.execCommand("copy");
  temp.remove();
}

export function TemplateShareActions({
  templateId,
  title,
  purpose,
  compact = false,
}: TemplateShareActionsProps) {
  const { t } = useI18n();
  const shareUrl = getTemplateUrl(templateId);
  const shareText = purpose?.trim() ? `${title} — ${purpose}` : title;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const actions = [
    {
      key: "facebook",
      label: "Facebook",
      icon: <span className="font-black text-[11px] leading-none">f</span>,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      key: "x",
      label: "X",
      icon: <span className="font-black text-[11px] leading-none">X</span>,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: <span className="font-black text-[11px] leading-none">in</span>,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: <MessageCircle className="size-3.5" />,
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      key: "telegram",
      label: "Telegram",
      icon: <Send className="size-3.5" />,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
  ] as const;

  return (
    <div className="space-y-2">
      {!compact ? (
        <p className="font-medium text-sm">{t("template.shareTitle")}</p>
      ) : null}
      <div className="flex flex-wrap gap-1.5">
        {actions.map((action) => (
          <Button
            key={action.key}
            variant="outline"
            size={compact ? "icon-xs" : "sm"}
            title={t("template.shareOn", { platform: action.label })}
            aria-label={t("template.shareOn", { platform: action.label })}
            onClick={() => openShareWindow(action.href)}
          >
            {action.icon}
            {compact ? null : action.label}
          </Button>
        ))}
        <Button
          variant="outline"
          size={compact ? "icon-xs" : "sm"}
          title={t("template.copyLink")}
          aria-label={t("template.copyLink")}
          onClick={() => {
            void copyText(shareUrl)
              .then(() => {
                toast.add({
                  title: t("template.linkCopied"),
                  description: t("template.linkCopiedBody"),
                });
              })
              .catch(() => {
                toast.add({
                  title: t("template.copyLinkError"),
                  description: t("common.tryAgain"),
                });
              });
          }}
        >
          <Copy className="size-3.5" />
          {compact ? null : t("template.copyLink")}
        </Button>
      </div>
      {!compact ? (
        <p className="text-muted-foreground text-xs">{t("template.shareHint")}</p>
      ) : null}
    </div>
  );
}
