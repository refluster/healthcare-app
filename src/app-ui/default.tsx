import React from 'react';
import { Box, Typography } from '@mui/material';
import { Journal } from '../model';
import { User } from 'firebase/auth';

interface Props {
    journal: Journal;
    user: User;
}

type Content = {
    comment: string;
    score: number;
}

const DefaultAppUI: React.FC<Props> = ({ journal, user }) => {
    const d = journal;
    console.log(d);
    const content = (d.content && typeof (d.content) === 'string' && d.content) ||
        (d.content.content && typeof (d.content.content) && d.content.content) || '';
    console.log({ content });
    return (
        <Box sx={{ mx: 2, py: 4, borderBottom: '1px solid #eee' }}>
            <Typography gutterBottom variant="h6" component="div">
                <Box sx={{
                    backgroundColor: '#888',
                    width: 28, height: 28,
                    borderRadius: '50%',
                    mr: 2,
                }} />
            </Typography>
            {
                d.title && (
                    <Typography gutterBottom variant="h5" component="div">
                        {d.title}
                    </Typography>
                )
            }
            <Typography variant="body2" color="text.secondary">
                {content}
            </Typography>
        </Box>
    );
};

export default DefaultAppUI;
