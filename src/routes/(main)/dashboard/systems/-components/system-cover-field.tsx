import { useRef } from "react";

import { ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { useI18n } from "@/lib/i18n/i18n-provider";

export function SystemCoverField({
  imageUrl,
  canEdit,
  busy = false,
  onPick,
  onRemove,
}: {
  imageUrl?: string;
  canEdit: boolean;
  busy?: boolean;
  onPick?: (file: File) => void;
  onRemove?: () => void;
}) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Field className="gap-1.5">
      <FieldLabel>{t("cover.label")}</FieldLabel>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={t("cover.alt")}
          className="aspect-[16/9] w-full max-w-xl rounded-xl border object-cover"
        />
      ) : (
        <div className="flex aspect-[16/9] w-full max-w-xl items-center justify-center rounded-xl border border-dashed bg-muted/40">
          <ImageIcon className="size-8 text-muted-foreground" />
        </div>
      )}
      <FieldDescription>{t("cover.help")}</FieldDescription>
      {canEdit ? (
        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            disabled={busy}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) {
                onPick?.(file);
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            {busy ? t("cover.uploading") : imageUrl ? t("cover.replace") : t("cover.add")}
          </Button>
          {imageUrl && onRemove ? (
            <Button type="button" variant="ghost" size="sm" disabled={busy} onClick={onRemove}>
              {t("cover.remove")}
            </Button>
          ) : null}
        </div>
      ) : null}
    </Field>
  );
}
