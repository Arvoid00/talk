import prompts from './prompts';
import { PromptTemplateValues } from '@/lib/types';

class PromptBuilder {
  private promptContent: string[];

  constructor() {
    this.promptContent = [];
  }

  addTemplate(templateName: keyof typeof prompts, values: PromptTemplateValues): PromptBuilder {
    let template = prompts[templateName].join('\n');
    template = this.replacePlaceholders(template, values);
    this.promptContent.push(template);
    return this;
  }

  addTone() {
    this.promptContent.push(prompts.tone);
    return this;
  }

  // ... Other add methods

  build() {
    return this.promptContent.join('\n');
  }
}