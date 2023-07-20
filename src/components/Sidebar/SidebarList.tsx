import React from "react";
import { SidebarActions } from "./SidebarActions";
import { SidebarItem } from "./SidebarItem";
import { shareChat, removeChat, getChats } from "../../actions";

export interface SidebarListProps {
  userId?: string;
}

export const SidebarList = async ({ userId }: SidebarListProps) => {
  const chats = await getChats(userId);

  return (
    <div className="flex-1 overflow-auto">
      {chats.length ? (
        <div className="space-y-2 px-2">
          {chats.map(
            (chat) =>
              chat && (
                <SidebarItem key={chat.id as string} chat={chat}>
                  <SidebarActions
                    chat={chat}
                    removeChat={removeChat}
                    shareChat={shareChat}
                  />
                </SidebarItem>
              )
          )}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No chat history</p>
        </div>
      )}
    </div>
  );
};
