import prompts from './prompts.json'
import { PromptTemplateValues } from '@/lib/types'

class PromptBuilder {
  private promptContent: string[] = []

  addTemplate(
    templateName: keyof typeof prompts,
    values: PromptTemplateValues = {}
  ): PromptBuilder {
    let template = prompts[templateName].join('\n')
    template = this.replacePlaceholders(template, values)

    this.promptContent.push(template)

    return this
  }

  build() {
    return this.promptContent.join('\n')
  }

  private replacePlaceholders(
    template: string,
    values: PromptTemplateValues
  ): string {
    let result = template

    for (let key in values) {
      result = result.replace(`{${key}}`, values[key].toString())
    }

    return result
  }
}

export default PromptBuilder