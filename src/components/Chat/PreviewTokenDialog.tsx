import React, { useState } from "react";
import { Dialog, useDialogStore } from "@ariakit/react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../core/Dialog";
import { Button } from "../core/Button";
import { TextInput } from "../core/form/TextInput";

const IS_PREVIEW = process.env.VERCEL_ENV === `preview`;

export const PreviewTokenDialog: React.FC = () => {
  const dialog = useDialogStore({ open: IS_PREVIEW, animated: true });
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    `ai-token`,
    null
  );
  const [previewTokenInput, setPreviewTokenInput] = useState(
    previewToken ?? ``
  );

  const handleSaveToken: React.MouseEventHandler = () => {
    setPreviewToken(previewTokenInput);
    dialog.hide();
  };

  return (
    <Dialog store={dialog}>
      <DialogHeader>
        <DialogTitle>Enter your OpenAI Key</DialogTitle>
        <DialogDescription>
          If you have not obtained your OpenAI API key, you can do so by
          {` `}
          <a href="https://platform.openai.com/signup/" className="underline">
            signing up
          </a>
          {` `}
          on the OpenAI website. This is only necessary for preview environments
          so that the open source community can test the app. The token will be
          saved to your browser&apos;s local storage under the name{` `}
          <code className="font-mono">ai-token</code>.
        </DialogDescription>
      </DialogHeader>
      <TextInput
        value={previewTokenInput}
        placeholder="OpenAI API key"
        onChange={(e) => setPreviewTokenInput(e.target.value)}
      />
      <DialogFooter className="items-center">
        <Button onClick={handleSaveToken}>Save Token</Button>
      </DialogFooter>
    </Dialog>
  );
};
