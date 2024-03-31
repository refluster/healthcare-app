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

const FinancialWellness: React.FC<Props> = ({ journal }) => {
    const d = journal;
    const content = d.content as Content;
    const colorH = (360 - 30 - 120) * (1 - d.content.score) + 120;
    const colorL = (360 - 120 + 30) * (1 - d.content.score) + 120 + 30;
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
            <Box sx={{
                background: `linear-gradient(0.1turn, hsl(${colorH} 90% 50%), hsl(${colorL} 90% 50%))`,
                textAlign: 'center',
            }}>
                <Typography variant="body2" color="text.secondary" sx={{
                    lineHeight: 12,
                    fontWeight: 900,
                    color: '#fff',
                }}>
                    {d.content.content}
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
                {d.content.score}
            </Typography>
        </Box>
    );
};

export default FinancialWellness;
