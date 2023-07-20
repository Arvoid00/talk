"use client";
import React, { useState } from "react";
import { useChat } from "ai/react";
import type { UseChatOptions, Message } from "ai/react";
import { toast } from "react-hot-toast";
// import { Session } from "@supabase/supabase-js";
import { Button } from "./core/Button";
import { TextInput } from "./core/TextInput";
import { AlertAuth } from "./AlertAuth";
import { ChatList } from "./ChatList";
import { ChatPanel } from "./ChatPanel";
import { EmptyScreen } from "./EmptyScreen";
import { ChatScrollAnchor } from "./ChatScrollAnchor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./core/Dialog";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { cn } from "../utils";
import { models, type Model } from "../constants/models";
import type { SmolTalkMessage } from "../types";

const IS_PREVIEW = process.env.VERCEL_ENV === `preview`;
export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  userId?: string;
}

function useSmolTalkChat(
  opts: UseChatOptions & {
    initialMessages?: SmolTalkMessage[]; // overriding just to fit our needs
  }
) {
  const { initialMessages, ...rest } = opts;
  return useChat({
    ...rest,
    initialMessages: initialMessages?.map((message) => ({
      ...message
    }))
  });
}

export const Chat: React.FC<ChatProps> = ({
  userId,
  id,
  initialMessages,
  className
}) => {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    `ai-token`,
    null
  );

  const [model, setModel] = useState<Model>(models[0]);

  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW);
  const [previewTokenInput, setPreviewTokenInput] = useState(
    previewToken ?? ``
  );
  const { messages, append, reload, stop, isLoading, input, setInput, error } =
    useSmolTalkChat({
      initialMessages,
      id,
      body: {
        id,
        //   previewToken
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

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by
              {` `}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>
              {` `}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <TextInput
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={(e) => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput);
                setPreviewTokenDialog(false);
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
