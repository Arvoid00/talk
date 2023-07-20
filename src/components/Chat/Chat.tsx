"use client";
import React, { useState } from "react";
import { useChat } from "ai/react";
import type { UseChatOptions, Message, UseChatHelpers } from "ai/react";
import { toast } from "react-hot-toast";
// import { Session } from "@supabase/supabase-js";
import { AlertAuth } from "./AlertAuth";
import { ChatList } from "../Sidebar/ChatList";
import { ChatPanel } from "./ChatPanel";
import { EmptyScreen } from "../EmptyScreen";
import { ChatScrollAnchor } from "./ChatScrollAnchor";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { cn } from "../../utils";
import { models, type Model } from "../../constants/models";
import type { SmolTalkMessage } from "../../types";
import { PreviewTokenDialog } from "./PreviewTokenDialog";

function useSmolTalkChat(
  opts: UseChatOptions & {
    initialMessages?: SmolTalkMessage[]; // overriding just to fit our needs
  }
): UseChatHelpers {
  const { initialMessages, ...rest } = opts;
  return useChat({
    ...rest,
    initialMessages: initialMessages?.map((message) => ({
      ...message
    }))
  });
}

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  userId?: string;
}

export const Chat: React.FC<ChatProps> = ({
  userId,
  id,
  initialMessages,
  className
}) => {
  const [previewToken] = useLocalStorage<string | null>(`ai-token`, null);

  const [model, setModel] = useState<Model>(models[0]);
  const { messages, append, reload, stop, isLoading, input, setInput, error } =
    useSmolTalkChat({
      initialMessages,
      id,
      body: {
        id,
        previewToken,
        model
      },
      // SWYXTODO: check this 401 issue?
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText);
        }
      }
    });

  const isAuthError = error?.message.includes(`Unauthorized`);

  return (
    <>
      <div className={cn(`pb-[200px] pt-4 md:pt-10`, className)}>
        {messages.length > 0 ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : !isLoading ? (
          <EmptyScreen setInput={setInput} />
        ) : null}
      </div>
      {isAuthError && <AlertAuth />}
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        setModel={setModel}
        model={model}
        userId={userId}
      />
      <PreviewTokenDialog />
    </>
  );
};
