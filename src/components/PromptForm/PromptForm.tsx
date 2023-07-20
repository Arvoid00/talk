import React, { useRef, useEffect, useCallback } from "react";
import type { UseChatHelpers } from "ai/react";
import { ModelSelector } from "./ModelSelector";
import { Button } from "./core/Button";
import { IconArrowElbow } from "./core/icons";
import { useEnterSubmit } from "../hooks/useEnterSubmit";
import type { Model } from "../constants/models";

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  onSubmit: (value: string) => Promise<void>;
  isLoading: boolean;
  setModel: (model: Model) => void;
  model: Model;
}
export const PromptForm: React.FC<PromptProps> = ({
  onSubmit,
  input,
  setInput,
  setModel,
  model,
  isLoading
}) => {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit: React.FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (!input.trim()) {
        return;
      }
      setInput(``);
      await onSubmit(input);
    },
    [input]
  );

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="relative flex w-full grow flex-col-reverse gap-2 overflow-hidden bg-background sm:flex-col sm:rounded-md sm:border sm:px-4">
        <textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={
            /* calculate rows based on input lines */ Math.min(
              8,
              input.split(`\n`).length
            )
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message."
          id="smol-inputbox"
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-slate-100/10 px-4 py-[1.3rem] focus-within:outline-none sm:bg-transparent sm:text-sm"
        />
        <div className="right-0 top-4 flex justify-center gap-2 sm:absolute sm:right-6 sm:justify-normal">
          <Button
            id="smol-submitbtn"
            type="submit"
            size="icon"
            disabled={isLoading || input === ``}
          >
            <IconArrowElbow />
            <span className="sr-only">Send message</span>
          </Button>

          <ModelSelector
            setModel={setModel}
            setInput={setInput}
            model={model}
          />
        </div>
      </div>
    </form>
  );
};
