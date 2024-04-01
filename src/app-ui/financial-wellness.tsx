import React from 'react';
import { Box, Typography } from '@mui/material';
import { Journal } from '../model';
import { User } from 'firebase/auth';
import { formatRelative } from 'date-fns';

interface Props {
    journal: Journal;
    user: User;
}

const FinancialWellness: React.FC<Props> = ({ journal }) => {
    const d = journal;
    const colorH = (360 - 30 - 120) * (1 - d.content.score) + 120;
    const colorL = (360 - 120 + 30) * (1 - d.content.score) + 120 + 30;
    return (
        <Box sx={{ mx: 2, py: 4, borderBottom: '1px solid #eee', display: 'flex' }}>
            <Typography gutterBottom variant="h6" component="div">
                <Box sx={{
                    backgroundColor: '#888',
                    width: 28, height: 28,
                    borderRadius: '50%',
                    mr: 1.5,
                }} />
            </Typography>
            <Box sx={{
                width: '100%',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    mb: 1,
                }}>
                    <Box>{d.author}</Box>
                    <Box sx={{ fontSize: 12 }}>{formatRelative(d.createdAt, new Date())}</Box>
                </Box>
                <Box sx={{
                    background: `linear-gradient(0.1turn, hsl(${colorH} 90% 50%), hsl(${colorL} 90% 50%))`,
                    textAlign: 'center',
                    height: 140,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 4,
                }}>
                    <Typography variant="body2" color="text.secondary" sx={{
                        fontWeight: 900,
                        color: '#fff',
                    }}>
                        {d.content.content}
                        <Typography variant="body2">
                            score: {d.content.score}
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default FinancialWellness;
