import { introPrompt } from './sub-prompts/intro';
import { tonePrompt } from './sub-prompts/tone';
import { webSearchPrompt } from './sub-prompts/web-search';
import { outroPrompt } from './sub-prompts/outro';

const promptContent = [
  introPrompt,
  tonePrompt,
  webSearchPrompt,
  outroPrompt,
].join('\n')

export const systemPrompt = {
  role: 'system',
  content: promptContent
}