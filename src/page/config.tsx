import React, { useEffect, useState } from 'react';
import { Box, Button, Slider, Switch, TextField, Typography } from '@mui/material';
import Header from '../component/header';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import * as api from '../api';

const UserProfilePage: React.FC = () => {
    const [user] = useAuthState(auth);
    const [profileText, setProfileText] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            if (!user) {
                navigate('/intro');
                return;
            }
            await api.getUser(user.uid);
        })();
    }, []);

    const saveProfile = async () => {
        if (!user) {
            return;
        }
        console.log(profileText);
        await api.patchUser({
            id: user.uid,
            profileText,
        });
    }

    return (
        <Box>
            <Header title="Profile" />
            <Box sx={{ pt: 12, mx: 2 }}>
                <Typography variant="h4">{user?.displayName}</Typography>
            </Box>
            <Box sx={{ m: 2 }}>
                <Box>Profile</Box>
                <TextField
                    id="standard-multiline-static"
                    multiline
                    rows={4}
                    placeholder="What's happening?"
                    variant="standard"
                    sx={{
                        width: '100%',
                        py: 2,
                    }}
                    onChange={(e) => setProfileText(e.target.value)}
                />
                <Button variant='contained' onClick={saveProfile}>Save</Button>
            </Box>
        </Box>
    );
};

export default UserProfilePage;
