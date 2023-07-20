"use client";

import React from "react";
import { Button } from "../core/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../core/Sheet";
import { IconSidebar } from "../core/icons";

export interface SidebarProps {
  children?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" className="-ml-2 h-9 w-9 p-0">
        <IconSidebar className="h-6 w-6" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </SheetTrigger>
    <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
      <SheetHeader className="p-4">
        <SheetTitle className="text-sm">Chat History</SheetTitle>
      </SheetHeader>
      {children}
    </SheetContent>
  </Sheet>
);
