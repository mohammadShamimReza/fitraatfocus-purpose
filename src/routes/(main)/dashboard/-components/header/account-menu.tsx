import { useNavigate } from "@tanstack/react-router";

import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { getAuthErrorMessage } from "@/lib/auth/auth-errors";
import { useAuth } from "@/lib/auth/auth-provider";
import { getUserAvatar, getUserDisplayName, getUserEmail } from "@/lib/auth/user-display";
import { getInitials } from "@/lib/utils";

export function AccountMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const name = getUserDisplayName(user);
  const email = getUserEmail(user);
  const avatar = getUserAvatar(user);

  const onSignOut = async () => {
    try {
      await signOut();
      await navigate({ to: "/auth/v1/login", replace: true });
    } catch (error) {
      toast.add({
        title: "Could not sign out",
        description: getAuthErrorMessage(error),
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger nativeButton={false} render={<Avatar className="size-9 rounded-lg" />}>
        <AvatarImage src={avatar || undefined} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
        <div className="grid gap-0.5 px-2 py-1.5 text-sm">
          <span className="truncate font-semibold">{name}</span>
          {email ? <span className="truncate text-muted-foreground text-xs">{email}</span> : null}
        </div>
        <DropdownMenuItem
          onClick={() => {
            void onSignOut();
          }}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
