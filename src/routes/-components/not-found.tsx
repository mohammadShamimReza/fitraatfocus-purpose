import { Link } from "@tanstack/react-router";

import { FitraatMark } from "@/components/brand/fitraat-mark";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center space-y-2 text-center">
      <FitraatMark className="mb-2 size-8 text-foreground" />
      <h1 className="font-semibold text-2xl">Page not found</h1>
      <p className="text-muted-foreground">That page is not here.</p>
      <Button nativeButton={false} variant="outline" render={<Link to="/" replace />}>
        Go home
      </Button>
    </div>
  );
}
