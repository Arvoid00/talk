"use client";

import * as React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, type ButtonProps } from "./ui/button";
import { IconGitHub, IconSpinner } from "./ui/icons";
import { cn } from "../utils";

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean;
  text?: string;
  provider?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  text = `Login with GitHub`,
  showGithubIcon = true,
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();
  const handleSignIn = async (): Promise<void> => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: `github`,
      options: { redirectTo: `${location.origin}/api/auth/callback` }
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleSignIn}
      disabled={isLoading}
      className={cn(className)}
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
