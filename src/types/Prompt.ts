export interface Prompt {
  id: number | null;
  prompt_name: string;
  prompt_body: string;
}

export interface PromptGroups {
  [index: string]: {
    id?: string;
    name?: string;
    body?: string;
  };
}
