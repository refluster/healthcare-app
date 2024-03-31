import React from 'react';
import { Box, Typography } from '@mui/material';
import { Journal } from '../model';
import { User } from 'firebase/auth';
import { formatDuration, formatRelative } from 'date-fns';

interface Props {
    journal: Journal;
    user: User;
}

const DefaultAppUI: React.FC<Props> = ({ journal, user }) => {
    const d = journal;
    const content = (d.content && typeof (d.content) === 'string' && d.content) ||
        (d.content.content && typeof (d.content.content) && d.content.content) || '';
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
            <Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                }}>
                    <Box>{d.author}</Box>
                    <Box sx={{fontSize: 12}}>{formatRelative(d.createdAt, new Date())}</Box>
                </Box>
                {
                    d.title && (
                        <Typography gutterBottom component="div" sx={{
                            fontWeight: 600,
                        }}>
                            {d.title}
                        </Typography>
                    )
                }
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </Box>
        </Box>
    );
};

export default DefaultAppUI;
