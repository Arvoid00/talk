import React, { useRef, useEffect } from "react";
import type { UseChatHelpers } from "ai/react";
// import Textarea from 'react-textarea-autosize'
// has some SSR issue - ReferenceError: document is not defined
import { ModelSelector } from "./ModelSelector";
import { Button } from "./ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger
// } from '@/components/ui/tooltip'
import { IconArrowElbow } from "./ui/icons";
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
  // const router = useRouter()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }
    setInput(``);
    await onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      {/* <div className="relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={e => {
                e.preventDefault()
                router.refresh()
                router.push('/')
              }} */}
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
