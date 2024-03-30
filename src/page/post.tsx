import React, { useState } from 'react';
import { Box, TextField, Button, Link, Slider } from '@mui/material';

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    onCloseScreen: () => void;
    onPostClicked: (text: string) => void;
}

const PostPage: React.FC<MyComponentProps> = ({ onCloseScreen, onPostClicked }) => {
    const menuIdx = Math.floor(Math.random() * 3);

    const doPost = async (input: string) => {
        onPostClicked(input);
    };

    const close = () => {
        onCloseScreen();
    }

    const menu = [
        (<SliderPost onCloseScreen={close} onPostClicked={doPost} />),
        (<ThreeQPost onCloseScreen={close} onPostClicked={doPost} />),
        (<FreeTextPost onCloseScreen={close} onPostClicked={doPost} />),
    ]

    return menu[menuIdx];
};

const FreeTextPost: React.FC<MyComponentProps> = ({ onCloseScreen, onPostClicked }) => {
    const [input1, setInput1] = useState('');

    const doPost = async () => {
        onPostClicked(input1);
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
    )
};

const ThreeQPost: React.FC<MyComponentProps> = ({ onCloseScreen, onPostClicked }) => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');

    const doPost = async () => {
        const post = [
            "今日の1日:",
            input1,
            "\n\nあえて1つ楽しいと感じたことを挙げると:",
            input2,
            "\n\n明日やっておきたいこと:",
            input3,
        ].join(' ');
        onPostClicked(post);
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
            <Box sx={{ mb: 8 }}>
                <Box sx={{ m: 2 }}>今日はどんな1日でしたか？</Box>
                <Box sx={{ m: 2 }}>
                    <TextField
                        id="standard-multiline-static"
                        multiline
                        rows={2}
                        placeholder="今日もいつもと変わらない普通の日だった。"
                        variant="standard"
                        sx={{
                            width: '100%'
                        }}
                        onChange={(e) => setInput1(e.target.value)}
                    />
                </Box>
            </Box>
            <Box sx={{ mb: 8 }}>
                <Box sx={{ m: 2 }}>敢えて1つ楽しいと感じたことを挙げると？</Box>
                <Box sx={{ m: 2 }}>
                    <TextField
                        id="standard-multiline-static"
                        multiline
                        rows={2}
                        placeholder="お昼に食べたラーメン屋が、いつもは行列なのにすぐ入れたことかな。"
                        variant="standard"
                        sx={{
                            width: '100%'
                        }}
                        onChange={(e) => setInput2(e.target.value)}
                    />
                </Box>
            </Box>
            <Box sx={{ mb: 8 }}>
                <Box sx={{ m: 2 }}>明日やっておきたいことはありますか？</Box>
                <Box sx={{ m: 2 }}>
                    <TextField
                        id="standard-multiline-static"
                        multiline
                        rows={2}
                        placeholder="冷蔵庫の野菜がないから、忘れず買っておかないと。"
                        variant="standard"
                        sx={{
                            width: '100%'
                        }}
                        onChange={(e) => setInput3(e.target.value)}
                    />
                </Box>
            </Box>
        </Box>
    )
};

const SliderPost: React.FC<MyComponentProps> = ({ onCloseScreen, onPostClicked }) => {
    const [sleep, setSleep] = useState(0);
    const [condition, setCondition] = useState(0);

    const doPost = async () => {
        //onPostClicked('input1');
        const post =
            `昨日は${sleep}%くらい寝れた。` +
            `今の気分は${condition}%くらい良い感じ。`;
        onPostClicked(post);
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
            <Box sx={{ mb: 8 }}>
                <Box sx={{ m: 2 }}>今の気分はどんな感じですか？（Bad - Good）</Box>
                <Slider
                    sx={{ mx: 2 }}
                    size="medium"
                    defaultValue={70}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    onChange={(e, v) => setCondition(v as number)}
                />
            </Box>
            <Box sx={{ mb: 8 }}>
                <Box sx={{ m: 2 }}>昨日はどの程度よく寝れましたか？（寝不足 - ぐっすり）</Box>
                <Slider
                    sx={{ mx: 2 }}
                    size="medium"
                    defaultValue={70}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    onChange={(e, v) => setSleep(v as number)}
                />
            </Box>
        </Box>
    )
};

export default PostPage;
