import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
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
            //const journals = await api.getJournals(user.uid);
            const journals = [
                {
                    "author": "heart-health",
                    "content": {
                        "title": "自然との触れ合い",
                        "content": "子どもとファーマーズマーケットに行くことで、自然と触れ合う機会を増やしましょう。自然に触れることは心身の健康に良い影響を与え、ウェルネスを高めることができます。"
                    },
                    "title": "自然との触れ合い",
                    "userId": "FmW3uDTmb8fOY7WmOiD3eOzwzvn1"
                },
                {
                    "author": "heart-health",
                    "content": {
                        "title": "食事の選択",
                        "content": "ファーマーズマーケットでは新鮮な野菜や果物などが豊富にあります。子どもと一緒に地元の農産物を選び、健康的な食事を楽しみましょう。バラエティ豊かな食材を摂取することで栄養バランスも整えることができます。"
                    },
                    "title": "食事の選択",
                    "userId": "FmW3uDTmb8fOY7WmOiD3eOzwzvn1"
                },
                {
                    "author": "heart-health",
                    "content": {
                        "title": "交流の機会",
                        "content": "ファーマーズマーケットは地域の人々が集まる場です。子どもと一緒に参加することで、地域の人との交流の機会を得ることができます。人とのつながりは幸福感を高める要素の一つです。"
                    },
                    "title": "交流の機会",
                    "userId": "FmW3uDTmb8fOY7WmOiD3eOzwzvn1"
                },
                {
                    "author": "financial-wellbeing",
                    "content": {
                        "content": "楽しい外出を計画することは、自己実現や幸福感を促すために重要です。",
                        "score": 0.8
                    },
                    "userId": "FmW3uDTmb8fOY7WmOiD3eOzwzvn1"
                },
                {
                    "author": "financial-wellbeing",
                    "content": {
                        "content": "ファーマーズマーケットでは新鮮な食材を手に入れることができ、食事の満足感を高めることができます。",
                        "score": 0.7
                    },
                    "userId": "FmW3uDTmb8fOY7WmOiD3eOzwzvn1"
                }
            ];
            setJournals(journals as Journal[])
        })();
    }, [user, navigate]);

    const doPost = async (text: string) => {
        setJournals([{
            author: 'user',
            userId: user!.uid,
            content: text,
            id: '',
            createdAt: '',
            updatedAt: '',
        }])
        try {
            /*
                    // TBD to be refactored
        const baseUrl = 'https://cykubbplcd.execute-api.us-west-2.amazonaws.com/Prod';
            const response = await axios.post(`${baseUrl}/healthcare-gpt/generic`, {
                message: text + 'この行動や情動に対して、お金の使い方を、自らのために投資する、支払いは消費ではなく投資である意味づけ、そんな解釈について、3つフィードバックしてください。',
                content: "例えば、お金を使い過ぎたように見えても、それが消費か、自身への投資か、をしっかり把握する、見方を変える（誰かが明示的にフィードバックする）だけでも幸福度は変わります。この後者の場合は、資産の削減ではなく、資産の置き換えで、自己資産は減らないどころか拡大もありえます。この資産には有形も無形もあるからです。あなたは人をより高い幸福に導くための、関係しそうな体系知識、産業分野、フレームワーク標準などを整理し、各々の観点で一般人に分かりやすく、少し科学的な体系の説明を少しだけ取り入れながら助言します。助言には、ネクストアクションの掲示もあれば、良い取り組みは継続できるよう素直に認め誉めること、もあります。",
                type: 'expert',
            });
            const msg = response.data.wellness_expert_advice.advice;
            const response2 = await axios.post(`${baseUrl}/healthcare-gpt/generic`, {
                message: text + 'この行動や情動に対して、広義の意味で健康になる助言を3つフィードバックして。その際、ウェルネスを高め、生きがい、やる気、自己達成感、満足感、などが重要な指標です。',
                content: "例えば、お金を使い過ぎたように見えても、それが消費か、自身への投資か、をしっかり把握する、見方を変える（誰かが明示的にフィードバックする）だけでも幸福度は変わります。この後者の場合は、資産の削減ではなく、資産の置き換えで、自己資産は減らないどころか拡大もありえます。この資産には有形も無形もあるからです。あなたは人をより高い幸福に導くための、関係しそうな体系知識、産業分野、フレームワーク標準などを整理し、各々の観点で一般人に分かりやすく、少し科学的な体系の説明を少しだけ取り入れながら助言します。助言には、ネクストアクションの掲示もあれば、良い取り組みは継続できるよう素直に認め誉めること、もあります。",
                type: 'expert',
            });
            const msg2 = response2.data.wellness_expert_advice.advice;
            console.log(msg);
            console.log(msg2);
            console.log(text, [...msg, ...msg2])
            const inputJournals = [
                {
                    userId: user?.uid,
                    author: 'user',
                    content: text,
                },
                ...[...msg, ...msg2].map(data => ({
                    ...data,
                    userId: user?.uid,
                    author: 'system',
                }))
            ];
            */
            // 'heart-health' 'financial-wellbeing'

            /*
            const host = 'https://3nk07nnllh.execute-api.us-west-2.amazonaws.com/Prod';
            const response = await axios.post(`${host}/app/run`, {
                message: text,
                apps: [
                    {
                        appId: 'financial-wellbeing',
                    }
                ],
                userId: user?.uid,
            });
            const content = response.data.apps[0]['financial-wellbeing'];
            const msg: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>[] = [
                {
                    author: 'financial-wellbeing',
                    content: content,
                    title: undefined,
                    userId: user!.uid,
                }
            ];
            */
            const journals0 = await api.runApp({ appId: 'heart-health', userId: user!.uid, text: text });
            const journals1 = await api.runApp({ appId: 'financial-wellbeing', userId: user!.uid, text: text });
            const appJournals = [...journals0, ...journals1];

            setJournals(prev => {
                return [...prev, ...appJournals as Journal[]]
            });
            console.log(appJournals);
            //api.createJournals(inputJournals);
        } catch (error) {
            console.error('API call failed:', error);
        }
    };

    return (
        <Box sx={{ position: "relative" }}>
            <Header title="Wellness" />
            <Box sx={{ pt: 15 }}>
                <Typography variant='h4' style={{ marginLeft: 16 }}>Home</Typography>
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
