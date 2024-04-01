import axios from 'axios';
import { DailyStats, Journal } from '../model';

const baseURL = 'https://3nk07nnllh.execute-api.us-west-2.amazonaws.com/Prod';

const http = axios.create({
    baseURL,
    timeout: 10000,
});

type JournalDB = {
    id: string;
    userId: string;
    author: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

const createJournals = async (_rowItems: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    const inputItems: Omit<JournalDB, 'id' | 'createdAt' | 'updatedAt'>[] = _rowItems.map(item => ({
        userId: item.userId,
        author: item.author,
        content: JSON.stringify({ title: item.title, content: item.content }),
    }))
    const ret = await http.post('/journals', inputItems);
    const items: Journal[] = ret.data;
    const journals: Journal[] = items.map(item => {
        const contentObj = JSON.parse(item.content);
        return {
            ...item,
            title: contentObj.title,
            content: contentObj.content,
        }
    })
    return journals;
};

const getJournals = async (userId: string) => {
    try {
        const ret = await http.get('/journals', {
            params: {
                userId,
            }
        });
        const items: JournalDB[] = ret.data;
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
        console.error("ERR", e);
        return [] as Journal[];
    }
};

type DailyStatsBody = {
    id: string;
    userId: string;
    date: string;
    wellnessSocial: number;
    wellnessSpiritual: number;
    wellnessIntellectual: number;
    wellnessFinancial: number;
    wellnessEmotional: number;
    wellnessPhysical: number;
    updatedAt: string;
    createdAt: string;
};

const getDailyStats = async (userId: string) => {
    try {
        const ret = await http.get('/daily', {
            params: {
                userId,
                startDate: '2000-01-01T00:00:00.000Z',
                endDate: '2100-01-01T00:00:00.000Z',
            }
        });
        const items: DailyStatsBody[] = ret.data;
        const dailyStats: DailyStats[] = items.map(d => {
            return {
                userId: d.userId,
                date: d.date,
                wellness: {
                    social: d.wellnessSocial,
                    spiritual: d.wellnessSpiritual,
                    intellectual: d.wellnessIntellectual,
                    financial: d.wellnessFinancial,
                    emotional: d.wellnessEmotional,
                    physical: d.wellnessPhysical,
                }
            }
        })
        return dailyStats;
    } catch (e) {
        return [] as DailyStats[];
    }
};

type RunAppParam = {
    appId: string;
    userId: string;
    text: string;
}
const runApp = async (param: RunAppParam) => {
    const host = 'https://3nk07nnllh.execute-api.us-west-2.amazonaws.com/Prod';
    const response = await axios.post(`${host}/app/run`, {
        message: param.text,
        apps: [
            {
                appId: param.appId,
            }
        ],
        userId: param.userId
    });
    const functionRes = response.data.apps[0][param.appId];
    const results: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>[] = functionRes.advice.map((d: any) => {
        return {
            author: param.appId,
            content: d,
            title: d.title,
            userId: param.userId
        } as Journal;
    });;
    return results;
}

export {
    createJournals,
    getJournals,
    getDailyStats,
    runApp,
};