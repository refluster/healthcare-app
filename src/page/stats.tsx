import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Chart, registerables } from 'chart.js';
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Header from '../component/header';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { DailyStats } from '../model';
import * as api from '../api';
import WellnessWheel from '../component/wellness';

Chart.register(...registerables);
//ChartJS.register(ArcElement, Tooltip, Legend);

const StatsPage: React.FC = () => {
    const [dailyStats, setDailyStats] = React.useState([] as DailyStats[]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            console.log(user);
            if (!user) {
                return;
            }
            const dailyStats = await api.getDailyStats(user.uid);
            setDailyStats(dailyStats)
        })();
    }, [user, navigate]);

    return (
        <Box>
            <Header title="Stats" />
            <Box sx={{ pt: 15, mx: 2 }}>
                <Typography variant="h1">Wellness</Typography>
                {
                    dailyStats.length > 0 && (<>
                        <Box>{ dailyStats[0].date }</Box>
                        <WellnessWheel wellness={dailyStats[0].wellness} />
                    </>)
                }
            </Box>
            {/*
            <Box>
                <BarChart />
            </Box>
            */}
        </Box>
    );
};

export default StatsPage;
