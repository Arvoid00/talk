import React from "react";
import { SidebarItem } from "./SidebarItem";
import { shareChat, removeChat, getChats } from "../../actions";
import { ShareChat } from "./ShareChat";
import { RemoveChat } from "./RemoveChat";

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
                  <div className="space-x-1">
                    <ShareChat chat={chat} onShareChat={shareChat} />
                    <RemoveChat chat={chat} onRemove={removeChat} />
                  </div>
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
