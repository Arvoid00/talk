import React from "react";
import { nanoid } from "../utils";
import { Chat } from "../components/Chat/Chat";
import { auth } from "../auth";

/* eslint-disable @typescript-eslint/quotes */
export const runtime = "edge";
/* eslint-enable @typescript-eslint/quotes */

const IndexPage: React.FC = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const id = nanoid();

  return <Chat userId={userId} id={id} />;
};

export default IndexPage;
