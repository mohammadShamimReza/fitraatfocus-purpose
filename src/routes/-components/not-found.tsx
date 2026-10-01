import { Link } from "@tanstack/react-router";

import { FitraatBrand } from "@/components/brand/fitraat-mark";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center space-y-2 text-center">
      <FitraatBrand className="mb-2" markClassName="size-8" nameClassName="text-base" />
      <h1 className="font-semibold text-2xl">Page not found</h1>
      <p className="text-muted-foreground">That page is not here.</p>
      <Button nativeButton={false} variant="outline" render={<Link to="/" replace />}>
        Go home
      </Button>
    </div>
  );
}
