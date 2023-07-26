import React from "react";

export const EmptyScreen: React.FC = () => (
  <div className="mx-auto max-w-2xl px-4">
    <div className="rounded-lg border bg-background p-8">
      <h1 className="mb-2 text-lg font-semibold">
        {`Welcome to 🐣 Smol Talk!`}
        <small className="text-xs text-transparent">
          find the secret password
        </small>
      </h1>
    </div>
  </div>
);
