import React from "react";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { fontMono, fontSans } from "../theme/fonts";
import { cn } from "../utils";
import { TailwindIndicator } from "../components/TailwindIndicator";
import { Providers } from "../components/Providers";
import { Header } from "../components/Header";
import "../theme/globals.css";

/* eslint-disable @typescript-eslint/quotes */
export const metadata: Metadata = {
  title: {
    default: "🐣 Smol Talk",
    template: `%s - Smol Talk`
  },
  description: "An AI-powered chatbot built with Next.js and Vercel.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  }
};
/* eslint-enable @typescript-eslint/quotes */

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <head />
    <body
      className={cn(
        `font-sans antialiased`,
        fontSans.variable,
        fontMono.variable
      )}
    >
      <Toaster />
      <Providers attribute="class" defaultTheme="system" enableSystem>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex flex-1 flex-col bg-muted/50">{children}</main>
        </div>
        <TailwindIndicator />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
