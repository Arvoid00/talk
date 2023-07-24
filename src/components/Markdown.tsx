import type React from "react";
import { memo } from "react";
import type { Options } from "react-markdown";
import ReactMarkdown from "react-markdown";

export const Markdown: React.FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
);
