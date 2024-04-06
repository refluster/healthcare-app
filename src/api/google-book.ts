import axios from 'axios';

const baseURL = 'https://www.googleapis.com/';

const http = axios.create({
    baseURL,
    timeout: 4000,
});

type BookSearchResult = {
    items: {
        volumeInfo: {
            title: string;
            subtitle: string;
            description: string;
            imageLinks: {
                thumbnail: string;
            } | undefined,
            infoLink: string;
        }
    }[];
};

type QueryParams = {
    query: string[],
    maxResults: number,
}

const queryBooks = async ({ query, maxResults }: QueryParams) => {
    try {
        const ret = await http.get('/books/v1/volumes', {
            params: {
                q: query.join('+'),
                maxResults,
            }
        });
        const result: BookSearchResult = ret.data;
        return result;
    } catch (e) {
        console.error('google book search', e);
        return undefined;
    }
};

export {
    queryBooks,
};