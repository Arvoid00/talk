"use client";
import React from "react";
import { type Message } from "ai";
import { Button } from "../core/Button";
import { IconCheck, IconCopy } from "../core/icons";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { cn } from "../../utils";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  message: Message;
}

export const ChatMessageActions: React.FC<ChatMessageActionsProps> = ({
  message,
  className,
  ...props
}) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = (): void => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    <div
      className={cn(
        `flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0`,
        className
      )}
      {...props}
    >
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
    </div>
  );
};
