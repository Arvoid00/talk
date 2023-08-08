import { envs } from '@/constants/envs';
import Metaphor from 'metaphor-node'

const metaphorKey = envs.METAPHOR_API_KEY
export const metaphor = new Metaphor(metaphorKey as string)

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