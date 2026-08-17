import { useState } from "react";

import { useNavigate } from "@tanstack/react-router";

import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getFunctionsErrorMessage } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { useDeleteTemplateMutation } from "@/query/templates";

export function DeleteSystemButton({
  templateId,
  title,
  storagePath,
}: {
  templateId: string;
  title: string;
  storagePath?: string;
}) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const deleteTemplate = useDeleteTemplateMutation(templateId);
  const displayTitle = title.trim() || t("systems.untitled");

  const onConfirm = async () => {
    try {
      await deleteTemplate.mutateAsync(storagePath);
      setOpen(false);
      toast.add({
        title: t("editor.deleted"),
        description: t("editor.deletedBody", { title: displayTitle }),
      });
      await navigate({ to: "/dashboard/systems", replace: true });
    } catch (error) {
      toast.add({
        title: t("editor.deleteError"),
        description: getFunctionsErrorMessage(error),
      });
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        className="shrink-0"
        disabled={deleteTemplate.isPending}
        aria-label={t("editor.deleteAria", { title: displayTitle })}
        onClick={() => setOpen(true)}
      >
        <Trash2 data-icon="inline-start" />
        {deleteTemplate.isPending ? t("editor.deleting") : t("editor.delete")}
      </Button>

      <AlertDialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!deleteTemplate.isPending) {
            setOpen(nextOpen);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("editor.deleteConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("editor.deleteConfirmBody", { title: displayTitle })}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteTemplate.isPending}>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              type="button"
              variant="destructive"
              disabled={deleteTemplate.isPending}
              onClick={() => {
                void onConfirm();
              }}
            >
              {deleteTemplate.isPending ? t("editor.deleting") : t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
