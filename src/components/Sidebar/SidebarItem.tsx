"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TooltipAnchor, useTooltipStore } from "@ariakit/react";
import { buttonVariants } from "../core/Button";
import { IconMessage, IconUsers } from "../core/icons";
import { Tooltip } from "../core/Tooltip";
import { cn } from "../../utils";
import { type Chat } from "../../types";

interface SidebarItemProps {
  chat: Chat;
  children: React.ReactNode;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ chat, children }) => {
  const tooltip = useTooltipStore();
  const pathname = usePathname();
  const isActive = pathname === chat.path;

  if (!chat.id) return null;

  return (
    <div className="relative">
      <div className="absolute left-2 top-1 flex h-6 w-6 items-center justify-center">
        {chat.sharePath ? (
          <>
            <TooltipAnchor
              store={tooltip}
              className="focus:bg-muted focus:ring-1 focus:ring-ring"
            >
              <IconUsers className="mr-2" />
            </TooltipAnchor>
            <Tooltip store={tooltip}>This is a shared chat.</Tooltip>
          </>
        ) : (
          <IconMessage className="mr-2" />
        )}
      </div>
      <Link
        href={chat.path}
        className={cn(
          buttonVariants({ variant: `ghost` }),
          `group w-full pl-8 pr-16`,
          isActive && `bg-accent`
        )}
      >
        <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title={chat.title}
        >
          <span className="whitespace-nowrap">{chat.title}</span>
        </div>
      </Link>
      {isActive && <div className="absolute right-2 top-1">{children}</div>}
    </div>
  );
};
