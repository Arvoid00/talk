"use client";

import React from "react";
import { Button, type ButtonProps } from "./core/Button";
import { IconArrowDown } from "./core/icons";
import { cn } from "../utils";
import { useAtBottom } from "../hooks/useAtBottom";

export const ButtonScrollToBottom: React.FC<ButtonProps> = ({
  className,
  ...props
}) => {
  const isAtBottom = useAtBottom();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        `absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2`,
        isAtBottom ? `opacity-0` : `opacity-100`,
        className
      )}
      onClick={() =>
        window.scrollTo({
          top: document.body.offsetHeight,
          behavior: `smooth`
        })
      }
      {...props}
    >
      <IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
};
