import React from "react";
import { SidebarItem } from "./SidebarItem";
import { ShareChat } from "./ShareChat";
import { RemoveChat } from "./RemoveChat";
import { getChats } from "../../actions/getChats";
import { shareChat } from "../../actions/shareChat";
import { removeChat } from "../../actions/removeChat";

export interface SidebarListProps {
  userId?: string;
}

export const SidebarList: React.FC<SidebarListProps> = async ({ userId }) => {
  const chats = await getChats(userId);

  return (
    <div className="flex-1 overflow-auto">
      {chats.length ? (
        <div className="px-2 space-y-2">
          {/* {chats.map((chat) => (
            <SidebarItem key={chat.id as string} chat={chat}>
              <div className="space-x-1">
                <ShareChat chat={chat} onShareChat={shareChat} />
                <RemoveChat chat={chat} onRemove={removeChat} />
              </div>
            </SidebarItem>
          ))} */}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No chat history</p>
        </div>
      )}
    </div>
  );
};
