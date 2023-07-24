"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export const Providers: React.FC<ThemeProviderProps> = ({
  children,
  ...props
}) => <ThemeProvider {...props}>{children}</ThemeProvider>;
