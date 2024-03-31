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
            <Typography variant="body2" color="text.secondary">
                {d.content.content}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {d.content.score}
            </Typography>
        </Box>
    );
};

export default FinancialWellness;
