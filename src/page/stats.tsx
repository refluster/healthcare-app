import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Chart, registerables } from 'chart.js';
import Header from '../component/header';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { DailyStats } from '../model';
import * as api from '../api';
import WellnessWheel from '../component/wellness';
import LineChart from '../component/line-chart';
import { addDays, endOfToday, startOfToday } from 'date-fns';

Chart.register(...registerables);
//ChartJS.register(ArcElement, Tooltip, Legend);

const StatsPage: React.FC = () => {
    const [dailyStats, setDailyStats] = React.useState([] as DailyStats[]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            if (!user) {
                return;
            }
            const query = {
                userId: user.uid,
                startDate: addDays(startOfToday(), -6),
                endDate: endOfToday(),
            }
            const dailyStats = (await api.getDailyStats(query))
                .splice(0,7)
                .reverse()
            setDailyStats(dailyStats)
        })();
    }, [user, navigate]);

    return (
        <Box>
            <Header title="Stats" />
            <Box sx={{ pt: 15, mx: 2 }}>
                <Typography variant="h4">Wellness</Typography>
                {
                    dailyStats.length > 0 && (<>
                        <Box>{dailyStats[dailyStats.length -1 ].date}</Box>
                        <WellnessWheel wellness={dailyStats[dailyStats.length - 1].wellness} />
                    </>)
                }
            </Box>
            <Box sx={{ pt: 8, pb: 4, mx: 2 }}>
                <Typography variant="h4">Weekly wellness</Typography>
            </Box>
            <Box sx={{ pb: 8, mx: 2 }}>
                <Typography variant="h5">Social wellness</Typography>
                <LineChart data={dailyStats.map(d => ({ date: d.date, value: d.wellness.social }))} />
            </Box>
            <Box sx={{ pb: 8, mx: 2 }}>
                <Typography variant="h5">Spiritual wellness</Typography>
                <LineChart data={dailyStats.map(d => ({ date: d.date, value: d.wellness.spiritual }))} />
            </Box>
            <Box sx={{ pb: 8, mx: 2 }}>
                <Typography variant="h5">Intellectual wellness</Typography>
                <LineChart data={dailyStats.map(d => ({ date: d.date, value: d.wellness.intellectual }))} />
            </Box>
            <Box sx={{ pb: 8, mx: 2 }}>
                <Typography variant="h5">Emotional wellness</Typography>
                <LineChart data={dailyStats.map(d => ({ date: d.date, value: d.wellness.emotional }))} />
            </Box>
            <Box sx={{ pb: 8, mx: 2 }}>
                <Typography variant="h5">Financial wellness</Typography>
                <LineChart data={dailyStats.map(d => ({ date: d.date, value: d.wellness.financial }))} />
            </Box>
            <Box sx={{ pb: 8, mx: 2 }}>
                <Typography variant="h5">Physical wellness</Typography>
                <LineChart data={dailyStats.map(d => ({ date: d.date, value: d.wellness.physical }))} />
            </Box>
        </Box>
    );
};

export default StatsPage;
