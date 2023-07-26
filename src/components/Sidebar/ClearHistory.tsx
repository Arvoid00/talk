"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { DialogDisclosure, useDialogStore } from "@ariakit/react";
import { Button } from "../core/Button";
import { IconSpinner } from "../core/icons";
import type { ServerActionResult } from "../../types";
import {
  DialogAction,
  DialogCancel,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle
} from "../core/Dialog";

interface ClearHistoryProps {
  clearChats: () => ServerActionResult<void>;
}

export const ClearHistory: React.FC<ClearHistoryProps> = ({ clearChats }) => {
  const dialog = useDialogStore({ animated: true });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete: React.MouseEventHandler = (e): void => {
    e.preventDefault();
    startTransition(async () => {
      const result = await clearChats();

      if (result && `error` in result) {
        toast.error(result.error);
        return;
      }

      dialog.hide();
      router.push(`/`);
    });
  };

  return (
    <>
      <DialogDisclosure
        store={dialog}
        as={Button}
        variant="ghost"
        disabled={isPending}
      >
        {isPending && <IconSpinner className="mr-2" />}
        Clear history
      </DialogDisclosure>
      <DialogContent store={dialog} backdrop={<DialogOverlay />}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete your chat history and remove your data
            from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <DialogCancel disabled={isPending}>Cancel</DialogCancel>
          <DialogAction disabled={isPending} onClick={handleDelete}>
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            Delete
          </DialogAction>
        </div>
      </DialogContent>
    </>
  );
};
