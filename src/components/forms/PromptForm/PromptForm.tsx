import React, { useRef, useEffect, useCallback, useTransition } from "react";
import type { UseChatHelpers } from "ai/react";
import { VisuallyHidden } from "@ariakit/react";
import { ModelSelector } from "../../ModelSelector/ModelSelector";
import { Button } from "../../core/Button";
import { IconArrowElbow } from "../../core/icons";
import { useEnterSubmit } from "../../../hooks/useEnterSubmit";
import type { Model } from "../../../constants/models";

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  onSubmit: (value: string) => Promise<void>;
  isLoading: boolean;
  setModel: (id: string) => void;
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
  const [, startSubmit] = useTransition();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      startSubmit(async () => {
        if (!input.trim()) {
          return;
        }
        setInput(``);
        await onSubmit(input);
      });
    },
    [input, onSubmit, setInput]
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
            <VisuallyHidden>Send message</VisuallyHidden>
          </Button>

          <ModelSelector setValue={setModel} value={model.id} />
        </div>
      </div>
    </form>
  );
};
