import React, { useEffect } from 'react';
import { Box, Link } from '@mui/material';
import Header from '../component/header';
import { signInWithPopup, signInWithRedirect } from '@firebase/auth';
import { auth, provider } from '../lib/firebase';

const IntroPage: React.FC = () => {
    useEffect(() => {
        (async () => {
        })();
    }, []);

    return (
        <Box>
            <Header title="Wellness" />
            <Box sx={{ mx: 2 }}>
                <h1>Hello</h1>
                <SignInButton />
            </Box>
        </Box>
    );
};

function SignInButton() {
    const signInWithGoogle = () => {
        signInWithRedirect(auth, provider);
//        signInWithPopup(auth, provider);
    }

    return <button onClick={signInWithGoogle}>
        Login with Google
    </button>
}

export default IntroPage;
