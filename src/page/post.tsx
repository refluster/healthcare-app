import React, { useState } from 'react';
import { Box, TextField, Button, Link } from '@mui/material';
import axios from 'axios';

type Wellness = {
    social: number,
    financial: number,
    emotional: number,
    physical: number,
    spiritual: number,
    intellectual: number,
};
type Output = {
    message: string;
    wellness: Wellness | undefined;
}
const OutputNull: Output = {
    message: '',
    wellness: undefined,
}

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    onCloseScreen: () => void;
}

const PostPage: React.FC<MyComponentProps> = ({ onCloseScreen }) => {
    const [input1, setInput1] = useState('');
    const [output, setOutput] = useState(OutputNull);

    const doPost = async () => {

        /*
        const baseUrl = 'https://cykubbplcd.execute-api.us-west-2.amazonaws.com/Prod';
        try {
            const response = await axios.post(`${baseUrl}/healthcare-gpt/generic`, {
                message: input1,
                content: "例えば、お金を使い過ぎたように見えても、それが消費か、自身への投資か、をしっかり把握する、見方を変える（誰かが明示的にフィードバックする）だけでも幸福度は変わります。この後者の場合は、資産の削減ではなく、資産の置き換えで、自己資産は減らないどころか拡大もありえます。この資産には有形も無形もあるからです。あなたは人をより高い幸福に導くための、関係しそうな体系知識、産業分野、フレームワーク標準などを整理し、各々の観点で一般人に分かりやすく、少し科学的な体系の説明を少しだけ取り入れながら助言します。助言には、ネクストアクションの掲示もあれば、良い取り組みは継続できるよう素直に認め誉めること、もあります。助言はトータルで5個、提供します。",
                type: 'expert',
            });
            setOutput((prev: Output) => ({ ...prev, ...{ message: response.data.message } }));

            const response2 = await axios.post(`${baseUrl}/healthcare-gpt/generic`, {
                message: input1,
                type: 'wellness',
            });
            setOutput((prev: Output) => ({ ...prev, ...{ wellness: response2.data.wellness } }));
            setTimeout(() => console.log(output), 1000);
        } catch (error) {
            console.error('API call failed:', error);
            setOutput((prev: Output) => { prev.message = 'Error calling API'; return prev });
        }
        */
    };

    const close = () => {
        onCloseScreen();
    }
    return (
        <Box>
            <Box sx={{
                height: 60,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mx: 2
            }}>
                <Link onClick={close} underline="none">&lt;</Link>
                <Button variant='contained' onClick={doPost}>Post</Button>
            </Box>
            <Box sx={{ m: 2 }}>
                <TextField
                    id="standard-multiline-static"
                    multiline
                    rows={4}
                    placeholder="What's happening?"
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                    onChange={(e) => setInput1(e.target.value)}
                />
            </Box>
        </Box>
    );
};

export default PostPage;
