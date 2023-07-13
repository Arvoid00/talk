"use client";
import React from "react";
import Image from "next/image";
import {
  type Session,
  createClientComponentClient
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

export interface UserMenuProps {
  user: Session["user"];
}

const getUserInitials = (name: string): string => {
  const [firstName, lastName] = name.split(` `);
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2);
};

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
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
            {/* <span className="ml-2">{user?.user_metadata.name}</span>
            <span className="w-20 ml-2 overflow-hidden text-ellipsis whitespace-nowrap md:w-full ">
              {user?.name}
            </span> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs font-medium">{user.user_metadata.name}</div>
            <div className="text-xs text-zinc-500">{user.email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem asChild>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full text-xs"
            >
              Vercel Homepage
              <IconExternalLink className="w-3 h-3 ml-auto" />
            </a>
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={signOut} className="text-xs">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
