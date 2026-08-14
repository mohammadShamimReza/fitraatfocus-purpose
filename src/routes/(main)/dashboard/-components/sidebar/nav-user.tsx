import { Link, useNavigate } from "@tanstack/react-router";

import { CircleUser, EllipsisVertical, LayoutGrid, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { toast } from "@/components/ui/toast";
import { getAuthErrorKey } from "@/lib/auth/auth-errors";
import { useAuth } from "@/lib/auth/auth-provider";
import { LANDING_PATH } from "@/lib/auth/post-auth-path";
import { getUserAvatar, getUserDisplayName, getUserEmail } from "@/lib/auth/user-display";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { getInitials } from "@/lib/utils";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, signOut } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const name = getUserDisplayName(user);
  const email = getUserEmail(user);
  const avatar = getUserAvatar(user);

  const onSignOut = async () => {
    try {
      await signOut();
      await navigate({ href: LANDING_PATH, replace: true });
    } catch (error) {
      toast.add({
        title: t("auth.signOutFailed"),
        description: t(getAuthErrorKey(error)),
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarImage src={avatar || undefined} alt={name} />
              <AvatarFallback className="rounded-lg">{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{name}</span>
              <span className="truncate text-muted-foreground text-xs">{email}</span>
            </div>
            <EllipsisVertical className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--anchor-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar || undefined} alt={name} />
                <AvatarFallback className="rounded-lg">{getInitials(name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-muted-foreground text-xs">{email}</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link to="/systems" />}>
              <LayoutGrid />
              {t("nav.catalog")}
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link to="/dashboard/profile" />}>
              <CircleUser />
              {t("nav.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                void onSignOut();
              }}
            >
              <LogOut />
              {t("nav.logOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
