import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import Header from '../component/header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from "react-router-dom";
import PostButton from '../component/post-button';


const ConfigPage: React.FC = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            console.log(user);
            if (!user) {
                navigate('/intro');
            }
        })();
    }, [user, navigate]);

    return (
        <Box>
            <Header title="Wellness" />
            <Box>
                <h1 style={{marginLeft: 16}}>Home</h1>
                <Card sx={{ my: 2 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Morning
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Try</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                <Card sx={{ my: 2 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Grey
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Netus et malesuada fames ac turpis egestas maecenas pharetra convallis. Velit egestas dui id ornare arcu.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Try</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                <Card sx={{ my: 2 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Health
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Feugiat nisl pretium fusce id velit. Donec adipiscing tristique risus nec feugiat in fermentum posuere urna.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Try</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Box>
            <PostButton style={{position: 'absolute', right: 24, bottom: 24}} />
        </Box>
    );
};

export default ConfigPage;
