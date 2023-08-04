import { ChatCompletionFunctions } from 'smolai';
import { metaphor } from '../route';


export async function searchTheWeb(query: string) {
	try {

		// Set up the search options
		let searchOptions = {
			numResults: 20,
      useAutoprompt: false
		};

		// Conduct the search
		const searchResponse = await metaphor.search(query, searchOptions);

    return { results: searchResponse.results || undefined }

	} catch (err) {
		console.error(`Failed to get content: ${err}`);
    return { results: undefined }
	}
}

export const searchTheWebSchema: ChatCompletionFunctions  = {
  name: 'searchTheWeb',
  description:
    'Perform a web search and returns the top 20 search results based on the search query.',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The query to search for.',
      },
    },
    required: ['query'],
  },
}