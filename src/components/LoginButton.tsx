"use client";

import React, { useCallback, useTransition } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, type ButtonProps } from "./core/Button";
import { IconGitHub, IconSpinner } from "./core/icons";

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean;
  text?: string;
  provider?: string;
  className?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  text = `Login with GitHub`,
  showGithubIcon = true,
  className,
  ...props
}) => {
  const [isLoading, startLogIn] = useTransition();
  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();
  const handleSignIn: React.MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      startLogIn(async () => {
        await supabase.auth.signInWithOAuth({
          provider: `github`,
          options: { redirectTo: `${location.origin}/api/auth/callback` }
        });
      });
    },
    [supabase.auth]
  );

  return (
    <Button
      variant="outline"
      onClick={handleSignIn}
      disabled={isLoading}
      className={className}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconGitHub className="mr-2" />
      ) : null}
      {text}
    </Button>
  );
};
