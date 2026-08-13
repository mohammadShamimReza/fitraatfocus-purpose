import { createFileRoute, Link } from "@tanstack/react-router";

import { Command } from "lucide-react";

import { FirebaseConfigAlert } from "../../-components/firebase-config-alert";
import { GoogleSignInButton } from "../../-components/google-sign-in-button";
import { LoginForm } from "../../-components/login-form";
import { RedirectIfSignedIn } from "../../-components/redirect-if-signed-in";

export const Route = createFileRoute("/(main)/auth/v1/login")({
  component: LoginV1,
});

function LoginV1() {
  return (
    <RedirectIfSignedIn>
      <div className="flex h-dvh">
        <div className="hidden bg-primary lg:block lg:w-1/3">
          <div className="flex h-full flex-col items-center justify-center p-12 text-center">
            <div className="space-y-6">
              <Command className="mx-auto size-12 text-primary-foreground" />
              <div className="space-y-2">
                <h1 className="font-light text-5xl text-primary-foreground">Fitraat Focus</h1>
                <p className="text-primary-foreground/80 text-xl">Sign in to publish a purpose system</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center bg-background p-8 lg:w-2/3">
          <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
            <div className="space-y-4 text-center">
              <div className="font-medium tracking-tight">Login</div>
              <div className="mx-auto max-w-xl text-muted-foreground">
                Use the same Google or email account as the Fitraat Focus app.
              </div>
            </div>
            <div className="space-y-4">
              <FirebaseConfigAlert />
              <LoginForm />
              <GoogleSignInButton />
              <p className="text-center text-muted-foreground text-xs">
                Don&apos;t have an account?{" "}
                <Link to="/auth/v1/register" className="text-primary">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </RedirectIfSignedIn>
  );
}
