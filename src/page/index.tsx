import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import Header from '../component/header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from "react-router-dom";
import PostButton from '../component/post-button';
import axios from 'axios';
import * as api from '../api';
import { Journal } from '../model';

/*
type Journal = {
    author: 'user' | 'system';
    userId: string;
    title?: string;
    content: string;
}
*/

const IndexPage: React.FC = () => {
    const [journals, setJournals] = React.useState([] as Journal[]);

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            console.log(user);
            if (!user) {
                navigate('/intro');
                return;
            }
            const journals = await api.getJournals(user.uid);
            console.log(journals);
            setJournals(journals)
        })();
    }, [user, navigate]);

    const doPost = async (text: string) => {
        const baseUrl = 'https://cykubbplcd.execute-api.us-west-2.amazonaws.com/Prod';
        setJournals([{
            author: 'user',
            userId: user!.uid,
            content: text,
            id: '',
            createdAt: '',
            updatedAt: '',
        }])
        try {
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
            setJournals(prev => {
                return [...prev, ...msg, ...msg2]
            });
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
            console.log(inputJournals);
            api.createJournals(inputJournals);
        } catch (error) {
            console.error('API call failed:', error);
        }
    };

    return (
        <Box sx={{ position: "relative" }}>
            <Header title="Wellness" />
            <Box sx={{ pt: 15 }}>
                <Typography variant='h1' style={{ marginLeft: 16 }}>Home</Typography>
                {
                    journals.map(d => (
                        <Card sx={{ my: 2 }}>
                            <CardContent>
                                {
                                    d.author === 'user' && (
                                        <Typography gutterBottom variant="h5" component="div">
                                            <Box sx={{
                                                backgroundColor: '#888',
                                                backgroundImage: `url(${user?.photoURL || ''})`,
                                                backgroundSize: 'contain',
                                                width: 28, height: 28,
                                                borderRadius: '50%',
                                                mr: 2,
                                            }} />
                                        </Typography>
                                    )
                                }
                                <Typography gutterBottom variant="h5" component="div">
                                    {d.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {d.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Try</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    ))
                }
            </Box>
            <PostButton onPostClicked={doPost} style={{ position: 'fixed', right: 24, bottom: 24 }} />
        </Box>
    );
};

export default IndexPage;
