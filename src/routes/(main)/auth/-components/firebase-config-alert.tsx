import { TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth/auth-provider";

export function FirebaseConfigAlert() {
  const { isConfigured } = useAuth();

  if (isConfigured) {
    return null;
  }

  return (
    <Alert variant="destructive">
      <TriangleAlert />
      <AlertTitle>Firebase is not configured</AlertTitle>
      <AlertDescription>
        Copy <code>.env.example</code> to <code>.env</code> and add the shared Fitraat Focus Firebase values.
      </AlertDescription>
    </Alert>
  );
}
