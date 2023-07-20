"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../core/AlertDialog";
import { Button } from "../core/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../core/Dialog";
import { IconShare, IconSpinner, IconTrash, IconUsers } from "../core/icons";
import { badgeVariants } from "../core/Badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../core/Tooltip";
import { cn, formatDate } from "../../utils";
import type { Chat, ServerActionResult } from "../../types";

interface SidebarActionsProps {
  chat: Chat;
  removeChat: (args: { id: string; path: string }) => ServerActionResult<void>;
  shareChat: (chat: Chat) => ServerActionResult<Chat>;
}

export const SidebarActions: React.FC<SidebarActionsProps> = ({
  chat,
  removeChat,
  shareChat
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
  const [isRemovePending, startRemoveTransition] = React.useTransition();
  const [isSharePending, startShareTransition] = React.useTransition();
  const router = useRouter();

  const copyShareLink = React.useCallback(async ({ sharePath }: Chat) => {
    if (!sharePath) {
      return toast.error(`Could not copy share link to clipboard`);
    }

    const url = new URL(window.location.href);
    url.pathname = sharePath;
    await navigator.clipboard.writeText(url.toString());
    setShareDialogOpen(false);
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
  }, []);

  const handleCopy: React.MouseEventHandler = () => {
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
  };

  const handleDelete: React.MouseEventHandler = (event) => {
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

      setDeleteDialogOpen(false);
      router.refresh();
      router.push(`/`);
      toast.success(`Chat deleted`);
    });
  };

  return (
    <>
      <div className="space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-background"
              onClick={() => setShareDialogOpen(true)}
            >
              <IconShare />
              <span className="sr-only">Share</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share chat</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-background"
              disabled={isRemovePending}
              onClick={() => setDeleteDialogOpen(true)}
            >
              <IconTrash />
              <span className="sr-only">Delete</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete chat</TooltipContent>
        </Tooltip>
      </div>
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
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
              <Link
                href={chat.sharePath}
                className={cn(
                  badgeVariants({ variant: `secondary` }),
                  `mr-auto`
                )}
                target="_blank"
              >
                <IconUsers className="mr-2" />
                {chat.sharePath}
              </Link>
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
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your chat message and remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemovePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isRemovePending}
              onClick={handleDelete}
            >
              {isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
