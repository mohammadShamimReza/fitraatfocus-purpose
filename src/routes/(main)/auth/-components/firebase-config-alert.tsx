import { TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth/auth-provider";
import { useI18n } from "@/lib/i18n/i18n-provider";

export function FirebaseConfigAlert() {
  const { isConfigured } = useAuth();
  const { t } = useI18n();

  if (isConfigured) {
    return null;
  }

  return (
    <Alert variant="destructive">
      <TriangleAlert />
      <AlertTitle>{t("auth.firebaseMissing")}</AlertTitle>
      <AlertDescription>{t("auth.firebaseHelp")}</AlertDescription>
    </Alert>
  );
}
