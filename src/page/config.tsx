import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Slider, Switch, TextField, Typography, } from '@mui/material';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
} from 'react-router-dom';
import Header from '../component/header';
import { grey } from '@mui/material/colors';

const IndexPage: React.FC = () => {
    useEffect(() => {
        (async () => {
        })();
    }, []);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <Box>
            <Header title="Config" />
            <Box sx={{ mx: 2 }}>
                <h1>Custom your app</h1>
                <Slider
                    size="medium"
                    defaultValue={70}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                />
                <Box><TextField sx={{width: '100%'}} id="standard-basic" label="Input something" variant="standard" /></Box>
                <Box><TextField sx={{width: '100%'}} id="standard-basic" label="Input something" variant="standard" /></Box>
                <Box><TextField sx={{width: '100%'}} id="standard-basic" label="Input something" variant="standard" /></Box>
                <Box sx={{ display: 'flex', mt: 4, justifyContent: 'space-between' }}>
                    <div>Custom A</div>
                    <Switch {...label} defaultChecked />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>Custom B</div>
                    <Switch {...label} defaultChecked />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>Custom C</div>
                    <Switch {...label} defaultChecked />
                </Box>
            </Box>
        </Box>
    );
};

export default IndexPage;
