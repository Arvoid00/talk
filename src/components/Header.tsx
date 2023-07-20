import * as React from "react";
import Link from "next/link";
import { Button } from "./core/Button";
import { Sidebar } from "./Sidebar/Sidebar";
import { SidebarList } from "./Sidebar/SidebarList";
import {
  // IconGitHub,
  // IconNextChat,
  IconSeparator
} from "./core/icons";
import { SidebarFooter } from "./Sidebar/SidebarFooter";
import { ThemeToggle } from "./ThemeToggle";
import { ClearHistory } from "./ClearHistory";
import { UserMenu } from "./UserMenu";
import { clearChats } from "../actions";
import { auth } from "../auth";

export const Header = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        {session?.user ? (
          <Sidebar>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              <SidebarList userId={session.user.id} />
            </React.Suspense>
            <SidebarFooter>
              <ThemeToggle />
              <ClearHistory clearChats={clearChats} />
            </SidebarFooter>
          </Sidebar>
        ) : (
          <Link href="/" target="_blank" rel="nofollow">
            {/* <IconNextChat className="w-6 h-6 mr-2 dark:hidden" inverted />
            <IconNextChat className="hidden w-6 h-6 mr-2 dark:block" /> */}
            🐣 Smol Talk
          </Link>
        )}
        <div className="flex items-center">
          <IconSeparator className="h-6 w-6 text-muted-foreground/50" />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button as={Link} variant="link" className="-ml-2" href="/sign-in">
              Login
            </Button>
          )}
        </div>
      </div>

      {/* <div className="flex items-center justify-end space-x-2">
        <a
          href="https://twitter.com/smolmodels"
          target="_blank"
          className={cn(buttonVariants())}
        >
          <span className="hidden sm:block">🐣 Smol Talk</span>
          <span className="sm:hidden">🐣 Talk</span>
        </a>
      </div> */}
    </header>
  );
};
