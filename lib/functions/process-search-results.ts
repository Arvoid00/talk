import { metaphor } from '../../app/api/chat/route';
import { DocumentContent, Result } from 'metaphor-node';

export async function processSearchResult(result: Result): Promise<DocumentContent> {
    // Use the Metaphor instance to get the contents of the first result
    const contentResponse = await metaphor.getContents([result]);

    // Get the contents of the first result
    const resultContent = contentResponse.contents[0];
    console.log('contentResponse.contents', contentResponse.contents)

    return resultContent;
};