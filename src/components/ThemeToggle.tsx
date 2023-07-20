"use client";

import React, { useCallback, useTransition } from "react";
import { useTheme } from "next-themes";
import { Button } from "./core/Button";
import { IconMoon, IconSun } from "./core/icons";

export const ThemeToggle: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const [, startTransition] = useTransition();

  const handleToggle: React.MouseEventHandler = useCallback(() => {
    startTransition(() => {
      setTheme(theme === `light` ? `dark` : `light`);
    });
  }, [theme, setTheme]);

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle}>
      {theme === `dark` ? (
        <IconMoon className="transition-all" />
      ) : theme === `light` ? (
        <IconSun className="transition-all" />
      ) : null}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
