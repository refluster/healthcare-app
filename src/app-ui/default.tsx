import React from 'react';
import { Box, Typography } from '@mui/material';
import { Journal } from '../model';

interface Props {
    journal: Journal;
}

type Content = {
    comment: string;
    score: number;
}

const DefaultAppUI: React.FC<Props> = ({ journal }) => {
    const d = journal;
    const content = d.content as Content;
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
            {
                d.content && typeof (d.content) === 'string' && (
                    <Typography variant="body2" color="text.secondary">
                        {d.content}
                    </Typography>
                )
            }
        </Box>
    );
};

export default DefaultAppUI;
