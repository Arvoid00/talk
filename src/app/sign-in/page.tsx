/* eslint-disable no-console */
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { LoginButton } from "../../components/LoginButton";

const SignInPage: React.FC = async () => {
  console.log(`SignInPage`);
  const session = await auth();
  console.log({ session });

  // redirect to home if user is already logged in
  if (session?.user) {
    redirect(`/`);
  }
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center gap-5 py-10">
      <LoginButton />
    </div>
  );
};

export default SignInPage;
