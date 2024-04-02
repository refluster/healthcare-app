import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Header from '../component/header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from "react-router-dom";
import PostButton from '../component/post-button';
import * as api from '../api';
import { Journal } from '../model';
import FinancialWellness from '../app-ui/financial-wellness';
import DefaultAppUI from '../app-ui/default';
import UserAppUI from '../app-ui/user';

const IndexPage: React.FC = () => {
    const [journals, setJournals] = React.useState([] as Journal[]);

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            if (!user) {
                navigate('/intro');
                return;
            }
            const journals = await api.getJournals(user.uid);
            console.log(journals);
            setJournals(journals as Journal[])
        })();
    }, [user, navigate]);

    const doPost = async (text: string) => {
        const userJournalInput = {
            author: 'user',
            userId: user!.uid,
            content: text,
        };
        const [userJournal] = await api.createJournals([userJournalInput]);
        setJournals([userJournal]);
        try {
            const promise0 = api.runApp({ appId: 'heart-health', userId: user!.uid, text: text });
            const promise1 = api.runApp({ appId: 'financial-wellbeing', userId: user!.uid, text: text });
            const promise2 = api.runApp({ appId: 'bank-transaction', userId: user!.uid, text: text });
            const appJournalInputs = (await Promise.all([promise0, promise1, promise2]))
                .flat() as Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>[];
            console.log(appJournalInputs);
            const appJournals = await api.createJournals(appJournalInputs);
            setJournals(prev => {
                return [...prev, ...appJournals];
            });
        } catch (error) {
            console.error('API call failed:', error);
        }
    };

    return (
        <Box sx={{ position: "relative" }}>
            <Header title="Wellness" />
            <Box sx={{ pt: 8 }}>
                {
                    journals.map((d, idx) => {
                        if (d.author === 'financial-wellbeing') {
                            return (<FinancialWellness key={idx} journal={d} user={user!} />)
                        } else if (d.author === 'user') {
                            return (<UserAppUI key={idx} journal={d} user={user!} />)
                        } else {
                            return (<DefaultAppUI key={idx} journal={d} user={user!} />)
                        }
                        /**/
                    })
                }
            </Box>
            <PostButton onPostClicked={doPost} style={{ position: 'fixed', right: 24, bottom: 24 }} />
        </Box>
    );
};

export default IndexPage;
