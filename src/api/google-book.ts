import axios from 'axios';
import { DailyStats, Journal } from '../model';

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
            },
            infoLink: string;
        }
    }[];
};

type QueryParams = {
    query: string[],
    maxResults: number,
}

const queryBooks = async ({query, maxResults}: QueryParams) => {
    const ret = await http.get('/books/v1/volumes', {
        params: {
            q: query.join('+'),
            maxResults,
        }
    });
    const result: BookSearchResult = ret.data;
    return result;
};

export {
    queryBooks,
};