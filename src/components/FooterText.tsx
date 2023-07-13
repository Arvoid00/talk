import React from "react";
import { ExternalLink } from "./ExternalLink";
import { cn } from "../utils";

export const FooterText: React.FC<React.ComponentProps<"p">> = ({
  className,
  ...props
}) => (
  <p
    className={cn(
      `px-2 text-center text-xs leading-normal text-muted-foreground`,
      className
    )}
    {...props}
  >
    Open source AI chatbot built with{` `}
    <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{` `}
    <ExternalLink href="https://supabase.com">Supabase</ExternalLink>.
  </p>
);
