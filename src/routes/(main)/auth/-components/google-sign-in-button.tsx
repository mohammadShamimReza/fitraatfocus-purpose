import { useState } from "react";

import { useNavigate } from "@tanstack/react-router";

import { toast } from "@/components/ui/toast";
import { getAuthErrorMessage } from "@/lib/auth/auth-errors";
import { useAuth } from "@/lib/auth/auth-provider";

import { GoogleButton } from "./social-auth/google-button";

export function GoogleSignInButton() {
  const { signInWithGoogle, isConfigured } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClick = async () => {
    setIsSubmitting(true);

    try {
      await signInWithGoogle();
      await navigate({ to: "/dashboard/systems", replace: true });
    } catch (error) {
      toast.add({
        title: "Could not sign in with Google",
        description: getAuthErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GoogleButton
      className="w-full"
      variant="outline"
      type="button"
      disabled={!isConfigured || isSubmitting}
      onClick={() => {
        void onClick();
      }}
    />
  );
}
