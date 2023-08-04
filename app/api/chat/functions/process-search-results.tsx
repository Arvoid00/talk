import { ChatCompletionFunctions } from 'smolai';
import { metaphor } from '../route';
import { DocumentContent, Result } from 'metaphor-node';

export async function processSearchResult(result: Result): Promise<DocumentContent> {
    // Use the Metaphor instance to get the contents of the first result
    const contentResponse = await metaphor.getContents([result]);

    // Get the contents of the first result
    const resultContent = contentResponse.contents[0];
    console.log('contentResponse.contents', contentResponse.contents)

    return resultContent;
};

export const processSearchResultSchema: ChatCompletionFunctions  = {
    name: 'processSearchResult',
    description: 'Read the contents of the first or next search result and return it along with the remaining search results.',
    parameters: {
        type: 'object',
        properties: {
            title: {
                type: 'string',
                description: 'The title of the search result.',
            },
            url: {
                type: 'string',
                description: 'The URL of the search result.',
            },
            publishedDate: {
                type: 'string',
                description: 'The date the search result was published.',
            },
            author: {
                type: 'string',
                description: 'The author of the search result.',
            },
            score: {
                type: 'number',
                descripion: 'Relevance score of the search result on a scale of 0 to 1, with 1 being the most relevant.',
            },
            id: {
                type: 'string',
                description: 'Unique identifier for the search result.',
            }
        },
        required: ['title', 'url', 'id'],
    }
}
