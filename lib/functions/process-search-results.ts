import Metaphor from 'metaphor-node'
import { envs } from '@/constants/envs';
import { DocumentContent, Result } from 'metaphor-node';

const metaphorKey = envs.METAPHOR_API_KEY
export const metaphor = new Metaphor(metaphorKey as string)

export async function processSearchResult(result: Result): Promise<DocumentContent> {
    // Use the Metaphor instance to get the contents of the first result
    const contentResponse = await metaphor.getContents([result]);

    // Get the contents of the first result
    const resultContent = contentResponse.contents[0];
    console.log('contentResponse.contents', contentResponse.contents)

    return resultContent;
};