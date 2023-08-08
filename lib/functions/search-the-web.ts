import { metaphor } from '../../app/api/chat/route';


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