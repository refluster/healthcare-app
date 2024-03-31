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
            setJournals(journals as Journal[])
        })();
    }, [user, navigate]);

    const doPost = async (text: string) => {
        const userJournal = {
            author: 'user',
            userId: user!.uid,
            content: text,
        } as Journal;
        setJournals([userJournal]);
        try {
            const journals0 = await api.runApp({ appId: 'heart-health', userId: user!.uid, text: text });
            const journals1 = await api.runApp({ appId: 'financial-wellbeing', userId: user!.uid, text: text });
            const journals2 = await api.runApp({ appId: 'bank-transaction', userId: user!.uid, text: text });
            const appJournals = [...journals0, ...journals1, ...journals2];

            setJournals(prev => {
                return [...prev, ...appJournals as Journal[]]
            });
            console.log(appJournals);
            api.createJournals([...[userJournal], ...appJournals]);
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
