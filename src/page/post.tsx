import React, { useState } from 'react';
import { Box, TextField, Button, Link } from '@mui/material';

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    onCloseScreen: () => void;
    onPostClicked: (text: string) => void;
}

const PostPage: React.FC<MyComponentProps> = ({ onCloseScreen, onPostClicked }) => {
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
    );
};

export default PostPage;
