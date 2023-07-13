import { type Message } from "ai";

export type SmolTalkMessage = Message & {
  messageAuthor_id?: string;
};

// TODO refactor and remove unneccessary duplicate data.
export interface Chat extends Record<string, unknown> {
  chat_id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: SmolTalkMessage[];
  sharePath?: string; // Refactor to use RLS
}
