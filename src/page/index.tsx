import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import Header from '../component/header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from "react-router-dom";
import PostButton from '../component/post-button';
import axios from 'axios';

type Message = {
    title: string;
    content: string;
}

const IndexPage: React.FC = () => {
    const [messages, setMessages] = React.useState([] as Message[]);
    const [input, setInput] = React.useState('');

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            console.log(user);
            if (!user) {
                // TBD
                //navigate('/intro');
            }
        })();
    }, [user, navigate]);

    const doPost = async (text: string) => {
        const baseUrl = 'https://cykubbplcd.execute-api.us-west-2.amazonaws.com/Prod';
        setInput(text);
        try {
            const response = await axios.post(`${baseUrl}/healthcare-gpt/generic`, {
                message: text,
                content: "例えば、お金を使い過ぎたように見えても、それが消費か、自身への投資か、をしっかり把握する、見方を変える（誰かが明示的にフィードバックする）だけでも幸福度は変わります。この後者の場合は、資産の削減ではなく、資産の置き換えで、自己資産は減らないどころか拡大もありえます。この資産には有形も無形もあるからです。あなたは人をより高い幸福に導くための、関係しそうな体系知識、産業分野、フレームワーク標準などを整理し、各々の観点で一般人に分かりやすく、少し科学的な体系の説明を少しだけ取り入れながら助言します。助言には、ネクストアクションの掲示もあれば、良い取り組みは継続できるよう素直に認め誉めること、もあります。助言はトータルで5個、提供します。",
                type: 'expert',
            });
            const msg = response.data.wellness_expert_advice.advice;
            console.log(msg);
            setMessages(msg);
            console.log(response);
        } catch (error) {
            console.error('API call failed:', error);
        }
    };
    
    return (
        <Box sx={{ position: "relative" }}>
            <Header title="Wellness" />
            <Box sx={{ pt: 15 }}>
                <Typography variant='h1' style={{ marginLeft: 16 }}>Home</Typography>
                <Card sx={{ my: 2 }}>
                    <CardContent>
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
                        <Typography variant="body2" color="text.secondary">
                            {input}
                        </Typography>
                    </CardContent>
                </Card>
                {
                    messages.map(d => (<Card sx={{ my: 2 }}>
                        <CardContent>
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
                    </Card>))
                }
            </Box>
            <PostButton onPostClicked={doPost} style={{ position: 'fixed', right: 24, bottom: 24 }} />
        </Box>
    );
};

export default IndexPage;
