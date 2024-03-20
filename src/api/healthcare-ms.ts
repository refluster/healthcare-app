import axios from 'axios';
import { Journal } from '../model';

const baseURL = 'https://3nk07nnllh.execute-api.us-west-2.amazonaws.com/Prod';

const http = axios.create({
    baseURL,
    timeout: 10000,
});

type JournalDB = {
    id: string;
    userId: string;
    author: 'user' | 'system';
    content: string;
    createdAt: string;
    updatedAt: string;
};

const createJournals = async (_rowItems: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    const inputItems: Omit<JournalDB, 'id'|'createdAt'|'updatedAt'>[] = _rowItems.map(item => ({
        userId: item.userId,
        author: item.author,
        content: JSON.stringify({title: item.title, content: item.content}),
    }))
    const ret = await http.post('/journals', inputItems);
    const items = <Journal[]>ret.data;
    return items;
};

const getJournals = async (userId: string) => {
    try {
        const ret = await http.get('/journals', {
            params: {
                userId,
            }
        });
        const items = <JournalDB[]>ret.data;
        const journals: Journal[] = items.map(item => {
            const contentObj = JSON.parse(item.content);
            return {
                ...item,
                title: contentObj.title,
                content: contentObj.content,
            }
        })
        return journals;
    } catch (e) {
        return [] as Journal[];
    }
};

export {
    createJournals,
    getJournals,
};