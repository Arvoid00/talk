"use client";
import React, { useCallback, useTransition } from "react";
import Image from "next/image";
import {
  type Session,
  createClientComponentClient
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { MenuButton, useMenuStore } from "@ariakit/react";
import { Button } from "./core/Button";
import { Menu, MenuItem, MenuSeparator } from "./core/Menu";

export interface UserMenuProps {
  user: Session["user"];
}

const getUserInitials = (name: string): string => {
  const [firstName, lastName] = name.split(` `);
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2);
};

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const menu = useMenuStore();
  const router = useRouter();
  const [, startSignOut] = useTransition();

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const handleSignOut: React.MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      startSignOut(async () => {
        await supabase.auth.signOut();
        router.refresh();
      });
    },
    [router, supabase.auth]
  );

  return (
    <div className="flex items-center justify-between">
      <Button store={menu} as={MenuButton} variant="ghost" className="pl-0">
        {user.user_metadata.avatar_url ? (
          <Image
            height={60}
            width={60}
            className="h-6 w-6 select-none rounded-full ring-1 ring-zinc-100/10 transition-opacity duration-300 hover:opacity-80"
            src={
              user.user_metadata.avatar_url
                ? `${user.user_metadata.avatar_url}&s=60`
                : ``
            }
            alt={user.user_metadata.name ?? `Avatar`}
          />
        ) : (
          <div className="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
            {user.user_metadata.name
              ? getUserInitials(user.user_metadata.name)
              : null}
          </div>
        )}
      </Button>
      <Menu store={menu} className="w-[180px]">
        <MenuItem className="flex-col items-start">
          <div className="text-xs font-medium">{user.user_metadata.name}</div>
          <div className="text-xs text-zinc-500">{user.email}</div>
        </MenuItem>
        <MenuSeparator />
        <MenuItem onClick={handleSignOut} className="text-xs">
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};
