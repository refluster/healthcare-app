import React from 'react';
import { Box, Typography } from '@mui/material';
import { Journal } from '../model';
import { User } from 'firebase/auth';

interface Props {
    journal: Journal;
    user: User;
}

const UserAppUI: React.FC<Props> = ({ journal, user }) => {
    const d = journal;
    return (
        <Box sx={{ mx: 2, py: 4, borderBottom: '1px solid #eee', display: 'flex' }}>
            <Typography gutterBottom variant="h6" component="div">
                <Box sx={{
                    backgroundColor: '#888',
                    backgroundImage: `url(${user?.photoURL || ''})`,
                    backgroundSize: 'contain',
                    width: 28, height: 28,
                    borderRadius: '50%',
                    mr: 1.5,
                }} />
            </Typography>
            <Box>
                {
                    d.content && typeof (d.content === 'string') && (
                        <Typography variant="body2" color="text.secondary">
                            {d.content}
                        </Typography>
                    )
                }
            </Box>
        </Box>
    );
};

export default UserAppUI;
