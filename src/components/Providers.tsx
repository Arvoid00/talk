"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { TooltipProvider } from "./ui/tooltip";

export const Providers: React.FC<ThemeProviderProps> = ({
  children,
  ...props
}) => (
  <NextThemesProvider {...props}>
    <TooltipProvider>{children}</TooltipProvider>
  </NextThemesProvider>
);
