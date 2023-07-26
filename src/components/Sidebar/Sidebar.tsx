"use client";
import React from "react";
import { PiList, PiX } from "react-icons/pi";
import { VisuallyHidden, useDialogStore } from "@ariakit/react";
import { Button } from "../core/Button";
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle
} from "../core/Sheet";

export interface SidebarProps {
  children?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const sheet = useDialogStore({ animated: true });

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={sheet.show}
      >
        <PiList />
        <VisuallyHidden>Toggle Sidebar</VisuallyHidden>
      </Button>
      <SheetContent store={sheet} backdrop={<SheetOverlay />}>
        <div className="inset-y-0 flex h-full w-[300px] flex-col p-0">
          <SheetHeader className="p-4">
            <SheetTitle className="text-sm">Chat History</SheetTitle>
          </SheetHeader>
          {children}
          <SheetClose>
            <PiX />
            <VisuallyHidden>Close</VisuallyHidden>
          </SheetClose>
        </div>
      </SheetContent>
    </>
  );
};
