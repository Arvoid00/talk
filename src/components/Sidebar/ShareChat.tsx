import React, { useCallback, useTransition } from "react";
import {
  Dialog,
  DialogDisclosure,
  TooltipAnchor,
  VisuallyHidden,
  useDialogStore,
  useTooltipStore
} from "@ariakit/react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import type { Chat, ServerActionResult } from "../../types";
import { Button } from "../core/Button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle
} from "../core/Dialog";
import { IconShare, IconSpinner, IconUsers } from "../core/icons";
import { Tooltip } from "../core/Tooltip";
import { formatDate } from "../../utils";

export interface SidebarActionsProps {
  chat: Chat;
  onShareChat: (chat: Chat) => ServerActionResult<Chat>;
}

export const ShareChat: React.FC<SidebarActionsProps> = ({
  chat,
  onShareChat: shareChat
}) => {
  const tooltip = useTooltipStore();
  const dialog = useDialogStore({ animated: true });
  const [isSharePending, startShareTransition] = useTransition();

  const copyShareLink = useCallback(
    async ({ sharePath }: Chat) => {
      if (!sharePath) {
        return toast.error(`Could not copy share link to clipboard`);
      }

      const url = new URL(window.location.href);
      url.pathname = sharePath;
      await navigator.clipboard.writeText(url.toString());
      dialog.hide();
      toast.success(`Share link copied to clipboard`, {
        style: {
          borderRadius: `10px`,
          background: `#333`,
          color: `#fff`,
          fontSize: `14px`
        },
        iconTheme: {
          primary: `white`,
          secondary: `black`
        }
      });
    },
    [dialog]
  );

  const handleCopy: React.MouseEventHandler = useCallback(() => {
    startShareTransition(async () => {
      if (chat.sharePath) {
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 500));
        await copyShareLink(chat);
        return;
      }

      const result = await shareChat(chat);

      if (typeof result.error === `string`) {
        toast.error(result.error);
        return;
      }

      void copyShareLink(result as Chat);
    });
  }, [chat, copyShareLink, shareChat]);

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
          />
        }
      >
        <IconShare />
        <VisuallyHidden>Share</VisuallyHidden>
      </TooltipAnchor>
      <Tooltip store={tooltip}>Share chat</Tooltip>
      <Dialog store={dialog} backdrop={<DialogOverlay />}>
        <DialogHeader>
          <DialogTitle>Share link to chat</DialogTitle>
          <DialogDescription>
            Anyone with the URL will be able to view the shared chat.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1 rounded-md border p-4 text-sm">
          <div className="font-medium">{chat.title}</div>
          <div className="text-muted-foreground">
            {formatDate(chat.createdAt)} · {chat.messages.length} messages
          </div>
        </div>
        <DialogFooter className="items-center">
          {chat.sharePath && (
            <Button
              as={Link}
              variant="secondary"
              className="mr-auto"
              href={chat.sharePath}
              target="_blank"
            >
              <IconUsers className="mr-2" />
              {chat.sharePath}
            </Button>
          )}
          <Button disabled={isSharePending} onClick={handleCopy}>
            {isSharePending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                Copying...
              </>
            ) : (
              <>Copy link</>
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
