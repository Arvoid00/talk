"use client";

import React, { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogDisclosure,
  TooltipAnchor,
  VisuallyHidden,
  useDialogStore,
  useTooltipStore
} from "@ariakit/react";
import { toast } from "react-hot-toast";
import type { Chat, ServerActionResult } from "../../types";
import { Button } from "../core/Button";
import { Tooltip } from "../core/Tooltip";
import { IconSpinner, IconTrash } from "../core/icons";
import {
  DialogAction,
  DialogCancel,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle
} from "../core/Dialog";

export interface RemoveChatProps {
  chat: Chat;
  onRemove: (args: { id: string; path: string }) => ServerActionResult<void>;
}

export const RemoveChat: React.FC<RemoveChatProps> = ({
  chat,
  onRemove: removeChat
}) => {
  const tooltip = useTooltipStore();
  const dialog = useDialogStore({ animated: true });
  const [isRemovePending, startRemoveTransition] = useTransition();
  const router = useRouter();

  const handleDelete: React.MouseEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      startRemoveTransition(async () => {
        const result = await removeChat({
          id: chat.id as string,
          path: chat.path
        });

        if (result && `error` in result) {
          toast.error(result.error);
          return;
        }

        dialog.hide();
        router.refresh();
        router.push(`/`);
        toast.success(`Chat deleted`);
      });
    },
    [chat.id, chat.path, dialog, removeChat, router]
  );

  return (
    <>
      <TooltipAnchor
        store={tooltip}
        render={
          <DialogDisclosure
            store={dialog}
            as={Button}
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-background"
            disabled={isRemovePending}
          />
        }
      >
        <IconTrash />
        <VisuallyHidden>Delete</VisuallyHidden>
      </TooltipAnchor>
      <Tooltip store={tooltip}>Delete chat</Tooltip>

      <Dialog store={dialog} backdrop={<DialogOverlay />}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete your chat message and remove your data
            from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCancel disabled={isRemovePending}>Cancel</DialogCancel>
          <DialogAction disabled={isRemovePending} onClick={handleDelete}>
            {isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
            Delete
          </DialogAction>
        </DialogFooter>
      </Dialog>
    </>
  );
};
