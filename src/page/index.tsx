import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import Header from '../component/header';
import { grey } from '@mui/material/colors';

const ConfigPage: React.FC = () => {
    useEffect(() => {
        (async () => {
        })();
    }, []);

    return (
        <Box>
            <Header title="wellness app" />
            <Box sx={{ mx: 2 }}>
                <h1>Home</h1>
                <Card sx={{ maxWidth: 345, my: 2 }}>
                    <CardMedia
                        sx={{ height: 140, backgroundColor: grey[300] }}
                    />
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
                <Card sx={{ maxWidth: 345, my: 2 }}>
                    <CardMedia
                        sx={{ height: 140, backgroundColor: grey[300] }}
                        />
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
                <Card sx={{ maxWidth: 345, my: 2 }}>
                    <CardMedia
                        sx={{ height: 140, backgroundColor: grey[300] }}
                        />
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
        </Box>
    );
};

export default ConfigPage;
