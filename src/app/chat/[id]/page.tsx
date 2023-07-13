import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getChat } from "../../../actions";
import { auth } from "../../../auth";
import { Chat } from "../../../components/Chat";

/* eslint-disable @typescript-eslint/quotes */
export const runtime = "edge";
export const preferredRegion = "home";
/* eslint-enable @typescript-eslint/quotes */

export interface ChatPageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params
}: ChatPageProps): Promise<Metadata> => {
  const session = await auth();

  if (!session?.user) {
    return {};
  }

  const chat = await getChat(params.id);
  return {
    title: chat.title.toString().slice(0, 50) ?? `Chat`
  };
};

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect(`/sign-in?next=/chat/${params.id}`);
  }

  const chat = await getChat(params.id);

  if (!chat) {
    notFound();
  }

  if (chat.userId !== session.user.id) {
    notFound();
  }

  return (
    <Chat
      id={chat.id}
      userId={session.user.id}
      initialMessages={chat.messages}
    />
  );
}
