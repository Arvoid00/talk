import React from "react";
import { type UseChatHelpers } from "ai/react";
import { Button } from "./ui/button";
import { PromptForm } from "./PromptForm";
import { ButtonScrollToBottom } from "./ButtonScrollToBottom";
import { IconRefresh, IconStop } from "./ui/icons";
// import { FooterText } from './footer'
import type { Model } from "../constants/models";
import { upsertChat } from "../actions/upsertChat";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
  setModel: (model: Model) => void;
  model: Model;
  userId?: string;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  setModel,
  model,
  messages,
  userId
}) => {
  const handleRegenerate = async () => reload();

  const handleSubmit = async (value) => {
    await append({
      id,
      content: value,
      role: `user`
    });
    id = id ?? Math.random().toString(36).slice(2); // random id up to 11 chars
    await upsertChat({
      chat_id: id,
      title: `TODO: make title: ${id}`,
      userId: userId || `unknown-user-id`, // TODO: try to get rid of unknown user id, higher up
      messages,
      createdAt: new Date(),
      path: `todo`,
      sharePath: `todo`
    });
  };
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages.length > 0 && (
              <Button
                variant="outline"
                onClick={handleRegenerate}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={handleSubmit}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            setModel={setModel}
            model={model}
          />

          {/* <FooterText className="hidden sm:block" /> */}
        </div>
      </div>
    </div>
  );
};
