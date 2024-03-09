import React, { useEffect } from 'react';
import { Box, Link } from '@mui/material';
import Header from '../component/header';
import { signInWithRedirect } from '@firebase/auth';
import { auth, provider } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const IntroPage: React.FC = () => {
    const [user] = useAuthState(auth);
    useEffect(() => {
        (async () => {
        })();
    }, []);

    return (
        <Box>
            <Header title="Wellness" />
            <Box sx={{ mx: 2 }}>
                <h1>Hello</h1>
                {user ? (<>
                    <UserInfo />
                    <SignOutButton />
                </>
                ) : (
                    <>
                        <SignInButton />
                    </>
                )}
            </Box>
        </Box>
    );
};

function UserInfo() {
    return <>
        User info
        <img src={auth.currentUser?.photoURL || ''} />
        <p>{auth.currentUser?.displayName}</p>
        <button onClick={() => {console.log(auth.currentUser)}}>auth</button>
    </>
}

function SignOutButton() {
    return <button onClick={() => auth.signOut()}>
        Sign out
    </button>
}

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
