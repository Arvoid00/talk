import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getSharedChat } from "../../../actions/getSharedChat";
import { formatDate } from "../../../utils";
import { ChatList } from "../../../components/ChatList";
import { FooterText } from "../../../components/FooterText";

/* eslint-disable @typescript-eslint/quotes */
export const runtime = "edge";
export const preferredRegion = "home";
/* eslint-enable @typescript-eslint/quotes */

interface SharePageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params
}: SharePageProps): Promise<Metadata> => {
  const chat = await getSharedChat(params.id);

  return {
    title: chat?.title.slice(0, 50) ?? `Chat`
  };
};

export default async function SharePage({ params }: SharePageProps) {
  const chat = await getSharedChat(params.id);

  if (!chat?.sharePath) {
    notFound();
  }

  return (
    <>
      <div className="flex-1 space-y-6">
        <div className="border-b bg-background px-4 py-6 md:px-6 md:py-8">
          <div className="mx-auto max-w-2xl md:px-6">
            <div className="space-y-1 md:-mx-8">
              <h1 className="text-2xl font-bold">{chat.title}</h1>
              <div className="text-sm text-muted-foreground">
                {formatDate(chat.createdAt)} · {chat.messages.length} messages
              </div>
            </div>
          </div>
        </div>
        <ChatList messages={chat.messages} />
      </div>
      <FooterText className="py-8" />
    </>
  );
}
